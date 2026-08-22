import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMyOrders } from '../../redux/slices/orderSlice';

import './Orders.scss';

const Orders = ({ setActiveTab, setCancelOrderId, selectedOrderId, setSelectedOrderId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { orders, loading } = useSelector((state) => state.order);


    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    useEffect(() => {
        if (selectedOrderId && orders && orders.length > 0) {
            // Use a small timeout to ensure the DOM has rendered after the tab switch
            const scrollTimeout = setTimeout(() => {
                const element = document.getElementById(`order-${selectedOrderId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('highlight-order');

                    // Clear the selection highlight after a delay
                    setTimeout(() => {
                        element.classList.remove('highlight-order');
                        if (setSelectedOrderId) setSelectedOrderId(null);
                    }, 3000);
                }
            }, 100);

            return () => clearTimeout(scrollTimeout);
        }
    }, [selectedOrderId, orders, setSelectedOrderId]);

    // Format Date string helper
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = dateString._seconds ? new Date(dateString._seconds * 1000) : new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading && (!orders || orders.length === 0)) {
        return (
            <section className="dashboard-section figma-orders-section">
                <h2 className="section-heading figma-heading">ORDERS</h2>
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading orders...</div>
            </section>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <section className="dashboard-section figma-orders-section">
                <h2 className="section-heading figma-heading">ORDERS</h2>
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
                    You have not placed any orders yet.
                </div>
            </section>
        );
    }

    const getSortTime = (dateVal) => {
        if (!dateVal) return 0;
        return dateVal._seconds ? dateVal._seconds * 1000 : new Date(dateVal).getTime() || 0;
    };

    return (
        <section className="dashboard-section figma-orders-section">
            <h2 className="section-heading figma-heading">ORDERS</h2>

            <div className="figma-orders-list">
                {[...orders].sort((a, b) => getSortTime(b.createdAt) - getSortTime(a.createdAt)).map((order) => {
                    const currentStatus = order.status !== undefined ? Number(order.status) :
                        (order.orderStage === 'cancelled' ? 3 :
                            order.orderStage === 'delivered' ? 2 :
                                ['packed', 'shipped'].includes(order.orderStage) ? 1 : 0);

                    const isDelivered = currentStatus === 2;
                    const isCancelled = currentStatus === 3;

                    let statusText = 'Processing';
                    if (currentStatus === 0) statusText = 'Placed';
                    else if (currentStatus === 1) statusText = 'Packed';
                    else if (currentStatus === 2) statusText = 'Delivered';
                    else if (currentStatus === 3) statusText = 'Cancelled';

                    return (
                        <div className="figma-order-card" key={order.orderId || order.id} id={`order-${order.orderId || order.id}`}>
                            <div className="card-header">
                                <div className="order-id">
                                    Order ID <strong>#{order.orderNumber || order.orderId}</strong>
                                </div>
                                <div className={`order-status ${isDelivered ? 'delivered' : isCancelled ? 'cancelled' : 'processing'}`} style={{ textTransform: 'capitalize' }}>
                                    {statusText}
                                </div>
                            </div>

                            <div className="card-meta">
                                <span>Ordered on : <strong>{formatDate(order.createdAt)}</strong></span>
                                <span style={{ marginLeft: '10px' }}>
                                    Total: <strong>₹{order.pricing?.finalTotal || order.pricing?.total || 0}</strong>
                                </span>
                            </div>

                            {/* Progress bar logic (very basic check) */}
                            {!isCancelled && (
                                <div className="card-progress">
                                    <div className="progress-track"></div>
                                    <div className="progress-bar" style={{ width: currentStatus === 2 ? '100%' : currentStatus === 1 ? '50%' : '0%' }}></div>
                                    <div className="progress-steps">
                                        <div className={`step ${currentStatus >= 0 ? 'active' : ''}`}>
                                            <div className="step-dot"></div>
                                            <div className="step-label">ORDER PLACED</div>
                                        </div>
                                        <div className={`step ${currentStatus >= 1 ? 'active' : ''}`}>
                                            <div className="step-dot"></div>
                                            <div className="step-label">PACKED</div>
                                        </div>
                                        <div className={`step ${currentStatus >= 2 ? 'active' : ''}`}>
                                            <div className="step-dot"></div>
                                            <div className="step-label">DELIVERED</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Line items for this order */}
                            {(order.pricing?.items || order.items || []).map((item, index) => (
                                <React.Fragment key={`${item.productId}-${index}`}>
                                    <div className="card-divider"></div>
                                    <div className="card-item">
                                        <div className="item-image-box">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            ) : (
                                                <div className="bottle-mock-sm"></div>
                                            )}
                                        </div>
                                        <div className="item-details-box" style={{ flexGrow: 1 }}>
                                            <div className="item-title">Item {index + 1}:</div>
                                            <div className="item-name">
                                                {item.name} {item.weight && `(${item.weight})`}
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span>Qty: {item.quantity} × ₹{item.sellingPrice || item.price || item.unitPrice || 0}</span>
                                                {(item.mrp && item.mrp > (item.sellingPrice || item.price || item.unitPrice)) && (
                                                    <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '11px' }}>
                                                        ₹{item.mrp}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions per item (or just for first item for now to match UI) */}
                                        {index === 0 && !isDelivered && !isCancelled && (
                                            <div className="item-actions-box">
                                                <button onClick={() => {
                                                    if (typeof setActiveTab === 'function') {
                                                        if (typeof setCancelOrderId === 'function') {
                                                            setCancelOrderId(order.orderId || order.id);
                                                        }
                                                        setActiveTab('cancel-order');
                                                    } else {
                                                        navigate('/cancel-order');
                                                    }
                                                }} className="btn-outline">Cancel</button>
                                                <button className="btn-primary">Track</button>
                                            </div>
                                        )}
                                    </div>
                                </React.Fragment>
                            ))}

                            <div className="card-divider"></div>

                            <div className="card-summary">


                                <h4 className="box-title">Summary</h4>
                                <div className="grey-box">
                                    <div className="summary-row"><span>Total MRP: ₹{order.pricing?.totalMRP?.toFixed(2) || (order.pricing?.subtotal + (order.pricing?.totalSavings || 0)).toFixed(2)}</span></div>

                                    {(order.pricing?.totalSavings > 0) && (
                                        <div className="summary-row" style={{ color: '#3dae4a' }}>
                                            <span>Discount on MRP: -₹{order.pricing.totalSavings.toFixed(2)}</span>
                                        </div>
                                    )}

                                    {order.pricing?.discountAmount > 0 && (
                                        <div className="summary-row" style={{ color: '#3dae4a' }}>
                                            <span>Coupon Discount: -₹{order.pricing.discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="summary-row"><span>Shipping: ₹{order.pricing?.deliveryCharge?.toFixed(2) || 0}</span></div>
                                    <div className="summary-row-flex">
                                        <span>Tax: ₹{order.pricing?.gst?.toFixed(2) || 0}</span>
                                        <span className="total-text"><strong>Total:</strong> ₹{order.pricing?.finalTotal?.toFixed(2) || order.pricing?.total?.toFixed(2) || 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Example delivery info block */}
                            {isDelivered && (
                                <div className="card-deliver-info" style={{ marginTop: '1.5rem' }}>
                                    <h4 className="box-title">Deliver Info</h4>
                                    <div className="grey-box">
                                        <div className="summary-row">
                                            <span>
                                                Delivered on: <strong>
                                                    {order.trackingStages?.find(s => s.stage === 'delivered')?.timestamp
                                                        ? formatDate(order.trackingStages.find(s => s.stage === 'delivered').timestamp)
                                                        : 'N/A'
                                                    }
                                                </strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="card-bottom-actions">
                                <button
                                    className="btn-outline"
                                    onClick={() => navigate('/contact-us')}
                                >
                                    Support
                                </button>

                                {/* ✅ CHANGED: Navigate to the new page */}
                                <button
                                    className="btn-primary"
                                    onClick={() => navigate('/our-products')}
                                >
                                    Buy again
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>


        </section>
    );
};

export default Orders;
