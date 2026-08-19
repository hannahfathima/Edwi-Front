import React from 'react';
import './CartNavbar.scss';
import { FiShoppingCart } from 'react-icons/fi';
import { BiHomeAlt } from 'react-icons/bi';
import { BsCreditCard } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';

const CartNavbar = ({ currentStep = 'cart' }) => {
    // currentStep can be 'cart', 'address', or 'payment'

    const steps = [
        { id: 'cart', label: 'Cart', icon: <FiShoppingCart /> },
        { id: 'address', label: 'Address', icon: <BiHomeAlt /> },
        { id: 'payment', label: 'Payment', icon: <BsCreditCard /> },
    ];

    const getStepIndex = (stepId) => steps.findIndex(s => s.id === stepId);
    const currentIndex = getStepIndex(currentStep);

    return (
        <nav className="cart-navbar">
            <div className="cart-navbar-left">
                {/* You can add your actual logo image here */}
                <div className="logo-placeholder">
                    {/* Example: <img src="/Edhwi-logo.svg" alt="Edhwi Logo" /> */}
                    <span style={{ fontWeight: 'bold', fontSize: '1.75rem', color: '#135cdd' }}>edhwi</span>
                </div>
            </div>

            <div className="cart-navbar-center">
                {steps.map((step, index) => {
                    const isActive = index === currentIndex;

                    return (
                        <React.Fragment key={step.id}>
                            <div className={`stepper-item ${isActive ? 'active' : ''}`}>
                                <div className="step-icon-wrapper">
                                    {step.icon}
                                </div>
                                <span className="step-label">{step.label}</span>
                            </div>

                            {/* Add dotted connecting line between steps */}
                            {index < steps.length - 1 && (
                                <div className="stepper-line"></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="cart-navbar-right">
                <div className="security-badge">
                    <MdVerified className="security-icon" />
                    <div className="security-text">
                        <strong>100% Secure payments,</strong>
                        <span>Shop with confidence!</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default CartNavbar;
