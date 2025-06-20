import React from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube, ArrowRight, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white dark:bg-gray-900">
      {/* Mobile Footer */}
      <div className="md:hidden">
        <div className="container mx-auto px-4 py-8">
          {/* Company info */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="font-heading font-bold text-2xl text-white">НОРД</span>
              <span className="font-heading font-bold text-2xl text-secondary">ИНЖИНИРИНГ</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Профессиональные решения в области вентиляции и климатического оборудования с 2005 года.
            </p>
          </div>
          
          {/* Contact info */}
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2 text-secondary" />
                <a href="tel:+71234567890" className="hover:text-secondary">+7 (123) 456-78-90</a>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2 text-secondary" />
                <a href="mailto:info@ventilation.su" className="hover:text-secondary">info@ventilation.su</a>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="h-5 w-5 mr-2 text-secondary" />
                <span>г. Москва, ул. Примерная, д. 123</span>
              </div>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-heading text-base font-bold mb-3 text-white">Каталог</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/catalog/air-conditioning" className="hover:text-secondary">Кондиционеры</a></li>
                <li><a href="/catalog/ventilation" className="hover:text-secondary">Вентиляция</a></li>
                <li><a href="/catalog/heating" className="hover:text-secondary">Отопление</a></li>
                <li><a href="/brands" className="hover:text-secondary">Бренды</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-base font-bold mb-3 text-white">Компания</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-secondary">О нас</a></li>
                <li><a href="/services" className="hover:text-secondary">Услуги</a></li>
                <li><a href="/projects" className="hover:text-secondary">Проекты</a></li>
                <li><a href="/contacts" className="hover:text-secondary">Контакты</a></li>
              </ul>
            </div>
          </div>
          
          {/* Social and messengers */}
          <div className="mb-6">
            <h3 className="font-heading text-base font-bold mb-3 text-white text-center">Мы в соцсетях</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary">
                <Youtube className="h-6 w-6" />
              </a>
              <a 
                href="https://wa.me/71234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-sm text-gray-400">
            <p>© 2025 НОРДИНЖИНИРИНГ. Все права защищены.</p>
            <div className="flex flex-col space-y-2 mt-3">
              <a href="/privacy-policy" className="hover:text-secondary">Политика конфиденциальности</a>
              <a href="/terms-of-service" className="hover:text-secondary">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <span className="font-heading font-bold text-2xl text-white">НОРД</span>
                <span className="font-heading font-bold text-2xl text-secondary">ИНЖИНИРИНГ</span>
              </div>
              <p className="text-gray-300 mb-4">
                Профессиональные решения в области вентиляции и климатического оборудования с 2005 года.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-1 text-secondary" />
                  <span>123456, г. Москва, ул. Примерная, д. 123</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-secondary" />
                  <a href="tel:+71234567890" className="hover:text-secondary">+7 (123) 456-78-90</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-secondary" />
                  <a href="mailto:info@ventilation.su" className="hover:text-secondary">info@ventilation.su</a>
                </div>
              </div>
              
              {/* Messengers */}
              <div className="mt-4">
                <h4 className="font-heading text-sm font-bold mb-3 text-white">Мессенджеры</h4>
                <div className="flex space-x-3">
                  <a
                    href="https://wa.me/71234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5 text-white" />
                  </a>
                  <a
                    href="https://t.me/nordengineering"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                    aria-label="Telegram"
                  >
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.61 7.59c-.12.54-.44.67-.89.42l-2.46-1.81-1.19 1.14c-.13.13-.24.24-.49.24l.17-2.43 4.47-4.03c.19-.17-.04-.27-.3-.1L9.39 13.17l-2.44-.76c-.53-.17-.54-.53.11-.78l9.52-3.67c.44-.17.83.11.68.78z"/>
                    </svg>
                  </a>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  <p>WhatsApp: +7 (123) 456-78-90</p>
                  <p>Telegram: @nordengineering</p>
                </div>
              </div>
            </div>

            {/* Catalog */}
            <div className="lg:col-span-1">
              <h3 className="font-heading text-lg font-bold mb-4 text-white">Каталог</h3>
              <ul className="space-y-2">
                <li><a href="/catalog/ventilation" className="hover:text-secondary">Вентиляционное оборудование</a></li>
                <li><a href="/catalog/air-conditioning" className="hover:text-secondary">Кондиционирование</a></li>
                <li><a href="/catalog/heating" className="hover:text-secondary">Отопительное оборудование</a></li>
                <li><a href="/catalog/accessories" className="hover:text-secondary">Аксессуары и комплектующие</a></li>
                <li><a href="/brands" className="hover:text-secondary">Бренды</a></li>
                <li><a href="/sales" className="hover:text-secondary">Акции и спецпредложения</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div className="lg:col-span-1">
              <h3 className="font-heading text-lg font-bold mb-4 text-white">О компании</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-secondary">О нас</a></li>
                <li><a href="/services" className="hover:text-secondary">Наши услуги</a></li>
                <li><a href="/projects" className="hover:text-secondary">Проекты</a></li>
                <li><a href="/blog" className="hover:text-secondary">Блог</a></li>
                <li><a href="/reviews" className="hover:text-secondary">Отзывы</a></li>
                <li><a href="/contacts" className="hover:text-secondary">Контакты</a></li>
              </ul>
            </div>
            
            {/* Information */}
            <div className="lg:col-span-1">
              <h3 className="font-heading text-lg font-bold mb-4 text-white">Информация</h3>
              <ul className="space-y-2">
                <li><a href="/faq" className="hover:text-secondary">Часто задаваемые вопросы (FAQ)</a></li>
                <li><a href="/delivery" className="hover:text-secondary">Условия доставки</a></li>
                <li><a href="/warranty-terms" className="hover:text-secondary">Гарантийные обязательства</a></li>
                <li><a href="/about/requisites" className="hover:text-secondary">Реквизиты</a></li>
                <li><a href="/privacy-policy" className="hover:text-secondary">Политика конфиденциальности</a></li>
                <li><a href="/cookie-policy" className="hover:text-secondary">Политика cookies</a></li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter Section */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div>
              <h3 className="font-heading text-lg font-bold mb-4">Подпишитесь на новости</h3>
              <p className="text-gray-300 mb-4">Будьте в курсе новинок, акций и специальных предложений</p>
              <div className="flex max-w-md mb-4">
                <input 
                  type="email" 
                  placeholder="Ваш email" 
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-900"
                />
                <button className="bg-accent hover:bg-opacity-90 px-3 py-2 rounded-r-md">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-secondary">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-secondary">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-secondary">
                  <Youtube className="h-6 w-6" />
                </a>
                <a 
                  href="https://wa.me/71234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400"
                >
                  <MessageCircle className="h-6 w-6" />
                </a>
                <a 
                  href="https://t.me/nordengineering" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.61 7.59c-.12.54-.44.67-.89.42l-2.46-1.81-1.19 1.14c-.13.13-.24.24-.49.24l.17-2.43 4.47-4.03c.19-.17-.04-.27-.3-.1L9.39 13.17l-2.44-.76c-.53-.17-.54-.53.11-.78l9.52-3.67c.44-.17.83.11.68.78z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-base">
              © 2025 НОРДИНЖИНИРИНГ. Все права защищены.
            </p>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0 text-base text-gray-400">
              <a href="/privacy-policy" className="hover:text-secondary min-h-[44px] flex items-center">Политика конфиденциальности</a>
              <a href="/terms-of-service" className="hover:text-secondary min-h-[44px] flex items-center">Пользовательское соглашение</a>
              <a href="/cookie-policy" className="hover:text-secondary min-h-[44px] flex items-center">Политика cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;