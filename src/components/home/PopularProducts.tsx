import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, BarChart2, X } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Канальный вентилятор RK 125',
    description: 'Мощный канальный вентилятор для вытяжной вентиляции',
    price: 4590,
    image: 'https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isNew: true
  },
  {
    id: 2,
    name: 'Кондиционер Daikin FTXB25C',
    description: 'Настенная сплит-система с инверторным управлением',
    price: 38900,
    oldPrice: 42500,
    image: 'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isSale: true
  },
  {
    id: 3,
    name: 'Приточная установка ПВУ-350',
    description: 'Компактная приточная установка с функцией подогрева',
    price: 67900,
    image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    name: 'Тепловая завеса Тепломаш КЭВ-6П',
    description: 'Тепловая завеса для проемов до 2.2 метров',
    price: 15600,
    image: 'https://images.pexels.com/photos/7109803/pexels-photo-7109803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    name: 'Увлажнитель воздуха Venta LW45',
    description: 'Мойка воздуха с функцией увлажнения для помещений до 80 м²',
    price: 25900,
    oldPrice: 28700,
    image: 'https://images.pexels.com/photos/9799818/pexels-photo-9799818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isSale: true
  },
  {
    id: 6,
    name: 'Напольный котел Viessmann Vitopend 100',
    description: 'Газовый напольный котел с закрытой камерой сгорания',
    price: 89500,
    image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isNew: true
  }
];

const PopularProducts: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const productsPerPage = {
    desktop: 4,
    tablet: 3,
    mobile: 1
  };

  const getPagesToShow = () => {
    // Get screen width to determine which responsive value to use
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        return productsPerPage.desktop;
      } else if (window.innerWidth >= 768) {
        return productsPerPage.tablet;
      } else {
        return productsPerPage.mobile;
      }
    }
    return productsPerPage.desktop; // Default
  };

  const goToNext = () => {
    const itemsToShow = getPagesToShow();
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + itemsToShow;
      return newIndex >= products.length ? 0 : newIndex;
    });
  };

  const goToPrev = () => {
    const itemsToShow = getPagesToShow();
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - itemsToShow;
      return newIndex < 0 ? Math.max(0, products.length - itemsToShow) : newIndex;
    });
  };

  // Calculate visible products based on screen size and start index
  const visibleProducts = () => {
    const itemsToShow = getPagesToShow();
    const visibleItems = [];
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (startIndex + i) % products.length;
      visibleItems.push(products[index]);
    }
    
    return visibleItems;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Пожалуйста, введите ваше имя';
    if (!formData.phone.trim()) errors.phone = 'Пожалуйста, введите ваш телефон';
    if (!formData.email.trim()) errors.email = 'Пожалуйста, введите ваш email';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { product: selectedProduct, ...formData });
    
    // Reset form and close modal
    setFormData({ name: '', phone: '', email: '', message: '' });
    setFormErrors({});
    setSelectedProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section className="py-12 bg-lightBg dark:bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
            Популярные товары
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={goToPrev}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-primary" />
            </button>
            <button 
              onClick={goToNext}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100"
            >
              <ArrowRight className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts().map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-card overflow-hidden group flex flex-col">
              {/* Product badges */}
              <div className="relative">
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded z-10">
                    Новинка
                  </span>
                )}
                {product.isSale && (
                  <span className="absolute top-2 left-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded z-10">
                    Скидка
                  </span>
                )}
              </div>

              {/* Product image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <BarChart2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product info */}
              <div className="p-4">
                <h3 className="font-heading font-semibold text-primary mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="p-4 pt-0 mt-auto">
                  <div className="flex items-end">
                    <span className="text-lg font-bold text-primary">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {product.oldPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                <button className="mt-4 w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                onClick={() => setSelectedProduct(product)}>
                    Узнать цену
                  </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="#" 
            className="inline-flex items-center font-semibold text-primary hover:text-secondary"
          >
            <span>Все товары</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </a>
        </div>
      </div>
      
      {/* Feedback Form Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white">
                    Узнать цену
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {selectedProduct.name}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                    Ваше имя*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 border ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                    Телефон*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 border ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 border ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Дополнительная информация или вопросы..."
                  />
                </div>
                
                <div className="flex items-start mt-4">
                  <input
                    type="checkbox"
                    id="agreement"
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-600 dark:text-gray-400">
                    Я согласен на обработку персональных данных в соответствии с{' '}
                    <a href="#" className="text-primary hover:text-secondary">
                      политикой конфиденциальности
                    </a>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                >
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularProducts;