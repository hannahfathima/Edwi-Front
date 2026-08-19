import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiAlertCircle } from 'react-icons/fi';
import { cancelOrder, fetchMyOrders } from '../../redux/slices/orderSlice';
import './CancelOrder.scss';

const CancelOrder = ({ setActiveTab, cancelOrderId, setCancelOrderId }) => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);

    const [reason, setReason] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [acceptedPolicy, setAcceptedPolicy] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);

    const order = orders.find(o => (o.id === cancelOrderId || o.orderId === cancelOrderId));

    useEffect(() => {
        if (!cancelOrderId && orders.length > 0) {
           if(setActiveTab) setActiveTab('orders');
        }
    }, [cancelOrderId, orders, setActiveTab]);

    if (!order) {
        return (
            <div className="cancel-order-container">
                <p style={{ textAlign: 'center', padding: '2rem' }}>No order selected.</p>
                <div style={{ textAlign: 'center' }}>
                    <button className="btn-keep" onClick={() => setActiveTab && setActiveTab('orders')}>Go Back</button>
                </div>
            </div>
        );
    }

    const itemsText = (order.pricing?.items || order.items || []).map(i => i.name).join(', ');
    const total = order.pricing?.finalTotal || order.pricing?.total || 0;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = dateString._seconds ? new Date(dateString._seconds * 1000) : new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleReasonChange = (e) => {
        const val = e.target.value;
        const text = e.target.options[e.target.selectedIndex].text;
        setReason(val);
        setCategoryName(text);
    };

    const handleConfirmCancellation = async () => {
        if (!reason || !categoryName) {
            alert('Please select a reason for cancellation.');
            return;
        }

        if (!acceptedPolicy) {
            alert('Please accept the privacy policy to continue.');
            return;
        }

        setIsCanceling(true);
        try {
            const resultAction = await dispatch(cancelOrder({
                orderId: order.id || order.orderId,
                reason,
                categoryName,
                feedback
            }));

            if (cancelOrder.fulfilled.match(resultAction)) {
                alert('Order cancelled successfully.');
                dispatch(fetchMyOrders());
                if(setCancelOrderId) setCancelOrderId(null);
                if(setActiveTab) setActiveTab('orders');
            } else {
                alert(`Cancellation failed: ${resultAction.payload}`);
            }
        } catch (err) {
            alert('An unexpected error occurred.');
        } finally {
            setIsCanceling(false);
        }
    };

    return (
        <div className="cancel-order-container">
            <h1 className="cancel-title">
                <span className="text-blue">C</span>ancel order
            </h1>

            <div className="cancel-card">
                <div className="order-header">
                    <span className="order-id-label">Order id:</span> <span className="order-id-value">#{order.orderNumber || order.orderId || order.id}</span>
                </div>

                <div className="warning-banner">
                    <FiAlertCircle className="warning-icon" />
                    <span>You are about to cancel order <strong>#{order.orderNumber || order.orderId || order.id}</strong>. This action cannot be undone.</span>
                </div>

                <div className="order-summary-section">
                    <div className="summary-header">
                        <h3>ORDER SUMMARY</h3>
                        <span className="status-badge" style={{ textTransform: 'capitalize' }}>{order.orderStage || 'Processing'}</span>
                    </div>

                    <div className="summary-details">
                        <p><strong>Items:</strong> {itemsText || 'N/A'}</p>
                        <p>Ordered on: {formatDate(order.createdAt)}</p>
                        <p className="total-price"><strong>Total:</strong> ₹{total}</p>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="form-group">
                    <label>Reason for cancellation</label>
                    <select className="form-control" value={reason} onChange={handleReasonChange}>
                        <option value="" disabled>Select Reason</option>
                        <option value="changed-mind">Changed my mind</option>
                        <option value="found-cheaper">Found a cheaper alternative</option>
                        <option value="ordered-mistake">Ordered by mistake</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Additional feedback</label>
                    <textarea 
                        className="form-control" 
                        rows="4" 
                        placeholder="Optional..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                </div>

                <div className="what-happens-next">
                    <h4>What happens Next?</h4>
                    <div className="next-steps-box">
                        <ul>
                            <li>Your order will be cancelled immediately</li>
                            <li>You will receive a confirmation email</li>
                            <li>Any payment will be refunded within 3-5 business days</li>
                            <li>Digital items or subscriptions will be deactivated</li>
                        </ul>
                    </div>
                </div>

                <div className="privacy-policy">
                    <h4>Privacy policy</h4>
                    <label className="checkbox-container">
                        <input 
                            type="checkbox" 
                            checked={acceptedPolicy}
                            onChange={(e) => setAcceptedPolicy(e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        <span className="checkbox-label">I understand this action can not be undone</span>
                    </label>
                </div>

                <div className="action-buttons">
                    <button 
                        className="btn-confirm" 
                        onClick={handleConfirmCancellation}
                        disabled={isCanceling || !acceptedPolicy}
                    >
                        {isCanceling ? 'Cancelling...' : 'Confirm cancellation'}
                    </button>
                    <button 
                        className="btn-keep" 
                        onClick={() => {
                            if(setCancelOrderId) setCancelOrderId(null);
                            if(setActiveTab) setActiveTab('orders');
                        }}
                    >
                        Keep Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelOrder;