import React, { useState, useRef, useEffect } from 'react';
import { generateSrcSet, generateOptimizedUrl, supportsWebP, supportsAVIF } from '../../utils/imageOptimization';

interface LazyImageProps {
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
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError,
  placeholder
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const [imageFormat, setImageFormat] = useState<'avif' | 'webp' | 'original'>('original');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    // Определяем поддерживаемый формат изображений
    const checkFormats = async () => {
      if (await supportsAVIF()) {
        setImageFormat('avif');
      } else if (await supportsWebP()) {
        setImageFormat('webp');
      }
    };
    
    checkFormats();
  }, []);

  useEffect(() => {
    if (priority) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  const getOptimizedSrc = () => {
    if (imageFormat === 'avif') {
      // Для AVIF используем оригинальный URL с параметрами
      return generateOptimizedUrl(src, width, 80);
    } else if (imageFormat === 'webp') {
      // Для WebP используем оригинальный URL с параметрами
      return generateOptimizedUrl(src, width, 85);
    }
    return generateOptimizedUrl(src, width, 90);
  };

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
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ width, height }}
        >
          {placeholder && (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover blur-sm opacity-50"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <picture>
          {/* AVIF format */}
          {imageFormat === 'avif' && (
            <source
              srcSet={generateSrcSet(src)}
              sizes={sizes}
              type="image/avif"
            />
          )}
          
          {/* WebP format */}
          {(imageFormat === 'webp' || imageFormat === 'avif') && (
            <source
              srcSet={generateSrcSet(src)}
              sizes={sizes}
              type="image/webp"
            />
          )}
          
          {/* Fallback */}
          <img
            src={getOptimizedSrc()}
            alt={alt}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            width={width}
            height={height}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              objectFit: 'cover',
              width: width ? `${width}px` : '100%',
              height: height ? `${height}px` : '100%',
            }}
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;