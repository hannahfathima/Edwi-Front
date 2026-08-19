import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress, addAddress } from '../../../redux/slices/addressSlice';
import { MdClose } from "react-icons/md";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
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

    const [isPincodeValidating, setIsPincodeValidating] = useState(false);
    const [pincodeError, setPincodeError] = useState('');

    useEffect(() => {
        if (!isOpen) return;

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
            setPincodeError('');
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
            setPincodeError('');
        }
    }, [addressData, isOpen, mode]);

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
    };

    const handleSaveAddress = async () => {
        setPincodeError('');

        if (!formData.fullName || formData.fullName.length < 2) {
            alert('Please enter a valid full name.');
            return;
        }

        const cleanPhone = formData.phone.replace(/\D/g, '');
        const is10Digit = /^[6-9]\d{9}$/.test(cleanPhone);
        const is12Digit = /^91[6-9]\d{9}$/.test(cleanPhone);

        if (!cleanPhone || (!is10Digit && !is12Digit)) {
            alert('Please enter a valid 10 or 12-digit Indian mobile number (starting with 6-9).');
            return;
        }

        if (!formData.addressLine1) {
            alert('Address line 1 is required.');
            return;
        }

        if (!formData.state) {
            alert('State is required.');
            return;
        }

        if (!formData.zipCode || formData.zipCode.length !== 6) {
            alert('Please enter a valid 6-digit pin code.');
            return;
        }

        setIsPincodeValidating(true);
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${formData.zipCode}`);
            const data = await response.json();

            if (!data || data[0].Status === 'Error') {
                setPincodeError('Invalid Pincode. Please check and try again.');
                setIsPincodeValidating(false);
                return;
            }
        } catch (error) {
            console.error('Pincode validation failed:', error);
            setPincodeError('Could not validate pincode right now.');
            setIsPincodeValidating(false);
            return;
        }
        setIsPincodeValidating(false);

        const addressPayload = {
            fullName: formData.fullName,
            phone: '+' + formData.phone.replace(/\D/g, ''),
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            state: formData.state,
            zipCode: formData.zipCode,
            city: formData.state,
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
            if (onClose) onClose();
        } else {
            alert(resultAction.payload || `Failed to ${mode} address`);
        }
    };

    const formContent = (
        <div className={`edit-modal-content ${isInline ? 'inline-form' : ''}`}>
            {!isInline && (
                <div className="edit-modal-header">
                    <h2>{mode === 'add' ? 'Add new address' : 'Edit address'}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <MdClose size={24} color="#666" />
                    </button>
                </div>
            )}

            <div className={`edit-modal-body ${isInline ? 'inline-body' : ''}`}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Email your full name*</label>
                        <input
                            type="text"
                            className="modal-input"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="James Jacobe |"
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <div className="phone-input-wrapper">
                            <PhoneInput
                                country={'in'}
                                value={formData.phone}
                                onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                                inputStyle={{ width: '100%', height: '42px', fontSize: '15px' }}
                                containerStyle={{ marginTop: '5px' }}
                                enableSearch={true}
                                disableSearchIcon={true}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Address line 1</label>
                        <input
                            type="text"
                            className="modal-input"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            placeholder="Enter address here"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address line 2</label>
                        <input
                            type="text"
                            className="modal-input"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            placeholder="Enter address here"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            className="modal-input"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Pin code</label>
                        <input
                            type="text"
                            className={`modal-input ${pincodeError ? 'error' : ''}`}
                            name="zipCode"
                            maxLength="6"
                            value={formData.zipCode}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setFormData(prev => ({ ...prev, zipCode: val }));
                            }}
                        />
                        {pincodeError && <span className="error-text">{pincodeError}</span>}
                    </div>
                </div>

                <div className="form-group address-type">
                    <label>Save address as</label>
                    <div className="type-selector">
                        <button
                            className={`type-btn ${formData.addressType === 'Home' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, addressType: 'Home' })}
                        >
                            Home
                        </button>
                        <button
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
