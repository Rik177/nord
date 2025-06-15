import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ChatWidget from './components/shared/ChatWidget';
import QuickCallButton from './components/shared/QuickCallButton';
import FloatingCallButton from './components/shared/FloatingCallButton';
import ComparisonButton from './components/shared/ComparisonButton';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Catalog = lazy(() => import('./pages/catalog/Catalog'));
const CategoryPage = lazy(() => import('./pages/catalog/CategoryPage'));
const ProductPage = lazy(() => import('./pages/catalog/ProductPage'));
const Tools = lazy(() => import('./pages/Tools'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary dark:text-white mb-4">
              Что-то пошло не так
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Произошла ошибка при загрузке страницы
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:category" element={<CategoryPage />} />
                <Route path="/catalog/:category/:productId" element={<ProductPage />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="*" element={
                  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">404</h1>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Страница не найдена</p>
                      <a href="/" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                        На главную
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            </Suspense>
            
            {/* Floating UI Elements */}
            <ChatWidget />
            <QuickCallButton />
            <FloatingCallButton />
            <ComparisonButton />
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;