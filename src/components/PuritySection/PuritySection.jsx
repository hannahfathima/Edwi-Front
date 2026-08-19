import React, { useState, useEffect } from 'react';
import './PuritySection.scss';
import { BiLeaf } from "react-icons/bi";
import { TbBowl, TbDroplet } from "react-icons/tb";

const products = [
    { id: 1, src: "/Images/Bottle-with-coconut.svg", alt: "Edhwi Blue Bottle" },
    { id: 2, src: "/Images/Bottle-blue.svg", alt: "Edhwi Bottle" },
    { id: 3, src: "/Images/Edhwi-packet.svg", alt: "Edhwi Packet" }
];

const PuritySection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length);
        }, 4500); // Change image every 4.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero">
            {/* Background elements */}
            <img src="/Images/img_greenleafe (1).svg" alt="" className="hero__leaf hero__leaf--1" />
            {/* <img src="/Flowers.svg" alt="" className="hero__leaf hero__leaf--2" /> */}

            <div className="hero__container hero__container--vertical">
                {/* <!-- TOP CONTENT --> */}
                <div className="hero__content hero__content--centered">
                    <h1 className="hero__title">
                        <span>Rooted in Purity.  Inspired by <br />
                            Tradition.</span>

                    </h1>

                    <p className="hero__description">
                        Edhwi brings the purity of Kerala to your table with products inspired
                        by timeless traditions. From premium unrefined coconut oil to traditional
                        pickles, spices, nuts, and vermicelli, every pack delivers authentic taste,
                        dependable quality, and thoughtful care for your family.
                    </p>

                    <div className="hero__features-box">
                        <div className="feature">
                            <img src="/Images/Cup.svg" alt="" />
                            <span>Pure</span>
                        </div>
                        <div className="feature">
                            <img src="/Images/Flowers.svg" alt="no-flowers" />
                            <span>Traditional</span>
                        </div>
                        <div className="feature">
                            <img src="/Images/Flowerrs.svg" alt="no-flowers" />
                            <span>Fresh</span>
                        </div>
                    </div>
                </div>

                {/* <!-- BOTTOM CAROUSEL --> */}
                <div className="hero__image-slider">
                    <div className="hero__carousel">
                        {products.map((product, index) => (
                            <img
                                key={product.id}
                                src={product.src}
                                alt={product.alt}
                                className={`carousel-image ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'prev' : ''} ${index > currentIndex ? 'next' : ''}`}
                            />
                        ))}
                    </div>

                    <div className="platform platform--animated"></div>
                </div>

            </div>

            <div className="hero__bottom"></div>
        </section>
    );
};

export default PuritySection;
