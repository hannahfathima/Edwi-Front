import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import BaseUrl from '../../../../BaseUrl';
import './FAQ.scss';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch only dynamic categories and FAQs from backend API
  useEffect(() => {
    let isMounted = true;

    const fetchDynamicFaqs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BaseUrl}/faq-categories-with-faqs`);
        if (res.data?.success && Array.isArray(res.data?.data)) {
          if (isMounted) {
            const apiCategories = res.data.data.map((cat) => ({
              id: cat.id || cat.faqCategoryId || cat.customId,
              name: cat.name || cat.categoryName || 'General',
              faqs: Array.isArray(cat.faqs) ? cat.faqs : []
            }));

            setCategories(apiCategories);

            if (apiCategories.length > 0) {
              setActiveCategoryId(apiCategories[0].id);
              if (apiCategories[0].faqs?.length > 0) {
                setExpandedId(apiCategories[0].faqs[0].id || apiCategories[0].faqs[0].faqId);
              }
            }
          }
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDynamicFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Filter dynamic FAQs based on search query or active category
  const filteredFaqs = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    if (trimmedQuery) {
      const allResults = [];
      categories.forEach((cat) => {
        (cat.faqs || []).forEach((faq) => {
          const q = faq.question || '';
          const a = faq.answer || '';
          if (
            q.toLowerCase().includes(trimmedQuery) ||
            a.toLowerCase().includes(trimmedQuery)
          ) {
            allResults.push({
              ...faq,
              categoryName: cat.name
            });
          }
        });
      });
      return allResults;
    }

    const currentCategory = categories.find((c) => c.id === activeCategoryId);
    const list = currentCategory ? currentCategory.faqs || [] : [];
    if (showAll) {
      return list;
    }
    return list.slice(0, 5);
  }, [searchQuery, categories, activeCategoryId, showAll]);

  const handleCardClick = (type) => {
    if (type === 'order') {
      const orderCat = categories.find((c) =>
        c.name.toLowerCase().includes('order')
      );
      if (orderCat) {
        setActiveCategoryId(orderCat.id);
        setShowAll(true);
      } else {
        setSearchQuery('order');
      }
      const target = document.getElementById('faq-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (type === 'cancel') {
      const cancelCat = categories.find(
        (c) =>
          c.name.toLowerCase().includes('cancel') ||
          c.name.toLowerCase().includes('return')
      );
      if (cancelCat) {
        setActiveCategoryId(cancelCat.id);
        setShowAll(true);
      } else {
        setSearchQuery('cancel');
      }
      const target = document.getElementById('faq-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (type === 'contact') {
      window.open('https://wa.me/918589858522', '_blank');
    }
  };

  const activeCategoryObj = categories.find((c) => c.id === activeCategoryId);
  const totalFaqsInActiveCategory = activeCategoryObj?.faqs?.length || 0;

  return (
    <div className="faq-page">
      <Navbar />

      {/* Hero Section with #EBF9FF background */}
      <section className="faq-hero-section">
        <div className="faq-hero-container">
          <h1 className="faq-hero__greeting">Hello!</h1>
          <p className="faq-hero__subheading">How can we help?</p>

          {/* Search Box */}
          <div className="faq-search-wrapper">
            <div className="faq-search-input-box">
              <input
                type="text"
                className="faq-search-input"
                placeholder="Search help topics"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="faq-search-icon">
                <FiSearch />
              </span>
            </div>
          </div>

          {/* 3 Action / Help Cards with User Vectors */}
          <div className="faq-cards-grid">
            {/* Card 1: Where's my order? */}
            <div
              className="faq-card"
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick('order')}
            >
              <div className="faq-card__icon-wrapper">
                <img
                  src="/Images/faq/faq-order.png"
                  alt="Where's my order"
                  className="faq-card__vector-img"
                />
              </div>
              <h3 className="faq-card__title">Where's my order?</h3>
              <p className="faq-card__desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </p>
            </div>

            {/* Card 2: Cancel or edit order */}
            <div
              className="faq-card"
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick('cancel')}
            >
              <div className="faq-card__icon-wrapper">
                <img
                  src="/Images/faq/faq-cancel.png"
                  alt="Cancel or edit order"
                  className="faq-card__vector-img"
                />
              </div>
              <h3 className="faq-card__title">Cancel or edit order</h3>
              <p className="faq-card__desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </p>
            </div>

            {/* Card 3: Contact Us */}
            <div
              className="faq-card"
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick('contact')}
            >
              <div className="faq-card__icon-wrapper">
                <img
                  src="/Images/faq/faq-whatsapp.png"
                  alt="Contact Us"
                  className="faq-card__vector-img"
                />
              </div>
              <h3 className="faq-card__title">Contact Us</h3>
              <p className="faq-card__desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section on Clean White Background */}
      <section id="faq-section" className="faq-accordion-section">
        <div className="faq-accordion-container">
          {/* Main FAQ Title with gradient */}
          <h2 className="faq-title">
            Frequently asked
            <br />
            questions!
          </h2>

          {/* Dynamic Category Filter Pills (hidden while searching) */}
          {!searchQuery && categories.length > 0 && (
            <div className="faq-categories-scroll">
              <div className="faq-categories-list">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`faq-cat-btn ${activeCategoryId === cat.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategoryId(cat.id);
                      setShowAll(false);
                      const firstFaq = (cat.faqs || [])[0];
                      if (firstFaq) {
                        setExpandedId(firstFaq.id || firstFaq.faqId);
                      } else {
                        setExpandedId(null);
                      }
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Accordion Questions List */}
          <div className="faq-accordion-list">
            {loading ? (
              <div className="faq-loading-state">
                <div className="faq-spinner"></div>
                <p>Loading FAQs...</p>
              </div>
            ) : filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const faqId = faq.id || faq.faqId;
                const isOpen = expandedId === faqId;
                return (
                  <div
                    key={faqId}
                    className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  >
                    <div
                      className="faq-item__header"
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleAccordion(faqId)}
                    >
                      <span className="faq-item__question">{faq.question}</span>
                      <button
                        type="button"
                        className={`faq-item__toggle-btn ${isOpen ? 'active' : ''}`}
                        aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                      >
                        {isOpen ? (
                          <svg width="14" height="3" viewBox="0 0 14 3" fill="none">
                            <rect width="14" height="2.8" rx="1.4" fill="white" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <rect x="5.6" width="2.8" height="14" rx="1.4" fill="#94A3B8" />
                            <rect y="5.6" width="14" height="2.8" rx="1.4" fill="#94A3B8" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="faq-item__body">
                        <p className="faq-item__answer">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="faq-empty-state">
                {searchQuery ? (
                  <>
                    <p>No questions found matching "{searchQuery}".</p>
                    <button
                      type="button"
                      className="faq-clear-search-btn"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  <p>No FAQs available for this category.</p>
                )}
              </div>
            )}
          </div>

          {/* View More / View Less Link */}
          {!searchQuery && totalFaqsInActiveCategory > 5 && (
            <div className="faq-view-more-container">
              <button
                type="button"
                className="faq-view-more-link"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? 'View less' : 'View more'}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
