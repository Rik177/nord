import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Основные страницы
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Tools from './pages/Tools';
import NotFound from './pages/NotFound';
import Brands from './pages/Brands';

// Страницы каталога
import Catalog from './pages/catalog/Catalog';
import CategoryPage from './pages/catalog/CategoryPage';
import ProductPage from './pages/catalog/ProductPage';
import EnhancedCategoryPage from './pages/catalog/EnhancedCategoryPage';
import EnhancedProductPage from './pages/catalog/EnhancedProductPage';

// Страницы услуг
import Services from './pages/Services';
import Design from './pages/services/Design';
import Installation from './pages/services/Installation';
import Maintenance from './pages/services/Maintenance';
import Warranty from './pages/services/Warranty';

// Страницы о компании
import About from './pages/about/About';
import AboutUs from './pages/about/AboutUs';
import Team from './pages/about/Team';
import Licenses from './pages/about/Licenses';
import Requisites from './pages/about/Requisites';

// Информационные страницы
import Contacts from './pages/Contacts';
import Projects from './pages/Projects';
import Reviews from './pages/Reviews';
import Sales from './pages/Sales';
import FAQ from './pages/FAQ';
import Delivery from './pages/Delivery';
import WarrantyTerms from './pages/WarrantyTerms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

// Компоненты
import AccessibilityControls from './components/shared/AccessibilityControls';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<Home />} />
            
            {/* Блог */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            
            {/* Каталог */}
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:category" element={<EnhancedCategoryPage />} />
            <Route path="/catalog/:category/:productId" element={<EnhancedProductPage />} />
            
            {/* Услуги */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/design" element={<Design />} />
            <Route path="/services/installation" element={<Installation />} />
            <Route path="/services/maintenance" element={<Maintenance />} />
            <Route path="/services/warranty" element={<Warranty />} />
            
            {/* О компании */}
            <Route path="/about" element={<About />} />
            <Route path="/about/about-us" element={<AboutUs />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/about/licenses" element={<Licenses />} />
            <Route path="/about/requisites" element={<Requisites />} />
            
            {/* Основные страницы */}
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/warranty-terms" element={<WarrantyTerms />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/brands" element={<Brands />} />
            
            {/* Юридические страницы */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            
            {/* Страница 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AccessibilityControls />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;