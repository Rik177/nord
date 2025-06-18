// Performance optimization utilities

export const initPerformanceOptimizations = (): void => {
  // Preload critical resources
  preloadCriticalResources();
  
  // Initialize intersection observer for lazy loading
  initLazyLoading();
  
  // Optimize images
  optimizeImages();
  
  // Setup performance monitoring
  setupPerformanceMonitoring();
};

const preloadCriticalResources = (): void => {
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

const initLazyLoading = (): void => {
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.classList.remove('lazy');
            lazyImageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px'
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach((img) => {
      lazyImageObserver.observe(img);
    });
  }
};

const optimizeImages = (): void => {
  // Add loading="lazy" to images below the fold
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (index > 2) { // Skip first 3 images (above the fold)
      img.loading = 'lazy';
    }
  });
};

const setupPerformanceMonitoring = (): void => {
  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    new PerformanceObserver((entryList) => {
      let clsValue = 0;
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

export const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

export const prefetchRoute = (route: string): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  document.head.appendChild(link);
};

export const preloadRoute = (route: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = route;
  link.as = 'document';
  document.head.appendChild(link);
};

// Optimize bundle loading
export const loadChunkOnDemand = async (chunkName: string): Promise<any> => {
  try {
    const module = await import(/* webpackChunkName: "[request]" */ `../components/${chunkName}`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load chunk: ${chunkName}`, error);
    throw error;
  }
};

// Memory optimization
export const cleanupUnusedResources = (): void => {
  // Remove unused event listeners
  const unusedElements = document.querySelectorAll('[data-cleanup]');
  unusedElements.forEach(element => {
    element.remove();
  });
  
  // Clear caches if needed
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        if (name.includes('old-version')) {
          caches.delete(name);
        }
      });
    });
  }
};

// Network optimization
export const optimizeNetworkRequests = (): void => {
  // Implement request deduplication
  const requestCache = new Map();
  
  const originalFetch = window.fetch;
  window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
    const key = typeof input === 'string' ? input : input.toString();
    
    if (requestCache.has(key)) {
      return requestCache.get(key);
    }
    
    const promise = originalFetch(input, init);
    requestCache.set(key, promise);
    
    // Clean up cache after request completes
    promise.finally(() => {
      setTimeout(() => requestCache.delete(key), 5000);
    });
    
    return promise;
  };
};

// Initialize optimizations
if (typeof window !== 'undefined') {
  // Run optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initPerformanceOptimizations, 100);
    });
  } else {
    setTimeout(initPerformanceOptimizations, 100);
  }
}