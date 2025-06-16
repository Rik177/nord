import React, { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";

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
  sizes,
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

  // Generate responsive image sources
  const generateSrcSet = (originalSrc: string) => {
    if (!originalSrc.includes("pexels.com")) return "";

    const baseUrl = originalSrc.split("?")[0];
    return [
      `${baseUrl}?auto=compress&cs=tinysrgb&w=400 400w`,
      `${baseUrl}?auto=compress&cs=tinysrgb&w=800 800w`,
      `${baseUrl}?auto=compress&cs=tinysrgb&w=1200 1200w`,
      `${baseUrl}?auto=compress&cs=tinysrgb&w=1600 1600w`,
    ].join(", ");
  };

  const defaultSizes =
    sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
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
                }
              : {}
          }
        >
          {placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover blur-sm"
              aria-hidden="true"
            />
          ) : (
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          )}
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
          width={width}
          height={height}
          srcSet={srcSet}
          sizes={defaultSizes}
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

export default OptimizedImage;
