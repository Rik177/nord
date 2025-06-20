import React from "react";
import { ArrowRight } from "lucide-react";
import OptimizedImage, { generateCategoryAlt } from "../shared/OptimizedImage";

interface Category {
  id: number;
  title: string;
  image: string;
  link: string;
  description?: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: "Кондиционеры",
    description: "Настенные, кассетные, канальные системы",
    image: "https://images.pexels.com/photos/4270511/pexels-photo-4270511.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    link: "/catalog/air-conditioning",
  },
  {
    id: 2,
    title: "Вентиляция",
    description: "Приточно-вытяжные установки, вентиляторы",
    image: "https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    link: "/catalog/ventilation",
  },
  {
    id: 3,
    title: "Отопление",
    description: "Тепловые насосы, котлы, радиаторы",
    image: "https://images.pexels.com/photos/7109803/pexels-photo-7109803.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    link: "/catalog/heating",
  },
  {
    id: 4,
    title: "Тепловые завесы",
    description: "Защита от холода и сквозняков",
    image: "https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    link: "/catalog/curtains",
  },
  {
    id: 5,
    title: "Аксессуары",
    description: "Комплектующие и расходные материалы",
    image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    link: "/catalog/accessories",
  },
  {
    id: 6,
    title: "Умный дом",
    description: "Системы автоматизации и управления",
    image: "https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    link: "/catalog/smart-home",
  },
];

const Categories: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-white mb-3 sm:mb-4">
            Каталог оборудования
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Широкий ассортимент климатического оборудования от ведущих мировых производителей
          </p>
        </div>

        {/* Mobile-first grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={category.link}
              className="category-card group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800"
            >
              {/* Image container with aspect ratio */}
              <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] overflow-hidden">
                <OptimizedImage
                  src={category.image}
                  alt={generateCategoryAlt(category.title)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={index < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <div className="text-white">
                    <h3 className="font-heading font-bold text-lg sm:text-xl lg:text-2xl mb-2 group-hover:text-accent transition-colors duration-300">
                      {category.title}
                    </h3>
                    {category.description && (
                      <p className="text-white/90 text-sm sm:text-base mb-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {category.description}
                      </p>
                    )}
                    
                    {/* CTA Button */}
                    <div className="flex items-center text-accent font-semibold text-sm sm:text-base opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                      <span>Смотреть каталог</span>
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-xl sm:rounded-2xl transition-colors duration-300"></div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
            <h3 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-3 sm:mb-4">
              Не нашли нужное оборудование?
            </h3>
            <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Наши специалисты помогут подобрать оптимальное решение под ваши задачи и бюджет
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <a
                href="/contacts"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors min-h-[48px] text-base sm:text-lg"
              >
                Получить консультацию
              </a>
              <a
                href="/catalog"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors border border-white/20 hover:border-white/30 min-h-[48px] text-base sm:text-lg"
              >
                Весь каталог
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;