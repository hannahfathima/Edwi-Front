import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './MyAccount.scss';
import { FiChevronRight } from 'react-icons/fi';
import Overview from './Overview';
import Orders from './Orders';
import Returns from './Returns';
import MySettings from './MySettings';
import SavedCards from './SavedCards';
import Coupons from './Coupons';
import Notifications from './Notifications';
import CancelOrder from './CancelOrder';
import Wishlist from './Wishlist';
import Navbar from '../Navbar/Navbar';

const MyAccount = ({ setCurrentPage }) => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'overview');
    const [cancelOrderId, setCancelOrderId] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview setActiveTab={setActiveTab} setSelectedOrderId={setSelectedOrderId} />;
            case 'orders':
                return <Orders setActiveTab={setActiveTab} setCancelOrderId={setCancelOrderId} selectedOrderId={selectedOrderId} setSelectedOrderId={setSelectedOrderId} />;
            case 'returns':
                return <Returns />;
            case 'settings':
                return <MySettings />;
            case 'cards':
                return <SavedCards />;
            case 'coupons':
                return <Coupons />;
            case 'notifications':
                return <Notifications setActiveTab={setActiveTab} setSelectedOrderId={setSelectedOrderId} />;
            case 'cancel-order':
                return <CancelOrder setActiveTab={setActiveTab} cancelOrderId={cancelOrderId} setCancelOrderId={setCancelOrderId} />;
            case 'wishlist':
                return <Wishlist />;
            default:
                return <Overview setActiveTab={setActiveTab} setSelectedOrderId={setSelectedOrderId} />;
        }
    };

    return (
        <>
            <Navbar />
            <div className="my-account-page">
                <div className="my-account-container">
                    {activeTab === 'cancel-order' ? (
                        <nav className="breadcrumbs">
                            <Link to="/" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Home</Link>
                            <FiChevronRight className="breadcrumb-icon" />
                            <span onClick={() => setActiveTab('overview')} style={{ cursor: 'pointer' }}>My account</span>
                            <FiChevronRight className="breadcrumb-icon" />
                            <span className="current">Cancel order</span>
                        </nav>
                    ) : (
                        <nav className="breadcrumbs">
                            <Link to="/" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Home</Link>
                            <FiChevronRight className="breadcrumb-icon" />
                            <span className="current">My account</span>
                        </nav>
                    )}

                    {activeTab !== 'cancel-order' && <h1 className="page-title"><span>Manage</span> your account</h1>}

                    <div className="account-layout">
                        {/* Sidebar */}
                        {activeTab !== 'cancel-order' && (
                            <aside className="account-sidebar">
                                <div className="sidebar-section">
                                    <h3
                                        className={`section-title ${activeTab === 'overview' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('overview')}
                                    >
                                        Overview
                                    </h3>
                                </div>

                                <div className="sidebar-section">
                                    <h3 className="section-title">My Orders</h3>
                                    <ul className="section-links">
                                        <li>
                                            <a
                                                href="#orders"
                                                className={activeTab === 'orders' ? 'active-link' : ''}
                                                onClick={(e) => { e.preventDefault(); setActiveTab('orders'); }}
                                            >
                                                Orders
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#returns"
                                                className={activeTab === 'returns' ? 'active-link' : ''}
                                                onClick={(e) => { e.preventDefault(); setActiveTab('returns'); }}
                                            >
                                                Returns
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#wishlist"
                                                className={activeTab === 'wishlist' ? 'active-link' : ''}
                                                onClick={(e) => { e.preventDefault(); setActiveTab('wishlist'); }}
                                            >
                                                Wishlist
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="sidebar-section">
                                    <h3 className="section-title">My Account</h3>
                                    <ul className="section-links">
                                        <li>
                                            <a
                                                href="#settings"
                                                className={activeTab === 'settings' ? 'active-link' : ''}
                                                onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }}
                                            >
                                                My settings
                                            </a>
                                        </li>
                                        {/* <li>
                                        <a
                                            href="#cards"
                                            className={activeTab === 'cards' ? 'active-link' : ''}
                                            onClick={(e) => { e.preventDefault(); setActiveTab('cards'); }}
                                        >
                                            Saved Cards
                                        </a>
                                    </li> */}
                                        <li>
                                            <a
                                                href="#coupons"
                                                className={activeTab === 'coupons' ? 'active-link' : ''}
                                                onClick={(e) => { e.preventDefault(); setActiveTab('coupons'); }}
                                            >
                                                Coupons
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#notifications"
                                                className={activeTab === 'notifications' ? 'active-link' : ''}
                                                onClick={(e) => { e.preventDefault(); setActiveTab('notifications'); }}
                                            >
                                                Notifications
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        )}

                        {/* Main Content */}
                        <main className="account-content" style={activeTab === 'cancel-order' ? { margin: '0 auto', maxWidth: '800px' } : {}}>
                            {renderContent()}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyAccount;
