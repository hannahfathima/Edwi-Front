import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { addToCart, setBuyNowItem, resetCheckoutMode } from '../../../redux/slices/cartSlice'
import { fetchProducts } from '../../../redux/slices/dataSlice'
import { addToWishlist, removeFromWishlist, fetchWishlist } from '../../../redux/slices/wishlistSlice'
import { setLoginModalOpen } from '../../../redux/slices/authSlice'
import { toast } from 'react-toastify';
import './ProductPage.scss'
import Navbar from '../../Navbar/Navbar'
import { BsBoxSeam, BsHeadset, BsPlus } from 'react-icons/bs'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import OurPromise from '../../OurPromise/OurPromise'
/* =====================================================
   🔥 STATIC PRODUCT DATA OBJECT
===================================================== */

// Default fallback properties for missing DB data
const defaultProductProps = {
    offers: "",
    features: "Premium Quality | 100% Pure | Cold Pressed | Hygienically packed.",
    description: "Experience the natural freshness of our products, sourced and packed with utmost care.",
    storageInstruction: "Store in a cool, dry place. Keep away from direct sunlight.",
    shelfLife: "12 months from the date of packaging.",
    certification: "FSSAI Approved",
    sizes: ["12", "24", "48", "200 ml", "1 L"]
};

/* =====================================================
   PROCESS DATA
===================================================== */

const processData = {
    title: "100% Pure Coconut Oil",
    steps: [
        {
            image: "/Images/Edhwi-bottle.svg",
            stepNumber: "01",
            title: "Fine & Matured Coconuts",
            description: "Harvested at the perfect age for best quality."
        },
        {
            image: "/Images/Edhwi-bottle.svg",
            stepNumber: "02",
            title: "Premium Quality Copra",
            description: "Extracted gently preserving nutrients and aroma."
        },
        {
            image: "/Images/Edhwi-bottle.svg",
            stepNumber: "03",
            title: "Hygienically Packed",
            description: "Packed without additives or preservatives."
        }
    ]
}

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: cartItems, loading } = useSelector((state) => state.cart);
    const { products, status: productStatus } = useSelector((state) => state.data);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);
    const { token, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
        if (token || user) {
            dispatch(fetchWishlist());
        }
    }, [productStatus, dispatch, token, user]);

    const product = products?.find(p => p.id === id || p.id === parseInt(id));

    // Combine DB data with UI defaults
    const productData = product ? {
        id: product.id,
        name: product.name,
        price: product.sellingPrice || product.price || product.priceNumber || 0,
        mrp: product.mrp || product.price || product.sellingPrice || 0,
        imageUrl: product.imageUrl || (product.images && product.images[0]?.url) || '/Kuppi.svg',
        images: product.images || [],
        offers: product.offers || defaultProductProps.offers,
        features: product.features || defaultProductProps.features,
        description: product.description || defaultProductProps.description,
        storageInstruction: product.storageInstruction || defaultProductProps.storageInstruction,
        shelfLife: product.shelfLife || defaultProductProps.shelfLife,
        certification: product.certification || defaultProductProps.certification,
        sizes: product.variantCombinations?.map(v => v.amount || v.weight || v.volume) || defaultProductProps.sizes
    } : null;

    const [selectedSize, setSelectedSize] = React.useState("12");

    if (productStatus === 'loading') {
        return <div style={{ padding: '100px', textAlign: 'center' }}>Loading product details...</div>;
    }

    if (!productData) {
        return <div style={{ padding: '100px', textAlign: 'center' }}>Product not found.</div>;
    }

    // Check if the current product is already in the cart
    const isProductInCart = cartItems.some(item => item.productId === productData.id.toString() || item.productId === productData.id);
    const isInWishlist = wishlistItems.some(item => item.productId?.toString() === productData.id?.toString() || item.productId == productData.id);

    const handleWishlistToggle = async () => {
        if (!token && !user) {
            dispatch(setLoginModalOpen(true));
            return;
        }

        try {
            if (isInWishlist) {
                await dispatch(removeFromWishlist({ productId: productData.id.toString() })).unwrap();
                toast.info("Product removed from wishlist");
            } else {
                await dispatch(addToWishlist({ productId: productData.id.toString() })).unwrap();
                toast.success("Product added to wishlist!");
            }
        } catch (error) {
            toast.error(error || "Failed to update wishlist");
        }
    };

    const handleCartAction = async () => {
        if (!token && !user) {
            dispatch(setLoginModalOpen(true));
            return;
        }

        if (isProductInCart) {
            navigate('/cart');
        } else {
            try {
                // For now, we assume a static product ID and a quantity of 1 for the 'Buy now' action wrapper.
                await dispatch(addToCart({
                    productId: productData.id.toString(),
                    quantity: 1,
                    sellingPrice: productData.price,
                    mrp: productData.mrp
                })).unwrap();
                toast.success(`${productData.name} added to cart!`);
            } catch (error) {
                toast.error(error || "Failed to add product to cart");
            }
        }
    };

    const handleBuyNow = () => {
        if (!token && !user) {
            dispatch(setLoginModalOpen(true));
            return;
        }

        const checkoutItem = {
            productId: productData.id.toString(),
            quantity: 1,
            productDetails: {
                name: productData.name,
                price: productData.price,
                sellingPrice: productData.price,
                mrp: productData.mrp,
                image: productData.imageUrl
            }
        };

        dispatch(setBuyNowItem(checkoutItem));
        navigate('/address');
    };

    return (
        <div className="Product-page-wrapper">
            <Navbar />
            <div className="container-fluid pt-3 pb-2" style={{ maxWidth: '1440px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
                    <Link to="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
                    <span>›</span>
                    <Link to="/our-products" style={{ color: '#555', textDecoration: 'none' }}>Products</Link>
                    <span>›</span>
                    <span style={{ color: '#13368E', fontWeight: 600 }}>{productData.name}</span>
                </div>
            </div>

            <div className="container-fluid">
                <div className="product-page-sub row">

                    {/* Product Image */}
                    <div className="col-lg-6 col-md-6 col-sm-12 product-page-card" style={{ position: 'relative' }}>
                        <div 
                            className="wishlist-icon-container" 
                            onClick={handleWishlistToggle}
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', cursor: 'pointer', zIndex: 5, padding: '0.5rem', backgroundColor: '#fff', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            {isInWishlist ? <FaHeart style={{ color: '#E3762D', fontSize: '22px' }} /> : <FaRegHeart style={{ color: '#999', fontSize: '22px' }} />}
                        </div>
                        <img src={productData.imageUrl} alt={productData.name} />
                    </div>

                    {/* Product Details */}
                    <div className="col-lg-6 col-md-6 col-sm-12 product-page-contents">
                        <h2>{productData.name}</h2>
                        <p>{productData.features}</p>

                        <p id='price'>Price</p>
                        <div className="price-details-main">
                            {productData.price < productData.mrp ? (
                                <div className="Price-flex">
                                    <h3 className="current-price">₹{productData.price}</h3>
                                    <span className="original-price">₹{productData.mrp}</span>
                                    <span id='offers'> {productData.offers}</span>
                                </div>
                            ) : (
                                <h3 className="price-range">
                                    ₹{productData.price}
                                    {productData.mrp > productData.price && <span className="original-price">₹{productData.mrp}</span>}
                                    <span id='offers'> {productData.offers}</span>
                                </h3>
                            )}
                        </div>

                        {/* Packing Size Selector */}
                        <div className="packing-selector-container">
                            <h4 className="packageing-select">Select packing size</h4>
                            <div className="size-options mt-3">
                                {productData.sizes.map((size) => (
                                    <React.Fragment key={size}>
                                        <button
                                            className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                        {size === "48" && <div className="size-divider"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="Bulk-sections mt-4">
                            <div className="bulk-sections-content">
                                <div className="icons-bulk">
                                    <BsBoxSeam size={20} color="#000000ff" />
                                </div>
                                <div className="contents">
                                    Bulk orders available for all products, customized to your requirements.
                                </div>
                            </div>
                            <div className="bulk-sections-content">
                                <div className="icons-bulk">
                                    <BsHeadset size={20} color="#1c1c1c" />
                                </div>
                                <div className="contents">
                                    Full customer support and all necessary product documents provided for your convenience.
                                </div>
                            </div>
                        </div>

                        {/* Buttons (UI) */}
                        <div className='buy-now-container'>
                            <button className='add-to-cart-btn btn' onClick={handleCartAction} disabled={loading && !isProductInCart}>
                                {isProductInCart ? 'Go to Cart' : (loading ? 'Adding...' : 'Add to cart')}
                            </button>
                            <button className='buy-now-btn btn' onClick={handleBuyNow}>
                                Buy Now
                            </button>
                        </div>

                    </div>
                </div>

                {/* Description Section */}
                <div className="text-only-product row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 text-sections-whole">
                        <p>{productData.description}</p>
                        <h6>Storage Instructions : <span>{productData.storageInstruction}</span></h6>
                        <h6>Shelf Life : <span>{productData.shelfLife}</span></h6>
                        <h6>Certifications : <span>{productData.certification}</span></h6>
                    </div>
                </div>

                {/* Additional Images */}
                {productData.images && productData.images.length > 0 && (
                    <div className="row image-whole-section">
                        {productData.images.map((image, index) => (
                            <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className='card-image-section'>
                                    <img src={image.url || image} alt={`Product image ${index + 1}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <OurPromise />
                </div>



                {/* Process Section */}
                <div className="container">
                    <div className="our-process-main-section">
                        {/* <h3 className='process'>Our process</h3> */}
                        {/* <p className='Virgin'>{processData.title}</p> */}

                        {/* <div className="row">
                            {processData.steps.map((step, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="cards-n-images-section">
                                        <img src={step.image} alt={step.title} />
                                        <p className='steps-only'>Step {step.stepNumber}</p>
                                        <h6 className='Handpicked'>{step.title}</h6>
                                        <p className='para-process'>{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div> */}

                        <h3 className='Other-pro'>Other products</h3>

                        <div className="row">
                            {products
                                ?.filter(item => item.id !== productData.id)
                                .slice(0, 3)
                                .map((item) => (
                                <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                                    <div 
                                        className="other-product-card" 
                                        onClick={() => {
                                            navigate(`/Product-page/${item.id}`);
                                            window.scrollTo(0, 0);
                                        }} 
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="other-product-image">
                                            <img src={item.imageUrl || (item.images && item.images[0]?.url) || '/Kuppi.svg'} alt={item.name} />
                                            <div className="add-to-cart-btn" onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/Product-page/${item.id}`);
                                                window.scrollTo(0, 0);
                                            }}>
                                                <BsPlus />
                                            </div>
                                        </div>
                                        <div className="other-product-details">
                                            <h5>{item.name}</h5>
                                            <p className="other-product-features">Available in <span>{item.variantCombinations && item.variantCombinations.length > 0 ? (item.variantCombinations[0].amount || item.variantCombinations[0].weight || item.variantCombinations[0].volume) : (item.sizes ? item.sizes[0] : 'Various Sizes')}</span></p>
                                            <div className="other-product-price-details">
                                                {(() => {
                                                    const currentPrice = item.sellingPrice || item.price || item.priceNumber || 0;
                                                    const originalPrice = item.mrp || currentPrice;
                                                    
                                                    return currentPrice < originalPrice ? (
                                                        <div className="Price-flex">
                                                            <span className="current-price">₹{currentPrice}</span>
                                                            <span className="original-price">₹{originalPrice}</span>
                                                        </div>
                                                    ) : (
                                                        <p className="other-product-price">
                                                            ₹{currentPrice}
                                                            {originalPrice > currentPrice && <span className="original-price" style={{ textDecoration: 'line-through', marginLeft: '8px', fontSize: '0.85em', color: '#888' }}>₹{originalPrice}</span>}
                                                        </p>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProductPage