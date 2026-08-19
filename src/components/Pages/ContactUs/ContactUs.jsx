import React, { useState } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { CiLocationOn, CiMail } from 'react-icons/ci';
import { FiPhoneCall } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './ContactUs.scss';
import Navbar from '../../Navbar/Navbar';

const ContactUs = () => {
  const [phone, setPhone] = useState('');

  return (
    <div className="contact-us-page">
      {/* Top Section */}
      <Navbar />
      <section className="contact-top-section">
        <div className="contact-top-content">
          <div className="text-content">
            <h1>Let's Talk</h1>
            <p>
              Got questions about our natural products, bulk orders, or partnership opportunities? Drop us a message - we're here to help!
            </p>
            <div className="whatsapp-contact">
              <IoLogoWhatsapp className="whatsapp-icon" />
              <span className="country-code">+91</span>
              <span className="phone-number">8589 858 522</span>
            </div>
          </div>

          <div className="form-container">
            <h3>Connect us today!</h3>
            <form>
              <div className="input-group">
                <label>First name</label>
                <input type="text" placeholder="James Jacob" />
              </div>
              <div className="row-group">
                <div className="input-group">
                  <label>Phone</label>
                  <PhoneInput
                    country={'in'}
                    value={phone}
                    onChange={setPhone}
                    placeholder="9234 567 897"
                    inputClass="phone-input"
                    buttonClass="phone-dropdown"
                  />
                </div>
                <div className="input-group">
                  <label>Email ID</label>
                  <input type="email" placeholder="example@youremail.com" />
                </div>
              </div>
              <div className="input-group">
                <label>Message</label>
                <textarea placeholder="Type your message here..." rows="4"></textarea>
              </div>
              <button type="submit" className="submit-btn">Send message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="contact-bottom-section">
        <div className="map-container">
          <iframe
            src="https://maps.google.com/maps?q=THARA%20INDUSTRIES%20PRIVATE%20LIMITED,%20ROYAL%20TRADE%20CENTRE,%201/152-30,%20Bypass%20Road,%20Perinthalmanna,%20Kerala%20679322&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map Configuration"
          ></iframe>
        </div>

        <div className="contact-info-container">
          <div className="info-block">
            <div className="  ">
              <CiLocationOn />
            </div>
            <div className="info-text">
              <h4>Address</h4>
              <p>THARA INDUSTRIES PRIVATE LIMITED,<br /> 1/152-30 ,Royal Trade Centre,<br />Bypass Road-Perinthalmanna,Malappuram,Kerala,India,<br />Pin - 679322</p>
            </div>
          </div>

          <div className="info-block">
            <div className="icon-wrapper">
              <CiMail />
            </div>
            <div className="info-text">
              <h4>Emails</h4>
              <p>sales@edhwi.com<br />com@edhwi.com</p>
            </div>
          </div>

          <div className="info-block">
            <div className="icon-wrapper">
              <FiPhoneCall />
            </div>
            <div className="info-text">
              <h4>Call us</h4>
              <div className="phone-list">
                <p>(+91) 8589 8585 22</p>
                <p>(+91) 8589 8585 44</p>
                <p>(+91) 8589 8585 66</p>
                <p>(+91) 8589 8585 88</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
