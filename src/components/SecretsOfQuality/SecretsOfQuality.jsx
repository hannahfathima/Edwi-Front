import React from 'react';
import './SecretsOfQuality.scss';

const SecretsOfQuality = () => {
    return (
        <section className="secrets-section">
            {/* Background vector curve placeholder, user can replace with their actual vector */}
            <div className="secrets-bg-curve"></div>

            <div className="secrets-container">
                <div className="secrets-header">
                    <h2 className="title">Our secrets of quality</h2>
                    <h3 className="subtitle">Pure. Natural. Honest.</h3>
                    <p className="description">
                        At Edhwi, purity isn't a choice — it's our commitment. We're proud to be among the few brands producing pure, natural, unrefined coconut oil, directly sourced from the finest matured coconuts grown in the coastal regions of Kerala. By partnering with local farmers and prioritizing freshness, we ensure every drop of oil is rooted in quality
                    </p>
                </div>

                <div className="secrets-gallery-wrapper">
                    <div className="secrets-gallery">
                        {/* User can add their responsive images here */}
                        <div className="gallery-item item-1">
                            <img src="/Images/Caro-first.svg" alt="Palm Trees" className="responsive-image" />
                        </div>
                        <div className="gallery-item item-2">
                            <img src="/Images/Coconut-green.svg" alt="Green Coconuts" className="responsive-image" />
                        </div>
                        <div className="gallery-item item-3">
                            <img src="/Images/Coconut-dry.svg" alt="Coconut Oil Bottle" className="responsive-image" />
                        </div>
                        <div className="gallery-item item-4">
                            <img src="/Images/Bottle-coconutss.svg" alt="Edhwi Bottles" className="responsive-image" />
                        </div>
                    </div>
                </div>

                <div className="secrets-features">
                    <div className="feature-block">
                        <div className="feature-image">
                            <img src="/Images/Coconut.svg" alt="Sundried Copra" className="responsive-image" />
                        </div>
                        <div className="feature-content">
                            <h4>Sundried Copra</h4>
                            <p>
                                Our process begins with sun-drying the coconuts in meticulously clean, chemical-free conditions. At our hygienic 'Kondappe' yard, blemished copras are carefully removed, and only the best are processed. This traditional method preserves the natural goodness without compromise.
                            </p>
                        </div>
                    </div>

                    <div className="feature-block">
                        <div className="feature-image">
                            <img src="/Images/Group-bottles.svg" alt="Unrefined & Microfiltered" className="responsive-image" />
                        </div>
                        <div className="feature-content">
                            <h4>Unrefined &amp; Microfiltered</h4>
                            <p>
                                Unrefined and micro-filtered, our coconut oil keeps the natural aroma, flavour, and goodness of Kerala coconuts intact while removing impurities for extra clarity. It is a clean, versatile oil you can trust for everyday family use.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecretsOfQuality;
