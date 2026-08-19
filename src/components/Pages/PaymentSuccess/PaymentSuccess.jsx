import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdDone } from 'react-icons/md';
import confetti from 'canvas-confetti';
import './PaymentSuccess.scss';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { currentOrder } = useSelector((state) => state.order);

    // Data passed from Redux currentOrder (persisted in localStorage)
    const orderId = currentOrder?.orderId || currentOrder?.order?.orderId;
    const totalAmount = currentOrder?.totalAmount || currentOrder?.order?.totalAmount;
    const paymentMethod = currentOrder?.paymentMethod || currentOrder?.order?.paymentMethod;

    useEffect(() => {
        // Trigger confetti (cracker popper) effect
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const isCod = paymentMethod?.toLowerCase() === 'cod';

    return (
        <div className="payment-success-wrapper">
            <div className="payment-success-content animate-content">
                <div className="success-icon-container">
                    <div className="icon-outer-circle animate-pulse">
                        <div className="icon-inner-circle animate-scale">
                            <MdDone className="check-icon animate-check" />
                        </div>
                    </div>
                </div>

                <h1 className="success-heading">
                    {isCod ? (
                        <>
                            <span className="text-blue">Order Placed</span> <span className="text-dark">Successful!</span>
                        </>
                    ) : (
                        <>
                            <span className="text-blue">Payment</span> <span className="text-dark">Successful!</span>
                        </>
                    )}
                </h1>

                <div className="order-details">
                    <p className="detail-label">Order ID:</p>
                    <h2 className="detail-value">{orderId || 'N/A'}</h2>

                    <p className="detail-row">Total Amount: <strong>₹{totalAmount || 0}</strong></p>
                    <p className="detail-row">Payment Method: <strong>{isCod ? 'Cash on Delivery' : 'Online Payment'}</strong></p>
                </div>

                <div className="action-buttons">
                    <button className="btn-outline" onClick={() => navigate('/my-account')}>
                        My Orders
                    </button>
                    <button className="btn-solid" onClick={() => navigate('/our-products')}>
                        Continue shopping
                    </button>
                </div>
            </div>

            <div className="footer-image-section">
                <img src="/Images/success-coconut.svg" alt="Coconut" className="coconut-img" />
            </div>
        </div>
    );
};

export default PaymentSuccess;
