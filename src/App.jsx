
import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MyAccount from './components/MyAccount/MyAccount';
import HomeBanner from './components/HomeBanner/HomeBanner';
import Essentials from './components/Essentials/Essentials';
import PuritySection from './components/PuritySection/PuritySection';
import SecretsOfQuality from './components/SecretsOfQuality/SecretsOfQuality';
import OurProducts from './components/OurProducts/OurProducts';
import OurProcess from './components/OurProcess/OurProcess';
import EdhwiMoments from './components/EdhwiMoments/EdhwiMoments';
import OurPromise from './components/OurPromise/OurPromise';
import VideoBanner from './components/VideoBanner/VideoBanner';
import Blogs from './components/Blogs/Blogs';
import ExploreProducts from "./components/Pages/ExploreProducts/ExploreProducts";
import ProductPage from "./components/Pages/Productpage/ProductPage";
import Gallery from "./components/Pages/Gallery/Gallery";
import Footer from "./components/Common/Footer/Footer";
import Cart from "./components/Pages/Cart/Cart";
import Address from "./components/Pages/Address/Address";
import Payment from "./components/Pages/Payment/Payment";
import ContactUs from "./components/Pages/ContactUs/ContactUs";
import BlogSub from './components/BlogSub/BlogSub';
import PaymentSuccess from './components/Pages/PaymentSuccess/PaymentSuccess';
import ScrollToTop from './components/ScrollToTop';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useFetchData from './hooks/useFetchData';
import BlogDetailsPage from "./components/Pages/BlogDetailPage/BlogDetailPage";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Aboutus from "./components/Pages/About Us/Aboutus";
import Yellow from "./components/Yellow/Yellow";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "./components/Pages/RefundPolicy/RefundPolicy";
import ShippingPolicy from "./components/Pages/ShippingPolicy/ShippingPolicy";
import TermsOfService from "./components/Pages/TermsOfService/TermsOfService";
import FAQ from "./components/Pages/FAQ/FAQ";

function App() {
  useFetchData();

  return (
    <GoogleOAuthProvider clientId="92081015383-af95va678bpn24ssfdh1qs2h3otm7cbq.apps.googleusercontent.com">
      <div className="app">
        {/* Global Navbar removed: <Navbar /> */}

        <ScrollToTop />
        <Routes> {/* 🔹 NEW: Routes section */}

          {/* 🔹 Home Page */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomeBanner />

                <Essentials />
                <PuritySection />
                <SecretsOfQuality />
                <Yellow />
                <OurProducts />
                <OurProcess />
                <EdhwiMoments />
                <OurPromise />
                <VideoBanner />
                <BlogSub />

              </>
            }
          />

          {/* 🔹 Blogs Page */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/blogs-inner/:id" element={<BlogDetailsPage />} />

          {/* 🔹 My Account Page */}
          <Route path="/my-account" element={<MyAccount />} />

          <Route path="/our-products" element={<ExploreProducts />} />

          <Route path='/Product-page/:id' element={<ProductPage />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/address' element={<Address />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/refund-policy' element={<RefundPolicy />} />
          <Route path='/shipping-policy' element={<ShippingPolicy />} />
          <Route path='/terms-of-service' element={<TermsOfService />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/faqs' element={<FAQ />} />

          <Route path='/payment-success' element={<PaymentSuccess />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;