import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './ExploreProducts.scss'
import { VscSettings } from 'react-icons/vsc'
import ProductSidebarMobile from '../../Theams/MobileProductSidebar/ProductSidebarMobile'
import { GoPlus } from "react-icons/go";
import { Link } from 'react-router-dom'
// import Breadcrumb from '../../common/BreadCrumb/BreadCrumb'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
import Productsidebar from '../../Theams/ProductSidebar/Productsidebar'
import Navbar from '../../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../redux/slices/dataSlice'
import { addToWishlist, removeFromWishlist } from '../../../redux/slices/wishlistSlice'
import { addToCart } from '../../../redux/slices/cartSlice'
import { setLoginModalOpen } from '../../../redux/slices/authSlice'
import ToastModal from '../../common/ToastModal/ToastModal'

const ExploreProducts = () => {
    const breadcrumbItems = [
        { label: 'Homepage', path: '/' },
        { label: 'Products', path: '/ExploreProducts' }
    ];

    const [sideBarIsOpen, setSidebarIsOpen] = useState(true);
    const [mobileSideBarIsOpen, setMobileSideBarIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Cart state - loaded from Redux
    const [loadingProducts, setLoadingProducts] = useState(new Set());

    // Toast state
    const [toastConfig, setToastConfig] = useState({
        isOpen: false,
        message: '',
        type: 'success'
    });

    // Wishlist state is now handled globally via Redux

    const [currentFilters, setCurrentFilters] = useState({
        categories: [],
        price: [],
        colors: []
    });

    const [sortBy, setSortBy] = useState('name');

    // Redux state
    const dispatch = useDispatch();
    const { products: reduxProducts, status } = useSelector((state) => state.data);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);
    const { token, user } = useSelector((state) => state.auth);
    const { items: cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    // Use Redux products, fallback to empty array
    const allProductsData = reduxProducts || [];

    const dynamicCategories = useMemo(() => {
        const catMap = new Map();
        allProductsData.forEach(product => {
            if (product.categoryId && product.categoryName) {
                catMap.set(product.categoryId, product.categoryName);
            }
        });
        const categories = [{ id: 'all', name: 'All Categories' }];
        catMap.forEach((name, id) => {
            categories.push({ id: id.toString(), name });
        });
        return categories;
    }, [allProductsData]);

    const dynamicMobileCategories = useMemo(() => {
        const categories = new Set(['All']);
        allProductsData.forEach(product => {
            if (product.categoryName) {
                categories.add(product.categoryName);
            }
        });
        return Array.from(categories);
    }, [allProductsData]);
    const handleWishlistToggle = useCallback((e, productId) => {
        e.preventDefault();
        e.stopPropagation();

        if (!token && !user) {
            dispatch(setLoginModalOpen(true));
            return;
        }

        const isInWishlist = wishlistItems.some(item => item.productId?.toString() === productId?.toString() || item.productId == productId);
        
        if (isInWishlist) {
            dispatch(removeFromWishlist({ productId })).then(() => {
                setToastConfig({
                    isOpen: true,
                    message: 'Product removed from wishlist!',
                    type: 'error'
                });
            });
        } else {
            dispatch(addToWishlist({ productId })).then(() => {
                setToastConfig({
                    isOpen: true,
                    message: 'Product added to wishlist!',
                    type: 'success'
                });
            });
        }
    }, [wishlistItems, dispatch, token, user]);

    // Get wishlist icon based on Redux state
    const getWishlistIcon = useCallback((productId) => {
        const isInWishlist = wishlistItems.some(item => item.productId?.toString() === productId?.toString() || item.productId == productId);
        return (
            <div className="wishlist-icon-container">
                {isInWishlist ?
                    <FaHeart className='heart-icon filled' /> :
                    <FaRegHeart className='heart-icon unfilled' />
                }
            </div>
        );
    }, [wishlistItems]);

    // Cart toggle via Redux
    const handleAddToCart = useCallback(async (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        if (!token && !user) {
            dispatch(setLoginModalOpen(true));
            return;
        }

        setLoadingProducts(prev => new Set(prev).add(product.id));

        let variantCombination = null;
        if (product.variantCombinations && product.variantCombinations.length > 0) {
            variantCombination = product.variantCombinations[0].amount || product.variantCombinations[0].weight || product.variantCombinations[0].volume;
        } else if (product.sizes && product.sizes.length > 0) {
            variantCombination = product.sizes[0];
        }

        try {
            await dispatch(addToCart({
                productId: product.id.toString(),
                quantity: 1,
                sellingPrice: product.sellingPrice || product.price,
                mrp: product.mrp || product.price,
                ...(variantCombination && { variantCombination })
            })).unwrap();

            setToastConfig({
                isOpen: true,
                message: 'Product added to cart!',
                type: 'success'
            });

        } catch (error) {
            setToastConfig({
                isOpen: true,
                message: error || 'Failed to add product to cart',
                type: 'error'
            });
        } finally {
            setLoadingProducts(prev => {
                const newSet = new Set(prev);
                newSet.delete(product.id);
                return newSet;
            });
        }
    }, [dispatch, token, user]);

    // Get cart button content
    const getAddButtonContent = useCallback((productId) => {
        if (loadingProducts.has(productId)) {
            return <div className="spinner-border spinner-border-sm" role="status" style={{color: '#4CAF50'}} />;
        }

        const isProductInCart = cartItems.some(item => item.productId === productId?.toString() || item.productId === productId);
        if (isProductInCart) {
            return <FaCheck className='check-icon' style={{ color: '#4CAF50' }} />;
        }
        return <GoPlus className='add-icon' />;
    }, [cartItems, loadingProducts]);

    // Apply filters and sorting
    const products = useMemo(() => {
        let filtered = [...allProductsData];

        // Filter by categories
        if (currentFilters.categories.length > 0 && !currentFilters.categories.includes('all')) {
            filtered = filtered.filter(product =>
                currentFilters.categories.includes(product.categoryId) ||
                currentFilters.categories.includes(product.categoryName)
            );
        }

        // Filter by price ranges
        if (currentFilters.price.length > 0) {
            filtered = filtered.filter(product => {
                const productPrice = product.price || product.sellingPrice || 0;
                return currentFilters.price.some(priceRange => {
                    switch (priceRange) {
                        case '₹0 - ₹100': return productPrice >= 0 && productPrice <= 100;
                        case '₹100 - ₹300': return productPrice > 100 && productPrice <= 300;
                        case '₹300 - ₹500': return productPrice > 300 && productPrice <= 500;
                        case '₹500 - ₹1000': return productPrice > 500 && productPrice <= 1000;
                        case '₹1000+': return productPrice > 1000;
                        default: return true;
                    }
                });
            });
        }

        // Filter by colors
        if (currentFilters.colors.length > 0) {
            filtered = filtered.filter(product => {
                if (!product.variantCombinations || product.variantCombinations.length === 0) return false;
                return product.variantCombinations.some(variant =>
                    currentFilters.colors.some(selectedColor =>
                        variant.color && variant.color.toLowerCase() === selectedColor.toLowerCase()
                    )
                );
            });
        }

        // Sort
        switch (sortBy) {
            case 'price-low-to-high':
                filtered.sort((a, b) => (a.price || a.sellingPrice || 0) - (b.price || b.sellingPrice || 0));
                break;
            case 'price-high-to-low':
                filtered.sort((a, b) => (b.price || b.sellingPrice || 0) - (a.price || a.sellingPrice || 0));
                break;
            case 'name':
            default:
                filtered.sort((a, b) => {
                    const nameA = a.name || '';
                    const nameB = b.name || '';
                    return nameA.localeCompare(nameB);
                });
                break;
        }

        return filtered;
    }, [allProductsData, currentFilters, sortBy]);

    // Check if screen is mobile size
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                setSidebarIsOpen(false);
            } else {
                setMobileSideBarIsOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleSideBar = useCallback(() => {
        if (isMobile) {
            setMobileSideBarIsOpen(prev => !prev);
        } else {
            setSidebarIsOpen(prev => !prev);
        }
    }, [isMobile]);

    const handleMobileSideBar = useCallback(() => {
        setMobileSideBarIsOpen(prev => !prev);
    }, []);

    const handleSortChange = useCallback((event) => {
        const value = event.target.value;
        switch (value) {
            case 'lowToHigh': setSortBy('price-low-to-high'); break;
            case 'highToLow': setSortBy('price-high-to-low'); break;
            case 'newest': setSortBy('newest'); break;
            default: setSortBy('name');
        }
    }, []);

    const handleFiltersChange = useCallback((sidebarFilters) => {
        setCurrentFilters(sidebarFilters);
    }, []);

    const clearFilters = useCallback(() => {
        setCurrentFilters({ categories: [], price: [], colors: [] });
        setSortBy('name');
    }, []);

    // Memoize column class
    const columnClass = useMemo(() => {
        if (isMobile) return "col-6";
        return sideBarIsOpen ? "col-lg-4 col-md-6 col-sm-12" : "col-lg-3 col-md-6 col-sm-12";
    }, [isMobile, sideBarIsOpen]);

    // Memoize product chunking
    const productRows = useMemo(() => {
        const productsPerRow = isMobile ? 2 : (sideBarIsOpen ? 3 : 4);
        const chunks = [];
        for (let i = 0; i < products.length; i += productsPerRow) {
            chunks.push(products.slice(i, i + productsPerRow));
        }
        return chunks;
    }, [products, isMobile, sideBarIsOpen]);

    return (
        <div className='Explore-Main-wrapper'>
            {/* <ScrollToTopOnMount /> */}
            <Navbar />

            <div className="explore-contents">
                <div className="breadcrumb-section-Explore">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-separator">›</span>
                    <span className="breadcrumb-current">Products</span>
                </div>

                <div className="Head-and-filter-main-flex">
                    <div className="heading-section-explore">
                        <h3>Explore our Products</h3>
                        <div className="choose-section">
                            <p>Choose products {products.length > 0 && `(${products.length} items)`}</p>
                        </div>
                    </div>

                    <div className="fiiter-section-explore-child-flex">
                        <div className="filters-section-e" onClick={handleSideBar}>
                            <p>
                                {isMobile
                                    ? (mobileSideBarIsOpen ? "Hide Filters" : "Show Filters")
                                    : (sideBarIsOpen ? "Hide Filters" : "Show Filters")
                                }
                                <VscSettings />
                            </p>
                        </div>

                        <div className="filters-section-e">
                            <select
                                id="sortDropdown"
                                className="sort-dropdown"
                                value={
                                    sortBy === 'price-low-to-high' ? 'lowToHigh' :
                                        sortBy === 'price-high-to-low' ? 'highToLow' :
                                            sortBy === 'newest' ? 'newest' : 'name'
                                }
                                onChange={handleSortChange}
                            >
                                <option value="name">Sort By</option>
                                <option value="lowToHigh">Price Low to High</option>
                                <option value="highToLow">Price High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="cards-and-filter">
                    {!isMobile && sideBarIsOpen && (
                        <div className="left-side">
                            <Productsidebar onFiltersChange={handleFiltersChange} categories={dynamicCategories} />
                        </div>
                    )}

                    {isMobile && (
                        <ProductSidebarMobile
                            isOpen={mobileSideBarIsOpen}
                            onToggle={handleMobileSideBar}
                            showTriggerButton={false}
                            onFiltersChange={handleFiltersChange}
                            categoriesData={dynamicMobileCategories}
                        />
                    )}

                    <div className="cards-whole-three right-side">
                        {productRows?.map((row, rowIndex) => (
                            <div key={rowIndex} className="row three-cards">
                                {row?.map((product) => (
                                    <div key={product.id} className={columnClass}>
                                        <Link to={`/Product-page/${product.id}`} className='Right-side-link'>
                                            <div className="product-card-main">
                                                <div className="product-card">
                                                    <div className="prod-image-section">
                                                        <div
                                                            className="heart-icon-section"
                                                            onClick={(e) => handleWishlistToggle(e, product.id)}
                                                        >
                                                            {getWishlistIcon(product.id)}
                                                        </div>
                                                        <img src={product.imageUrl || (product.images && product.images[0]?.url) || '/Kuppi.svg'} alt={product.name} />
                                                        <div
                                                            className={`add-icon-wrapper ${cartItems.some(item => item.productId === product.id?.toString() || item.productId === product.id) ? 'in-cart' : ''}`}
                                                            onClick={(e) => handleAddToCart(e, product)}
                                                            title={cartItems.some(item => item.productId === product.id?.toString() || item.productId === product.id) ? 'Added to cart' : 'Add to cart'}
                                                        >
                                                            {getAddButtonContent(product.id)}
                                                        </div>
                                                    </div>
                                                    <div className="product-details">
                                                        <h3>{product.name}</h3>
                                                        <p className='Available-section'>
                                                            {product.variantCombinations?.length > 0 ? (
                                                                <>Available in <b>{product.variantCombinations?.[0]?.weight || product.variantCombinations?.[0]?.volume || product.variantCombinations?.[0]?.amount || ''}</b></>
                                                            ) : (
                                                                '\u00A0'
                                                            )}
                                                        </p>
                                                        <div className="price-details-card">
                                                            {(() => {
                                                                const displayPrice = product.sellingPrice || product.price || 0;
                                                                const originalPrice = product.mrp || product.price || displayPrice;

                                                                return displayPrice < originalPrice ? (
                                                                    <div className="Price-flex">
                                                                        <p className="current-price">₹{displayPrice}</p>
                                                                        <p className="original-price">₹{originalPrice}</p>
                                                                    </div>
                                                                ) : (
                                                                    <h4 className="current-price">
                                                                        ₹{displayPrice}
                                                                        {originalPrice > displayPrice && <span className="original-price" style={{ textDecoration: 'line-through', marginLeft: '8px', fontSize: '0.85em', color: '#888' }}>₹{originalPrice}</span>}
                                                                    </h4>
                                                                );
                                                            })()}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {products.length === 0 && (
                            <div className='loading' style={{ textAlign: 'center', padding: '50px' }}>
                                <p>No products found matching your criteria.</p>
                                <button onClick={clearFilters}>
                                    Clear Filters <BsArrowUpRightCircleFill className='btn-icon' />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ToastModal 
                isOpen={toastConfig.isOpen} 
                message={toastConfig.message} 
                type={toastConfig.type} 
                onClose={() => setToastConfig(prev => ({ ...prev, isOpen: false }))} 
            />

        </div>
    );
}

export default ExploreProducts