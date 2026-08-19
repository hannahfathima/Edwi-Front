import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMobileOtp, sendEmailOtp, loginWithGoogle } from '../../../redux/slices/authSlice';
import './LoginModal.scss';
import { FiX } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';

const LoginModal = ({ isOpen, onClose, onOtpRequest, onSignupRequest }) => {
    const [loginId, setLoginId] = useState('');
    const [localError, setLocalError] = useState('');

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const resultAction = await dispatch(loginWithGoogle(tokenResponse.access_token));
            if (resultAction.payload?.success) {
                onClose();
            }
        },
        onError: (error) => {
            console.error('Google Login Failed:', error);
            setLocalError('Google login failed. Please try again.');
        },
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (!loginId.trim()) {
            setLocalError('Please enter a valid email or mobile number.');
            return;
        }

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginId);
        const isMobile = /^\d{10}$/.test(loginId);

        if (!isEmail && !isMobile) {
            setLocalError('Please enter a valid 10-digit mobile number or email address.');
            return;
        }

        const action = isEmail ? sendEmailOtp(loginId) : sendMobileOtp(loginId);
        const resultAction = await dispatch(action);

        if (resultAction.payload?.success) {
            onOtpRequest({ type: isEmail ? 'email' : 'mobile', value: loginId });
        }
    };

    return (
        <div className="login-modal-overlay" onClick={onClose}>
            <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Left Side: Image */}
                <div className="login-modal__image-wrapper">
                    <img
                        src="/Images/Login-modal-IM.svg"
                        alt="Edhwi Coconuts"
                        className="login-modal__image"
                    />
                </div>

                {/* Right Side: Form */}
                <div className="login-modal__form-wrapper">
                    <button className="login-modal__close" onClick={onClose} aria-label="Close modal">
                        <FiX />
                    </button>

                    <div className="login-modal__header">
                        <h2><span className="text-blue">Welcome</span> back!</h2>
                        <p>Your account for everything Edhwi</p>
                    </div>

                    <form className="login-modal__form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="loginId">Enter Mobile Number / Email*</label>
                            <input
                                type="text"
                                id="loginId"
                                value={loginId}
                                onChange={(e) => { setLoginId(e.target.value); setLocalError(''); }}
                                placeholder="Email or Mobile"
                                className="form-control"
                                required
                            />
                        </div>

                        {(error || localError) && (
                            <div style={{ color: "red", fontSize: "12px", marginBottom: "15px" }}>
                                {error || localError}
                            </div>
                        )}

                        <button type="submit" className="login-modal__submit-btn" disabled={loading}>
                            {loading ? 'Sending OTP...' : 'Continue'}
                        </button>
                    </form>

                    <div className="login-modal__divider">
                        <span>OR</span>
                    </div>

                    <div className="login-modal__social-logins">
                        <button className="social-btn google-btn" onClick={() => login()} type="button">
                            <FcGoogle size={20} className="social-icon" />
                            Continue with Google
                        </button>
                        <button className="social-btn facebook-btn" onClick={() => onSignupRequest(loginId)} style={{ backgroundColor: "#333", color: "white", borderColor: "#333" }} type="button">
                            Sign up manually
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
