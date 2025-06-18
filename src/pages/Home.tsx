import React, { useEffect } from "react";
import SEOHelmet from "../components/shared/SEOHelmet";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import HeroSlider from "../components/home/HeroSlider";
import AdvancedFeatures from "../components/home/AdvancedFeatures";
import CompanyMap from "../components/home/CompanyMap";
import Features from "../components/home/Features";
import Categories from "../components/home/Categories";
import PopularProducts from "../components/home/PopularProducts";
import FrequentlyOrdered from "../components/home/FrequentlyOrdered";
import Services from "../components/home/Services";
import AboutCompany from "../components/home/AboutCompany";
import LatestProjects from "../components/home/LatestProjects";
import RecommendationLetters from "../components/home/RecommendationLetters";
import { TestimonialsSection } from "../components/home/Testimonials";
import Partners from "../components/home/Partners";
import ContactForm from "../components/home/ContactForm";
import ChatWidget from "../components/shared/ChatWidget";
import QuickCallButton from "../components/shared/QuickCallButton";
import ComparisonButton from "../components/shared/ComparisonButton";
import { seoPages } from "../utils/seo";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "../utils/schema";
import { initPerformanceOptimizations, registerServiceWorker } from "../utils/performanceOptimizations";

function Home() {
  useEffect(() => {
    // Инициализация оптимизаций производительности
    initPerformanceOptimizations();
    
    // Регистрация Service Worker
    registerServiceWorker();
    
    // Предзагрузка критических ресурсов
    const preloadLinks = [
      { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
      { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' },
      { href: 'https://images.pexels.com', rel: 'preconnect' }
    ];
    
    preloadLinks.forEach(link => {
      const linkElement = document.createElement('link');
      Object.assign(linkElement, link);
      document.head.appendChild(linkElement);
    });
  }, []);

  const combinedStructuredData = [
    organizationSchema,
    websiteSchema,
    localBusinessSchema,
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet {...seoPages.home} structuredData={combinedStructuredData} />
      <Header />
      <main id="main-content" className="pt-[169px]">
        <HeroSlider />
        <div className="content-visibility-auto">
          <AdvancedFeatures />
        </div>
        <div className="content-visibility-auto">
          <CompanyMap />
        </div>
        <div className="content-visibility-auto">
          <Categories />
        </div>
        <div className="content-visibility-auto">
          <PopularProducts />
        </div>
        <div className="content-visibility-auto">
          <FrequentlyOrdered />
        </div>
        <div className="content-visibility-auto">
          <Services />
        </div>
        <div className="content-visibility-auto">
          <AboutCompany />
        </div>
        <div className="content-visibility-auto">
          <LatestProjects />
        </div>
        <div className="content-visibility-auto">
          <RecommendationLetters />
        </div>
        <div className="content-visibility-auto">
          <TestimonialsSection />
        </div>
        <div className="content-visibility-auto">
          <Partners />
        </div>
        <div className="content-visibility-auto">
          <ContactForm />
        </div>
      </main>
      <Footer />
      
      {/* Floating accessibility and interaction elements */}
      <ChatWidget />
      <QuickCallButton />
      <ComparisonButton />
    </div>
  );
}

export default Home;