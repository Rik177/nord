import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Catalog from './pages/catalog/Catalog';
import CategoryPage from './pages/catalog/CategoryPage';
import ProductPage from './pages/catalog/ProductPage';
import Services from './pages/Services';
import Design from './pages/services/Design';
import Installation from './pages/services/Installation';
import Maintenance from './pages/services/Maintenance';
import Warranty from './pages/services/Warranty';
import Projects from './pages/Projects';
import About from './pages/about/About';
import AboutUs from './pages/about/AboutUs';
import Team from './pages/about/Team';
import Licenses from './pages/about/Licenses';
import Requisites from './pages/about/Requisites';
import Careers from './pages/about/Careers';
import Sales from './pages/Sales';
import Reviews from './pages/Reviews';
import Tools from './pages/Tools';
import Contacts from './pages/Contacts';
import FAQ from './pages/FAQ';
import Delivery from './pages/Delivery';
import WarrantyTerms from './pages/WarrantyTerms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import ChatWidget from './components/shared/ChatWidget';
import QuickCallButton from './components/shared/QuickCallButton';
import FloatingCallButton from './components/shared/FloatingCallButton';
import ComparisonButton from './components/shared/ComparisonButton';
import ProductComparison from './components/catalog/ProductComparison';
import { useComparison } from './hooks/useComparison';

function App() {
  const { 
    comparisonProducts, 
    isComparisonOpen, 
    removeFromComparison, 
    closeComparison 
  } = useComparison();

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:category" element={<CategoryPage />} />
            <Route path="/catalog/:category/:productId" element={<ProductPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/design" element={<Design />} />
            <Route path="/services/installation" element={<Installation />} />
            <Route path="/services/maintenance" element={<Maintenance />} />
            <Route path="/services/warranty" element={<Warranty />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/about-us" element={<AboutUs />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/about/licenses" element={<Licenses />} />
            <Route path="/about/requisites" element={<Requisites />} />
            <Route path="/about/careers" element={<Careers />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/warranty-terms" element={<WarrantyTerms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>
          <ChatWidget />
          <QuickCallButton />
          {/* <FloatingCallButton /> */}
          <ComparisonButton />
          
          <ProductComparison
            isOpen={isComparisonOpen}
            onClose={closeComparison}
            products={comparisonProducts}
            onRemoveProduct={removeFromComparison}
            onAddProduct={() => {
              // Navigate to catalog or show product selection
              window.location.href = '/catalog';
            }}
          />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;