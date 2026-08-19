import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses, addAddress, updateAddress, setSelectedAddressId } from '../../../redux/slices/addressSlice';
import { fetchCart, calculateTotals, removeCoupon } from '../../../redux/slices/cartSlice';
import { fetchShippingRates } from '../../../redux/slices/shippingSlice';
import { useNavigate } from 'react-router-dom';
import './Address.scss';
import PaymentSummary from '../../Common/PaymentSummary/PaymentSummary';
import { MdOutlineLocalOffer } from "react-icons/md";
import CartNavbar from '../../Common/cartNavbar/CartNavbar';
import EditAddressModal from './EditAddressModal';
import CouponModal from '../Cart/CouponModal';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Address = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { addresses, selectedAddressId, loading: addressLoading } = useSelector((state) => state.address);
    const { items: cartItems, summary, loading: cartLoading, appliedCoupon, isBuyNow } = useSelector((state) => state.cart);
    const { rates: shippingRates } = useSelector((state) => state.shipping);

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAddressData, setEditingAddressData] = useState(null);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

    useEffect(() => {
        dispatch(fetchAddresses());
        if (!isBuyNow) {
            dispatch(fetchCart());
        }
        dispatch(fetchShippingRates());
    }, [dispatch, isBuyNow]);

    useEffect(() => {
        dispatch(calculateTotals(shippingRates));
    }, [cartItems, appliedCoupon, shippingRates, dispatch]);

    useEffect(() => {
        if (!addressLoading && addresses.length > 0 && !selectedAddressId) {
            dispatch(setSelectedAddressId(addresses[0].id || addresses[0]._id));
        }
    }, [addresses, addressLoading, selectedAddressId, dispatch]);

    const handleAddNewClick = () => {
        setModalMode('add');
        setEditingAddressData(null);
        setIsEditModalOpen(true);
    };

    const handleEditClick = (address) => {
        setModalMode('edit');
        setEditingAddressData(address);
        setIsEditModalOpen(true);
    };

    return (
        <div className="address-page-container">
            <CartNavbar currentStep="address" />

            <CouponModal isOpen={isCouponModalOpen} onClose={() => setIsCouponModalOpen(false)} />

            <div className="address-content-wrapper">
                <h1 className="address-page-title">Address</h1>

                <div className="address-main-grid">
                    {/* Left Column - Addresses */}
                    <div className="address-items-section">
                        {addresses.length === 0 ? (
                            <div className="inline-address-form-container">
                                <EditAddressModal isInline={true} mode="add" />
                            </div>
                        ) : (
                            <>
                                <h3 style={{ fontSize: '16px', marginBottom: '15px', fontWeight: '500' }}>Please Select your address.</h3>
                                {addresses.map((address, index) => {
                                    const addrId = address.id || address._id || index;
                                    return (
                                        <div
                                            key={addrId}
                                            className={`address-card ${selectedAddressId === addrId ? 'selected' : ''}`}
                                            onClick={() => dispatch(setSelectedAddressId(addrId))}
                                        >
                                            <div className="address-card-header">
                                                <label className="address-radio-label">
                                                    <input
                                                        type="radio"
                                                        name="selectedAddress"
                                                        checked={selectedAddressId === addrId}
                                                        onChange={() => dispatch(setSelectedAddressId(addrId))}
                                                    />
                                                    <span className="address-name">{address.fullName}</span>
                                                </label>
                                                <span className="address-type-badge">{address.addressType === 'work' ? 'Office' : 'Home'}</span>
                                            </div>
                                            <div className="address-details">
                                                {address.addressLine1}, {address.addressLine2 ? address.addressLine2 + ', ' : ''}
                                                {address.city ? address.city + ', ' : ''}{address.state}<br />
                                                {address.country || 'India'}
                                            </div>
                                            <button className="edit-address-btn" onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(address);
                                            }}>
                                                Edit address
                                            </button>
                                        </div>
                                    )
                                })}
                                <button className="add-new-btn" onClick={handleAddNewClick}>
                                    Add new Address
                                </button>
                            </>
                        )}
                    </div>

                    {/* Right Column - Payment Summary & Coupons */}
                    <div className="address-summary-section">
                        {/* Apply Coupons Box */}
                        {appliedCoupon ? (
                            <div className="apply-coupons-card" style={{ background: '#f0f5ff', border: '1px solid #2d68f8', borderRadius: '8px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className="coupon-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <MdOutlineLocalOffer className="coupon-icon" style={{ color: '#2d68f8', fontSize: '20px' }} />
                                    <span className="coupon-label" style={{ color: '#2d68f8', fontWeight: '600', fontSize: '14px' }}>
                                        {appliedCoupon.code || appliedCoupon.couponId || 'Coupon'} Applied
                                    </span>
                                </div>
                                <button 
                                    className="apply-btn remove-btn" 
                                    onClick={() => {
                                        dispatch(removeCoupon());
                                        dispatch(calculateTotals(shippingRates));
                                        toast.info("Coupon removed");
                                    }}
                                    style={{ color: '#e74c3c', backgroundColor: 'transparent', padding: '0', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="apply-coupons-card" style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className="coupon-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <MdOutlineLocalOffer className="coupon-icon yellow" style={{ color: '#F4B41A', fontSize: '20px' }} />
                                    <span className="coupon-label" style={{ fontWeight: '500', fontSize: '14px' }}>Apply coupons</span>
                                </div>
                                <button className="apply-btn" onClick={() => setIsCouponModalOpen(true)} style={{ background: 'none', border: 'none', color: '#1a1a1a', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>Apply</button>
                            </div>
                        )}

                        {/* Payment Summary */}
                        <PaymentSummary
                            subtotal={summary.subtotal}
                            totalMrp={summary.totalMrp}
                            discountOnMrp={summary.discount}
                            couponSavings={summary.couponSavings}
                            applicableGst={summary.gst}
                            delivery={summary.delivery}
                            total={summary.total}
                            buttonText="Continue"
                            onButtonClick={() => {
                                if (selectedAddressId) {
                                    navigate('/payment', { state: { addressId: selectedAddressId } });
                                } else {
                                    alert('Please select an address.');
                                }
                            }}
                            showButton={true} className="desktop-payment-summary"
                        />
                    </div>
                </div>
            </div>

            {/* Mount Edit Address Modal */}
            <EditAddressModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                addressData={editingAddressData}
                mode={modalMode}
            />
        </div>
    );
};

export default Address;
