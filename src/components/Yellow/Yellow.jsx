import React, { useState } from 'react';
import './Yellow.scss';
import { Link } from 'react-router-dom';

const Yellow = ({ images = ["/Images/bottles-coconut.svg"] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const showIndicators = images && images.length > 1;

    return (
        <section className="yellow-section">

            {/* Background Elements */}

            <div className="yellow-section__bg-shade">
                <img src="/Images/Yellow-shade.svg" alt="" />
            </div>
            <div className="yellow-section__bg-pattern">
                <img src="/Images/Rounded-item-ball-type.svg" alt="no-image" />
            </div>

            <div className="yellow-section__container">

                {/* Left Side: Product Images */}

                <div className="yellow-section__left">
                    <div className="yellow-section__product-group">
                        <img
                            src={images[currentIndex] || "/Images/bottles-coconut.svg"}
                            alt="Edhwi Coconut Oil Bottles"
                            className="yellow-section__bottles"
                        />
                    </div>
                    <img
                        src="/Images/Green-leaf.svg"
                        alt="Leaf"
                        className="yellow-section__leaf"
                    />
                </div>

                {/* Right Side: Content */}
                <div className="yellow-section__right">
                    <h1 className="yellow-section__title">
                        പാരമ്പര്യത്തിന്റെ <br />
                        തനിമ.
                    </h1>
                    <div className="yellow-section__text-content">
                        <h2 className="yellow-section__subtitle">Explore our all products</h2>
                        <p className="yellow-section__description">
                            Perfect for everyday cooking, traditional recipes,<br />
                            and gentle family care.
                        </p>
                        <Link to="/our-products">
                            <button className="yellow-section__button">
                                View all products
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Carousel Indicators (Only shown if more than 1 image) */}
            {showIndicators && (
                <div className="yellow-section__indicators">
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`yellow-section__indicator ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        ></span>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Yellow;
