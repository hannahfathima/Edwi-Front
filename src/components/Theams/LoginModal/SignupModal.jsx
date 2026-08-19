import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupWithEmail } from '../../../redux/slices/authSlice';
import './LoginModal.scss'; // Assuming we re-use same modal styles
import { FiX } from 'react-icons/fi';

const SignupModal = ({ isOpen, onClose, onSuccess, initialEmail = '' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: initialEmail,
        password: '',
        agreeToTerms: false,
        subscribeToEmails: false
    });

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resultAction = await dispatch(signupWithEmail(formData));

        if (resultAction.payload?.success) {
            onSuccess(); // Close modal on success
        }
    };

    return (
        <div className="login-modal-overlay" onClick={onClose}>
            <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="login-modal__image-wrapper">
                    <img src="/Images/Login-modal-IM.svg" alt="Edhwi Coconuts" className="login-modal__image" />
                </div>

                <div className="login-modal__form-wrapper">
                    <button className="login-modal__close" onClick={onClose} aria-label="Close modal">
                        <FiX />
                    </button>

                    <div className="login-modal__header" style={{ marginBottom: "1.5rem" }}>
                        <h2><span className="text-blue">Welcome</span> to Edhwi</h2>
                        <p style={{ marginTop: "10px" }}>Your account for everything Edhwi!</p>
                    </div>

                    <form className="login-modal__form" onSubmit={handleSubmit} style={{ gap: "10px" }}>
                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <label htmlFor="name" style={{ fontSize: "14px", fontWeight: "500", color: "#333", marginBottom: "8px", display: "block" }}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <label htmlFor="email" style={{ fontSize: "14px", fontWeight: "500", color: "#333", marginBottom: "8px", display: "block" }}>Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: "20px" }}>
                            <label htmlFor="password" style={{ fontSize: "14px", fontWeight: "500", color: "#333", marginBottom: "8px", display: "block" }}>Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                            <input
                                type="checkbox"
                                id="agreeToTerms"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                style={{ transform: "scale(1.2)", marginTop: "2px" }}
                                required
                            />
                            <label htmlFor="agreeToTerms" style={{ fontSize: "12px", color: "#555" }}>
                                By signing up, I agree to <span style={{ color: "#1877F2" }}>Terms and Conditions</span>
                            </label>
                        </div>

                        <div style={{ marginBottom: "20px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                            <input
                                type="checkbox"
                                id="subscribeToEmails"
                                name="subscribeToEmails"
                                checked={formData.subscribeToEmails}
                                onChange={handleChange}
                                style={{ transform: "scale(1.2)", marginTop: "2px" }}
                            />
                            <label htmlFor="subscribeToEmails" style={{ fontSize: "12px", color: "#555" }}>
                                I agree to subscribe to receive Edhwi emails.
                            </label>
                        </div>

                        {error && (
                            <div style={{ color: "red", fontSize: "12px", marginBottom: "15px" }}>
                                {error}
                            </div>
                        )}

                        <button type="submit" className="login-modal__submit-btn" disabled={loading}>
                            {loading ? 'Creating account...' : 'Continue'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupModal;
