import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: number;
  title: string;
  image: string;
  link: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: 'Вентиляторы',
    description: 'Канальные и осевые вентиляторы для эффективной вентиляции',
    image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/catalog/ventilation'
  },
  {
    id: 2,
    title: 'Кондиционеры',
    description: 'Настенные, кассетные и канальные кондиционеры',
    image: 'https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/catalog/air-conditioning'
  },
  {
    id: 3,
    title: 'Вентиляционные установки',
    description: 'Приточно-вытяжные установки с рекуперацией тепла',
    image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/catalog/ventilation'
  },
  {
    id: 4,
    title: 'Отопительное оборудование',
    description: 'Конвекторы, инфракрасные обогреватели, тепловые насосы',
    image: 'https://images.pexels.com/photos/7109803/pexels-photo-7109803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/catalog/heating'
  },
  {
    id: 5,
    title: 'Тепловые завесы',
    description: 'Электрические и водяные завесы для защиты от холода',
    image: 'https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/catalog/curtains'
  },
  {
    id: 6,
    title: 'Аксессуары и комплектующие',
    description: 'Решетки, диффузоры, фильтры и другие комплектующие',
    image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/catalog/accessories'
  }
];

const Categories: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary text-center mb-10">
          Популярные категории
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={category.link}
              className="category-card relative rounded-lg overflow-hidden shadow-card group transition-all duration-300"
              aria-label={`Перейти к категории ${category.title}`}
            >
              <div className="aspect-w-16 aspect-h-9 h-64">
                <img 
                  src={category.image} 
                  alt={`${category.title} - ${category.description}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="400"
                  height="256"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-70"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-heading font-semibold text-h4-mobile md:text-h4-desktop text-white mb-1">
                    {category.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {category.description}
                  </p>
                </div>
                <div className="bg-accent rounded-full p-2 transform translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;