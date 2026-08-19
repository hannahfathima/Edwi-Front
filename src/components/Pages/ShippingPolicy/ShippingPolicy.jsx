import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import './ShippingPolicy.scss';
import { CiMail, CiLocationOn } from 'react-icons/ci';
import { FiPhoneCall, FiChevronRight } from 'react-icons/fi';

const ShippingPolicy = () => {
  const [activeSection, setActiveSection] = useState('logistics');
  const contentRef = useRef(null);

  const sections = [
    { id: 'logistics', title: 'Partnership & Dispatch' },
    { id: 'timeline', title: 'Timeline & Serviceability' },
    { id: 'accuracy', title: 'Customer Obligations' },
    { id: 'attempts', title: 'Delivery Attempts' },
    { id: 'delays', title: 'Force Majeure & Delays' },
    { id: 'tracking', title: 'Order Tracking' },
    { id: 'fees', title: 'Shipping Fees & Title' },
    { id: 'returns', title: 'Reverse Logistics' },
    { id: 'contact', title: 'Contact Us' }
  ];

  const handleScrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="shipping-policy-page">
      <Navbar />
      
      {/* Hero Header */}
      <section className="policy-hero">
        <div className="policy-hero__content">
          <h1>Shipping Policy</h1>
          <p className="policy-hero__subtitle">Learn about our shipping procedures, delivery timelines, logistics partners, and reverse logistics.</p>
          <div className="policy-hero__meta">
            <span>Effective Date: July 1, 2026</span>
          </div>
        </div>
      </section>

      {/* Main Layout Container */}
      <section className="policy-layout-container">
        <div className="policy-layout">
          {/* Navigation Sidebar */}
          <aside className="policy-sidebar">
            <div className="policy-sidebar__sticky">
              <h3>Table of Contents</h3>
              <ul className="policy-sidebar__list">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <button
                      className={`policy-sidebar__btn ${activeSection === sec.id ? 'is-active' : ''}`}
                      onClick={() => handleScrollTo(sec.id)}
                    >
                      <FiChevronRight className="chevron-icon" />
                      <span>{sec.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Policy Text Content */}
          <main className="policy-content" ref={contentRef}>
            <div className="policy-card">
              
              {/* Partnership & Dispatch */}
              <section id="logistics" className="policy-section">
                <h2>Partnership & Dispatch</h2>
                <p>
                  We partner with third-party logistics service providers ("Logistics Partners") to facilitate the shipping and delivery of products purchased on Edhwi.
                </p>
                <p>
                  Once your product is processed and successfully handed over to the Logistics Partner, we will provide you with their details. Products are typically dispatched within <strong>2 to 4 days</strong> of receiving the order on <a href="https://edhwi.com" target="_blank" rel="noopener noreferrer">edhwi.com</a>.
                </p>
              </section>

              {/* Timeline & Serviceability */}
              <section id="timeline" className="policy-section">
                <h2>Timeline & Serviceability</h2>
                <p>
                  You will be notified with an estimated delivery timeline on the order confirmation page and via your registered email ID and/or mobile number.
                </p>
                <p>
                  While we aim to ship across India, we may designate certain areas as unserviceable. In such cases, you will be notified at the time of placing your order or you may check delivery availability by entering the relevant pin code on <a href="https://edhwi.com" target="_blank" rel="noopener noreferrer">edhwi.com</a>.
                </p>
              </section>

              {/* Customer Obligations */}
              <section id="accuracy" className="policy-section">
                <h2>Customer Obligations for Accurate Delivery</h2>
                <p>
                  To ensure accurate delivery, we may request specific details such as:
                </p>
                <ul>
                  <li>Recipient Name</li>
                  <li>Complete Shipping Address & Billing Address</li>
                  <li>Nearby Landmarks</li>
                  <li>Contact Details (Phone number / Email)</li>
                </ul>
                <p>
                  You are responsible for providing complete and accurate information. Edhwi will not be held liable for failed deliveries resulting from incorrect or insufficient address details provided by you.
                </p>
              </section>

              {/* Delivery Attempts */}
              <section id="attempts" className="policy-section">
                <h2>Delivery Attempts & Cancellation</h2>
                <p>
                  Our Logistics Partners will make up to <strong>three (3) delivery attempts</strong>.
                </p>
                <p>
                  If delivery fails after the third attempt due to customer unavailability, we reserve the right to cancel the order and return the product. In such cases, shipping charges may be deducted from the refund amount.
                </p>
              </section>

              {/* Force Majeure & Delays */}
              <section id="delays" className="policy-section">
                <h2>Delays Beyond Our Control</h2>
                <p>
                  Delivery may be delayed due to reasons beyond our control, including but not limited to:
                </p>
                <ul>
                  <li>Logistics partner delays or peak season backlog</li>
                  <li>Weather disturbances and natural obstacles</li>
                  <li>Political unrest, strikes, or lockdowns</li>
                  <li>Acts of God (e.g., floods, earthquakes, pandemics)</li>
                  <li>Other unforeseeable operational events</li>
                </ul>
                <p>
                  We will attempt to notify you in such cases via your registered email or mobile number. Edhwi disclaims any liability for delivery delays or the consequences thereof.
                </p>
                <div className="alert-box">
                  <strong>Service Disclaimer:</strong> While we work with logistics partners who uphold professional conduct, we are not liable for any misconduct, mishandling, delays, or service issues by third-party delivery personnel. Any such concerns must be resolved directly with the delivery agent or the logistics company.
                </div>
              </section>

              {/* Order Tracking */}
              <section id="tracking" className="policy-section">
                <h2>Order Tracking</h2>
                <p>
                  Once your order is processed, you will receive a tracking number. You may track your shipment via <a href="https://edhwi.com" target="_blank" rel="noopener noreferrer">edhwi.com</a> or the logistics partner's platform.
                </p>
                <p>
                  Please note that tracking data may experience delays or inaccuracies outside our control.
                </p>
              </section>

              {/* Shipping Fees & Title */}
              <section id="fees" className="policy-section">
                <h2>Shipping Fees, Title, & Risk</h2>
                <p>
                  Shipping fees may apply depending on product type, order value, delivery location, and payment method. These fees are non-refundable except in cases where a defective, damaged, or incorrect item was delivered (after verification and at our sole discretion).
                </p>
                <p>
                  Title and risk of products pass to you upon delivery. For Cash on Delivery orders, logistics partners are authorized to collect payment on our behalf and are governed by our Fees and Payment Policy.
                </p>
              </section>

              {/* Reverse Logistics */}
              <section id="returns" className="policy-section">
                <h2>Returns & Reverse Logistics</h2>
                <p>
                  Return of purchased products is facilitated through our reverse logistics partners. Upon initiating a return request on <a href="https://edhwi.com" target="_blank" rel="noopener noreferrer">edhwi.com</a> and our subsequent approval, our reverse logistics partner will contact you for pickup.
                </p>
                <p>
                  Returns will be handled in accordance with our <strong>Cancellation, Return and Refund Policy</strong>.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact" className="policy-section contact-block">
                <h2>Contact Us</h2>
                <p>If you have questions about shipping, delivery, or reverse logistics, please reach out to us:</p>
                
                <div className="contact-details-card">
                  <div className="detail-row">
                    <CiLocationOn className="detail-icon" />
                    <div>
                      <h5>Corporate Address</h5>
                      <p>
                        THARA INDUSTRIES PRIVATE LIMITED, 1/152-30, ROYAL TRADE CENTRE, BYPASS, Perinthalmanna Junction, Kerala, India, 679322
                      </p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <CiMail className="detail-icon" />
                    <div>
                      <h5>Email Support</h5>
                      <p><a href="mailto:care@edhwi.com">care@edhwi.com</a></p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <FiPhoneCall className="detail-icon" />
                    <div>
                      <h5>Phone Hotlines</h5>
                      <p>(+91) 8589 8585 22 / 44 / 88</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicy;
