import React from 'react';
import './PaymentSummary.scss';

const PaymentSummary = ({
    subtotal,
    totalMrp,
    discountOnMrp,
    couponSavings,
    applicableGst,
    delivery,
    total,
    buttonText = 'Continue',
    onButtonClick,
    showButton = true,
    className = '',
    disabled = false
}) => {
    const totalSavings = (discountOnMrp || 0) + (couponSavings || 0);

    return (
        <div className={`payment-summary-wrapper ${className}`}>
            <div className="payment-summary-card">
                <h3 className="summary-title">Payment summary</h3>

                <div className="summary-details">
                    <div className="summary-row">
                        <span className="row-label">Subtotal</span>
                        <span className="row-value">₹{((subtotal || 0) - (applicableGst || 0)).toFixed(2)}</span>
                    </div>

                    {discountOnMrp > 0 && (
                        <div className="summary-row">
                            <span className="row-label">Discount on MRP</span>
                            <span className="row-value discount-value">-₹{discountOnMrp.toFixed(2)}</span>
                        </div>
                    )}

                    {couponSavings > 0 && (
                        <div className="summary-row">
                            <span className="row-label">Coupon savings</span>
                            <span className="row-value discount-value">-₹{couponSavings.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="summary-row">
                        <span className="row-label">Applicable GST</span>
                        <span className="row-value">
                            ₹{(applicableGst || 0).toFixed(2)}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span className="row-label">Delivery</span>
                        <span className="row-value">{delivery === 0 ? 'Free' : `₹${delivery.toFixed(2)}`}</span>
                    </div>
                </div>

                <div className="summary-total-row">
                    <span className="total-label">Total</span>
                    <span className="total-value">₹{total.toFixed(2)}</span>
                </div>

                {totalSavings > 0 && (
                    <div className="total-savings-message" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#eafaf1', borderRadius: '4px', borderLeft: '4px solid #3dae4a', fontSize: '13px', color: '#1a5d2e' }}>
                        You're saving ₹{totalSavings.toFixed(2)} on this order!
                    </div>
                )}
            </div>

            {showButton && (
                <button className="summary-action-button" onClick={onButtonClick} disabled={disabled}>
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default PaymentSummary;
