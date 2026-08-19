import React, { useState, useEffect } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import './BlogSub.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BaseUrl from '../../../BaseUrl';

const BlogSub = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/get-blog-posts`);
                if (response.data.success) {
                    // Get only first 3 for home page
                    setBlogs(response.data.blogPosts.slice(0, 3));
                }
            } catch (error) {
                console.error("Error fetching home blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    const stripHtml = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    if (blogs.length === 0) return null;

    return (
        <section className="blog-sub">
            <div className="blog-sub__container">
                <h2 className="blog-sub__header">
                    <span className="blog-sub__highlight">Blogs</span> and updates
                </h2>
                <div className="blog-sub__list">
                    {blogs.map((blog) => (
                        <Link to={`/blogs-inner/${blog.id}`} key={blog.id} className="blog-sub__item">
                            <div className="blog-sub__image-wrapper">
                                <img src={blog.featuredImage || blog.imageUrl || blog.image} alt={blog.title} className="blog-sub__image" />
                            </div>
                            <div className="blog-sub__content">
                                <div className="blog-sub__meta-row">
                                    <span className="blog-sub__meta">
                                        {blog.category || 'Article'} <span className="blog-sub__dot">•</span> {blog.createdAt ? (() => {
                                            const seconds = blog.createdAt._seconds || blog.createdAt.seconds;
                                            return new Date(seconds * 1000).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            });
                                        })() : 'Recent'}
                                    </span>
                                    <div className="blog-sub__icon">
                                        <FiArrowUpRight />
                                    </div>
                                </div>
                                <h3 className="blog-sub__title">{blog.title}</h3>
                                <p className="blog-sub__description">
                                    {(() => {
                                        const rawText = blog.content || blog.description || "";
                                        const cleanText = stripHtml(rawText);
                                        return cleanText.length > 150 ? cleanText.substring(0, 150) + "..." : cleanText;
                                    })()}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSub;
