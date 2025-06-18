// Утилиты для оптимизации производительности

// Предварительная загрузка критических ресурсов
export const preloadCriticalResources = () => {
  // Предзагрузка шрифтов
  const fontLinks = [
    'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.woff2',
    'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVQUwaEQbjB_mQ.woff2'
  ];

  fontLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = href;
    document.head.appendChild(link);
  });

  // Предзагрузка критических изображений
  const criticalImages = [
    'https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Оптимизация рендеринга
export const optimizeRendering = () => {
  // Отложенная загрузка некритических компонентов
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Загружаем некритические компоненты
      import('../components/shared/ChatWidget');
      import('../components/shared/AccessibilityControls');
    });
  }
};

// Кэширование в localStorage
export const cacheManager = {
  set: (key: string, data: any, ttl: number = 3600000) => { // 1 час по умолчанию
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  get: (key: string) => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      const parsed = JSON.parse(item);
      if (Date.now() - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(key);
        return null;
      }
      return parsed.data;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  },

  clear: () => {
    localStorage.clear();
  }
};

// Дебаунс для поиска
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Троттлинг для скролла
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Мониторинг производительности
export const performanceMonitor = {
  measurePageLoad: () => {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          console.log('Page Load Metrics:', {
            'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
            'TCP Connection': perfData.connectEnd - perfData.connectStart,
            'Request': perfData.responseStart - perfData.requestStart,
            'Response': perfData.responseEnd - perfData.responseStart,
            'DOM Processing': perfData.domContentLoadedEventStart - perfData.responseEnd,
            'Total Load Time': perfData.loadEventEnd - perfData.navigationStart
          });
        }, 0);
      });
    }
  },

  measureCLS: () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            console.log('Layout Shift:', entry);
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  },

  measureLCP: () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('Largest Contentful Paint:', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  },

  measureFID: () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('First Input Delay:', (entry as any).processingStart - entry.startTime);
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  }
};

// Инициализация всех оптимизаций
export const initPerformanceOptimizations = () => {
  // Предзагрузка критических ресурсов
  preloadCriticalResources();
  
  // Оптимизация рендеринга
  optimizeRendering();
  
  // Мониторинг производительности (только в development)
  if (process.env.NODE_ENV === 'development') {
    performanceMonitor.measurePageLoad();
    performanceMonitor.measureCLS();
    performanceMonitor.measureLCP();
    performanceMonitor.measureFID();
  }
};

// Service Worker для кэширования
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }
};