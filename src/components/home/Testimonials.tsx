import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company?: string;
  text: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Александр Петров',
    company: 'ООО "Технологии"',
    text: 'Работаем с НОРДИНЖИНИРИНГ уже более 5 лет. Отличное качество оборудования и монтажа, всегда соблюдаются сроки. Особенно ценим оперативность при возникновении вопросов по обслуживанию.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    name: 'Елена Сидорова',
    text: 'Обратились в компанию для установки системы кондиционирования в квартире. Менеджер помог выбрать оптимальное решение, монтаж произвели быстро и чисто. Результатом очень довольны!',
    rating: 5,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    name: 'Иван Соколов',
    company: 'Ресторан "Морской"',
    text: 'Специалисты НОРДИНЖИНИРИНГ разработали и реализовали проект вентиляции для нашего ресторана. Все работает безупречно, гости отмечают комфортную атмосферу, а затраты на электроэнергию снизились.',
    rating: 4,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    name: 'Марина Ковалева',
    company: 'Сеть магазинов "Стиль"',
    text: 'Заказывали монтаж систем кондиционирования в сети наших магазинов. Работы выполнены профессионально, все наши пожелания учтены. Теперь в наших торговых залах всегда комфортная температура.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const testimonialsPerPage = {
    desktop: 2,
    tablet: 1,
    mobile: 1
  };

  const getPagesToShow = () => {
    // Get screen width to determine which responsive value to use
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        return testimonialsPerPage.desktop;
      } else if (window.innerWidth >= 768) {
        return testimonialsPerPage.tablet;
      } else {
        return testimonialsPerPage.mobile;
      }
    }
    return testimonialsPerPage.desktop; // Default
  };

  const goToNext = () => {
    const itemsToShow = getPagesToShow();
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + itemsToShow;
      return newIndex >= testimonials.length ? 0 : newIndex;
    });
  };

  const goToPrev = () => {
    const itemsToShow = getPagesToShow();
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - itemsToShow;
      return newIndex < 0 ? Math.max(0, testimonials.length - itemsToShow) : newIndex;
    });
  };

  // Calculate visible testimonials based on screen size and start index
  const visibleTestimonials = () => {
    const itemsToShow = getPagesToShow();
    const visibleItems = [];
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (startIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    
    return visibleItems;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < rating ? 'text-accent fill-accent' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <section className="py-16 bg-lightBg dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
            Отзывы наших клиентов
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visibleTestimonials().map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-card p-6 transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="h-14 w-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-heading font-semibold text-primary">
                    {testimonial.name}
                  </h3>
                  {testimonial.company && (
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  )}
                  <div className="flex mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/reviews" 
            className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Все отзывы
          </a>
        </div>
      </div>
    </section>
  );
};
