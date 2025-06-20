import React from 'react';
import { Clock, Award, ShieldCheck, Wrench, Users, Zap } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const features: Feature[] = [
  {
    icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-secondary" />,
    title: '18 лет опыта',
    description: 'Работаем с 2005 года, реализовали более 1000 проектов',
    highlight: '1000+ проектов'
  },
  {
    icon: <Award className="h-8 w-8 sm:h-10 sm:w-10 text-secondary" />,
    title: 'Качественное оборудование',
    description: 'Только проверенные производители с мировым именем',
    highlight: '30+ брендов'
  },
  {
    icon: <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-secondary" />,
    title: 'Гарантия до 5 лет',
    description: 'На оборудование и все виды монтажных работ',
    highlight: 'До 5 лет'
  },
  {
    icon: <Wrench className="h-8 w-8 sm:h-10 sm:w-10 text-secondary" />,
    title: 'Сервисное обслуживание',
    description: 'Регулярное обслуживание и оперативный ремонт',
    highlight: '24/7 поддержка'
  },
  {
    icon: <Users className="h-8 w-8 sm:h-10 sm:w-10 text-secondary" />,
    title: 'Команда профессионалов',
    description: 'Сертифицированные специалисты с многолетним опытом',
    highlight: '50+ экспертов'
  },
  {
    icon: <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-secondary" />,
    title: 'Энергоэффективность',
    description: 'Современные технологии для снижения расходов',
    highlight: 'До 40% экономии'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-lightBg dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-white mb-3 sm:mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Более 5000 довольных клиентов доверяют нам создание комфортного микроклимата
          </p>
        </div>

        {/* Features Grid - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-card p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Icon with highlight badge */}
              <div className="relative inline-flex items-center justify-center mb-4 sm:mb-6">
                <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-4 sm:p-5 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                  {feature.icon}
                </div>
                {/* Highlight badge */}
                <div className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  {feature.highlight}
                </div>
              </div>
              
              <h3 className="font-heading font-semibold text-lg sm:text-xl lg:text-2xl text-primary dark:text-white mb-3 sm:mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div className="text-white">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">1000+</div>
                <div className="text-white/90 text-sm sm:text-base">Реализованных проектов</div>
              </div>
              <div className="text-white">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">5000+</div>
                <div className="text-white/90 text-sm sm:text-base">Довольных клиентов</div>
              </div>
              <div className="text-white">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">98%</div>
                <div className="text-white/90 text-sm sm:text-base">Положительных отзывов</div>
              </div>
              <div className="text-white">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">24ч</div>
                <div className="text-white/90 text-sm sm:text-base">Время реакции</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-primary dark:text-white mb-4">
              Готовы обсудить ваш проект?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-base sm:text-lg">
              Получите бесплатную консультацию и расчет стоимости
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <a
                href="/contacts"
                className="inline-flex items-center justify-center bg-primary hover:bg-opacity-90 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors min-h-[48px] text-base sm:text-lg"
              >
                Получить консультацию
              </a>
              <a
                href="/tools"
                className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors min-h-[48px] text-base sm:text-lg"
              >
                Рассчитать стоимость
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;