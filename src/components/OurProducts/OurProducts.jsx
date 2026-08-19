import React from 'react';
import './OurProducts.scss';
import { Link } from 'react-router-dom';

const OurProducts = () => {
    return (
        <section className="products-section">
            <div className="products-container">
                <div className="products-header">
                    <h2 className="title">Our products</h2>
                    <p className="subtitle">Explore your favourite swags from variety of collections</p>
                </div>

                <div className="products-grid">
                    {/* Top Row */}
                    <Link to="/Product-page/PROD00086" className="product-card card-top card-1">
                        <h3 className="card-title">Pouch &amp; Pet Bottle - 500ml, 1L</h3>
                        <div className="card-image-wrapper">
                            {/* User will add their image here */}
                            <img src="/Images/Coconut-Edhwi-bottle.svg" alt="Pouch & Pet Bottle" className="product-image" />
                        </div>
                    </Link>

                    <Link to="/Product-page/PROD00087" className="product-card card-top card-2">
                        <h3 className="card-title">Edhwi Lite - 100% Pure and Natural<br />Unrefined Coconut Oil</h3>
                        <div className="card-image-wrapper">
                            {/* User will add their image here */}
                            <img src="/Images/Kuppiss.svg" alt="Edhwi Lite" className="product-image" />
                        </div>
                    </Link>

                    {/* Bottom Row */}
                    <Link to="/Product-page/PROD00076" className="product-card card-bottom card-3">
                        <h3 className="card-title">Vermicelli</h3>
                        <div className="card-image-wrapper">
                            {/* User will add their image here */}
                            <img src="/Images/vermicil.svg" alt="Vermicelli" className="product-image" />
                        </div>
                    </Link>

                    <Link to="/Product-page/PROD00062" className="product-card card-bottom card-4">
                        <h3 className="card-title">Dry fruits &amp; Nuts</h3>
                        <div className="card-image-wrapper">
                            {/* User will add their image here */}
                            <img src="/Images/r.almonds& cashew plain 1.svg" alt="Dry fruits & Nuts" className="product-image" />
                        </div>
                    </Link>

                    <Link to="/Product-page/PROD00073" className="product-card card-bottom card-5">
                        <h3 className="card-title">Pickles</h3>
                        <div className="card-image-wrapper">
                            {/* User will add their image here */}
                            <img src="/Images/garlic front (1) 1.svg" alt="Pickles" className="product-image" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default OurProducts;
