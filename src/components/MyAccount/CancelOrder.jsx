import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
    const [validationError, setValidationError] = useState('');

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
        if (validationError) setValidationError('');
    };

    const handleConfirmCancellation = async () => {
        if (!reason || !categoryName) {
            setValidationError('Please select a reason for cancellation.');
            return;
        }

        if (!acceptedPolicy) {
            setValidationError('Please accept the Privacy & Cancellation Policy to continue.');
            return;
        }

        setValidationError('');
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
                setValidationError(`Cancellation failed: ${resultAction.payload || 'Failed to cancel order.'}`);
            }
        } catch (err) {
            setValidationError('An unexpected error occurred.');
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
                    <span>Attention: You are requesting cancellation for order <strong>#{order.orderNumber || order.orderId || order.id}</strong>. Order cancellation is permanent and cannot be undone.</span>
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
                    <h4>Privacy & Cancellation Policy</h4>
                    <p className="privacy-statement-text">
                        By cancelling this order, your personal data associated with this transaction will be processed in accordance with our <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.
                    </p>
                    <label className="checkbox-container">
                        <input 
                            type="checkbox" 
                            checked={acceptedPolicy}
                            onChange={(e) => {
                                setAcceptedPolicy(e.target.checked);
                                if (validationError) setValidationError('');
                            }}
                        />
                        <span className="checkmark"></span>
                        <span className="checkbox-label">
                            I have read and agree to the <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> and understand that this action cannot be undone.
                        </span>
                    </label>
                </div>

                {validationError && (
                    <div className="validation-error-banner">
                        <FiAlertCircle className="error-icon" />
                        <span>{validationError}</span>
                    </div>
                )}

                <div className="action-buttons">
                    <button 
                        className="btn-confirm" 
                        onClick={handleConfirmCancellation}
                        disabled={isCanceling}
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