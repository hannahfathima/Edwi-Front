import React, { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Essentials.scss';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

const Essentials = () => {
    const sliderRef = useRef(null);

    const products = [
        { id: 1, bgColor: '#e6efff', image: 'Images/Edhwi-packet.svg', alt: 'Pure Coconut Oil Packet' },
        { id: 2, bgColor: '#fbf3d3', image: 'Images/Edhwi-bottle.svg', alt: 'Coconut Oil Bottle' },
        { id: 3, bgColor: '#e3f5f3', image: 'Images/Bottle-blue.svg', alt: 'Cleaning Product Bottle' },
        { id: 4, bgColor: '#e6efff', image: 'Images/Edhwi-packet.svg', alt: 'Pure Coconut Oil Packet' },
        { id: 5, bgColor: '#fbf3d3', image: 'Images/Edhwi-bottle.svg', alt: 'Coconut Oil Bottle' },
        { id: 6, bgColor: '#e3f5f3', image: 'Images/Bottle-blue.svg', alt: 'Cleaning Product Bottle' },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    return (
        <section className="essentials">
            <div className="essentials__container">
                {/* Carousel Navigation (Top Right) */}
                <div className="essentials__header-nav">
                    <button className="essentials__nav-btn" onClick={previous} aria-label="Previous">
                        <FiChevronLeft size={20} />
                    </button>
                    <button className="essentials__nav-btn" onClick={next} aria-label="Next">
                        <FiChevronRight size={20} />
                    </button>
                </div>

                {/* Products Carousel */}
                <div className="essentials__products-carousel">
                    <Slider ref={sliderRef} {...settings}>
                        {products.map(product => (
                            <div key={product.id}>
                                <div
                                    className="essentials__product-card"
                                    style={{ backgroundColor: product.bgColor }}
                                >
                                    <div className="essentials__image-wrapper">
                                        <img src={`/${product.image}`} alt={product.alt} className="essentials__product-img" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Footer Content */}
                <div className="essentials__footer">
                    <div className="essentials__footer-col">
                        <h2 className="essentials__title">
                            Pure. Authentic.<br />
                            Everyday Essentials.
                        </h2>
                    </div>

                    <div className="essentials__footer-col essentials__footer-col--desc">
                        <p className="essentials__desc">
                            Explore our finest picks — from coconut oil to pickles and vermicelli,<br className="desktop-br" />
                            crafted with tradition and care.
                        </p>
                    </div>

                    <div className="essentials__footer-col essentials__footer-col--link">
                        <a href="/our-products" className="essentials__link">
                            View all products <FiArrowRight className="arrow-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Essentials;
