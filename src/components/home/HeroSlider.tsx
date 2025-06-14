import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Создаем идеальный микроклимат для вашего комфорта',
    description: 'Профессиональные решения в области вентиляции и кондиционирования с 18-летним опытом. Более 1000 успешных проектов и довольных клиентов.',
    buttonText: 'Подобрать оборудование',
    buttonLink: '/catalog'
  },
  {
    image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Полный цикл работ "под ключ" с гарантией до 5 лет',
    description: 'От проектирования до сервисного обслуживания. Используем только сертифицированное оборудование ведущих мировых производителей.',
    buttonText: 'Заказать проект',
    buttonLink: '/services'
  },
  {
    image: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Экономьте до 40% на энергозатратах',
    description: 'Современные энергоэффективные технологии и умные системы управления. Окупаемость инвестиций уже через 2-3 года эксплуатации.',
    buttonText: 'Узнать больше',
    buttonLink: '/about'
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const goToNextSlide = () => {
    goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const goToPrevSlide = () => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-primary">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-primary" />
          
          <div className="relative h-full container mx-auto px-4 flex items-center z-20">
            <div className="max-w-2xl">
              <h1 className="font-heading text-h1-mobile md:text-h1-desktop text-white mb-6 animate-fade-in leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in delay-200 leading-relaxed">
                {slide.description}
              </p>
              <a
                href={slide.buttonLink}
                className="btn btn-accent animate-fade-in delay-400"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 btn btn-primary bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
        aria-label="Предыдущий слайд"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 btn btn-primary bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
        aria-label="Следующий слайд"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-accent scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;