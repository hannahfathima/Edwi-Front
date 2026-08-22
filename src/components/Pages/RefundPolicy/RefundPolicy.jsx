import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import './RefundPolicy.scss';
import { CiMail, CiLocationOn, CiCalendar } from 'react-icons/ci';
import { FiPhoneCall, FiChevronRight, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const RefundPolicy = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const contentRef = useRef(null);

  const sections = [
    { id: 'overview', title: 'Return Policy Overview' },
    { id: 'eligibility', title: 'Eligibility Criteria' },
    { id: 'process', title: 'Return Process' },
    { id: 'damages', title: 'Damages & Issues' },
    { id: 'exceptions', title: 'Non-Returnable Items' },
    { id: 'exchanges', title: 'Exchanges' },
    { id: 'refunds', title: 'Refund Timeline' },
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
    <div className="refund-policy-page">
      <Navbar />
      <div className="container-fluid pt-3 pb-1" style={{ maxWidth: '1440px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
          <Link to="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
          <FiChevronRight style={{ fontSize: '12px' }} />
          <span style={{ color: '#13368E', fontWeight: 600 }}>Refund Policy</span>
        </div>
      </div>
      
      {/* Hero Header */}
      <section className="policy-hero">
        <div className="policy-hero__content">
          <h1>Refund & Return Policy</h1>
          <p className="policy-hero__subtitle">Find detailed information about our 7-day return policy, eligibility criteria, and refund timelines.</p>
          <div className="policy-hero__meta">
            <span>Last Updated: July 1, 2026</span>
          </div>
        </div>
      </section>

      {/* Main Layout Container */}
      <section className="policy-layout-container">
        <div className="policy-layout">
          {/* Navigation Sidebar */}
          <aside className="policy-sidebar">
            <div className="policy-sidebar__sticky">
              <h3>Return Sections</h3>
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
              
              {/* Return Policy Overview */}
              <section id="overview" className="policy-section">
                <h2>Return Policy Overview</h2>
                <div className="overview-highlight">
                  <div className="overview-highlight__icon-box">
                    <CiCalendar className="calendar-icon" />
                  </div>
                  <div className="overview-highlight__text">
                    <h3>7-Day Return Window</h3>
                    <p>
                      We have a <strong>7-day return policy</strong>, which means you have <strong>7 days</strong> after receiving your item to request a return.
                    </p>
                  </div>
                </div>
                <p className="margin-top-m">
                  To start a return, you can contact us at <a href="mailto:sales@edhwi.com">sales@edhwi.com</a>. Please note that all returns must be requested and approved before sending items back to us. Items sent back to us without first requesting a return will not be accepted.
                </p>
              </section>

              {/* Eligibility Criteria */}
              <section id="eligibility" className="policy-section">
                <h2>Eligibility Criteria</h2>
                <p>To ensure your return is accepted, please make sure the item meets all of the following conditions:</p>
                
                <div className="eligibility-list">
                  <div className="eligibility-item">
                    <FiCheckCircle className="check-icon" />
                    <span>Same condition as received (unworn or unused)</span>
                  </div>
                  <div className="eligibility-item">
                    <FiCheckCircle className="check-icon" />
                    <span>Tags must remain attached</span>
                  </div>
                  <div className="eligibility-item">
                    <FiCheckCircle className="check-icon" />
                    <span>In original packaging</span>
                  </div>
                  <div className="eligibility-item">
                    <FiCheckCircle className="check-icon" />
                    <span>Proof of purchase or receipt is required</span>
                  </div>
                </div>
              </section>

              {/* Return Process Timeline */}
              <section id="process" className="policy-section">
                <h2>Return Process</h2>
                <p>Follow these steps to complete a return:</p>

                <div className="process-timeline">
                  <div className="timeline-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Request Return</h4>
                      <p>Contact us at <a href="mailto:sales@edhwi.com">sales@edhwi.com</a> with your order number and proof of purchase.</p>
                    </div>
                  </div>

                  <div className="timeline-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Get Approval & Shipping Label</h4>
                      <p>If your return is accepted, we'll send you a return shipping label, as well as detailed instructions on how and where to send your package.</p>
                    </div>
                  </div>

                  <div className="timeline-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Ship the Package</h4>
                      <p>Pack the item securely and send it to our physical dispatch center address:</p>
                      <div className="address-snippet">
                        <strong>THARA INDUSTRIES PRIVATE LIMITED</strong><br />
                        1/152-30, ROYAL TRADE CENTRE, BYPASS,<br />
                        Perinthalmanna Junction, Kerala, 679322
                      </div>
                    </div>
                  </div>

                  <div className="timeline-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Inspection & Refund</h4>
                      <p>Once we receive and inspect your package, we'll notify you if the refund was approved. If approved, it is processed automatically.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Damages & Issues */}
              <section id="damages" className="policy-section">
                <h2>Damages & Issues</h2>
                <p>
                  Please inspect your order upon reception. Contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
                </p>
                <div className="alert-box alert-box--warning">
                  <FiAlertTriangle className="alert-icon" />
                  <div>
                    <strong>Immediate Action Required:</strong> Take photos or videos of the packaging and product if you notice damages, and mail them to us for swift resolution.
                  </div>
                </div>
              </section>

              {/* Non-Returnable Items */}
              <section id="exceptions" className="policy-section">
                <h2>Non-Returnable & Exceptions</h2>
                <p>Certain types of items cannot be returned under any circumstances. Please review the categories below:</p>
                
                <div className="exceptions-grid">
                  <div className="exception-card">
                    <h4>Perishable Goods</h4>
                    <p>Food items, fresh flowers, or live plants.</p>
                  </div>
                  <div className="exception-card">
                    <h4>Custom & Special Products</h4>
                    <p>Special orders or personalized/customized items.</p>
                  </div>
                  <div className="exception-card">
                    <h4>Personal Care Products</h4>
                    <p>Beauty, cosmetics, or personal care goods.</p>
                  </div>
                  <div className="exception-card">
                    <h4>Hazardous Materials</h4>
                    <p>Flammable liquids, gases, or chemicals.</p>
                  </div>
                </div>

                <div className="alert-box alert-box--danger margin-top-m">
                  Unfortunately, we cannot accept returns on <strong>sale items</strong> or <strong>gift cards</strong>.
                </div>
              </section>

              {/* Exchanges */}
              <section id="exchanges" className="policy-section">
                <h2>Exchanges</h2>
                <p>
                  The fastest way to ensure you get what you want is to return the item you have. Once the return is accepted, make a separate purchase for the new item.
                </p>
              </section>

              {/* Refund Timeline */}
              <section id="refunds" className="policy-section">
                <h2>Refund Timeline & Details</h2>
                <p>
                  We will notify you once we've received and inspected your return and let you know if the refund was approved or not.
                </p>
                <div className="timeline-highlight">
                  <div className="timeline-stat">
                    <span className="stat-num">10</span>
                    <span className="stat-label">Business Days</span>
                    <p>Typical duration to receive refunds on your original payment method after approval.</p>
                  </div>
                  <div className="timeline-stat">
                    <span className="stat-num">15+</span>
                    <span className="stat-label">Business Days</span>
                    <p>If this duration has passed and you haven't received it, please check with your bank or contact us.</p>
                  </div>
                </div>
                <p className="margin-top-m">
                  Please remember it can take some time for your bank or credit card company to process and post the refund. If more than 15 business days have passed since we approved your return, contact us immediately.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact" className="policy-section contact-block">
                <h2>Contact Us</h2>
                <p>For any questions regarding returns, refunds, or support, please reach out to our team:</p>
                
                <div className="contact-details-card">
                  <div className="detail-row">
                    <CiLocationOn className="detail-icon" />
                    <div>
                      <h5>Return Center Address</h5>
                      <p>THARA INDUSTRIES PRIVATE LIMITED, 1/152-30, ROYAL TRADE CENTRE, BYPASS, Perinthalmanna Junction, Kerala, 679322</p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <CiMail className="detail-icon" />
                    <div>
                      <h5>Support Emails</h5>
                      <p>
                        Returns: <a href="mailto:sales@edhwi.com">sales@edhwi.com</a> <br />
                        General Queries: <a href="mailto:care@edhwi.com">care@edhwi.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <FiPhoneCall className="detail-icon" />
                    <div>
                      <h5>Help Lines</h5>
                      <p>(+91) 8589 8585 88 / 22 / 44</p>
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

export default RefundPolicy;
