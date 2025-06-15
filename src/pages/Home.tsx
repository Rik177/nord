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
    "logo": {
      "@type": "ImageObject",
      "url": "https://nordengineering.ru/images/logo.png",
      "width": 300,
      "height": 100
    },
    "description": "Профессиональные решения в области вентиляции и климатического оборудования. Проектирование, монтаж и обслуживание систем любой сложности с 2005 года.",
    "foundingDate": "2005",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Примерная, д. 123",
      "addressLocality": "Москва",
      "postalCode": "123456",
      "addressCountry": "RU",
      "addressRegion": "Москва"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+7-123-456-78-90",
        "contactType": "customer service",
        "availableLanguage": "Russian",
        "areaServed": "RU",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": "+7-123-456-78-90",
        "contactType": "technical support",
        "availableLanguage": "Russian"
      }
    ],
    "sameAs": [
      "https://wa.me/71234567890",
      "https://t.me/nordengineering"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Климатическое оборудование",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Проектирование систем вентиляции",
            "description": "Профессиональное проектирование вентиляционных систем"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Монтаж кондиционеров",
            "description": "Установка и настройка кондиционеров всех типов"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Сервисное обслуживание",
            "description": "Регулярное обслуживание климатического оборудования"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Александр Петров"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Отличное качество оборудования и монтажа, всегда соблюдаются сроки."
      }
    ]
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://nordengineering.ru/"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        title="НОРДИНЖИНИРИНГ - Климатическое оборудование и вентиляция в Москве"
        description="Профессиональные решения в области вентиляции и кондиционирования с 2005 года. Проектирование, монтаж, обслуживание. 1000+ проектов, гарантия до 5 лет. ☎ +7 (123) 456-78-90"
        keywords="вентиляция москва, кондиционеры москва, климатическое оборудование, монтаж кондиционеров, проектирование вентиляции, обслуживание кондиционеров, тепловые завесы, приточная вентиляция"
        canonical="https://nordengineering.ru/"
        ogTitle="НОРДИНЖИНИРИНГ - Лидер в области климатических решений в Москве"
        ogDescription="18+ лет опыта в области климатического оборудования. Полный цикл услуг от проектирования до обслуживания. Более 5000 довольных клиентов."
        ogImage="https://nordengineering.ru/images/og-home.jpg"
        structuredData={[structuredData, breadcrumbStructuredData]}
        author="НОРДИНЖИНИРИНГ"
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