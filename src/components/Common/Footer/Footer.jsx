import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__top">
                    {/* Left Section: Logo */}
                    <div className="footer__logo-container">
                        <Link to="/">
                            <img src="/Images/Footer-logo.svg" alt="Edhwi Logo" className="footer__logo-img" style={{ cursor: 'pointer' }} />
                        </Link>
                    </div>

                    {/* Right Section: Links Columns */}
                    <div className="footer__links-section">
                        {/* Office Column */}

                        <div className="footer__column">
                            <h3 className="footer__column-title">Office</h3>
                            <div className="footer__address">
                                <p>THARA INDUSTRIES PRIVATE LIMITED</p>
                                <p>1/152-30,Royal Trade Centre,</p>
                                <p>Bypass Road-Perinthalmanna,</p>
                                <p>Malappuram,Kerala,India,</p>
                                <p>Pin : 679322</p>
                            </div>
                            <div className="footer__contact">
                                <p className="footer__phone">+91 8589 8585 22</p>
                                <a href="mailto:sales@edhwi.com">sales@edhwi.com</a>
                                <a href="mailto:care@edhwi.com">care@edhwi.com</a>
                            </div>
                        </div>

                        {/* Shop / Quick Links Column */}
                        <div className="footer__column">
                            <h3 className="footer__column-title">Shop</h3>
                            <ul className="footer__list">
                                <li><Link to="/our-products">Our Products</Link></li>
                                <li><Link to="/about-us">About</Link></li>
                                <li><Link to="/gallery">Gallery</Link></li>
                                <li><Link to="/blogs">Blogs</Link></li>
                                <li><Link to="/contact-us">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Help Column */}
                        <div className="footer__column">
                            <h3 className="footer__column-title">Help</h3>
                            <ul className="footer__list">
                                <li><Link to="/privacy-policy">Privacy policy</Link></li>
                                <li><Link to="/refund-policy">Refund policy</Link></li>
                                <li><Link to="/shipping-policy">Shipping policy</Link></li>
                                <li><Link to="/terms-of-service">Terms & Conditions</Link></li>
                                <li><Link to="/contact-us">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    {/* Large Brand Text */}
                    <div className="footer__brand-text-wrapper">
                        <img src="/Images/footer-text.svg" alt="edhwi text logo" className="footer__brand-img" />
                    </div>

                    {/* Socials and Copyright */}
                    <div className="footer__socials-container">
                        <div className="footer__socials">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <FaYoutube />
                            </a>
                        </div>
                        <p className="footer__copyright">©edhwi 2024. All rights reserved.</p>
                    </div>
                </div>
            </div>

            {/* Bottom Wave Graphics */}
            <div className="footer__waves">
                <svg className="wave-svg wave-1" viewBox="0 0 2880 120" preserveAspectRatio="none">
                    <path d="M 0 70 Q 360 10 720 70 T 1440 70 T 2160 70 T 2880 70 L 2880 120 L 0 120 Z" fill="#184BC6" opacity="0.3"></path>
                </svg>
                <svg className="wave-svg wave-2" viewBox="0 0 2880 120" preserveAspectRatio="none">
                    <path d="M 0 80 Q 250 140 720 80 T 1440 80 T 2160 80 T 2880 80 L 2880 120 L 0 120 Z" fill="#0D2D8A" opacity="0.6"></path>
                </svg>
                <svg className="wave-svg wave-3" viewBox="0 0 2880 120" preserveAspectRatio="none">
                    <path d="M 0 90 Q 450 30 720 90 T 1440 90 T 2160 90 T 2880 90 L 2880 120 L 0 120 Z" fill="#0B1C4A"></path>
                </svg>
            </div>
        </footer>
    );
};

export default Footer;
