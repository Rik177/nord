import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbConfig {
  path: string;
  label: string;
  dynamic?: boolean;
}

const routes: BreadcrumbConfig[] = [
  { path: 'services', label: 'Услуги' },
  { path: 'blog', label: 'Блог' },
  { path: 'contacts', label: 'Контакты' },
  { path: 'sales', label: 'Акции' },
  
  { path: 'blog/:id', label: 'Статья', dynamic: true }
];

const getBreadcrumbLabel = (path: string): string => {
  // Проверяем статические маршруты
  const staticRoute = routes.find(route => route.path === path);
  if (staticRoute) return staticRoute.label;
  
  // Проверяем динамические маршруты
  const dynamicRoute = routes.find(route => {
    const pattern = route.path.split('/');
    const segments = path.split('/');
    return pattern.length === segments.length && 
           pattern.every((part, i) => part.startsWith(':') || part === segments[i]);
  });
  
  return dynamicRoute?.label || path;
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const currentPath = '';

  return (
    <nav className="bg-lightBg dark:bg-gray-800 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm">
          <Link 
            to="/" 
            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
          >
            Главная
          </Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const label = getBreadcrumbLabel(name);
            const isLast = index === pathnames.length - 1;

            return (
              <React.Fragment key={name}>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                {isLast ? (
                  <span className="text-primary dark:text-white font-semibold">
                    {label}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                  >
                    {label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;