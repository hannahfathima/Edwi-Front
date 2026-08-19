import React, { useState, useEffect } from 'react';
import './CartNavbar.scss';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { BiHomeAlt } from 'react-icons/bi';
import { BsCreditCard } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CartNavbar = ({ currentStep = 'cart' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close offcanvas when step changes
  useEffect(() => {
    setIsOpen(false);
  }, [currentStep]);

  // Disable scroll when offcanvas is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const steps = [
    { id: 'cart', label: 'Cart', icon: <FiShoppingCart /> },
    { id: 'address', label: 'Address', icon: <BiHomeAlt /> },
    { id: 'payment', label: 'Payment', icon: <BsCreditCard /> },
  ];

  const getStepIndex = (stepId) => steps.findIndex(s => s.id === stepId);
  const currentIndex = getStepIndex(currentStep);

  return (
    <nav className="cart-navbar">
      {/* Desktop & Mobile Shared: Logo */}
      <div className="cart-navbar-left">
        <div className="logo-placeholder">
         <Link to="/">
           <img src="/Images/Edhwi-logo.svg" alt="Edhwi Logo"/>
         </Link>
        </div>
      </div>

      {/* Desktop Stepper */}
      <div className="cart-navbar-center desktop-only">
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
              
              {index < steps.length - 1 && (
                <div className="stepper-line"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Desktop Security Badge */}
      <div className="cart-navbar-right desktop-only">
        <div className="security-badge">
          <MdVerified className="security-icon" />
          <div className="security-text">
            <strong>100% Secure payments,</strong>
            <span>Shop with confidence!</span>
          </div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="mobile-toggle mobile-only">
        <button className="toggle-btn" onClick={() => setIsOpen(true)}>
          <div className={`stepper-icon-mini step-${currentStep}`}>
             {steps[currentIndex].icon}
          </div>
          <FiMenu className="menu-icon" />
        </button>
      </div>

      {/* Offcanvas Overlay */}
      {isOpen && <div className="offcanvas-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Offcanvas Drawer */}
      <div className={`cart-offcanvas ${isOpen ? 'open' : ''}`}>
        <div className="offcanvas-header">
          <div className="logo-placeholder">
            <img src="/Images/Edhwi-logo.svg" alt="Edhwi Logo" />
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="offcanvas-body">
          <div className="stepper-vertical">
            {steps.map((step, index) => {
              const isActive = index === currentIndex;
              const isPast = index < currentIndex;
              
              return (
                <div key={step.id} className={`stepper-vertical-item ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}>
                  <div className="step-icon-wrapper">
                    {step.icon}
                  </div>
                  <div className="step-content">
                    <span className="step-label">{step.label}</span>
                    <span className="step-status">{isActive ? 'Current Step' : isPast ? 'Completed' : 'Upcoming'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="security-badge-vertical">
            <MdVerified className="security-icon" />
            <div className="security-text">
              <strong>100% Secure payments</strong>
              <span>Shop with confidence!</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CartNavbar;
