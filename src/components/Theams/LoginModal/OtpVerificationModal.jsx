import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyMobileOtp, verifyEmailOtp } from '../../../redux/slices/authSlice';
import './LoginModal.scss'; // Assuming we re-use same modal styles
import { FiX } from 'react-icons/fi';

const OtpVerificationModal = ({ isOpen, onClose, onSuccess, formData }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [localError, setLocalError] = useState('');
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    if (!isOpen) return null;

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setLocalError('');

        // Move to next input
        if (value && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');

        if (otpValue.length !== 4) {
            setLocalError('Please enter a 4-digit OTP');
            return;
        }

        const action = formData.type === 'email'
            ? verifyEmailOtp({ email: formData.value, otp: otpValue })
            : verifyMobileOtp({ mobileNumber: formData.value, otp: otpValue });

        const resultAction = await dispatch(action);

        if (resultAction.payload?.success) {
            onSuccess(resultAction.payload); // Could tell the parent to close and open Signup if isNewUser
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

                    <div className="login-modal__header" style={{ marginBottom: "2rem" }}>
                        <h2><span className="text-blue">Glad</span> you're back!</h2>
                        <p style={{ marginTop: "10px" }}>Verify with OTP sent to {formData?.value}</p>
                    </div>

                    <form className="login-modal__form" onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                            <label style={{ fontSize: "14px", fontWeight: "500", color: "#333", marginBottom: "8px", display: "block" }}>Enter OTP</label>
                            <div style={{ display: "flex", gap: "10px" }}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            textAlign: "center",
                                            fontSize: "20px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px"
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {(error || localError) && (
                            <div style={{ color: "red", fontSize: "12px", marginBottom: "15px" }}>
                                {error || localError}
                            </div>
                        )}

                        <button type="submit" className="login-modal__submit-btn" disabled={loading} style={{ marginTop: "1rem" }}>
                            {loading ? 'Verifying...' : 'Continue'}
                        </button>
                    </form>

                    <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
                        Didn't get a text? <span style={{ color: "#1877F2", cursor: "pointer", fontWeight: "500" }}>Resend OTP</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationModal;
