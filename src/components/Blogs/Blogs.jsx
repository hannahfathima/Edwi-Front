import React, { useState, useEffect } from 'react';
import './Blogs.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/get-blog-posts`);
                if (response.data.success) {
                    setBlogs(response.data.blogPosts);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
        console.log(blogs);

    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div className="loader">Loading Blogs...</div>
                </div>
            </>
        );
    }

    const stripHtml = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <>
            <Navbar />
            <section className="blogs">
                <div className="blogs__container">
                    <div className="blogs__header">
                        <h2><span className="blogs__highlight">Our</span> Blogs</h2>
                    </div>

                    <div className="blogs__grid">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <Link to={`/blogs-inner/${blog.id}`} key={blog.id} className="blogs__card-link">
                                    <div className="blogs__card">
                                        <div className="blogs__image-container">
                                            <img src={blog.featuredImage || blog.imageUrl || blog.image} alt={blog.title} className="blogs__image" />
                                        </div>

                                        <div className="blogs__content">
                                            <div className="blogs__category">
                                                {blog.category}
                                            </div>

                                            <h3 className="blogs__title">{blog.title}</h3>

                                            <p className="blogs__description">
                                                {(() => {
                                                    const rawText = blog.content || blog.description || "";
                                                    const cleanText = stripHtml(rawText);
                                                    return cleanText.length > 100 ? cleanText.substring(0, 100) + "..." : cleanText;
                                                })()}
                                            </p>

                                            <div className="blogs__footer">
                                                <span className="blogs__author">{blog.author}</span>
                                                <div className="blogs__meta">
                                                    <span>
                                                        {blog.createdAt ? (() => {
                                                            const seconds = blog.createdAt._seconds || blog.createdAt.seconds;
                                                            return new Date(seconds * 1000).toLocaleDateString('en-US', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            });
                                                        })() : blog.date}
                                                    </span>
                                                    <span className="blogs__dot">•</span>
                                                    <span>{blog.readTime || "10 Mins read"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="no-blogs">No blogs found.</div>
                        )}
                    </div>

                    <div className="blogs__pagination">
                        <button className="blogs__pagination-btn prev" aria-label="Previous page">
                            <FiChevronLeft />
                        </button>
                        <button className="blogs__pagination-btn active" aria-label="Page 1">
                            1
                        </button>
                        <button className="blogs__pagination-btn next" aria-label="Next page">
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blogs;
