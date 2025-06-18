// Утилиты для оптимизации изображений
export const generateSrcSet = (baseUrl: string, sizes: number[] = [400, 800, 1200, 1600]) => {
  if (!baseUrl.includes('pexels.com')) return '';
  
  const urlParts = baseUrl.split('?');
  const cleanUrl = urlParts[0];
  
  return sizes
    .map(size => `${cleanUrl}?auto=compress&cs=tinysrgb&w=${size}&dpr=1 ${size}w`)
    .join(', ');
};

export const generateOptimizedUrl = (url: string, width?: number, quality: number = 85) => {
  if (!url.includes('pexels.com')) return url;
  
  const urlParts = url.split('?');
  const baseUrl = urlParts[0];
  
  const params = new URLSearchParams();
  params.set('auto', 'compress');
  params.set('cs', 'tinysrgb');
  params.set('q', quality.toString());
  params.set('dpr', '1');
  
  if (width) {
    params.set('w', width.toString());
  }
  
  return `${baseUrl}?${params.toString()}`;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '50px' }
  );
  
  observer.observe(img);
};

// WebP поддержка
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// AVIF поддержка
export const supportsAVIF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};