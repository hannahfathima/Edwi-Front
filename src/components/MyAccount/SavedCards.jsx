import React from 'react';
import './SavedCards.scss';

const SavedCards = () => {
    return (
        <section className="dashboard-section saved-cards-section">
            <h2 className="section-heading">SAVED CARDS</h2>
            <div className="saved-cards-container">

                {/* Card 1 */}
                <div className="saved-card-item">
                    <div className="card-primary-info">
                        <div className="card-header-row">
                            <span className="bank-name">HDFC Bank Debit Card</span>
                            <span className="default-badge">Default</span>
                        </div>
                        <div className="card-number-row">
                            <svg className="mc-logo" width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="10" fill="#EA001B" />
                                <circle cx="22" cy="10" r="10" fill="#F79E1B" />
                            </svg>
                            <span className="card-number">1234 56XX XXXX 7890</span>
                        </div>
                    </div>

                    <div className="card-meta validity">
                        <span className="meta-label">Validity</span>
                        <span className="meta-value">06/2025</span>
                    </div>

                    <div className="card-meta name-on-card">
                        <span className="meta-label">Name on Card</span>
                        <span className="meta-value">Critina James</span>
                    </div>

                    <div className="card-action">
                        <button className="set-default-btn">Set as Default</button>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="saved-card-item">
                    <div className="card-primary-info">
                        <div className="card-header-row">
                            <span className="bank-name">HDFC Bank Debit Card</span>
                            <span className="default-badge">Default</span>
                        </div>
                        <div className="card-number-row">
                            <svg className="mc-logo" width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="10" fill="#EA001B" />
                                <circle cx="22" cy="10" r="10" fill="#F79E1B" />
                            </svg>
                            <span className="card-number">1234 56XX XXXX 7890</span>
                        </div>
                    </div>

                    <div className="card-meta validity">
                        <span className="meta-label">Validity</span>
                        <span className="meta-value">06/2025</span>
                    </div>

                    <div className="card-meta name-on-card">
                        <span className="meta-label">Name on Card</span>
                        <span className="meta-value">Critina James</span>
                    </div>

                    <div className="card-action">
                        <button className="set-default-btn">Set as Default</button>
                    </div>
                </div>

                <div className="add-card-wrapper">
                    <button className="btn-add-card">Add new card</button>
                </div>

            </div>
        </section>
    );
};

export default SavedCards;

