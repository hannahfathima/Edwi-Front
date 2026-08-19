import React from 'react';
import './OurProcess.scss';

const OurProcess = () => {
    return (
        <section className="process-section">
            <div className="process-container">
                <h2 className="title">
                    <span className="blue-text">Our </span>
                    <span className="dark-text">process</span>
                </h2>

                <div className="process-grid">
                    <div className="process-step">
                        <div className="image-wrapper">
                            {/* User will add their image here */}
                            <img src="/Images/Edhwi-tree.svg" alt="Procurement" className="step-image" />
                        </div>
                        <div className="text-content">
                            <span className="step-number">Step 01</span>
                            <h3 className="step-title">Procurement</h3>
                            <p className="step-description">
                                We source fine, mature coconuts directly from coastal farmers, ensuring top quality without blemishes.
                            </p>
                        </div>
                    </div>

                    <div className="step-arrow">
                        <svg width="60" height="30" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10 Q 50 60 95 15" stroke="#C8C8C8" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                            <path d="M 88 8 L 98 12 L 92 20" stroke="#C8C8C8" strokeWidth="2" fill="none" />
                        </svg>
                    </div>

                    <div className="process-step">
                        <div className="image-wrapper">
                            {/* User will add their image here */}
                            <img src="/Images/floor.svg" alt="Hygienic Copra Processing" className="step-image" />
                        </div>
                        <div className="text-content">
                            <span className="step-number">Step 02</span>
                            <h3 className="step-title">Hygienic Copra Processing</h3>
                            <p className="step-description">
                                Blemished copra is removed; clean kernels sun-dry in our conditioned Kadappa yard, preserving purity without chemicals or over-stacking.
                            </p>
                        </div>
                    </div>

                    <div className="step-arrow">
                        <svg width="60" height="30" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10 Q 50 60 95 15" stroke="#C8C8C8" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                            <path d="M 88 8 L 98 12 L 92 20" stroke="#C8C8C8" strokeWidth="2" fill="none" />
                        </svg>
                    </div>

                    <div className="process-step">
                        <div className="image-wrapper">
                            {/* User will add their image here */}
                            <img src="/Images/Packets.svg" alt="Pure Extraction & Packaging" className="step-image" />
                        </div>
                        <div className="text-content">
                            <span className="step-number">Step 03</span>
                            <h3 className="step-title">Pure Extraction &amp; Packaging</h3>
                            <p className="step-description">
                                Dried copra is crushed, pressed, and micro-filtered to yield smoke-, dust-, and decay-free pure coconut oil, sealed fresh.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurProcess;
