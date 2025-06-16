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
import { seoPages } from "../utils/seo";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "../utils/schema";
import { initPerformanceOptimizations } from "../utils/performance";

function Home() {
  useEffect(() => {
    initPerformanceOptimizations();
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
      <main className="pt-[213px]">
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
