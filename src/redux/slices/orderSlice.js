import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

const getToken = () => localStorage.getItem('token');

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (orderData, { rejectWithValue, dispatch }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`${BaseUrl}/place-order`, orderData, config);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Place order failed:', error.response?.data);
            const errorMessage = error.response?.data?.errors
                ? error.response.data.errors.join(', ')
                : (error.response?.data?.error || error.response?.data?.message || 'Failed to place order');
            return rejectWithValue(errorMessage);
        }
    }
);

export const placeSingleProductOrder = createAsyncThunk(
    'order/placeSingleProductOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`${BaseUrl}/single-product-place-order`, orderData, config);
            return response.data;
        } catch (error) {
            console.error('Place single product order failed:', error.response?.data);
            const errorMessage = error.response?.data?.errors
                ? error.response.data.errors.join(', ')
                : (error.response?.data?.error || error.response?.data?.message || 'Failed to place order');
            return rejectWithValue(errorMessage);
        }
    }
);


export const fetchMyOrders = createAsyncThunk(
    'order/fetchMyOrders',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${BaseUrl}/get-orders`, config);
            return response.data; // { success: true, count: X, orders: [...] }
        } catch (error) {
            console.error('Fetch orders failed:', error.response?.data);
            const errorMessage = error.response?.data?.errors
                ? error.response.data.errors.join(', ')
                : (error.response?.data?.error || error.response?.data?.message || 'Failed to fetch orders');
            return rejectWithValue(errorMessage);
        }
    }
);

export const cancelOrder = createAsyncThunk(
    'order/cancelOrder',
    async ({ orderId, reason, categoryName, feedback }, { rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const payload = {
                reason,
                categoryName,
                feedback
            };
            const response = await axios.post(`${BaseUrl}/cancel-order/${orderId}`, payload, config);
            return response.data;
        } catch (error) {
            console.error('Cancel order failed:', error.response?.data);
            const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to cancel order';
            return rejectWithValue(errorMessage);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        error: null,
        success: false,
        currentOrder: JSON.parse(localStorage.getItem('currentOrder')) || null,
        orders: [] // Array to hold fetched orders
    },
    reducers: {
        resetOrderState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.currentOrder = null;
            localStorage.removeItem('currentOrder');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentOrder = action.payload;
                localStorage.setItem('currentOrder', JSON.stringify(action.payload));
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            // Fetch Orders
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders || [];
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Cancel Order
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Place Single Product Order (Buy Now)
            .addCase(placeSingleProductOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(placeSingleProductOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentOrder = action.payload;
                localStorage.setItem('currentOrder', JSON.stringify(action.payload));
            })
            .addCase(placeSingleProductOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    }
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
