/**
 * Утилиты для оптимизации изображений
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

/**
 * Генерирует оптимизированный URL изображения
 */
export const generateOptimizedUrl = (
  originalUrl: string,
  width?: number,
  height?: number,
  quality: number = 85
): string => {
  // Для Pexels изображений используем их API параметры
  if (originalUrl.includes('pexels.com')) {
    const url = new URL(originalUrl);
    
    // Добавляем параметры оптимизации
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('auto', 'compress');
    url.searchParams.set('cs', 'tinysrgb');
    url.searchParams.set('dpr', '2'); // Для Retina дисплеев
    
    return url.toString();
  }
  
  // Для других изображений возвращаем оригинальный URL
  return originalUrl;
};

/**
 * Генерирует srcSet для responsive изображений
 */
export const generateSrcSet = (originalUrl: string): string => {
  const sizes = [480, 768, 1024, 1280, 1920];
  
  return sizes
    .map(size => `${generateOptimizedUrl(originalUrl, size)} ${size}w`)
    .join(', ');
};

/**
 * Генерирует sizes атрибут для responsive изображений
 */
export const generateSizes = (breakpoints?: Record<string, string>): string => {
  const defaultSizes = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    '(max-width: 1280px)': '33vw',
    'default': '25vw'
  };
  
  const sizesToUse = breakpoints || defaultSizes;
  
  return Object.entries(sizesToUse)
    .map(([breakpoint, size]) => 
      breakpoint === 'default' ? size : `${breakpoint} ${size}`
    )
    .join(', ');
};

/**
 * Проверяет поддержку WebP браузером
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Проверяет поддержку AVIF браузером
 */
export const supportsAVIF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

/**
 * Создает placeholder для изображения
 */
export const createImagePlaceholder = (
  width: number,
  height: number,
  color: string = '#f3f4f6'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
        Загрузка...
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Создает blur placeholder для изображения
 */
export const createBlurPlaceholder = (
  width: number = 40,
  height: number = 40
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Создаем градиент
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

/**
 * Оптимизирует изображение для различных устройств
 */
export const getResponsiveImageProps = (
  src: string,
  alt: string,
  options: ImageOptimizationOptions = {}
) => {
  const {
    width,
    height,
    quality = 85,
    format = 'webp'
  } = options;
  
  return {
    src: generateOptimizedUrl(src, width, height, quality),
    srcSet: generateSrcSet(src),
    sizes: generateSizes(),
    alt,
    loading: 'lazy' as const,
    decoding: 'async' as const,
    style: {
      aspectRatio: width && height ? `${width}/${height}` : undefined
    }
  };
};

/**
 * Предзагружает критические изображения
 */
export const preloadCriticalImages = (urls: string[]): void => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Lazy loading для изображений с Intersection Observer
 */
export const setupLazyLoading = (): void => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Получает оптимальный формат изображения для браузера
 */
export const getOptimalImageFormat = async (): Promise<'avif' | 'webp' | 'jpeg'> => {
  if (await supportsAVIF()) return 'avif';
  if (await supportsWebP()) return 'webp';
  return 'jpeg';
};

/**
 * Создает адаптивное изображение с множественными форматами
 */
export const createPictureElement = (
  src: string,
  alt: string,
  options: ImageOptimizationOptions = {}
): HTMLPictureElement => {
  const picture = document.createElement('picture');
  const { width, height, quality = 85 } = options;
  
  // AVIF source
  const avifSource = document.createElement('source');
  avifSource.srcset = generateSrcSet(src);
  avifSource.type = 'image/avif';
  picture.appendChild(avifSource);
  
  // WebP source
  const webpSource = document.createElement('source');
  webpSource.srcset = generateSrcSet(src);
  webpSource.type = 'image/webp';
  picture.appendChild(webpSource);
  
  // Fallback img
  const img = document.createElement('img');
  img.src = generateOptimizedUrl(src, width, height, quality);
  img.alt = alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  picture.appendChild(img);
  
  return picture;
};