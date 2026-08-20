import React, { useState } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { CiLocationOn, CiMail } from 'react-icons/ci';
import { FiPhoneCall } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import './ContactUs.scss';
import Navbar from '../../Navbar/Navbar';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    message: ''
  });
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'firstName') {
      if (/\d/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          firstName: 'Numbers are not allowed in name'
        }));
      } else if (errors.firstName) {
        setErrors((prev) => ({ ...prev, firstName: '' }));
      }

      const filteredValue = value.replace(/\d/g, '');
      setFormData((prev) => ({ ...prev, firstName: filteredValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.target.name === 'firstName' && /^[0-9]$/.test(e.key)) {
      e.preventDefault();
      setErrors((prev) => ({
        ...prev,
        firstName: 'Numbers are not allowed in name'
      }));
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (/\d/.test(formData.firstName)) {
      newErrors.firstName = 'Numbers are not allowed in name';
    }

    if (!phone || phone.trim().length <= 3) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email ID is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Thank you! Your message has been sent successfully.');
      setFormData({ firstName: '', email: '', message: '' });
      setPhone('');
      setErrors({});
      setIsSubmitting(false);
    }, 500);
  };

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
            <form onSubmit={handleSubmit} noValidate>
              <div className="input-group">
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="James Jacob"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>
              <div className="row-group">
                <div className="input-group">
                  <label>Phone</label>
                  <PhoneInput
                    country={'in'}
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="9234 567 897"
                    containerClass={`phone-container ${errors.phone ? 'error' : ''}`}
                    inputClass="phone-input"
                    buttonClass="phone-dropdown"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
                <div className="input-group">
                  <label>Email ID</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@youremail.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>
              <div className="input-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="4"
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
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
            <div className="icon-wrapper">
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
