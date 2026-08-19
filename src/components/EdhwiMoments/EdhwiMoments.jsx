import React from 'react';
import './EdhwiMoments.scss';

const EdhwiMoments = () => {
    // Array of placeholder images. The developer will replace these with actual image paths.
    const images = [
        '/Images/Component 439.svg',
        '/Images/Component 440.svg',
        '/Images/Component 441.svg',
        '/Images/Component 443.svg',
    ];

    // Duplicate images for seamless infinite auto-scrolling
    const carouselItems = [...images, ...images];

    return (
        <section className="edhwi-moments-section">
            <div className="moments-container">
                <h2 className="title">
                    <span className="blue-text">Stay Fresh</span>{' '}
                    <span className="dark-text">with Edhwi<br />moments</span>
                </h2>

                <div className="carousel-wrapper">
                    <div className="carousel-track">
                        {carouselItems.map((src, index) => (
                            <div className="carousel-slide" key={index}>
                                {/* Using a placeholder div if src is not found, otherwise user can drop their images */}
                                <div className="image-placeholder">
                                    <img src={src} alt={`Edhwi moment ${index + 1}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="family-section">
                    <h3 className="family-title">Join the edhwi family!</h3>
                    <p className="family-description">
                        Be part of our community celebrating the purity and<br />
                        richness of Kerala's coconuts.
                    </p>
                    <a href="https://instagram.com/Edhwiindia" target="_blank" rel="noopener noreferrer" className="instagram-link">
                        <img src="/Images/Instagram.svg" alt="Instagram" className="insta-icon" />
                        <span className="insta-text">Edhwiindia</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default EdhwiMoments;
