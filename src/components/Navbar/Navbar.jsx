import React from 'react';
import './Navbar.scss';
import { FiHeart, FiShoppingBag, FiUser, FiMenu } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setLoginModalOpen } from '../../redux/slices/authSlice';
import { fetchCart } from '../../redux/slices/cartSlice';
import { fetchWishlist } from '../../redux/slices/wishlistSlice';
import LoginModal from '../Theams/LoginModal/LoginModal';
import OtpVerificationModal from '../Theams/LoginModal/OtpVerificationModal';
import SignupModal from '../Theams/LoginModal/SignupModal';
import LogoutModal from '../Theams/LogoutModal/LogoutModal';

const Navbar = ({ setCurrentPage }) => {

    // Login Modal State
    const [isOtpModalOpen, setIsOtpModalOpen] = React.useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = React.useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
    const [otpSessionData, setOtpSessionData] = React.useState(null);

    const dispatch = useDispatch();
    const { user, token, isLoginModalOpen } = useSelector((state) => state.auth);
    const { items: cartItems } = useSelector((state) => state.cart);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    React.useEffect(() => {
        if (token) {
            dispatch(fetchCart());
            dispatch(fetchWishlist());
        }
    }, [dispatch, token]);

    // 🔥 NEW: Get current route
    const location = useLocation();

    // 🔥 NEW: Check if current page is home
    const isHome = location.pathname === "/";

    const handleNavClick = () => {
        const collapseElement = document.getElementById('navbarSupportedContent');
        if (collapseElement && window.bootstrap) {
            const bsCollapse = window.bootstrap.Collapse.getInstance(collapseElement);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
        document.body.classList.remove('menu-open');
        window.scrollTo(0, 0);
    };

    const handleMenuOpen = () => {
        document.body.classList.add('menu-open');
    };

    const handleMenuClose = () => {
        document.body.classList.remove('menu-open');
    };

    // 🔥 NEW: Check active route
    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        if (path === '/our-products') return location.pathname === '/our-products' || location.pathname.startsWith('/Product-page');
        if (path === '/blogs') return location.pathname === '/blogs' || location.pathname.startsWith('/blogs-inner');
        return location.pathname === path;
    };

    const isWishlistActive = location.pathname === '/my-account' && location.state?.activeTab === 'wishlist';
    const isCartActive = location.pathname === '/cart';
    const isAccountActive = location.pathname === '/my-account' && location.state?.activeTab !== 'wishlist';

    const getLinkStyle = (path) => {
        const active = isActive(path);
        if (active) {
            return { color: isHome ? "#ffc107" : "#13368E", fontWeight: 700 };
        }
        return { color: isHome ? "#fff" : "#000" };
    };

    return (
        <nav className={`navbar navbar-expand-lg ${isHome ? 'navbar-dark-mode' : 'navbar-light-mode'}`}>
            <div className="container-fluid px-0" style={{ maxWidth: '1440px', margin: '0 auto' }}>

                {/* Logo Section */}
                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center"
                    style={{ cursor: "pointer", width: "55px", marginRight: '2rem' }}
                >
                    <img src="/Images/Edhwi-logo.svg" alt="edhwi" style={{ width: '100%', height: 'auto' }} />

                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler border-0 shadow-none px-0"
                    type="button"
                    onClick={handleMenuOpen}
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <FiMenu size={28} color={isHome ? "#fff" : "#000"} />
                </button>

                {/* Collapsible Content */}
                <div className="collapse navbar-collapse custom-mobile-menu" id="navbarSupportedContent">

                    {/* Mobile Only Header with Wave & Close */}
                    <div className="mobile-menu-header d-lg-none position-absolute top-0 start-0 w-100">
                        <svg className="mobile-menu-wave" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
                            <path d="M0 0H1440V60C1440 60 1140 -20 720 30C300 80 0 60 0 60V0Z" fill="#13368E" />
                            <path opacity="0.5" d="M0 20H1440V80C1440 80 1140 0 720 50C300 100 0 80 0 80V20Z" fill="#184BC6" />
                        </svg>
                        <button
                            className="btn-close btn-close-white position-absolute"
                            style={{ top: '20px', right: '20px', zIndex: 10, filter: 'invert(1) grayscale(100%) brightness(200%)' }}
                            type="button"
                            onClick={handleMenuClose}
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                        ></button>
                    </div>

                    {/* Mobile Only Logo */}
                    <div className="mobile-menu-logo d-lg-none text-center position-relative mt-5 pt-4 mb-4" style={{ zIndex: 10 }}>
                        <img src="/Images/Edhwi-logo.svg" alt="edhwi" style={{ width: '90px', height: 'auto' }} />
                    </div>

                    {/* Center Menu */}
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 navbar__nav-items align-items-center align-items-lg-center" style={{ zIndex: 10 }}>
                        <li className="nav-item navbar__nav-item">
                            <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/" style={getLinkStyle('/')} onClick={handleNavClick}>Home</Link>
                        </li>

                        <li className="nav-item navbar__nav-item">
                            <Link className={`nav-link ${isActive('/contact-us') ? 'active' : ''}`} to="/contact-us" style={getLinkStyle('/contact-us')} onClick={handleNavClick}>Contact Us</Link>
                        </li>

                        <li className="nav-item navbar__nav-item">
                            <Link className={`nav-link ${isActive('/our-products') ? 'active' : ''}`} to="/our-products" style={getLinkStyle('/our-products')} onClick={handleNavClick}>Our Products</Link>
                        </li>

                        <li className="nav-item navbar__nav-item">
                            <Link className={`nav-link ${isActive('/gallery') ? 'active' : ''}`} to="/gallery" style={getLinkStyle('/gallery')} onClick={handleNavClick}>Gallery</Link>
                        </li>

                        <li className="nav-item navbar__nav-item">
                            <Link
                                className={`nav-link ${isActive('/about-us') ? 'active' : ''}`}
                                to="/about-us"
                                style={getLinkStyle('/about-us')}
                                onClick={handleNavClick}
                            >
                                About Us
                            </Link>
                        </li>
                    </ul>

                    <div className="navbar__divider d-none d-lg-block"></div>

                    {/* Right Actions */}
                    <div className="d-flex align-items-center justify-content-center flex-column flex-lg-row gap-4 mt-lg-0 navbar__actions" style={{ zIndex: 10 }}>

                        <Link
                            to={token || user ? "/my-account" : "#"}
                            state={{ activeTab: 'wishlist' }}
                            className={`navbar__action-icon ${isWishlistActive ? 'active' : ''}`}
                            style={{ textDecoration: "none", color: isWishlistActive ? (isHome ? '#ffc107' : '#13368e') : (isHome ? "#fff" : "#000") }}
                            onClick={(e) => {
                                if (!token && !user) {
                                    e.preventDefault();
                                    dispatch(setLoginModalOpen(true));
                                } else {
                                    handleNavClick();
                                }
                            }}
                        >
                            <FiHeart
                                size={22}
                                color={isWishlistActive ? (isHome ? '#ffc107' : '#13368e') : (isHome ? "#fff" : "#000")}
                                fill={isWishlistActive ? (isHome ? '#ffc107' : '#13368e') : 'none'}
                                className="d-none d-lg-block px-0"
                            />
                            <span
                                className="mobile-nav-text"
                            >
                                Wishlist
                            </span>
                        </Link>

                        <Link
                            to={token || user ? "/cart" : "#"}
                            className={`navbar__action-icon navbar__cart-wrapper ${isCartActive ? 'active' : ''}`}
                            style={{ textDecoration: "none", color: isCartActive ? (isHome ? '#ffc107' : '#13368e') : (isHome ? "#fff" : "#000") }}
                            onClick={(e) => {
                                if (!token && !user) {
                                    e.preventDefault();
                                    dispatch(setLoginModalOpen(true));
                                } else {
                                    handleNavClick();
                                }
                            }}
                        >
                            <div className="position-relative d-none d-lg-flex align-items-center justify-content-center">
                                <FiShoppingBag size={22} color={isCartActive ? (isHome ? '#ffc107' : '#13368e') : (isHome ? "#fff" : "#000")} />
                                <span className="navbar__cart-badge">{cartItems?.length || 0}</span>
                            </div>
                            <span className="mobile-nav-text">Cart</span>
                        </Link>

                        <Link
                            to={token || user ? "/my-account" : "#"}
                            className={`navbar__action-icon ${isAccountActive ? 'active' : ''}`}
                            style={{ textDecoration: "none", color: isAccountActive ? (isHome ? '#ffc107' : '#13368e') : (isHome ? "#fff" : "#000") }}
                            onClick={(e) => {
                                if (!token && !user) {
                                    e.preventDefault();
                                    dispatch(setLoginModalOpen(true));
                                } else {
                                    handleNavClick();
                                }
                            }}
                        >
                            <FiUser size={22} color={isAccountActive ? (isHome ? '#ffc107' : '#13368e') : (isHome ? "#fff" : "#000")} className="d-none d-lg-block" />
                            <span className="mobile-nav-text">Account</span>
                        </Link>

                        {token || user ? (
                            <button
                                className="navbar__contact-btn w-100 w-lg-auto mt-3 mt-lg-0 ms-lg-3 d-none d-lg-block"
                                onClick={() => setIsLogoutModalOpen(true)}
                                style={{ backgroundColor: "#dc3545", color: "white", borderColor: "#dc3545" }}
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                className="navbar__contact-btn w-100 w-lg-auto mt-3 mt-lg-0 ms-lg-3 d-none d-lg-block"
                                onClick={() => dispatch(setLoginModalOpen(true))}
                            >
                                Login/Register
                            </button>
                        )}

                        {token || user ? (
                            <button
                                className="navbar__login-btn w-100 d-lg-none mt-4 mx-auto"
                                style={{ maxWidth: '250px', backgroundColor: "#dc3545", color: "white", borderColor: "#dc3545" }}
                                data-bs-toggle="collapse"
                                data-bs-target=".navbar-collapse.show"
                                onClick={() => {
                                    setIsLogoutModalOpen(true);
                                    handleMenuClose();
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                className="navbar__login-btn w-100 d-lg-none mt-4 mx-auto"
                                style={{ maxWidth: '250px' }}
                                data-bs-toggle="collapse"
                                data-bs-target=".navbar-collapse.show"
                                onClick={() => {
                                    dispatch(setLoginModalOpen(true));
                                    handleMenuClose();
                                }}
                            >
                                Login/ Register
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => dispatch(setLoginModalOpen(false))}
                onOtpRequest={(data) => {
                    setOtpSessionData(data);
                    dispatch(setLoginModalOpen(false));
                    setIsOtpModalOpen(true);
                }}
                onSignupRequest={(email) => {
                    setOtpSessionData({ value: email });
                    dispatch(setLoginModalOpen(false));
                    setIsSignupModalOpen(true);
                }}
            />

            <OtpVerificationModal
                isOpen={isOtpModalOpen}
                onClose={() => setIsOtpModalOpen(false)}
                formData={otpSessionData}
                onSuccess={(payload) => {
                    setIsOtpModalOpen(false);
                }}
            />

            <SignupModal
                isOpen={isSignupModalOpen}
                onClose={() => setIsSignupModalOpen(false)}
                initialEmail={otpSessionData?.value || ''}
                onSuccess={() => setIsSignupModalOpen(false)}
            />

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
            />
        </nav>
    );
};

export default Navbar;