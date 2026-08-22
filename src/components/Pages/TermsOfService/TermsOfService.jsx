import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import './TermsOfService.scss';
import { CiMail, CiLocationOn } from 'react-icons/ci';
import { FiPhoneCall, FiChevronRight } from 'react-icons/fi';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const contentRef = useRef(null);

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'sec1', title: '1. Online Store Terms' },
    { id: 'sec2', title: '2. General Conditions' },
    { id: 'sec3', title: '3. Info Accuracy' },
    { id: 'sec4', title: '4. Price & Modifications' },
    { id: 'sec5', title: '5. Products & Services' },
    { id: 'sec6', title: '6. Billing & Account' },
    { id: 'sec7', title: '7. Optional Tools' },
    { id: 'sec8', title: '8. Third-Party Links' },
    { id: 'sec9', title: '9. Comments & Feedback' },
    { id: 'sec10', title: '10. Personal Info' },
    { id: 'sec11', title: '11. Errors & Omissions' },
    { id: 'sec12', title: '12. Prohibited Uses' },
    { id: 'sec13', title: '13. Disclaimer & Liability' },
    { id: 'sec14', title: '14. Indemnification' },
    { id: 'sec15', title: '15. Severability' },
    { id: 'sec16', title: '16. Termination' },
    { id: 'sec17', title: '17. Entire Agreement' },
    { id: 'sec18', title: '18. Governing Law' },
    { id: 'sec19', title: '19. Changes to Terms' },
    { id: 'sec20', title: '20. Contact Info' }
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
    <div className="terms-of-service-page">
      <Navbar />
      <div className="container-fluid pt-3 pb-1" style={{ maxWidth: '1440px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
          <Link to="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
          <FiChevronRight style={{ fontSize: '12px' }} />
          <span style={{ color: '#13368E', fontWeight: 600 }}>Terms of Service</span>
        </div>
      </div>
      
      {/* Hero Header */}
      <section className="policy-hero">
        <div className="policy-hero__content">
          <h1>Terms of Service</h1>
          <p className="policy-hero__subtitle">Please read these Terms of Service carefully before accessing or using our website.</p>
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
              
              {/* Overview */}
              <section id="overview" className="policy-section">
                <h2>Overview</h2>
                <p>
                  This website is operated by Edhwi. Throughout the site, the terms "we", "us" and "our" refer to Edhwi. Edhwi offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                </p>
                <p>
                  By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
                </p>
                <p>
                  Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any Services.
                </p>
                <p>
                  Any new features or tools which are added to the current store shall also be subject to the Terms of Service. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes.
                </p>
              </section>

              {/* Section 1 */}
              <section id="sec1" className="policy-section">
                <h2>Section 1 - Online Store Terms</h2>
                <p>
                  By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                </p>
                <p>
                  You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
                </p>
                <p>
                  You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.
                </p>
              </section>

              {/* Section 2 */}
              <section id="sec2" className="policy-section">
                <h2>Section 2 - General Conditions</h2>
                <p>
                  We reserve the right to refuse Service to anyone for any reason at any time.
                </p>
                <p>
                  You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks and changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
                </p>
                <p>
                  You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the Service is provided, without express written permission by us.
                </p>
              </section>

              {/* Section 3 */}
              <section id="sec3" className="policy-section">
                <h2>Section 3 - Accuracy, Completeness and Timeliness of Information</h2>
                <p>
                  We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information.
                </p>
              </section>

              {/* Section 4 */}
              <section id="sec4" className="policy-section">
                <h2>Section 4 - Modifications to the Service and Prices</h2>
                <p>
                  Prices for our products are subject to change without notice.
                </p>
                <p>
                  We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                </p>
                <p>
                  We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                </p>
              </section>

              {/* Section 5 */}
              <section id="sec5" className="policy-section">
                <h2>Section 5 - Products or Services</h2>
                <p>
                  Certain products or Services may be available exclusively online through the website. These products or Services may have limited quantities and are subject to return or exchange only according to our Refund Policy.
                </p>
                <p>
                  We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
                </p>
                <p>
                  We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction.
                </p>
              </section>

              {/* Section 6 */}
              <section id="sec6" className="policy-section">
                <h2>Section 6 - Accuracy of Billing and Account Information</h2>
                <p>
                  We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.
                </p>
                <p>
                  You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.
                </p>
              </section>

              {/* Section 7 */}
              <section id="sec7" className="policy-section">
                <h2>Section 7 - Optional Tools</h2>
                <p>
                  We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. Use of such tools is entirely at your own risk and discretion.
                </p>
              </section>

              {/* Section 8 */}
              <section id="sec8" className="policy-section">
                <h2>Section 8 - Third-Party Links</h2>
                <p>
                  Certain content, products and Services available via our Service may include materials from third-parties.
                </p>
                <p>
                  Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not liable for any harm or damages related to the purchase or use of goods or services from third-party websites.
                </p>
              </section>

              {/* Section 9 */}
              <section id="sec9" className="policy-section">
                <h2>Section 9 - User Comments, Feedback and Other Submissions</h2>
                <p>
                  If you send creative ideas, suggestions, or other materials, you agree that we may, at any time, without restriction, edit, copy, publish, and distribute those comments. We may monitor or remove content that we determine to be unlawful or offensive.
                </p>
              </section>

              {/* Section 10 */}
              <section id="sec10" className="policy-section">
                <h2>Section 10 - Personal Information</h2>
                <p>
                  Your submission of personal information through the store is governed by our Privacy Policy.
                </p>
              </section>

              {/* Section 11 */}
              <section id="sec11" className="policy-section">
                <h2>Section 11 - Errors, Inaccuracies and Omissions</h2>
                <p>
                  Occasionally there may be information on our site that contains typographical errors, inaccuracies or omissions. We reserve the right to correct any errors and to change or update information or cancel orders if any information in the Service is inaccurate at any time without prior notice.
                </p>
              </section>

              {/* Section 12 */}
              <section id="sec12" className="policy-section">
                <h2>Section 12 - Prohibited Uses</h2>
                <p>
                  In addition to other prohibitions set forth in the Terms of Service, you are prohibited from using the site or its content:
                </p>
                <ul>
                  <li>For any unlawful purpose</li>
                  <li>To infringe upon or violate our intellectual property rights</li>
                  <li>To harass, abuse, insult, or discriminate</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To collect or track the personal information of others</li>
                  <li>For any obscene or immoral purpose</li>
                </ul>
              </section>

              {/* Section 13 */}
              <section id="sec13" className="policy-section">
                <h2>Section 13 - Disclaimer of Warranties; Limitation of Liability</h2>
                <p>
                  We do not guarantee that your use of our Service will be uninterrupted, timely, secure or error-free. You expressly agree that your use of, or inability to use, the Service is at your sole risk.
                </p>
                <p>
                  In no case shall Edhwi, our directors, officers, employees, or affiliates be liable for any injury, loss, claim, or any direct, indirect, incidental, or consequential damages of any kind.
                </p>
              </section>

              {/* Section 14 */}
              <section id="sec14" className="policy-section">
                <h2>Section 14 - Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Edhwi and our parent, subsidiaries, and partners from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service.
                </p>
              </section>

              {/* Section 15 */}
              <section id="sec15" className="policy-section">
                <h2>Section 15 - Severability</h2>
                <p>
                  In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law.
                </p>
              </section>

              {/* Section 16 */}
              <section id="sec16" className="policy-section">
                <h2>Section 16 - Termination</h2>
                <p>
                  The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement. These Terms of Service are effective unless and until terminated by either you or us.
                </p>
              </section>

              {/* Section 17 */}
              <section id="sec17" className="policy-section">
                <h2>Section 17 - Entire Agreement</h2>
                <p>
                  The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision. These Terms of Service constitute the entire agreement and understanding between you and us.
                </p>
              </section>

              {/* Section 18 */}
              <section id="sec18" className="policy-section">
                <h2>Section 18 - Governing Law</h2>
                <p>
                  These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.
                </p>
              </section>

              {/* Section 19 */}
              <section id="sec19" className="policy-section">
                <h2>Section 19 - Changes to Terms of Service</h2>
                <p>
                  You can review the most current version of the Terms of Service at any time at this page. We reserve the right to update, change or replace any part of these Terms by posting updates and changes to our website.
                </p>
              </section>

              {/* Section 20 */}
              <section id="sec20" className="policy-section contact-block">
                <h2>Section 20 - Contact Information</h2>
                <p>Questions about the Terms of Service should be sent to us at:</p>
                
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

export default TermsOfService;
