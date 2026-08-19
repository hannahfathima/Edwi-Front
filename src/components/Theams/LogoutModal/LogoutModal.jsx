import React from 'react';
import './LogoutModal.scss';
import { FiX, FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';

const LogoutModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    if (!isOpen) return null;

    const handleConfirm = () => {
        dispatch(logout());
        onClose();
    };

    return (
        <div className="logout-modal-overlay" onClick={onClose}>
            <div className="logout-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="logout-modal__close" onClick={onClose} aria-label="Close modal">
                    <FiX />
                </button>

                <div className="logout-modal__icon-wrapper">
                    <div className="logout-modal__icon-bg">
                        <FiLogOut className="logout-modal__icon" />
                    </div>
                </div>

                <div className="logout-modal__header">
                    <h2>Leaving so soon?</h2>
                    <p>Are you sure you want to log out of your Edhwi account? You'll need to login again to access your cart and wishlist.</p>
                </div>

                <div className="logout-modal__actions">
                    <button className="logout-btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="logout-btn-confirm" onClick={handleConfirm}>
                        Yes, Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
