import React from 'react';
import { Pencil, Wrench, CheckCircle, ArrowRight } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const services: Service[] = [
  {
    icon: <Pencil className="h-12 w-12 text-primary" />,
    title: 'Проектирование',
    description: 'Профессиональное проектирование систем вентиляции и кондиционирования для объектов любой сложности.',
    link: '#'
  },
  {
    icon: <Wrench className="h-12 w-12 text-primary" />,
    title: 'Монтаж оборудования',
    description: 'Качественный монтаж систем вентиляции, кондиционирования и отопления с соблюдением всех норм.',
    link: '#'
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-primary" />,
    title: 'Сервисное обслуживание',
    description: 'Регулярное техническое обслуживание вентиляционного и климатического оборудования.',
    link: '#'
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary text-center mb-10">
          Наши услуги
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card bg-white rounded-lg shadow-card p-6 border-t-4 border-primary transition-all duration-300"
            >
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="font-heading font-semibold text-h3-mobile md:text-h3-desktop text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <a 
                href={service.link} 
                className="inline-flex items-center text-secondary font-semibold hover:text-primary transition-colors"
              >
                <span>Подробнее</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;