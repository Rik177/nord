import React from 'react';
import SEOHelmet from '../components/shared/SEOHelmet';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import HeroSlider from '../components/home/HeroSlider';
import AdvancedFeatures from '../components/home/AdvancedFeatures';
import CompanyMap from '../components/home/CompanyMap';
import Features from '../components/home/Features';
import Categories from '../components/home/Categories';
import PopularProducts from '../components/home/PopularProducts';
import FrequentlyOrdered from '../components/home/FrequentlyOrdered';
import Services from '../components/home/Services';
import AboutCompany from '../components/home/AboutCompany';
import LatestProjects from '../components/home/LatestProjects';
import RecommendationLetters from '../components/home/RecommendationLetters';
import { TestimonialsSection } from '../components/home/Testimonials';
import Partners from '../components/home/Partners';
import ContactForm from '../components/home/ContactForm';

function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "НОРДИНЖИНИРИНГ",
    "url": "https://nordengineering.ru",
    "logo": "https://nordengineering.ru/logo.png",
    "description": "Профессиональные решения в области вентиляции и климатического оборудования. Проектирование, монтаж и обслуживание систем любой сложности.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Примерная, д. 123",
      "addressLocality": "Москва",
      "postalCode": "123456",
      "addressCountry": "RU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-123-456-78-90",
      "contactType": "customer service",
      "availableLanguage": "Russian"
    },
    "sameAs": [
      "https://wa.me/71234567890",
      "https://t.me/nordengineering"
    ]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title="НОРДИНЖИНИРИНГ - Вентиляционное и климатическое оборудование"
        description="Профессиональные решения в области вентиляции и климатического оборудования. Проектирование, монтаж и обслуживание систем любой сложности. 18+ лет опыта, 1000+ проектов."
        keywords="вентиляция, кондиционирование, климатическое оборудование, монтаж, проектирование, обслуживание, Москва"
        canonical="https://nordengineering.ru/"
        ogTitle="НОРДИНЖИНИРИНГ - Лидер в области климатических решений"
        ogDescription="Профессиональные решения в области вентиляции и климатического оборудования с 2005 года. Полный цикл услуг от проектирования до обслуживания."
        ogImage="https://nordengineering.ru/og-home.jpg"
        structuredData={structuredData}
      />
      <Header />
      <main className='pt-[213px]'>
        <HeroSlider />
        <AdvancedFeatures />
        <CompanyMap />
        <Categories />
        <PopularProducts />
        <FrequentlyOrdered />
        <Services />
        <AboutCompany />
        <LatestProjects />
        <RecommendationLetters />
        <TestimonialsSection />
        <Partners />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default Home;