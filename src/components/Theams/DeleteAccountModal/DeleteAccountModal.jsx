import React from 'react';
import './DeleteAccountModal.scss';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';

const DeleteAccountModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    if (!isOpen) return null;

    const handleConfirm = () => {
        // Delete account backend API not available, so we log the user out for now.
        dispatch(logout());
        onClose();
    };

    return (
        <div className="delete-modal-overlay" onClick={onClose}>
            <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="delete-modal__close" onClick={onClose} aria-label="Close modal">
                    <FiX />
                </button>

                <div className="delete-modal__icon-wrapper">
                    <div className="delete-modal__icon-bg">
                        <FiTrash2 className="delete-modal__icon" />
                    </div>
                </div>

                <div className="delete-modal__header">
                    <h2>Delete Account?</h2>
                    <p>Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.</p>
                </div>

                <div className="delete-modal__actions">
                    <button className="delete-btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="delete-btn-confirm" onClick={handleConfirm}>
                        Yes, Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
