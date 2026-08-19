import React, { useState } from 'react';
import './VideoBanner.scss';
import { FaPlay } from 'react-icons/fa';

const VideoBanner = () => {
    const [playingVideo, setPlayingVideo] = useState(null);

    const handlePlay = (id) => {
        setPlayingVideo(id);
    };

    const videos = {
        1: "-iCPxPQcxZw",
        2: "lKtAO_3Lz-Y"
    };

    const renderContent = (id, bgImage, overlayClass) => {
        if (playingVideo === id) {
            return (
                <div className="video-banner__iframe-wrapper">
                    <iframe
                        src={`https://www.youtube.com/embed/${videos[id]}?autoplay=1&rel=0`}
                        title={`Video ${id}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <button 
                        className="video-banner__close-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPlayingVideo(null);
                        }}
                    >
                        ×
                    </button>
                </div>
            );
        }

        return (
            <>
                <div
                    className="video-banner__background"
                    style={{ backgroundImage: `url("${bgImage}")` }}
                ></div>
                <div className={`video-banner__overlay ${overlayClass}`}></div>

                <div className="video-banner__content">
                    <button 
                        className="video-banner__play-btn" 
                        aria-label="Play video"
                        onClick={() => handlePlay(id)}
                    >
                        <FaPlay className="video-banner__play-icon" />
                    </button>
                </div>
            </>
        );
    };
    return (
        <section className="video-banner">
            <div className="video-banner__container">
                {/* Left Video Item (Blue Gradient) */}
                <div className="video-banner__item" onClick={() => handlePlay(1)}>
                    {renderContent(1, "/Images/Edhwi-women.svg", "video-banner__overlay--blue")}
                </div>

                {/* Right Video Item (Yellow Gradient) */}
                <div className="video-banner__item" onClick={() => handlePlay(2)}>
                    {renderContent(2, "/Images/Yellow-image.svg", "video-banner__overlay--yellow")}
                </div>
            </div>
        </section>
    );
};

export default VideoBanner;
