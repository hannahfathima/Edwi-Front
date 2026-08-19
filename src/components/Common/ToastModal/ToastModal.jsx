import React, { useEffect } from 'react';
import './ToastModal.scss';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ToastModal = ({ message, isOpen, onClose, type = 'success', duration = 3000 }) => {
    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setTimeout(() => {
                onClose();
            }, duration);
        }
        return () => clearTimeout(timer);
    }, [isOpen, onClose, duration]);

    if (!isOpen) return null;

    return (
        <div className={`toast-modal-container ${isOpen ? 'show' : ''}`}>
            <div className={`toast-modal ${type}`}>
                <div className="toast-icon">
                    {type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
                </div>
                <div className="toast-content">
                    <p className="toast-message">{message}</p>
                </div>
                <button className="toast-close-btn" onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ToastModal;
