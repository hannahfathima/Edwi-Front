import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartQuantity, removeFromCart, calculateTotals, removeCoupon } from '../../../redux/slices/cartSlice';
import { fetchShippingRates } from '../../../redux/slices/shippingSlice';
import { setLoginModalOpen } from '../../../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cart.scss';
import PaymentSummary from '../../Common/PaymentSummary/PaymentSummary';
import { FiTrash2 } from 'react-icons/fi';
import { BiHeart } from 'react-icons/bi';
import { MdOutlineLocalOffer } from "react-icons/md";
import CartNavbar from '../../Common/cartNavbar/CartNavbar';
import CouponModal from './CouponModal';

// ============================================
// HELPER FUNCTIONS FOR PRICE CALCULATION (Karikku Standard)
// ============================================

const getItemPrice = (item) => {
    if (item.variantCombination) {
        const price = item.variantCombination.sellingPrice || item.variantCombination.price;
        if (price !== undefined && price !== null && price !== '') return Number(price);
    }
    const itemPrice = item.sellingPrice || item.price || (item.productDetails?.sellingPrice || item.productDetails?.price);
    return Number(itemPrice || 0);
};

const getItemOriginalPrice = (item) => {
    const currentPrice = getItemPrice(item);
    if (item.variantCombination) {
        const mrp = item.variantCombination.mrp || item.variantCombination.price;
        if (mrp !== undefined && mrp !== null && mrp !== '') return Number(mrp);
    }
    const mrp = item.mrp || (item.productDetails?.mrp || item.productDetails?.price);
    return Number(mrp || currentPrice);
};

const getItemImage = (item) => {
    if (item.variantCombination?.primaryImage) return item.variantCombination.primaryImage;
    if (item.image) return item.image;
    if (item.productDetails?.image) return item.productDetails.image;
    return '/Images/default-product.svg';
};

const Cart = () => {
    const dispatch = useDispatch();
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const navigate = useNavigate();
    const { items: cartItems, summary, loading, appliedCoupon } = useSelector((state) => state.cart);
    const { rates: shippingRates } = useSelector((state) => state.shipping);
    const { token, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token && !user) {
            dispatch(setLoginModalOpen(true));
            navigate('/');
            return;
        }
        dispatch(fetchCart());
        dispatch(fetchShippingRates());
    }, [dispatch, token, user, navigate]);

    useEffect(() => {
        dispatch(calculateTotals(shippingRates));
    }, [cartItems, appliedCoupon, shippingRates, dispatch]);


    const handleUpdateQuantity = (productId, change, currentQty) => {
        const newQuantity = currentQty + change;
        if (newQuantity > 0) {
            dispatch(updateCartQuantity({ productId, newQuantity }));
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await dispatch(removeFromCart({ productId })).unwrap();
            toast.success("Item removed from cart");
        } catch (error) {
            toast.error(error || "Failed to remove item");
        }
    };

    return (
        <div className="cart-page-container">
            <CartNavbar currentStep="cart" />
            
            <CouponModal isOpen={isCouponModalOpen} onClose={() => setIsCouponModalOpen(false)} />

            <div className="cart-content-wrapper">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <span className="bc-link">Home</span>
                    <span className="bc-separator">›</span>
                    <span className="bc-current">Cart</span>
                </div>

                <h1 className="cart-page-title">My Cart ({cartItems.length})</h1>

                <div className="cart-main-grid">
                    {cartItems.length > 0 ? (
                        <>
                            {/* Left Column - Cart Items */}
                            <div className="cart-items-section">
                                {cartItems.map((item) => (
                                    <div key={item.productId} className="cart-item-card">
                                        <div className="item-image-container">
                                            {/* Using a placeholder div for the image to match structure */}
                                            <div className="image-placeholder">
                                                <img src={getItemImage(item)} alt={item.productDetails?.name || item.productName || 'Product'} />
                                            </div>
                                        </div>

                                        <div className="item-details-container">
                                            <div className="item-title-row">
                                                <h3 className="item-title">{item.productDetails?.name || item.title || 'Product'}</h3>
                                                <span className="item-volume-badge">{item.productDetails?.volume || item.volume || '1 LTR'}</span>
                                            </div>

                                            <div className="item-actions-and-price">
                                                <div className="item-actions">
                                                    <button className="action-btn text-grey" onClick={() => handleRemoveItem(item.productId)} disabled={loading}>
                                                        <FiTrash2 /> Remove
                                                    </button>
                                                    <span className="action-divider">|</span>
                                                    <button className="action-btn text-grey">
                                                        <BiHeart /> Add to wishlist
                                                    </button>
                                                </div>

                                                <div className="item-controls-price">
                                                    <div className="quantity-selector">
                                                        <button onClick={() => handleUpdateQuantity(item.productId, -1, item.quantity)} disabled={loading}>−</button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => handleUpdateQuantity(item.productId, 1, item.quantity)} disabled={loading}>+</button>
                                                    </div>

                                                    <div className="price-details">
                                                        {(() => {
                                                            const sellingPrice = getItemPrice(item);
                                                            const mrp = getItemOriginalPrice(item);
                                                            
                                                            const currentPriceTotal = sellingPrice * item.quantity;
                                                            const originalPriceTotal = mrp * item.quantity;
                                                            
                                                            return originalPriceTotal > currentPriceTotal ? (
                                                                <>
                                                                    <div className="current-price">₹{currentPriceTotal.toFixed(2)}</div>
                                                                    <div className="original-price-row">
                                                                        <span className="strike-price">₹{originalPriceTotal.toFixed(2)}</span>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="current-price">
                                                                    ₹{currentPriceTotal.toFixed(2)}
                                                                </div>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column - Payment Summary & Coupons */}
                            <div className="cart-summary-section">
                                {appliedCoupon ? (
                                    <div className="apply-coupons-card" style={{ backgroundColor: '#f0f5ff', borderColor: '#2d68f8' }}>
                                        <div className="coupon-left">
                                            <MdOutlineLocalOffer className="coupon-icon" style={{ color: '#2d68f8' }} />
                                            <span className="coupon-label" style={{ color: '#2d68f8', fontWeight: '600' }}>
                                                {appliedCoupon.code || appliedCoupon.couponId || 'Coupon'} Applied
                                            </span>
                                        </div>
                                        <button 
                                            className="apply-btn remove-btn" 
                                            onClick={() => {
                                                dispatch(removeCoupon());
                                                dispatch(calculateTotals(shippingRates));
                                                toast.info("Coupon removed");
                                            }}
                                            style={{ color: '#e74c3c', backgroundColor: 'transparent', padding: '0', fontWeight: '600' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div className="apply-coupons-card">
                                        <div className="coupon-left">
                                            <MdOutlineLocalOffer className="coupon-icon yellow" />
                                            <span className="coupon-label">Apply coupons</span>
                                        </div>
                                        <button className="apply-btn" onClick={() => setIsCouponModalOpen(true)}>Apply</button>
                                    </div>
                                )}

                                {/* Payment Summary */}
                                <PaymentSummary
                                    subtotal={summary.subtotal}
                                    totalMrp={summary.totalMrp}
                                    discountOnMrp={summary.discount}
                                    couponSavings={summary.couponSavings}
                                    applicableGst={summary.gst}
                                    delivery={summary.delivery}
                                    total={summary.total}
                                    buttonText="Continue"
                                    onButtonClick={() => navigate('/address')}
                                    showButton={true} className="desktop-payment-summary"
                                    disabled={cartItems.length === 0}
                                />

                                {/* Mobile specific button, shown only on mobile */}
                                <button className="mobile-proceed-btn" onClick={() => navigate('/address')} disabled={cartItems.length === 0}>
                                    Proceed to checkout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="empty-cart-message" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px', backgroundColor: '#fafafa', borderRadius: '16px', marginTop: '20px' }}>
                            <h2 style={{ fontSize: '28px', color: '#1c1c1c', marginBottom: '12px', fontWeight: '600' }}>Your cart is empty</h2>
                            <p style={{ color: '#666', marginBottom: '32px', fontSize: '16px' }}>There are no products in your cart yet.</p>
                            <button onClick={() => navigate('/our-products')} style={{ padding: '14px 36px', backgroundColor: '#2d68f8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}>
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
