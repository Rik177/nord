import React from 'react';
import { Clock, Award, ShieldCheck, Wrench } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Clock className="h-10 w-10 text-secondary" />,
    title: '18 лет опыта',
    description: 'Работаем с 2005 года, реализовали более 1000 проектов'
  },
  {
    icon: <Award className="h-10 w-10 text-secondary" />,
    title: 'Качественное оборудование',
    description: 'Только проверенные производители с мировым именем'
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-secondary" />,
    title: 'Гарантия до 5 лет',
    description: 'На оборудование и все виды монтажных работ'
  },
  {
    icon: <Wrench className="h-10 w-10 text-secondary" />,
    title: 'Сервисное обслуживание',
    description: 'Регулярное обслуживание и оперативный ремонт'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-12 bg-lightBg dark:bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary text-center mb-10 dark:text-white">
          Почему выбирают нас
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-card p-6 text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-h3-mobile md:text-h4-desktop text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;