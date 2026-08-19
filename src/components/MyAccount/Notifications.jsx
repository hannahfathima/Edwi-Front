import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markAsRead } from '../../redux/slices/notificationsSlice';
import { fetchMyOrders } from '../../redux/slices/orderSlice';
import './Notifications.scss';

const Notifications = () => {
    const dispatch = useDispatch();
    const { items: notificationsData, loading: notifLoading, error } = useSelector((state) => state.notifications);
    const { orders, loading: ordersLoading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchNotifications());
        dispatch(fetchMyOrders());
    }, [dispatch]);

    const handleMarkAsRead = (id) => {
        dispatch(markAsRead(id));
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = dateString._seconds ? new Date(dateString._seconds * 1000) : new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Generate dynamic notifications from orders
    const orderNotifications = (orders || []).map((order) => {
        const orderItems = order.pricing?.items || order.items || [];
        const imageUrl = orderItems.length > 0 ? orderItems[0].image : null;
        
        return {
            id: `order-${order.orderId || order.id}`,
            read: true, // Assuming order notifications are read by default, or you can manage this differently
            title: 'Order Placed',
            message: `Your order #${order.orderNumber || order.orderId} has been placed successfully. Total: ₹${order.pricing?.finalTotal || order.pricing?.total || 0}`,
            date: formatDate(order.createdAt),
            imageUrl: imageUrl || '/Images/Edhwi-Packetss.svg',
            isOrder: true
        };
    });

    // Combine both notifications
    const allNotifications = [...orderNotifications, ...notificationsData];
    const loading = notifLoading || ordersLoading;

    if (loading && allNotifications.length === 0) {
        return (
            <section className="dashboard-section notifications-page">
                <h2 className="section-heading">NOTIFICATIONS</h2>
                <div className="notifications-container">
                    <p style={{ padding: '20px', textAlign: 'center' }}>Loading notifications...</p>
                </div>
            </section>
        );
    }

    if (error && allNotifications.length === 0) {
        return (
            <section className="dashboard-section notifications-page">
                <h2 className="section-heading">NOTIFICATIONS</h2>
                <div className="notifications-container">
                    <p style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="dashboard-section notifications-page">
            <h2 className="section-heading">NOTIFICATIONS</h2>
            <div className="notifications-container">
                {allNotifications.length === 0 ? (
                    <p style={{ padding: '20px', textAlign: 'center' }}>No notifications found.</p>
                ) : (
                    allNotifications.map((item, index) => (
                        <div className={`notification-item ${!item.read ? 'unread' : ''}`} key={item.id} onClick={() => !item.read && !item.isOrder && handleMarkAsRead(item.id)}>
                            <div className="notification-left">
                                <div className={`status-dot ${!item.read ? 'active' : ''}`}></div>
                                <div className="product-image-box">
                                    <img src={item.imageUrl || '/Images/Edhwi-Packetss.svg'} alt="Notification" onError={(e) => { e.target.onerror = null; e.target.src = '/Images/Edhwi-Packetss.svg'; }} />
                                    {/* Fallback just in case image is missing */}
                                    {!item.imageUrl && <div className="fallback-img"></div>}
                                </div>
                            </div>
                            <div className="notification-content">
                                <p className="message">{item.message || item.title}</p>
                                <span className="date">{item.date}</span>
                            </div>
                            <div className="notification-right">
                                {!item.isOrder ? (
                                    <a href="#view" className="view-link" onClick={(e) => { e.preventDefault(); handleMarkAsRead(item.id); }}>View</a>
                                ) : (
                                    <a href="/my-account" className="view-link" onClick={(e) => { e.preventDefault(); /* Could navigate to orders tab if needed */ }}>View Order</a>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default Notifications;
