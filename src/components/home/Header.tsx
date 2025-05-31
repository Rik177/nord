import React, { useState, useEffect } from 'react';
import { Menu, Search, Phone, Heart, ShoppingCart, ChevronDown, Sun, Moon, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState('Москва');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Initialize theme
    const initializeTheme = () => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setIsDarkMode(storedTheme === 'dark');
        updateTheme(storedTheme === 'dark');
      } else {
        // Check if browser supports matchMedia
        if (window.matchMedia) {
          const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const prefersDark = darkModeQuery.matches;
          setIsDarkMode(prefersDark);
          updateTheme(prefersDark);
          
          // Add listener for theme changes
          try {
            darkModeQuery.addEventListener('change', (e) => {
              if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
                updateTheme(e.matches);
              }
            });
          } catch (e) {
            // Fallback for older browsers
            darkModeQuery.addListener((e) => {
              if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
                updateTheme(e.matches);
              }
            });
          }
        }
      }
    };

    initializeTheme();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const updateTheme = (isDark: boolean) => {
    // Update both html and body elements for better compatibility
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // Force repaint in some browsers
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  };

  const toggleDarkMode = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    updateTheme(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsSearchOpen(false);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'
    }`}>
      {/* Top bar */}
      <div className="bg-primary dark:bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm hover:text-secondary">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{currentCity}</span>
            </button>
            <a href="tel:+71234567890" className="hidden md:flex items-center text-sm hover:text-secondary">
              <Phone className="h-4 w-4 mr-1" />
              <span>+7 (123) 456-78-90</span>
            </a>
          </div>
          <nav className="hidden md:flex space-x-4 text-sm">
            <a href="#about" className="hover:text-secondary">О компании</a>
            <a href="#delivery" className="hover:text-secondary">Доставка</a>
            <a href="#payment" className="hover:text-secondary">Оплата</a>
            <a href="#contacts" className="hover:text-secondary">Контакты</a>
          </nav>
        </div>
      </div>

      {/* Main header */}
      <div className={`transition-colors duration-300 ${
        isScrolled ? 'bg-white dark:bg-gray-900' : 'bg-white/95 dark:bg-gray-900/95'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-1">
              <span className="font-heading font-bold text-2xl text-primary dark:text-white">НОРД</span>
              <span className="font-heading font-bold text-2xl text-secondary">ИНЖИНИРИНГ</span>
            </a>

            {/* Search - desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Поиск по каталогу..."
                  className="w-full py-2 px-4 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900 dark:text-white"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400 hover:text-secondary" />
                </button>
              </div>
            </div>

            {/* Actions - desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white">
                <Heart className="h-6 w-6" />
                <span className="text-xs mt-1">Избранное</span>
              </button>
              <button className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </div>
                <span className="text-xs mt-1">Корзина</span>
              </button>
              <button 
                onClick={toggleDarkMode} 
                className="flex flex-col h-11 w-11 items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                aria-label={isDarkMode ? 'Включить светлую тему' : 'Включить темную тему'}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-6 w-6" />
                    <span className="text-xs mt-1">Светлая</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-6 w-6" />
                    <span className="text-xs mt-1">Темная</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
              aria-label="Открыть меню"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="hidden md:block border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <ul className="flex space-x-8 py-4">
              <li className="relative group">
                <button className="flex items-center text-primary dark:text-white hover:text-secondary">
                  <span className="font-semibold">Каталог</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Вентиляция</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Кондиционирование</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Отопление</a>
                </div>
              </li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-secondary">Бренды</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-secondary">Акции</a></li>
              <li className="relative group">
                <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-secondary">
                  <span>Услуги</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Монтаж</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Проектирование</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Сервис</a>
                </div>
              </li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-secondary">Проекты</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-secondary">Блог</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-secondary">Контакты</a></li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMobileMenu}
      />
      
      <div
        className={`fixed top-0 right-0 w-full max-w-sm h-full bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <span className="font-heading font-bold text-xl text-primary dark:text-white">Меню</span>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
              aria-label="Закрыть меню"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Поиск по каталогу..."
                  className="w-full py-2 px-4 pr-10 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <nav className="space-y-4">
                <a href="#" className="block py-2 text-primary dark:text-white font-semibold">Каталог</a>
                <a href="#" className="block py-2 text-gray-600 dark:text-gray-300">Бренды</a>
                <a href="#" className="block py-2 text-gray-600 dark:text-gray-300">Акции</a>
                <a href="#" className="block py-2 text-gray-600 dark:text-gray-300">Услуги</a>
                <a href="#" className="block py-2 text-gray-600 dark:text-gray-300">Проекты</a>
                <a href="#" className="block py-2 text-gray-600 dark:text-gray-300">Блог</a>
                <a href="#" className="block py-2 text-gray-600 dark:text-gray-300">Контакты</a>
              </nav>

              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <a href="tel:+71234567890" className="flex items-center text-primary dark:text-white mb-4">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+7 (123) 456-78-90</span>
                </a>
                <button className="btn btn-primary w-full mb-4">
                  Заказать звонок
                </button>
                <div className="flex justify-between">
                  <button className="btn btn-outline flex-1 mr-2">
                    <Heart className="h-5 w-5 mr-2" />
                    Избранное
                  </button>
                  <button 
                    onClick={toggleDarkMode}
                    className="btn btn-outline flex-1 ml-2"
                  >
                    {isDarkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                    {isDarkMode ? 'Светлая' : 'Темная'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;