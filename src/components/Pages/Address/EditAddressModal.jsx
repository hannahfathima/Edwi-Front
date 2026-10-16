import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress, addAddress } from '../../../redux/slices/addressSlice';
import { MdClose } from "react-icons/md";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import './EditAddressModal.scss';

const EditAddressModal = ({ isOpen, onClose, addressData, mode = 'edit', isInline = false }) => {
    const dispatch = useDispatch();
    const { loading: addressLoading } = useSelector((state) => state.address);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        zipCode: '',
        addressType: 'Home'
    });

    const [errors, setErrors] = useState({});
    const [isPincodeValidating, setIsPincodeValidating] = useState(false);

    useEffect(() => {
        if (!isOpen && !isInline) return;

        if (mode === 'edit' && addressData) {
            let phoneVal = addressData.phone || '';

            setFormData({
                fullName: addressData.fullName || '',
                phone: phoneVal,
                addressLine1: addressData.addressLine1 || '',
                addressLine2: addressData.addressLine2 || '',
                state: addressData.state || addressData.city || '',
                zipCode: addressData.zipCode || '',
                addressType: addressData.addressType === 'work' || addressData.addressType === 'Office' ? 'Office' : 'Home'
            });
            setErrors({});
        } else if (mode === 'add') {
            setFormData({
                fullName: '',
                phone: '',
                addressLine1: '',
                addressLine2: '',
                state: '',
                zipCode: '',
                addressType: 'Home'
            });
            setErrors({});
        }
    }, [addressData, isOpen, mode, isInline]);

    useEffect(() => {
        if (isOpen && !isInline) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, isInline]);

    if (!isOpen && !isInline) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Full Name validation
        const trimmedName = (formData.fullName || '').trim();
        if (!trimmedName) {
            newErrors.fullName = 'Full name is required';
        } else if (trimmedName.length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
            newErrors.fullName = 'Full name should only contain letters and spaces';
        }

        // Phone validation
        const cleanPhone = (formData.phone || '').toString().replace(/\D/g, '');
        const is10Digit = /^[6-9]\d{9}$/.test(cleanPhone);
        const is12Digit = /^91[6-9]\d{9}$/.test(cleanPhone);

        if (!cleanPhone) {
            newErrors.phone = 'Phone number is required';
        } else if (!is10Digit && !is12Digit) {
            newErrors.phone = 'Enter a valid 10-digit mobile number starting with 6-9';
        }

        // Address Line 1 validation
        const trimmedAddress1 = (formData.addressLine1 || '').trim();
        if (!trimmedAddress1) {
            newErrors.addressLine1 = 'Address line 1 is required';
        } else if (trimmedAddress1.length < 5) {
            newErrors.addressLine1 = 'Please enter a complete address (minimum 5 characters)';
        }

        // State validation
        const trimmedState = (formData.state || '').trim();
        if (!trimmedState) {
            newErrors.state = 'State / City is required';
        } else if (trimmedState.length < 2) {
            newErrors.state = 'Please enter a valid state or city';
        }

        // Pincode validation
        const cleanZip = (formData.zipCode || '').trim();
        if (!cleanZip) {
            newErrors.zipCode = 'Pin code is required';
        } else if (!/^\d{6}$/.test(cleanZip)) {
            newErrors.zipCode = 'Pin code must be exactly 6 digits';
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleSaveAddress = async () => {
        const fieldErrors = validateForm();
        if (Object.keys(fieldErrors).length > 0) {
            toast.error('Please fix the errors before saving');
            return;
        }

        setIsPincodeValidating(true);
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${formData.zipCode.trim()}`);
            const data = await response.json();

            if (!data || !data[0] || data[0].Status === 'Error') {
                setErrors(prev => ({ ...prev, zipCode: 'Invalid Pin code. Please enter a valid Indian postal code.' }));
                setIsPincodeValidating(false);
                toast.error('Invalid Pin code');
                return;
            }
        } catch (error) {
            console.error('Pincode validation failed:', error);
        }
        setIsPincodeValidating(false);

        const cleanPhone = formData.phone.replace(/\D/g, '');
        const formattedPhone = cleanPhone.startsWith('91') && cleanPhone.length === 12
            ? '+' + cleanPhone
            : '+91' + cleanPhone;

        const addressPayload = {
            fullName: formData.fullName.trim(),
            phone: formattedPhone,
            addressLine1: formData.addressLine1.trim(),
            addressLine2: formData.addressLine2 ? formData.addressLine2.trim() : '',
            state: formData.state.trim(),
            zipCode: formData.zipCode.trim(),
            city: formData.state.trim(),
            country: 'India',
            addressType: formData.addressType
        };

        let resultAction;
        if (mode === 'edit') {
            addressPayload.id = addressData.id || addressData._id;
            resultAction = await dispatch(updateAddress(addressPayload));
        } else {
            resultAction = await dispatch(addAddress(addressPayload));
        }

        if (updateAddress.fulfilled.match(resultAction) || addAddress.fulfilled.match(resultAction)) {
            toast.success(mode === 'add' ? 'Address added successfully!' : 'Address updated successfully!');
            if (onClose) onClose();
        } else {
            const errorMsg = resultAction.payload || `Failed to ${mode} address`;
            toast.error(errorMsg);
        }
    };

    const formContent = (
        <div className={`edit-modal-content ${isInline ? 'inline-form' : ''}`}>
            {!isInline && (
                <div className="edit-modal-header">
                    <h2>{mode === 'add' ? 'Add new address' : 'Edit address'}</h2>
                    <button className="close-btn" onClick={onClose} type="button">
                        <MdClose size={24} color="#666" />
                    </button>
                </div>
            )}

            <div className={`edit-modal-body ${isInline ? 'inline-body' : ''}`}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Enter your full name*</label>
                        <input
                            type="text"
                            className={`modal-input ${errors.fullName ? 'error' : ''}`}
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter full name"
                        />
                        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>
                    <div className="form-group">
                        <label>Phone*</label>
                        <div className={`phone-input-wrapper ${errors.phone ? 'phone-error' : ''}`}>
                            <PhoneInput
                                country={'in'}
                                value={formData.phone}
                                onChange={phone => {
                                    setFormData(prev => ({ ...prev, phone }));
                                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                                }}
                                inputStyle={{ width: '100%', height: '44px', fontSize: '14px', borderRadius: '8px' }}
                                containerStyle={{ width: '100%', margin: 0 }}
                                enableSearch={true}
                                disableSearchIcon={true}
                            />
                        </div>
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Address line 1*</label>
                        <input
                            type="text"
                            className={`modal-input ${errors.addressLine1 ? 'error' : ''}`}
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            placeholder="House / Flat no., Building, Street"
                        />
                        {errors.addressLine1 && <span className="error-text">{errors.addressLine1}</span>}
                    </div>
                    <div className="form-group">
                        <label>Address line 2 (Optional)</label>
                        <input
                            type="text"
                            className="modal-input"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            placeholder="Landmark, Area, Apartment (optional)"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>State / City*</label>
                        <input
                            type="text"
                            className={`modal-input ${errors.state ? 'error' : ''}`}
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Enter state or city"
                        />
                        {errors.state && <span className="error-text">{errors.state}</span>}
                    </div>
                    <div className="form-group">
                        <label>Pin code*</label>
                        <input
                            type="text"
                            className={`modal-input ${errors.zipCode ? 'error' : ''}`}
                            name="zipCode"
                            maxLength="6"
                            placeholder="6-digit PIN code"
                            value={formData.zipCode}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setFormData(prev => ({ ...prev, zipCode: val }));
                                if (errors.zipCode) setErrors(prev => ({ ...prev, zipCode: '' }));
                            }}
                        />
                        {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                    </div>
                </div>

                <div className="form-group address-type">
                    <label>Save address as</label>
                    <div className="type-selector">
                        <button
                            type="button"
                            className={`type-btn ${formData.addressType === 'Home' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, addressType: 'Home' })}
                        >
                            Home
                        </button>
                        <button
                            type="button"
                            className={`type-btn ${formData.addressType === 'Office' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, addressType: 'Office' })}
                        >
                            Office
                        </button>
                    </div>
                </div>
            </div>

            <div className={`edit-modal-footer ${isInline ? 'inline-footer' : ''}`}>
                {!isInline && (
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                )}
                <button
                    className={`save-btn ${isInline ? 'full-width' : ''}`}
                    onClick={handleSaveAddress}
                    disabled={addressLoading || isPincodeValidating}
                >
                    {isPincodeValidating ? 'Verifying...' : (addressLoading ? 'Saving...' : (isInline ? 'Save' : 'Save address'))}
                </button>
            </div>
        </div>
    );

    if (isInline) {
        return formContent;
    }

    return (
        <div className="edit-modal-overlay">
            {formContent}
        </div>
    );
};

export default EditAddressModal;
