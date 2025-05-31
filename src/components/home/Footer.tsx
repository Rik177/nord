import React from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
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
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Каталог</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-secondary">Вентиляционное оборудование</a></li>
              <li><a href="#" className="hover:text-secondary">Кондиционирование</a></li>
              <li><a href="#" className="hover:text-secondary">Отопительное оборудование</a></li>
              <li><a href="#" className="hover:text-secondary">Аксессуары и комплектующие</a></li>
              <li><a href="#" className="hover:text-secondary">Бренды</a></li>
              <li><a href="#" className="hover:text-secondary">Акции и спецпредложения</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">О компании</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-secondary">О нас</a></li>
              <li><a href="#" className="hover:text-secondary">Наши услуги</a></li>
              <li><a href="#" className="hover:text-secondary">Проекты</a></li>
              <li><a href="#" className="hover:text-secondary">Блог</a></li>
              <li><a href="#" className="hover:text-secondary">Контакты</a></li>
              <li><a href="#" className="hover:text-secondary">Реквизиты</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Подпишитесь на новости</h3>
            <p className="text-gray-300 mb-4">Будьте в курсе новинок, акций и специальных предложений</p>
            <div className="flex mb-4">
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
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 НОРДИНЖИНИРИНГ. Все права защищены.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-400">
            <a href="#" className="hover:text-secondary">Политика конфиденциальности</a>
            <a href="#" className="hover:text-secondary">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;