import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMobileOtp, sendEmailOtp, loginWithGoogle, clearLoginError } from '../../../redux/slices/authSlice';
import './LoginModal.scss';
import { FiX } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';

const LoginModal = ({ isOpen, onClose, onOtpRequest, onSignupRequest }) => {
    const [loginId, setLoginId] = useState('');
    const [localError, setLocalError] = useState('');

    const dispatch = useDispatch();
    const { loading, loginError } = useSelector((state) => state.auth);

    const resetForm = () => {
        setLoginId('');
        setLocalError('');
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            dispatch(clearLoginError());
            resetForm();
        } else {
            document.body.style.overflow = 'unset';
            dispatch(clearLoginError());
            resetForm();
        }

        return () => {
            document.body.style.overflow = 'unset';
            dispatch(clearLoginError());
        };
    }, [isOpen, dispatch]);

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const resultAction = await dispatch(loginWithGoogle(tokenResponse.access_token));
            if (resultAction.payload?.success) {
                resetForm();
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

        const trimmedId = loginId.trim();
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedId);
        const isMobile = /^\d{10}$/.test(trimmedId);

        if (!isEmail && !isMobile) {
            setLocalError('Please enter a valid 10-digit mobile number or email address.');
            return;
        }

        const action = isEmail ? sendEmailOtp(trimmedId) : sendMobileOtp(trimmedId);
        const resultAction = await dispatch(action);

        if (resultAction.payload?.success) {
            resetForm();
            onOtpRequest({ type: isEmail ? 'email' : 'mobile', value: trimmedId });
        }
    };

    const handleSignupClick = () => {
        const trimmedId = loginId.trim();
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedId);
        // Only forward if it's an email address. Never forward a mobile number into the email address field.
        const emailToPass = isEmail ? trimmedId : '';
        resetForm();
        onSignupRequest(emailToPass);
    };

    return (
        <div className="login-modal-overlay" onClick={handleClose}>
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
                    <button className="login-modal__close" onClick={handleClose} aria-label="Close modal">
                        <FiX />
                    </button>

                    <div className="login-modal__header">
                        <h2><span className="text-blue">Welcome</span> back!</h2>
                        <p>Your account for everything Edhwi</p>
                    </div>

                    <form className="login-modal__form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="loginId">Enter Mobile Number*</label>
                            <input
                                type="text"
                                id="loginId"
                                value={loginId}
                                onChange={(e) => {
                                    setLoginId(e.target.value);
                                    setLocalError('');
                                    if (loginError) dispatch(clearLoginError());
                                }}
                                placeholder="Mobile Number"
                                className="form-control"
                                autoComplete="off"
                                required
                            />
                        </div>

                        {(loginError || localError) && (
                            <div style={{ color: "red", fontSize: "12px", marginBottom: "15px" }}>
                                {loginError || localError}
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
                        <button className="social-btn facebook-btn" onClick={handleSignupClick} style={{ backgroundColor: "#333", color: "white", borderColor: "#333" }} type="button">
                            Sign up manually
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
