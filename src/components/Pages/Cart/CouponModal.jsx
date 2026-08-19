import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { fetchCoupons } from '../../../redux/slices/couponSlice';
import { applyCoupon, calculateTotals } from '../../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import './CouponModal.scss';
import BaseUrl from '../../../../BaseUrl';

const CouponModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [manualCode, setManualCode] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    
    const { items: coupons, status, error } = useSelector(state => state.coupons);
    const { rates: shippingRates } = useSelector((state) => state.shipping);

    useEffect(() => {
        if (isOpen && status === 'idle') {
            dispatch(fetchCoupons());
        }
    }, [isOpen, status, dispatch]);

    const handleApply = () => {
        if (!selectedCoupon) {
            toast.error("Please select a coupon first");
            return;
        }
        
        // Find the full coupon object
        const fullCoupon = coupons.find(c => (c.couponId || c.id || c.code) === selectedCoupon);
        
        if (fullCoupon) {
            dispatch(applyCoupon(fullCoupon));
            dispatch(calculateTotals(shippingRates));
            toast.success(`Coupon applied successfully!`);
            onClose();
        } else {
            toast.error("Could not find coupon details. Please type it in the check box above.");
        }
    };

    const handleManualCheck = async () => {
        if (!manualCode.trim()) {
            toast.error("Please enter a coupon code");
            return;
        }

        setIsChecking(true);
        try {
            const response = await axios.get(`${BaseUrl}/coupons/verify/${manualCode.trim()}`);
            
            if (response.data.success && response.data.coupon) {
                const coupon = response.data.coupon;
                dispatch(applyCoupon(coupon));
                dispatch(calculateTotals(shippingRates));
                toast.success(`Coupon '${coupon.code}' applied successfully!`);
                setManualCode('');
                onClose();
            } else {
                toast.error(response.data.message || "Invalid coupon code");
            }
        } catch (error) {
            console.error("Error verifying coupon:", error);
            const errorMsg = error.response?.data?.message || "Invalid or expired coupon code";
            toast.error(errorMsg);
        } finally {
            setIsChecking(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="coupon-modal-overlay">
            <div className="coupon-modal-content">
                <div className="modal-header">
                    <h2>Apply coupons</h2>
                    <button className="close-btn" onClick={onClose}>
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="coupon-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Enter coupon code" 
                            value={manualCode}
                            onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === 'Enter' && handleManualCheck()}
                        />
                        <span 
                            className="check-text" 
                            onClick={handleManualCheck}
                            style={{ opacity: isChecking ? 0.5 : 1, cursor: isChecking ? 'not-allowed' : 'pointer' }}
                        >
                            {isChecking ? "Checking" : "Check"}
                        </span>
                    </div>

                    <div className="unlock-heading">Unlock coupon</div>

                    <div className="coupons-list">
                        {status === 'loading' && <p style={{fontSize: '14px', color: '#666', padding: '10px 0'}}>Loading coupons...</p>}
                        {status === 'failed' && <p style={{fontSize: '14px', color: '#e74c3c', padding: '10px 0'}}>Failed to load coupons</p>}
                        {status === 'succeeded' && coupons.filter(c => c.active !== false).length === 0 && (
                            <p style={{fontSize: '14px', color: '#666', padding: '10px 0'}}>No coupons available.</p>
                        )}
                        
                        {status === 'succeeded' && coupons.filter(c => c.active !== false).map((coupon, idx) => {
                            // Safely extract properties based on the schema
                            const id = coupon.couponId || coupon.id || coupon.code;
                            const code = coupon.code || 'UNKNOWN';
                            const discountVal = coupon.discountValue || 0;
                            const discountType = coupon.discountType || 'PERCENTAGE';
                            const isPercentage = discountType === 'PERCENTAGE' || discountType === 'percentage' || String(coupon.discount).includes('%');
                            
                            const saveText = isPercentage 
                                ? `Save ${discountVal}%` 
                                : `Save ₹${discountVal.toFixed(2)}`;
                                
                            let description = coupon.description;
                            if (!description) {
                                description = isPercentage 
                                    ? `${discountVal}% off on your purchase` 
                                    : `Flat ₹${discountVal} off on your purchase`;
                            }
                            
                            return (
                                <React.Fragment key={id}>
                                    <div className="coupon-item">
                                        <input 
                                            type="checkbox" 
                                            className="coupon-checkbox" 
                                            checked={selectedCoupon === id}
                                            onChange={() => setSelectedCoupon(selectedCoupon === id ? null : id)}
                                        />
                                        <div className="coupon-details">
                                            <div className="coupon-code-box">
                                                {code}
                                            </div>
                                            <div className="coupon-save">{saveText}</div>
                                            <div className="coupon-desc">{description}</div>
                                            {/* Not rendering expires on since the schema doesn't have it by default */}
                                        </div>
                                    </div>
                                    <div className="coupon-divider"></div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="apply-coupon-btn" onClick={handleApply}>Apply</button>
                </div>
            </div>
        </div>
    );
};

export default CouponModal;
