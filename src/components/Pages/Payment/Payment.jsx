import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CartNavbar from '../../Common/cartNavbar/CartNavbar';
import PaymentSummary from '../../Common/PaymentSummary/PaymentSummary';
import { calculateTotals, clearCart } from '../../../redux/slices/cartSlice';
import { fetchShippingRates } from '../../../redux/slices/shippingSlice';
import { placeOrder, placeSingleProductOrder, resetOrderState } from '../../../redux/slices/orderSlice';
import BaseUrl from '../../../../BaseUrl';
import { toast } from 'react-toastify';
import './Payment.scss';

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the address ID from Redux (fallback for safety)
    const { addressId: locationAddressId } = location.state || {};

    const { items: cartItems, checkoutItem, isBuyNow, summary, loading: cartLoading, appliedCoupon } = useSelector((state) => state.cart);
    const { addresses, selectedAddressId: reduxAddressId } = useSelector((state) => state.address);
    const { token, user } = useSelector((state) => state.auth);
    const { loading: orderLoading, success, error } = useSelector((state) => state.order);

    const addressId = reduxAddressId || locationAddressId;

    const { rates: shippingRates } = useSelector((state) => state.shipping);

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        dispatch(fetchShippingRates());
    }, [dispatch]);

    useEffect(() => {
        // If no address selected or cart empty, go back
        // if (!addressId || addresses.length === 0 || cartItems.length === 0) {
        //     navigate('/cart');
        //     return;
        // }

        const address = addresses.find(a => (a.id || a._id) === addressId);
        if (address) {
            setSelectedAddress(address);
        } else if (addresses.length > 0) {
             // Fallback if the specific ID isn't found but we have addresses
             navigate('/address');
        }

        dispatch(calculateTotals(shippingRates));
    }, [addressId, addresses, cartItems.length, appliedCoupon, shippingRates, navigate, dispatch]);

    useEffect(() => {
        if (success) {
            // toast.success('Order placed successfully!');
            dispatch(clearCart());
            // We don't ResetOrderState here anymore because we want PaymentSuccess to read from it.
            // Reset should happen when specifically clearing or leaving the flow.
            
            navigate('/payment-success');
        }

        if (error) {
            toast.error(`Error placing order: ${error}`);
            dispatch(resetOrderState());
        }
    }, [success, error, navigate, dispatch, summary.total, paymentMethod]);

    const handleMakePayment = async () => {
        if (!selectedAddress) return;

        const deliveryAddress = {
            fullName: selectedAddress.fullName,
            phone: selectedAddress.phone.replace(/\D/g, ''),
            email: selectedAddress.email || user?.email || 'customer@example.com',
            addressLine1: selectedAddress.addressLine1,
            addressLine2: selectedAddress.addressLine2 || '',
            city: selectedAddress.city || selectedAddress.state,
            state: selectedAddress.state,
            pincode: selectedAddress.zipCode,
            addressType: selectedAddress.addressType || 'Home'
        };

        const orderData = isBuyNow && checkoutItem ? {
            productId: checkoutItem.productId,
            quantity: checkoutItem.quantity,
            price: checkoutItem.sellingPrice || checkoutItem.price || 0,
            originalPrice: checkoutItem.mrp || 0,
            variant: checkoutItem.variantCombination || null,
            deliveryAddress,
            paymentMethod: paymentMethod,
            deliveryCharge: summary.delivery,
            discountAmount: summary.couponSavings || 0,
            couponCode: appliedCoupon?.code || null
        } : {
            items: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.productDetails?.sellingPrice || item.productDetails?.price || 0,
                name: item.productDetails?.name || 'Product',
                variant: item.variantDetails || null
            })),
            deliveryAddress,
            paymentMethod: paymentMethod,
            deliveryCharge: summary.delivery,
            discountAmount: summary.couponSavings || 0,
            couponCode: appliedCoupon?.code || null
        };

        if (paymentMethod === 'online') {
            try {
                // 1. Fetch Razorpay Key
                const keyRes = await fetch(`${BaseUrl}/razorpay-key`);
                const keyData = await keyRes.json();

                const orderRes = await fetch(`${BaseUrl}/create-order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: summary.total })
                });
                const orderRespData = await orderRes.json();

                // 3. Open Razorpay Checkout
                const options = {
                    key: keyData.keyId,
                    amount: orderRespData.amount,
                    currency: "INR",
                    name: "Edhwi Store",
                    description: "Order Payment",
                    order_id: orderRespData.orderId,
                    handler: async function (response) {
                        try {
                            const verifyRes = await fetch(`${BaseUrl}/verify-payment`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature
                                })
                            });

                            const verifyData = await verifyRes.json();
                            if (verifyData.status === 'success') {
                                // Add payment details to orderData
                                const finalOrderData = {
                                    ...orderData,
                                    paymentDetails: {
                                        transactionId: response.razorpay_payment_id,
                                        paymentId: response.razorpay_payment_id,
                                        razorpayOrderId: response.razorpay_order_id,
                                        razorpaySignature: response.razorpay_signature,
                                        paymentGateway: 'Razorpay'
                                    }
                                };
                                
                                console.log("Placing online order with payload:", finalOrderData);
                                if (isBuyNow) {
                                    dispatch(placeSingleProductOrder(finalOrderData));
                                } else {
                                    dispatch(placeOrder(finalOrderData));
                                }
                            } else {
                                toast.error("Payment verification failed. Please contact support.");
                            }
                        } catch (err) {
                            toast.error("Payment verification error.");
                        }
                    },
                    prefill: {
                        name: selectedAddress.fullName,
                        email: selectedAddress.email || 'customer@example.com',
                        contact: selectedAddress.phone.replace(/\D/g, '')
                    },
                    theme: { color: "#3399cc" }
                };

                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response) {
                    toast.error(`Payment Failed: ${response.error.description}`);
                });
                rzp.open();
            } catch (error) {
                console.error("Error initiating Razorpay checkout:", error);
                toast.error("Could not initiate payment. Please try again.");
            }
            return;
        }

        // COD Flow
        console.log("Placing COD order with payload:", orderData);
        if (isBuyNow) {
            dispatch(placeSingleProductOrder(orderData));
        } else {
            dispatch(placeOrder(orderData));
        }
    };

    if (cartLoading || !selectedAddress) {
        return <div className="payment-loading">Loading...</div>;
    }

    return (
        <div className="payment-page-container">
            <CartNavbar currentStep="payment" />

            <div className="payment-content-wrapper">
                <h1 className="payment-page-title">Payment</h1>

                <div className="payment-main-grid">
                    <div className="payment-methods-section">
                        <h3 className="payment-section-heading">CHOOSE PAYMENT METHOD</h3>

                        <div className="payment-options-box">
                            <label className={`payment-option-label ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                />
                                <span className="method-name">Cash on Delivery</span>
                            </label>

                            <div className="payment-divider" />

                            <label className={`payment-option-label ${paymentMethod === 'online' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={() => setPaymentMethod('online')}
                                />
                                <span className="method-name">UPI /Cards , Other</span>
                            </label>
                        </div>

                    </div>

                    <div className="payment-summary-section">
                        <PaymentSummary
                            subtotal={summary.subtotal}
                            totalMrp={summary.totalMrp}
                            discountOnMrp={summary.discount}
                            couponSavings={summary.couponSavings}
                            applicableGst={summary.gst}
                            delivery={summary.delivery}
                            total={summary.total}
                            buttonText={orderLoading ? "Processing..." : "Make payment"}
                            onButtonClick={handleMakePayment}
                            showButton={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
