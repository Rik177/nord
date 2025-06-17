import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, A11y } from 'swiper/modules';

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
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-primary">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-full"
        a11y={{
          prevSlideMessage: 'Предыдущий слайд',
          nextSlideMessage: 'Следующий слайд',
          firstSlideMessage: 'Это первый слайд',
          lastSlideMessage: 'Это последний слайд',
          paginationBulletMessage: 'Перейти к слайду {{index}}'
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-primary" />
            </div>
            
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;