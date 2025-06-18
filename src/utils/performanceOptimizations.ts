// Утилиты для оптимизации производительности

export const initPerformanceOptimizations = () => {
  // Предотвращение автоматической прокрутки
  if (window.location.hash) {
    // Очищаем хэш из URL без перезагрузки страницы
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  // Отключаем автоматическую прокрутку к якорям
  window.addEventListener('hashchange', (e) => {
    e.preventDefault();
    return false;
  });

  // Предзагрузка критических ресурсов
  const preloadCriticalResources = () => {
    const criticalResources = [
      { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
      { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' },
      { href: 'https://images.pexels.com', rel: 'preconnect' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      Object.assign(link, resource);
      document.head.appendChild(link);
    });
  };

  // Ленивая загрузка изображений
  const setupLazyLoading = () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  };

  // Оптимизация скролла
  const optimizeScrolling = () => {
    let ticking = false;

    const updateScrollPosition = () => {
      // Обновляем позицию скролла без блокировки UI
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    }, { passive: true });
  };

  // Оптимизация ресайза
  const optimizeResize = () => {
    let resizeTimer: NodeJS.Timeout;

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Обработка ресайза
        window.dispatchEvent(new Event('optimizedResize'));
      }, 250);
    });
  };

  // Предзагрузка критических страниц
  const preloadCriticalPages = () => {
    const criticalPages = ['/catalog', '/services', '/contacts'];
    
    criticalPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  };

  // Инициализация всех оптимизаций
  preloadCriticalResources();
  setupLazyLoading();
  optimizeScrolling();
  optimizeResize();
  
  // Предзагрузка критических страниц через 2 секунды после загрузки
  setTimeout(preloadCriticalPages, 2000);
};

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Утилита для отложенной загрузки компонентов
export const lazyLoadComponent = (importFunc: () => Promise<any>) => {
  return React.lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(importFunc());
      }, 100);
    });
  });
};

// Оптимизация изображений
export const optimizeImage = (src: string, width?: number, quality = 85) => {
  if (src.includes('pexels.com')) {
    const baseUrl = src.split('?')[0];
    const params = new URLSearchParams();
    params.set('auto', 'compress');
    params.set('cs', 'tinysrgb');
    if (width) params.set('w', width.toString());
    params.set('q', quality.toString());
    return `${baseUrl}?${params.toString()}`;
  }
  return src;
};

// Дебаунс для оптимизации событий
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Троттлинг для оптимизации событий
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function executedFunction(...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};