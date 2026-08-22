import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa6';
import { GoPlus } from "react-icons/go";
import { FaCheck } from 'react-icons/fa';
import { removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import ToastModal from '../common/ToastModal/ToastModal';
import './Wishlist.scss';

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: wishlistItems, loading } = useSelector((state) => state.wishlist);
    const { items: cartItems } = useSelector((state) => state.cart);
    const { products: allProducts } = useSelector((state) => state.data);

    // Toast state
    const [toastConfig, setToastConfig] = React.useState({
        isOpen: false,
        message: '',
        type: 'success'
    });

    const handleRemoveFromWishlist = useCallback((e, productId) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        dispatch(removeFromWishlist({ productId })).then(() => {
            setToastConfig({
                isOpen: true,
                message: 'Product removed from wishlist!',
                type: 'error'
            });
        });
    }, [dispatch]);

    const handleAddToCart = useCallback((e, productId) => {
        e.preventDefault();
        e.stopPropagation();
        // Default quantity 1, if there are specific variants they could be passed here.
        dispatch(addToCart({ productId, quantity: 1 }));
    }, [dispatch]);

    const handleProductClick = useCallback((productId) => {
        if (productId) {
            navigate(`/Product-page/${productId}`);
        }
    }, [navigate]);

    const getAddButtonContent = useCallback((productId) => {
        const isProductInCart = cartItems.some(item => item.productId === productId);
        if (isProductInCart) {
            return <FaCheck className='check-icon' style={{ color: '#4CAF50' }} />;
        }
        return <GoPlus className='add-icon' />;
    }, [cartItems]);

    return (
        <div className="wishlist-container">
            <h2 className="wishlist-heading">Wishlist</h2>
            <div className="wishlist-grid">
                {loading && wishlistItems.length === 0 ? (
                    <div className="empty-wishlist">Loading your wishlist...</div>
                ) : (
                    wishlistItems.map((wishlistItem) => {
                        // Cross-reference with backend's returned product or allProducts to get missing details
                        const productRef = wishlistItem.product || allProducts?.find(p => p.id?.toString() === wishlistItem.productId?.toString() || p.id == wishlistItem.productId) || {};
                        const targetProductId = wishlistItem.productId || wishlistItem.product?.id || productRef.id;
                        
                        const displayImage = wishlistItem.productImage || productRef.imageUrl || (productRef.images && productRef.images[0]?.url) || '/Kuppi.svg';
                        const displayName = wishlistItem.productName || wishlistItem.name || productRef.name || 'Product';
                        const displayPrice = wishlistItem.sellingPrice || wishlistItem.price || productRef.sellingPrice || productRef.price || 0;
                        const originalPrice = wishlistItem.mrp || productRef.mrp || displayPrice;
                        const displayVolume = (wishlistItem.volumes && wishlistItem.volumes[0]) || (productRef.variantCombinations && productRef.variantCombinations[0]?.amount) || '1L';

                        return (
                            <div 
                                className="wishlist-card" 
                                key={wishlistItem.productId}
                                onClick={() => handleProductClick(targetProductId)}
                            >
                                <div className="card-image-wrapper">
                                    <button 
                                        className="remove-btn" 
                                        onClick={(e) => handleRemoveFromWishlist(e, wishlistItem.productId)}
                                        title="Remove from wishlist"
                                    >
                                        <FaHeart className="heart-icon filled" />
                                    </button>
                                    <img src={displayImage} alt={displayName} />
                                    <button 
                                        className="add-to-cart-btn" 
                                        title={cartItems.some(item => item.productId === wishlistItem.productId) ? "Added to cart" : "Add to cart"}
                                        onClick={(e) => handleAddToCart(e, wishlistItem.productId)}
                                    >
                                        {getAddButtonContent(wishlistItem.productId)}
                                    </button>
                                </div>
                                <div className="card-details">
                                    <h3>{displayName}</h3>
                                    <p>Available in {displayVolume}</p>
                                    <div className="price-details-wishlist">
                                        {displayPrice < originalPrice ? (
                                            <div className="Price-flex">
                                                <span className="current-price">₹{displayPrice}</span>
                                                <span className="original-price">₹{originalPrice}</span>
                                            </div>
                                        ) : (
                                            <div className="price">
                                                ₹{displayPrice}
                                                {originalPrice > displayPrice && <span className="original-price" style={{ textDecoration: 'line-through', marginLeft: '8px', fontSize: '0.85em', color: '#888' }}>₹{originalPrice}</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
                {!loading && wishlistItems.length === 0 && (
                    <div className="empty-wishlist">Your wishlist is empty.</div>
                )}
            </div>

            <ToastModal 
                isOpen={toastConfig.isOpen} 
                message={toastConfig.message} 
                type={toastConfig.type} 
                onClose={() => setToastConfig(prev => ({ ...prev, isOpen: false }))} 
            />
        </div>
    );
};

export default Wishlist;
