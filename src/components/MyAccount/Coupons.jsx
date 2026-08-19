import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoupons } from '../../redux/slices/couponSlice';
import './Coupons.scss';

const Coupons = () => {
    const dispatch = useDispatch();
    const { items: couponsData, status } = useSelector((state) => state.coupons);

    useEffect(() => {
        dispatch(fetchCoupons());
        console.log(couponsData,"couponsData");
    }, [dispatch]);

    const formatValidity = (dateString) => {
        if (!dateString) return 'No Expiry';
        const date = new Date(dateString);
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    if (status === 'loading') {
        return (
            <section className="dashboard-section coupons-page">
                <h2 className="section-heading">COUPONS</h2>
                <div className="coupons-list-container">
                    <p>Loading coupons...</p>
                </div>
            </section>
        );
    }

    if (status === 'failed') {
        return (
            <section className="dashboard-section coupons-page">
                <h2 className="section-heading">COUPONS</h2>
                <div className="coupons-list-container">
                    <p>Failed to load coupons. Please try again later.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="dashboard-section coupons-page">
            <h2 className="section-heading">COUPONS</h2>
            <div className="coupons-list-container">
                {couponsData && couponsData.length > 0 ? (
                    couponsData.map((coupon) => (
                        <div className="coupon-item" key={coupon.id || coupon._id}>
                            <div className="coupon-left">
                                <span className="promo-text">Promo Code</span>
                                <span className="promo-code">{coupon.code || coupon.couponCode}</span>
                            </div>
                            <div className="coupon-divider">
                                <div className="discount-circle">
                                    <span className="discount-amount">
                                        {coupon.discountValue}
                                        {coupon.discountType === 'percentage' ? '%' : '₹'}
                                    </span>
                                    <span className="discount-off">OFF</span>
                                </div>
                            </div>
                            <div className="coupon-right">
                                <p className="coupon-description">{coupon.description || `Get ${coupon.discountValue}${coupon.discountType === 'percentage' ? '%' : '₹'} off on your purchase`}</p>
                                <p className="coupon-validity">
                                    <span className="validity-text">Validity</span>
                                    <span className="validity-date">{formatValidity(coupon.validUntil)}</span>
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No active coupons available at the moment.</p>
                )}
            </div>
        </section>
    );
};

export default Coupons;
