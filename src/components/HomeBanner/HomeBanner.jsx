import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeBanner.scss';
import Navbar from '../Navbar/Navbar';
import BaseUrl from '../../../BaseUrl';
import { useNavigate } from 'react-router-dom';

const HomeBanner = ({ setCurrentPage }) => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleBannerClick = () => {
        const currentBanner = banners[currentIndex];
        if (currentBanner && currentBanner.productId) {
            navigate(`/Product-page/${currentBanner.productId}`);
        }
    };

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/home-banners`);
                console.log(response.data);
                if (response.data.success && response.data.banners.length > 0) {
                    setBanners(response.data.banners);
                }
            } catch (error) {
                console.error("Error fetching home banners:", error);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        let interval;
        if (banners.length > 1) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
            }, 5000); // Change banner every 5 seconds
        }
        return () => clearInterval(interval);
    }, [banners.length]);

    const currentBanner = banners[currentIndex];

    return (
        <div className="home-banner-container">
            <Navbar setCurrentPage={setCurrentPage} />
            <div
                className="home-banner"
                style={{
                    ...(currentBanner ? { backgroundImage: `url(${currentBanner.imageUrl})` } : {}),
                    cursor: currentBanner?.productId ? 'pointer' : 'default'
                }}
                onClick={handleBannerClick}
            >
                {/* Background Image Overlay */}
                <div className="home-banner__overlay"></div>

                {/* Main Content Area */}
                <div className="home-banner__content">
                <div className="home-banner__text-container">
                    <h6 className="home-banner__title">
                        {currentBanner ? (
                            <div dangerouslySetInnerHTML={{ __html: (currentBanner.title || '').replace(/\n/g, '<br />') }} />
                        ) : (
                            <>
                                Kerala's authentic taste<br />
                                in every pack
                            </>
                        )}
                    </h6>
                    <p className="home-banner__subtitle">
                        {currentBanner?.subtitle ? (
                            <div dangerouslySetInnerHTML={{ __html: (currentBanner.subtitle || '').replace(/\n/g, '<br />') }} />
                        ) : (
                            <>
                                Kerala flavours that make every bite feel warm,<br className="desktop-only" />
                                homely , and truly satisfying.
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Carousel Indicators (Dynamic) */}
            <div className="home-banner__indicators">
                {banners.length > 1 ? (
                    banners.map((_, index) => (
                        <span
                            key={index}
                            className={`home-banner__indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))
                ) : banners.length === 0 ? (
                    <>
                        <span className="home-banner__indicator active"></span>
                        <span className="home-banner__indicator"></span>
                        <span className="home-banner__indicator"></span>
                    </>
                ) : null}
            </div>
            </div>
        </div>
    );
};

export default HomeBanner;
