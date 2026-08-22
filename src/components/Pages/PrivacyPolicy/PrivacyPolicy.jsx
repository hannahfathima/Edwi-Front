import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import './PrivacyPolicy.scss';
import { CiMail, CiLocationOn } from 'react-icons/ci';
import { FiPhoneCall, FiChevronRight } from 'react-icons/fi';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const contentRef = useRef(null);

  const sections = [
    { id: 'overview', title: 'Overview & Scope' },
    { id: 'changes', title: 'Changes to Policy' },
    { id: 'collection', title: 'Information Collection' },
    { id: 'use-info', title: 'How We Use Info' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'disclosure', title: 'Disclosing Information' },
    { id: 'ugc', title: 'User Content & Links' },
    { id: 'children', title: "Children's Data" },
    { id: 'security', title: 'Security & Retention' },
    { id: 'rights', title: 'Your Rights & Choices' },
    { id: 'complaints', title: 'Complaints' },
    { id: 'international', title: 'International Users' },
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
    <div className="privacy-policy-page">
      <Navbar />
      <div className="container-fluid pt-3 pb-1" style={{ maxWidth: '1440px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
          <Link to="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
          <FiChevronRight style={{ fontSize: '12px' }} />
          <span style={{ color: '#13368E', fontWeight: 600 }}>Privacy Policy</span>
        </div>
      </div>
      
      {/* Hero Header */}
      <section className="policy-hero">
        <div className="policy-hero__content">
          <h1>Privacy Policy</h1>
          <p className="policy-hero__subtitle">Your privacy is important to us. Learn how we collect, use, and protect your personal information.</p>
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
              
              {/* Overview & Scope */}
              <section id="overview" className="policy-section">
                <h2>Overview & Scope</h2>
                <p>
                  This Privacy Policy describes how Edhwi (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from <a href="https://edhwi.com" target="_blank" rel="noopener noreferrer">edhwi.com</a> (the "Site") or otherwise communicate with us (collectively, the "Services").
                </p>
                <p>
                  For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
                </p>
                <p>
                  Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
                </p>
              </section>

              {/* Changes */}
              <section id="changes" className="policy-section">
                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.
                </p>
              </section>

              {/* How We Collect and Use */}
              <section id="collection" className="policy-section">
                <h2>How We Collect and Use Your Personal Information</h2>
                <p>
                  To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.
                </p>
                <p>
                  In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
                </p>

                <h3 className="sub-heading">What Personal Information We Collect</h3>
                
                <div className="info-collection-grid">
                  <div className="info-card">
                    <h4>Directly from You</h4>
                    <ul>
                      <li>Name, address, phone number, email</li>
                      <li>Order details including billing/shipping address, payment confirmation</li>
                      <li>Account login credentials</li>
                      <li>Wishlist and cart data</li>
                      <li>Customer support messages</li>
                    </ul>
                  </div>

                  <div className="info-card">
                    <h4>Through Cookies</h4>
                    <p>
                      We collect usage data through cookies, pixels, and similar tracking technologies to understand your interactions with our Services and customize your experience.
                    </p>
                  </div>

                  <div className="info-card">
                    <h4>From Third Parties</h4>
                    <p>We may receive information from:</p>
                    <ul>
                      <li>Payment processors</li>
                      <li>Marketing or analytics vendors</li>
                      <li>Customer service and fulfillment providers</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Info */}
              <section id="use-info" className="policy-section">
                <h2>How We Use Your Personal Information</h2>
                <p>We use your personal information for the following specific purposes:</p>
                <div className="use-list">
                  <div className="use-item">
                    <span className="bullet-num">01</span>
                    <p><strong>Provide & Manage:</strong> To provide and manage the Services, fulfill orders, process payments, and facilitate deliveries.</p>
                  </div>
                  <div className="use-item">
                    <span className="bullet-num">02</span>
                    <p><strong>Communication:</strong> To communicate order updates, delivery tracking, support queries, or system notifications.</p>
                  </div>
                  <div className="use-item">
                    <span className="bullet-num">03</span>
                    <p><strong>Marketing:</strong> For marketing and promotional messages (which you can choose to opt out of at any time).</p>
                  </div>
                  <div className="use-item">
                    <span className="bullet-num">04</span>
                    <p><strong>Security & Fraud:</strong> For fraud detection, system security, compliance, and protection of accounts.</p>
                  </div>
                  <div className="use-item">
                    <span className="bullet-num">05</span>
                    <p><strong>Personalization:</strong> To improve, personalize, and optimize your overall experience on our platform.</p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="policy-section">
                <h2>Cookies & Tracking Technologies</h2>
                <p>
                  We use cookies and similar technologies to operate our Site, understand user behavior, and deliver better services. Cookies help us remember your preferences, track visits, and enable certain shopping functionalities.
                </p>
                <div className="alert-box">
                  <strong>Control:</strong> You may disable cookies via your browser settings, though doing so may affect the functionality of some website features (like saving items in your shopping cart).
                </div>
              </section>

              {/* Disclosing Personal Info */}
              <section id="disclosure" className="policy-section">
                <h2>How We Disclose Personal Information</h2>
                <p>We may share your personal information with third parties in the following circumstances:</p>
                <ul>
                  <li><strong>Service Providers:</strong> IT systems, payment processing, shipping/logistics, marketing platforms.</li>
                  <li><strong>Marketing Partners:</strong> Advertising vendors or platforms to show you relevant offers.</li>
                  <li><strong>Affiliates:</strong> Within our corporate group to align operations.</li>
                  <li><strong>Legal Obligations:</strong> Compliance with courts, regulatory bodies, and law enforcement agencies.</li>
                  <li><strong>Business Transfers:</strong> In connection with corporate transactions such as mergers, acquisitions, or restructuring.</li>
                </ul>
              </section>

              {/* User Generated Content */}
              <section id="ugc" className="policy-section">
                <h2>User Generated Content & Third-Party Links</h2>
                <h3 className="sub-heading">User Generated Content</h3>
                <p>
                  If you post reviews, feedback, or media in public areas of the Services, they may be publicly accessible to all visitors. We are not responsible for how others use or disclose that information.
                </p>
                <h3 className="sub-heading">Third-Party Websites and Links</h3>
                <p>
                  Our Site may contain links to external websites that are not operated or controlled by us. Their privacy practices are not covered by this Policy. We encourage you to review their privacy terms independently.
                </p>
              </section>

              {/* Children's Data */}
              <section id="children" className="policy-section">
                <h2>Children's Data</h2>
                <p>
                  We do not knowingly collect or solicit personal data from children. If you believe a child has provided us with personal data, please contact us immediately, and we will take steps to remove it from our databases.
                </p>
              </section>

              {/* Security and Retention */}
              <section id="security" className="policy-section">
                <h2>Security and Retention of Your Information</h2>
                <p>
                  We use reasonable administrative, technical, and physical measures to protect your data, but please be aware that no transmission over the Internet can be guaranteed as absolutely secure.
                </p>
                <p>
                  We retain your information as long as needed for the purposes described, including to fulfill our legal, accounting, and contractual obligations.
                </p>
              </section>

              {/* Your Rights */}
              <section id="rights" className="policy-section">
                <h2>Your Rights and Choices</h2>
                <p>Depending on your location, you may have legal rights regarding your personal information, which can include:</p>
                <div className="rights-grid">
                  <div className="right-card">
                    <h5>Access / Portability</h5>
                    <p>Request access to or copies of your personal data in a structured format.</p>
                  </div>
                  <div className="right-card">
                    <h5>Rectification</h5>
                    <p>Request correction or updates to incomplete or inaccurate data.</p>
                  </div>
                  <div className="right-card">
                    <h5>Erasure</h5>
                    <p>Request that we delete or erase your personal information from our files.</p>
                  </div>
                  <div className="right-card">
                    <h5>Opt-Out</h5>
                    <p>Withdraw consent or opt out of promotional marketing messages.</p>
                  </div>
                </div>
                <p className="margin-top-s">
                  You may exercise any of these rights by contacting us directly using the details provided below.
                </p>
              </section>

              {/* Complaints */}
              <section id="complaints" className="policy-section">
                <h2>Complaints</h2>
                <p>
                  If you have concerns about our data processing, please contact us. If you are not satisfied with our response, you may lodge a complaint with your local data protection authority.
                </p>
              </section>

              {/* International */}
              <section id="international" className="policy-section">
                <h2>International Users</h2>
                <p>
                  Your data may be transferred, stored, and processed outside your home country. Where required, we utilize approved legal transfer mechanisms and safeguards to ensure your information remains secure.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact" className="policy-section contact-block">
                <h2>Contact Us</h2>
                <p>If you have questions about this policy or wish to exercise your rights, please reach out to us:</p>
                
                <div className="contact-details-card">
                  <div className="detail-row">
                    <CiLocationOn className="detail-icon" />
                    <div>
                      <h5>Corporate Address</h5>
                      <p>Edhwi ventures private limited, Perinthalmanna, Kerala, India, 679322</p>
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

export default PrivacyPolicy;
