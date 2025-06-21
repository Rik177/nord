import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbConfig {
  path: string;
  label: string;
  dynamic?: boolean;
}

// Маппинг путей на русские названия
const routeLabels: Record<string, string> = {
  // Основные разделы
  'about': 'О компании',
  'catalog': 'Каталог',
  'services': 'Услуги',
  'projects': 'Проекты',
  'blog': 'Блог',
  'brands': 'Бренды',
  'sales': 'Акции',
  'contacts': 'Контакты',
  'tools': 'Инструменты',
  'reviews': 'Отзывы',
  'faq': 'Часто задаваемые вопросы',
  'delivery': 'Доставка',
  'warranty-terms': 'Гарантийные условия',
  'privacy-policy': 'Политика конфиденциальности',
  'terms-of-service': 'Условия использования',
  'cookie-policy': 'Политика cookies',

  // О компании
  'about-us': 'О нас',
  'team': 'Наша команда',
  'licenses': 'Лицензии и сертификаты',
  'requisites': 'Реквизиты',
  'careers': 'Карьера',

  // Каталог
  'ventilation': 'Вентиляционное оборудование',
  'air-conditioning': 'Кондиционеры',
  'heating': 'Отопительное оборудование',
  'curtains': 'Тепловые завесы',
  'accessories': 'Аксессуары и комплектующие',
  'smart-home': 'Умный дом',

  // Услуги
  'design': 'Проектирование',
  'installation': 'Монтаж',
  'maintenance': 'Сервисное обслуживание',
  'warranty': 'Гарантийный ремонт',

  // Динамические маршруты
  'product': 'Товар',
  'article': 'Статья',
  'project': 'Проект'
};

const getBreadcrumbLabel = (path: string, fullPath: string): string => {
  // Проверяем точное совпадение
  if (routeLabels[path]) {
    return routeLabels[path];
  }
  
  // Проверяем динамические маршруты
  const pathSegments = fullPath.split('/').filter(x => x);
  
  // Для товаров в каталоге
  if (pathSegments.length === 3 && pathSegments[0] === 'catalog') {
    return 'Товар';
  }
  
  // Для статей блога
  if (pathSegments.length === 2 && pathSegments[0] === 'blog') {
    return 'Статья';
  }
  
  // Для проектов
  if (pathSegments.length === 2 && pathSegments[0] === 'projects') {
    return 'Проект';
  }
  
  // Возвращаем оригинальный путь с заглавной буквы, если не найдено соответствие
  return path.charAt(0).toUpperCase() + path.slice(1);
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Не показываем хлебные крошки на главной странице
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="bg-lightBg dark:bg-gray-800 py-3" aria-label="Навигационная цепочка">
      <div className="container mx-auto px-4">
        <ol className="flex items-center text-sm" role="list">
          <li role="listitem">
            <Link 
              to="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Главная
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const label = getBreadcrumbLabel(name, location.pathname);
            const isLast = index === pathnames.length - 1;

            return (
              <li key={name} role="listitem" className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" aria-hidden="true" />
                {isLast ? (
                  <span 
                    className="text-primary dark:text-white font-semibold"
                    aria-current="page"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;