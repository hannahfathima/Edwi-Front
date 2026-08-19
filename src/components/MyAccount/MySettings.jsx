import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import './MySettings.scss';
import { FiLock, FiTrash2, FiLogOut } from 'react-icons/fi';
import LogoutModal from '../Theams/LogoutModal/LogoutModal';
import DeleteAccountModal from '../Theams/DeleteAccountModal/DeleteAccountModal';

const MySettings = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    const handleDeleteAccountClick = () => {
        setIsDeleteModalOpen(true);
    };

    return (
        <section className="my-settings-section">
            <div className="settings-group">
                <h3 className="group-title">PERSONAL INFORMATION</h3>
                <div className="info-card">
                    <div className="card-header">
                        <span className="user-name">{user?.name || 'Customer'}</span>
                        <button className="edit-btn">Edit</button>
                    </div>
                    <div className="card-body">
                        {user?.email && <p>{user.email}</p>}
                        {user?.phone && <p>{user.phone}</p>}
                        <p className="spacer">Gender : {user?.gender || 'N/A'}</p>
                        <p className="spacer">Date of Birth : {user?.dateOfBirth || user?.dob || 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div className="settings-group privacy-group">
                <h3 className="group-title">PRIVACY</h3>
                <div className="action-cards">
                    {user?.authProvider !== 'google' && (
                        <div className="action-card" style={{ cursor: 'pointer' }}>
                            <FiLock className="action-icon" />
                            <span className="action-text">Change Password</span>
                        </div>
                    )}
                    <div className="action-card" style={{ cursor: 'pointer' }} onClick={handleDeleteAccountClick}>
                        <FiTrash2 className="action-icon" />
                        <span className="action-text">Delete account</span>
                    </div>
                    <div className="action-card" style={{ cursor: 'pointer' }} onClick={handleLogoutClick}>
                        <FiLogOut className="action-icon" />
                        <span className="action-text">Logout</span>
                    </div>
                </div>
            </div>

            <LogoutModal 
                isOpen={isLogoutModalOpen} 
                onClose={() => setIsLogoutModalOpen(false)} 
            />
            <DeleteAccountModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
            />
        </section>
    );
};

export default MySettings;
