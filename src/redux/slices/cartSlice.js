import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';
import { calculateCartTotals } from '../../utils/pricing';

// Get token helper
const getToken = () => localStorage.getItem('token');

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${BaseUrl}/get-cart`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity, variantCombination, sellingPrice, mrp }, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const payload = { productId, quantity };
            if (variantCombination) payload.variantCombination = variantCombination;
            if (sellingPrice) payload.sellingPrice = sellingPrice;
            if (mrp) payload.mrp = mrp;

            const response = await axios.post(`${BaseUrl}/add-to-cart`, payload, config);
            dispatch(fetchCart()); // Refresh cart after adding
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to add to cart');
        }
    }
);

export const updateCartQuantity = createAsyncThunk(
    'cart/updateCartQuantity',
    async ({ productId, newQuantity }, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.put(`${BaseUrl}/update-cart-quantity`, { productId, newQuantity }, config);
            dispatch(fetchCart()); // Refresh cart
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update quantity');
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ productId }, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`${BaseUrl}/remove-from-cart`, { productId }, config);
            dispatch(fetchCart()); // Refresh cart
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to remove from cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        appliedCoupon: null,
        summary: {
            totalMrp: 0,
            discount: 0,
            couponSavings: 0,
            gst: 0,
            delivery: 0,
            total: 0
        },
        loading: false,
        error: null,
        // Single Product Checkout state
        checkoutItem: null, 
        isBuyNow: false
    },
    reducers: {
        setBuyNowItem: (state, action) => {
            state.checkoutItem = action.payload;
            state.isBuyNow = true;
        },
        resetCheckoutMode: (state) => {
            state.checkoutItem = null;
            state.isBuyNow = false;
        },
        applyCoupon: (state, action) => {
            state.appliedCoupon = action.payload;
        },
        removeCoupon: (state) => {
            state.appliedCoupon = null;
        },
        calculateTotals: (state, action) => {
            const shippingRates = action.payload || [];
            const itemsToCalculate = state.isBuyNow && state.checkoutItem ? [state.checkoutItem] : state.items;
            const totalDiscount = state.appliedCoupon ? (state.appliedCoupon.discountValue || 0) : 0;
            
            // Note: coupon logic in Edhwi currently handles discountValue. 
            // In a more advanced version, we'd handle percentage vs fixed here.
            // For now, let's keep it consistent with the existing flow but using the utility.

            // Get delivery charge
            let delivery = 0;
            const subtotalForShipping = itemsToCalculate.reduce((sum, item) => {
                const price = parseFloat(
                    item.variantCombination?.sellingPrice ||
                    item.variantCombination?.price ||
                    item.productDetails?.sellingPrice || 
                    item.sellingPrice || 
                    item.productDetails?.price || 
                    item.price || 
                    0
                );
                return sum + (price * (item.quantity || 1));
            }, 0);

            if (shippingRates && shippingRates.length > 0) {
                let applicableRate = null;
                for (const rate of shippingRates) {
                    if (rate.isActive) {
                        const min = rate.minPrice || 0;
                        const max = rate.maxPrice || Infinity;
                        if (subtotalForShipping >= min && subtotalForShipping <= max) {
                            applicableRate = rate;
                            break; 
                        }
                    }
                }
                if (applicableRate) {
                   delivery = applicableRate.isFree ? 0 : applicableRate.price;
                }
            }

            // Calculate actual discount amount from coupon
            let couponAmount = 0;
            if (state.appliedCoupon) {
                const coupon = state.appliedCoupon;
                const discountValue = coupon.discountValue || 0;
                const discountType = coupon.discountType || 'PERCENTAGE';
                
                if (discountType === 'PERCENTAGE' || discountType === 'percentage' || String(coupon.discount).includes('%')) {
                    couponAmount = (subtotalForShipping * discountValue) / 100;
                    if (coupon.maxDiscountValue && couponAmount > coupon.maxDiscountValue) {
                        couponAmount = coupon.maxDiscountValue;
                    }
                } else {
                    couponAmount = discountValue;
                }
            }

            const result = calculateCartTotals(
                itemsToCalculate,
                couponAmount,
                delivery,
                0, // no COD charge in Edhwi yet
                'prepaid'
            );

            state.summary = {
                totalMrp: result.totalMrp,
                discount: result.mrpDiscount,
                couponSavings: result.discount,
                gst: result.gstAmount,
                delivery: result.delivery,
                total: result.total,
                subtotal: result.totalMrp
            };
        },
        clearCart: (state) => {
            state.items = [];
            state.appliedCoupon = null;
            state.summary = {
                totalMrp: 0,
                discount: 0,
                couponSavings: 0,
                gst: 0,
                delivery: 0,
                total: 0
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.cart || [];
            })
            .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(addToCart.pending, (state) => { state.loading = true; })
            .addCase(addToCart.fulfilled, (state) => { state.loading = false; })
            .addCase(addToCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(updateCartQuantity.pending, (state) => { state.loading = true; })
            .addCase(updateCartQuantity.fulfilled, (state) => { state.loading = false; })
            .addCase(updateCartQuantity.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(removeFromCart.pending, (state) => { state.loading = true; })
            .addCase(removeFromCart.fulfilled, (state) => { state.loading = false; })
            .addCase(removeFromCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export const { calculateTotals, clearCart, applyCoupon, removeCoupon, setBuyNowItem, resetCheckoutMode } = cartSlice.actions;
export default cartSlice.reducer;
