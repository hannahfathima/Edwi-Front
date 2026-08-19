import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupWithEmail } from '../../../redux/slices/authSlice';
import './LoginModal.scss'; // Assuming we re-use same modal styles
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';

const SignupModal = ({ isOpen, onClose, onSuccess, initialEmail = '' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: initialEmail,
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        subscribeToEmails: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localError, setLocalError] = useState('');

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        setLocalError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (formData.password !== formData.confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }

        const { confirmPassword, ...signupData } = formData;
        const resultAction = await dispatch(signupWithEmail(signupData));

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

                    <div className="login-modal__header">
                        <h2><span className="text-blue">Welcome</span> to Edhwi</h2>
                        <p>Your account for everything Edhwi!</p>
                    </div>

                    <form className="login-modal__form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
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

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
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

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Confirm password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                >
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "4px" }}>
                            <input
                                type="checkbox"
                                id="agreeToTerms"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                style={{ transform: "scale(1.1)", marginTop: "2px", cursor: "pointer" }}
                                required
                            />
                            <label htmlFor="agreeToTerms" style={{ fontSize: "12px", color: "#555", cursor: "pointer", lineHeight: "1.3" }}>
                                By signing up, I agree to <span style={{ color: "#1877F2" }}>Terms and Conditions</span>
                            </label>
                        </div>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                            <input
                                type="checkbox"
                                id="subscribeToEmails"
                                name="subscribeToEmails"
                                checked={formData.subscribeToEmails}
                                onChange={handleChange}
                                style={{ transform: "scale(1.1)", marginTop: "2px", cursor: "pointer" }}
                            />
                            <label htmlFor="subscribeToEmails" style={{ fontSize: "12px", color: "#555", cursor: "pointer", lineHeight: "1.3" }}>
                                I agree to subscribe to receive Edhwi emails.
                            </label>
                        </div>

                        {(error || localError) && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                                {error || localError}
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
