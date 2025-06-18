import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-primary">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, A11y]}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination',
        }}
        autoplay={{ 
          delay: 5000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-full w-full"
        speed={800}
        touchRatio={1}
        touchAngle={45}
        grabCursor={true}
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
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
              
              <div className="relative h-full container mx-auto px-4 flex items-center text-left z-10">
                <div className="max-w-2xl text-white">
                  <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 leading-tight animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed opacity-90 animate-fade-in">
                    {slide.description}
                  </p>
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-md transition-all duration-300 hover:shadow-lg animate-fade-in"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation */}
        <div className="swiper-button-prev !left-4 !w-10 !h-10 !mt-0 !top-1/2 !-translate-y-1/2 !bg-white/20 !rounded-full !text-white hover:!bg-white/30 !transition-all !duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="swiper-button-next !right-4 !w-10 !h-10 !mt-0 !top-1/2 !-translate-y-1/2 !bg-white/20 !rounded-full !text-white hover:!bg-white/30 !transition-all !duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-6 !left-1/2 !-translate-x-1/2 !w-auto"></div>
      </Swiper>
    </section>
  );
};

export default HeroSlider;