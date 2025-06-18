import React, { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { generateSrcSet, generateOptimizedUrl } from "../../utils/imageOptimization";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
  blurDataURL?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  onLoad,
  onError,
  placeholder,
  blurDataURL,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (priority) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: "50px",
      },
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  const optimizedSrc = generateOptimizedUrl(src, width);
  const srcSet = generateSrcSet(src);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ${className}`}
        style={{ width, height }}
      >
        <span className="text-sm">Изображение недоступно</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700"
          style={
            blurDataURL
              ? {
                  backgroundImage: `url(${blurDataURL})`,
                  backgroundSize: "cover",
                  filter: "blur(10px)",
                }
              : {}
          }
        >
          {placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover blur-sm opacity-50"
              aria-hidden="true"
            />
          ) : (
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          )}
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <picture>
          {/* WebP format для поддерживающих браузеров */}
          <source
            srcSet={srcSet.replace(/\.(jpe?g|png)/gi, '.webp')}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Оригинальный формат */}
          <img
            src={optimizedSrc}
            alt={alt}
            className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} w-full h-full object-cover`}
            width={width}
            height={height}
            srcSet={srcSet}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              objectFit: "cover",
              width: width ? `${width}px` : "100%",
              height: height ? `${height}px` : "100%",
            }}
          />
        </picture>
      )}
    </div>
  );
};

// Helper function to generate alt text for product images
export const generateProductAlt = (productName: string, context?: string) => {
  const baseAlt = `${productName} - климатическое оборудование НОРДИНЖИНИРИНГ`;
  return context ? `${baseAlt} - ${context}` : baseAlt;
};

// Helper function to generate alt text for category images
export const generateCategoryAlt = (categoryName: string) => {
  return `${categoryName} - каталог климатического оборудования НОРДИНЖИНИРИНГ`;
};

// Helper function to generate alt text for blog images
export const generateBlogAlt = (title: string, isHero = false) => {
  const suffix = isHero ? "главное изображение статьи" : "иллюстрация к статье";
  return `${title} - ${suffix} блога НОРДИНЖИНИРИНГ`;
};

// Helper function to generate alt text for company images
export const generateCompanyAlt = (context: string) => {
  return `НОРДИНЖИНИРИНГ - ${context}`;
};

// Helper function to generate alt text for service images
export const generateServiceAlt = (serviceName: string) => {
  return `${serviceName} - услуги НОРДИНЖИНИРИНГ по климатическому оборудованию`;
};

// Helper function to generate alt text for project images
export const generateProjectAlt = (projectName: string, stage: 'before' | 'after' | 'process') => {
  const stageText = {
    before: 'до установки климатического оборудования',
    after: 'после установки климатического оборудования',
    process: 'процесс установки климатического оборудования'
  };
  return `${projectName} - ${stageText[stage]} НОРДИНЖИНИРИНГ`;
};

export default OptimizedImage;