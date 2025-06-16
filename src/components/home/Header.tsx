import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Phone, Heart, ChevronDown, Sun, Moon, MapPin, Building2, Box, Wrench, FolderOpen, Award } from 'lucide-react';
import GlobalSearch from '../shared/GlobalSearch';
import ConsultationForm, { ConsultationFormData } from '../catalog/ConsultationForm';

interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  submenu?: {
    label: string;
    path: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    label: 'О компании',
    path: '/about',
    icon: <Building2 className="h-5 w-5" />,
    submenu: [
      { label: 'О нас', path: '/about/about-us' },
      { label: 'Наша команда', path: '/about/team' },
      { label: 'Лицензии и сертификаты', path: '/about/licenses' },
      { label: 'Реквизиты', path: '/about/requisites' }
    ]
  },
  {
    label: 'Каталог',
    path: '/catalog',
    icon: <Box className="h-5 w-5" />,
    submenu: [
      { label: 'Вентиляционное оборудование', path: '/catalog/ventilation' },
      { label: 'Кондиционеры', path: '/catalog/air-conditioning' },
      { label: 'Отопительное оборудование', path: '/catalog/heating' },
      { label: 'Тепловые завесы', path: '/catalog/curtains' },
      { label: 'Аксессуары и комплектующие', path: '/catalog/accessories' }
    ]
  },
  {
    label: 'Услуги',
    path: '/services',
    icon: <Wrench className="h-5 w-5" />,
    submenu: [
      { label: 'Проектирование', path: '/services/design' },
      { label: 'Монтаж', path: '/services/installation' },
      { label: 'Сервисное обслуживание', path: '/services/maintenance' },
      { label: 'Гарантийный ремонт', path: '/services/warranty' }
    ]
  },
  {
    label: 'Проекты',
    path: '/projects',
    icon: <FolderOpen className="h-5 w-5" />
  },
  {
    label: 'Бренды',
    path: '/brands',
    icon: <Award className="h-5 w-5" />
  }
];

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState('Москва');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

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
  };

  const openGlobalSearch = () => {
    setIsGlobalSearchOpen(true);
  };

  const closeGlobalSearch = () => {
    setIsGlobalSearchOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation form submitted:', formData);
    setShowConsultationForm(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <>
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
            <a 
              href="https://wa.me/71234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center text-sm hover:text-secondary"
              title="WhatsApp"
            >
              <span>WhatsApp</span>
            </a>
          </div>
          <nav className="hidden md:flex space-x-4 text-sm">
            <a href="/about" className="hover:text-secondary">О компании</a>
            <a href="/delivery" className="hover:text-secondary">Доставка</a>
            <a href="/warranty-terms" className="hover:text-secondary">Оплата</a>
            <a href="/contacts" className="hover:text-secondary">Контакты</a>
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
            <Link to="/" className="flex items-center space-x-1">
              <span className="font-heading font-bold text-2xl text-primary dark:text-white">НОРД</span>
              <span className="font-heading font-bold text-2xl text-secondary">ИНЖИНИРИНГ</span>
            </Link>

            {/* Search - desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <GlobalSearch className="w-full" />
            </div>

            {/* Actions - desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white">
                <Heart className="h-6 w-6" />
                <span className="text-xs mt-1">Избранное</span>
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
              <a
                href="tel:+71234567890"
                className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
              >
                <Phone className="h-6 w-6" />
                <span className="text-xs mt-1">Звонок</span>
              </a>
              <button 
                className="bg-accent hover:bg-opacity-90 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                onClick={() => setShowConsultationForm(true)}
              >
                Заказать консультацию
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
            <ul className="flex items-center space-x-6 py-4">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group">
                  <Link
                    to={item.path}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-secondary"
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <span>{item.label}</span>
                    {item.submenu && <ChevronDown className="h-4 w-4 ml-1" />}
                  </Link>
                  {item.submenu && (
                    <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li>
                <Link to="/sales" className="text-gray-600 dark:text-gray-300 hover:text-secondary">
                  Акции
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-600 dark:text-gray-300 hover:text-secondary">
                  Контакты
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-600 dark:text-gray-300 hover:text-secondary">
                  Инструменты
                </Link>
              </li>
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
              <div className="mb-4">
                <GlobalSearch className="w-full" />
              </div>

              <nav className="space-y-4">
                {menuItems.map((item, index) => (
                  <div key={index}>
                    <Link
                      to={item.path}
                      className="flex items-center py-3 text-primary dark:text-white font-semibold min-h-[44px] text-base"
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      <span>{item.label}</span>
                    </Link>
                    {item.submenu && (
                      <div className="ml-6 space-y-2 mt-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className="block py-2 text-gray-600 dark:text-gray-300 hover:text-secondary min-h-[44px] flex items-center text-base"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link to="/sales" className="block py-3 text-gray-600 dark:text-gray-300 min-h-[44px] flex items-center text-base">
                  Акции
                </Link>
                <Link to="/contacts" className="block py-3 text-gray-600 dark:text-gray-300 min-h-[44px] flex items-center text-base">
                  Контакты
                </Link>
                <Link to="/tools" className="block py-3 text-gray-600 dark:text-gray-300 min-h-[44px] flex items-center text-base">
                  Инструменты
                </Link>
              </nav>

              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <a href="tel:+71234567890" className="flex items-center text-primary dark:text-white mb-4 min-h-[44px] text-base">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+7 (123) 456-78-90</span>
                </a>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Мессенджеры:</p>
                  <div className="flex space-x-3">
                    <a
                      href="https://wa.me/71234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
                    >
                      <span className="text-white text-xs font-bold">WA</span>
                    </a>
                    <a
                      href="https://t.me/nordengineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                    >
                      <span className="text-white text-xs font-bold">TG</span>
                    </a>
                  </div>
                </div>
                <button className="btn btn-accent w-full mb-4 min-h-[48px] text-base">
                  Заказать звонок
                </button>
                <button 
                  className="btn btn-primary w-full mb-4 min-h-[48px] text-base"
                  onClick={() => {
                    setShowConsultationForm(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Заказать консультацию
                </button>
                <div className="flex justify-between">
                  <button className="btn btn-outline flex-1 mr-2 min-h-[48px] text-sm">
                    <Heart className="h-5 w-5 mr-2" />
                    Избранное
                  </button>
                  <button 
                    onClick={toggleDarkMode}
                    className="btn btn-outline flex-1 ml-2 min-h-[48px] text-sm"
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
    
    <GlobalSearch 
      isOpen={isGlobalSearchOpen} 
      onClose={closeGlobalSearch} 
    />
    
    {showConsultationForm && (
      <ConsultationForm
        onClose={() => setShowConsultationForm(false)}
        onSubmit={handleFormSubmit}
        value={formData}
        setValue={setFormData}
      />
    )}
    </>
  );
};

export default Header;