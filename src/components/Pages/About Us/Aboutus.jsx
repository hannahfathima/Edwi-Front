import React, { useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import EdhwiMoments from '../../EdhwiMoments/EdhwiMoments';
import OurProcess from '../../OurProcess/OurProcess';
import './Aboutus.scss';
import BlogSub from '../../BlogSub/BlogSub';

const Aboutus = () => {
    const [activeMvv, setActiveMvv] = useState('mission');

    const mvvData = {
        mission: {
            title: "Our Mission",
            description: "A world where pure, traditional flavors thrive through sustainable sourcing and transparent practices, connecting consumers to the true essence of wholesome ingredients in every meal."
        },
        vision: {
            title: "Our Vision",
            description: "To become the global benchmark for purity and sustainability, empowering communities through ethical farming while delivering nature's finest wellness products to every home."
        },
        value: {
            title: "Our value",
            description: "Integrity, Purity, and Sustainability are at our core. We value the trust of our consumers and the well-being of our farmers, ensuring every drop of Edhwi represents honest care."
        }
    };

    return (
        <div className="about-us-page">
            <Navbar />

            {/* 1. Hero Section */}

            <section className="about-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 about-hero__content">
                            <h1 className="about-hero__title">
                                Crafted by Nature, <br />
                                perfected by purpose
                            </h1>
                            <p className="about-hero__description">
                                At Edhwi, we believe nature holds the purest answers to modern needs. Rooted in Kerala’s rich coconut heritage, we create products that blend traditional wisdom with sustainable innovation.
                            </p>
                        </div>
                        <div className="col-lg-7 about-hero__collage">
                            <div className="collage-grid">
                                
                                {/* Background Roller */}

                                <div className="background-roller">
                                    <img src="/Images/background roller.svg" alt="Background Swirl" />
                                </div>
                                <div className="collage-item item-green">
                                    <img src="/Images/coc-baby.svg" alt="Green coconuts" />
                                </div>
                                <div className="collage-item item-workers">
                                    <img src="/Images/Coconut-lights.svg" alt="Workers" />
                                </div>
                                <div className="collage-item item-bw">
                                    <img src="/Images/black-white.svg" alt="Black and white" />
                                </div>
                                <div className="collage-item item-split">
                                    <img src="/Images/Coconut-muri.svg" alt="Split coconut" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Visual Border Accent */}
                <div className="hero-border-accent"></div>
            </section>

            {/* 2. Product Showcase */}
            <section className="about-products">
                <div className="container text-center">
                    <img src="/Images/coconut-graphics-removebg-preview.png" alt="Edhwi Products" className="main-product-img" />
                </div>
            </section>

            {/* 3. Innovation Section */}
            <section className="about-innovation">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 about-innovation__images">
                            <div className="innovation-grid">
                                <div className="innovation-item innovation-item--vertical">
                                    <img src="/Images/Banner-About.svg" alt="Nature" />
                                </div>
                                <div className="innovation-item innovation-item--large">
                                    <img src="/Images/Banner-2nd-about.svg" alt="Innovation" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 about-innovation__content">
                            <h6 className="innovation-title">
                                Innovating <br />
                                Through Nature
                            </h6>
                            <p className="innovation-description">
                                We don’t just make products.
                                We nurture a promise — of quality, sustainability, and the timeless goodness of nature..
                            </p>
                            <button className="btn-know-more">
                                Explore Products
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Our Promise Section */}
            <section className="about-promise">
                <div className="container">
                    <div className="promise-header">
                        <h2 className="promise-title">Our <span>promise</span></h2>
                        <p className="promise-subtitle">
                            At Edhwi, we promise more than just products — we <br />
                            promise purity, honesty, and care in everything we offer.
                        </p>
                    </div>

                    <div className="promise-grid">
                        <div className="promise-item">
                            <div className="promise-icon">
                                <img src="/Images/HAnd-logo.svg" alt="Pure icon" onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231F61E1'%3E%3Cpath d='M12 21.5C7.30558 21.5 3.5 17.6944 3.5 13C3.5 10.1583 6.09653 4.9749 11.2335 0.509891C11.6441 0.152862 12.3559 0.152862 12.7665 0.509891C17.9035 4.9749 20.5 10.1583 20.5 13C20.5 17.6944 16.6944 21.5 12 21.5ZM5.5 13C5.5 16.5899 8.41015 19.5 12 19.5C15.5899 19.5 18.5 16.5899 18.5 13C18.5 10.9789 16.5598 6.64391 12 2.827C7.44024 6.64391 5.5 10.9789 5.5 13Z'/%3E%3C/svg%3E"; }} />
                            </div>
                            <h4 className="promise-item-title">100% Pure & Unrefined</h4>
                            <p className="promise-item-desc">
                                Pure Sun-refined coconut oil from hand-picked mature coconuts, preserving every natural nutrient for your wellness.
                            </p>
                        </div>

                        <div className="promise-item">
                            <div className="promise-icon">
                                <img src="/Images/Coconut-plant.svg" alt="Tree icon" onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231F61E1'%3E%3Cpath d='M11 20H8V22H16V20H13V13.881L19.462 14.887L20.046 12.924L13.834 10.824L18.423 8.326L17.464 6.574L11.832 9.638L12.551 2.378L10.561 2.18L9.932 8.526L5.617 4.21L4.203 5.624L9.049 10.469L3.02 9.539L2.715 11.515L9.626 12.58L5.751 16.455L7.165 17.869L11 14.034V20Z'/%3E%3C/svg%3E"; }} />
                            </div>
                            <h4 className="promise-item-title">Locally Sourced</h4>
                            <p className="promise-item-desc">
                                Partnering with Kerala's careful farmers to support communities and ensure freshness.
                            </p>
                        </div>

                        <div className="promise-item">
                            <div className="promise-icon">
                                <img src="/Images/Moon.svg" alt="Chemical Free icon" onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231F61E1'%3E%3Cpath d='M21 16.5C21 16.8906 20.8903 17.2619 20.6975 17.587C20.1989 18.4286 19.3364 19 18.3333 19C16.8606 19 15.6667 17.8061 15.6667 16.3333C15.6667 15.6425 15.9288 15.0125 16.3571 14.5387C16.5029 14.3774 16.7118 14.2882 16.9298 14.2882H20.7303C20.8793 14.2882 21 14.4089 21 14.5579V16.5ZM19 16.2882V15.2882H17.4262C17.0706 15.2882 16.7909 15.2078 16.5768 15.0747C16.4172 14.9754 16.3195 14.8517 16.2764 14.777C15.9616 14.8973 15.7176 15.1326 15.548 15.4245C15.4057 15.669 15.3333 15.9525 15.3333 16.3333C15.3333 17.3822 16.0354 18.2393 17.0124 18.4288C17.3308 18.4905 17.6534 18.4905 17.9718 18.4288C18.6833 18.2917 19 17.7573 19 17.3333C19 17.1472 18.9482 16.9678 18.8687 16.8122C18.6946 16.4716 18.2721 16.2882 18.2721 16.2882C18.2721 16.2882 18.5997 16.2882 19 16.2882ZM3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12H19C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12H21C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM13 14H11V7H13V14Z'/%3E%3C/svg%3E"; }} />
                            </div>
                            <h4 className="promise-item-title">Chemical-Free Guarantee</h4>
                            <p className="promise-item-desc">
                                Absolutely no additives, preservatives, or artificial processing.
                            </p>
                        </div>

                        <div className="promise-item">
                            <div className="promise-icon">
                                <img src="/Images/Mushroom.svg" alt="Sustainable icon" onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231F61E1'%3E%3Cpath d='M20 3V6.5C20 11.238 16.513 15.178 12 15.897V21H10V15.897C5.487 15.178 2 11.238 2 6.5V3H10V6.5C10 7.328 10.672 8 11.5 8H12.5C13.328 8 14 7.328 14 6.5V3H20ZM18 5H16V6.5C16 8.433 14.433 10 12.5 10H11.5C9.567 10 8 8.433 8 6.5V5H4V6.5C4 10.134 6.963 13.085 10.597 13.568C10.741 13.587 10.871 13.639 10.99 13.722C11.109 13.804 11.196 13.916 11.246 14.045C11.296 14.175 11.309 14.318 11.285 14.457C11.261 14.596 11.199 14.726 11.107 14.832C11.237 14.73 11.396 14.662 11.565 14.64C15.485 14.167 18 10.749 18 6.5V5Z'/%3E%3C/svg%3E"; }} />
                            </div>
                            <h4 className="promise-item-title">Sustainable Practices</h4>
                            <p className="promise-item-desc">
                                Environmentally conscious sourcing and packaging for a better tomorrow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Mission Vision Value Section */}
            <section className="about-mvv">
                <div className="container mvv-container">
                    <div className="mvv-list">
                        {Object.keys(mvvData).map((key) => (
                            <div
                                key={key}
                                className={`mvv-item ${activeMvv === key ? 'active' : ''}`}
                                onMouseEnter={() => setActiveMvv(key)}
                                onClick={() => setActiveMvv(key)}
                            >
                                <div className="mvv-item-row">
                                    <div className="mvv-title-box">
                                        <h3>{mvvData[key].title}</h3>
                                    </div>
                                    <div className="mvv-desc-box">
                                        <p className="mvv-description">
                                            {mvvData[key].description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Background Leaf/Logo SVG for the blue section */}
                    <div className="mvv-background">
                        <img src="/Images/bg-image.svg" alt="Graphic Base" onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }} />
                    </div>
                </div>



            </section>

            <div>
                <EdhwiMoments />
            </div>

            <div>
                <OurProcess />
            </div>

            <div>
                <BlogSub />
            </div>

        </div>
    );
};

export default Aboutus;
