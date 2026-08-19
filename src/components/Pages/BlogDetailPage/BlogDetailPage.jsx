import { RiTwitterXLine } from 'react-icons/ri';
import Navbar from '../../Navbar/Navbar';
import './BlogDetailsPage.scss';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RxDotFilled } from 'react-icons/rx';
import { GoLink } from 'react-icons/go';
import axios from 'axios';
import BaseUrl from '../../../../BaseUrl';

const BlogDetailsPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchBlogData = async () => {
            setLoading(true);
            try {
                // Fetch current blog
                const blogRes = await axios.get(`${BaseUrl}/get-blog-post/${id}`);
                if (blogRes.data.success) {
                    setBlog(blogRes.data.blog);
                }

                // Fetch all blogs for "Related Topics"
                const allBlogsRes = await axios.get(`${BaseUrl}/get-blog-posts`);
                if (allBlogsRes.data.success) {
                    // Filter out current blog from related topics
                    setRelatedBlogs(allBlogsRes.data.blogPosts.filter(b => b.id !== id));
                }
            } catch (error) {
                console.error("Error fetching blog details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
        window.scrollTo(0, 0);
    }, [id]);

    const totalPages = Math.ceil(relatedBlogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBlogs = relatedBlogs.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return (
            <div className="BlogDetailsPageMainWrapper">
                <Navbar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <p>Loading Blog Details...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="BlogDetailsPageMainWrapper">
                <Navbar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <p>Blog not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="BlogDetailsPageMainWrapper">
            <Navbar />

            <div className="blog-details-content">
                <h1 className="blog-detail-heading">{blog.title}</h1>

                <div className="blog-details-decription">
                    {blog.description}
                </div>

                <div className="auther-wrapper">
                    <div className="auther-left">
                        <div className="auther-image">
                            <img src="/Images/Men.svg" alt="" />
                        </div>
                        <div className="auther-name">
                            <h6>{blog.author || blog.addedByName}</h6>
                            <p>Edhwi Blog Expert</p>
                        </div>
                    </div>

                    <div className="auther-right">
                        <div className="social-links"><RiTwitterXLine className="social-icon" /></div>
                        <div className="social-links"><FaFacebookF className="social-icon" /></div>
                        <div className="social-links"><FaLinkedinIn className="social-icon" /></div>
                        <div className="social-links"><GoLink className="social-icon" /></div>
                    </div>
                </div>

                <div className="banner">
                    <img src={blog.featuredImage || blog.imageUrl} alt={blog.title} />
                </div>

                <div className="blogs">
                    <div className="blog-content">
                        {/* If content is HTML, use dangerouslySetInnerHTML, otherwise just render text */}
                        {blog.content && (blog.content.includes('<') ? (
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        ) : (
                            <p>{blog.content}</p>
                        ))}
                    </div>
                </div>
            </div>

            {relatedBlogs.length > 0 && (
                <div className="related-topic">
                    <div className="related-topic-header">
                        <h3>Related Topic</h3>

                        <div className="arrows-wrapper">
                            <div
                                className="left-arrow"
                                onClick={handlePrevPage}
                                style={{
                                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                                    opacity: currentPage === 1 ? 0.5 : 1
                                }}
                            >
                                <BsArrowLeftShort className="arrow" />
                            </div>

                            <div
                                className="right-arrow"
                                onClick={handleNextPage}
                                style={{
                                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                                    opacity: currentPage === totalPages ? 0.5 : 1
                                }}
                            >
                                <BsArrowRightShort className="arrow" />
                            </div>
                        </div>
                    </div>

                    <div className="blog-cards-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                {currentBlogs.map((relatedBlog) => (
                                    <div key={relatedBlog.id} className="col-lg-4 col-md-6 col-sm-6 col-12">
                                        <Link to={`/blogs-inner/${relatedBlog.id}`} className="blog-link">
                                            <div className="blog-card">
                                                <div className="blog-image">
                                                    <img
                                                        src={relatedBlog.featuredImage || relatedBlog.imageUrl || relatedBlog.image}
                                                        alt={relatedBlog.title}
                                                    />
                                                </div>

                                                <div className="blog-content">
                                                    <div className="category">
                                                        {relatedBlog.category}
                                                    </div>

                                                    <h2 className="blog-title">
                                                        {relatedBlog.title.slice(0, 40)}{relatedBlog.title.length > 40 ? "..." : ""}
                                                    </h2>

                                                    <h4 className="blog-description">
                                                        {relatedBlog.content ? relatedBlog.content.slice(0, 50) + "..." : relatedBlog.description?.slice(0, 50) + "..."}
                                                    </h4>

                                                    <h5 className="blogged-user">
                                                        {relatedBlog.author || relatedBlog.addedByName}
                                                    </h5>

                                                    <div className="date-wrapper">
                                                        <div className="date">
                                                            {relatedBlog.createdAt ? (() => {
                                                                const seconds = relatedBlog.createdAt._seconds || relatedBlog.createdAt.seconds;
                                                                return new Date(seconds * 1000).toLocaleDateString("en-US", {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                });
                                                            })() : "Recent"}
                                                        </div>

                                                        <div>
                                                            <RxDotFilled className="dot-icon" />
                                                        </div>

                                                        <div className="time">
                                                            {relatedBlog.readTime || "10 Mins read"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogDetailsPage;