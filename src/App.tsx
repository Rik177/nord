import React from 'react';
import Header from './components/home/Header';
import Footer from './components/home/Footer';
import HeroSlider from './components/home/HeroSlider';
import CompanyMap from './components/home/CompanyMap';
import Features from './components/home/Features';
import Categories from './components/home/Categories';
import PopularProducts from './components/home/PopularProducts';
import Services from './components/home/Services';
import AboutCompany from './components/home/AboutCompany';
import RecommendationLetters from './components/home/RecommendationLetters';
import Partners from './components/home/Partners';
import ContactForm from './components/home/ContactForm';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <HeroSlider />
        <CompanyMap />
        <Features />
        <Categories />
        <PopularProducts />
        <Services />
        <AboutCompany />
        <RecommendationLetters />
        <Partners />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;