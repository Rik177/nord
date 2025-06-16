// Performance monitoring and optimization utilities

// Web Vitals tracking
export const reportWebVitals = (metric: any) => {
  // In production, send to analytics service
  console.log(metric);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement("link");
  fontLink.rel = "preload";
  fontLink.href = "/fonts/inter-var.woff2";
  fontLink.as = "font";
  fontLink.type = "font/woff2";
  fontLink.crossOrigin = "anonymous";
  document.head.appendChild(fontLink);

  // Preload critical images
  const heroImage = new Image();
  heroImage.src = "/hero-background.webp";
};

// Image loading optimization
export const optimizeImageLoading = () => {
  // Add loading="lazy" to all images below the fold
  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
};

// Critical CSS inlining utility
export const inlineCriticalCSS = (css: string) => {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
};

// Resource hints
export const addResourceHints = () => {
  // DNS prefetch for external domains
  const dnsPrefetch = ["//fonts.googleapis.com", "//images.pexels.com"];
  dnsPrefetch.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = domain;
    document.head.appendChild(link);
  });

  // Preconnect to critical third-party origins
  const preconnect = ["https://fonts.gstatic.com"];
  preconnect.forEach((origin) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
};

// Cumulative Layout Shift (CLS) optimization
export const preventLayoutShift = () => {
  // Add aspect ratio containers for images
  const images = document.querySelectorAll("img[width][height]");
  images.forEach((img) => {
    const aspectRatio =
      (parseInt(img.getAttribute("height") || "0") /
        parseInt(img.getAttribute("width") || "1")) *
      100;
    const container = img.parentElement;
    if (container && !container.style.aspectRatio) {
      container.style.aspectRatio = `${img.getAttribute("width")} / ${img.getAttribute("height")}`;
    }
  });
};

// Largest Contentful Paint (LCP) optimization
export const optimizeLCP = () => {
  // Mark hero images as high priority
  const heroImages = document.querySelectorAll(".hero img, .banner img");
  heroImages.forEach((img) => {
    (img as HTMLImageElement).loading = "eager";
    (img as HTMLImageElement).fetchPriority = "high";
  });
};

// First Input Delay (FID) optimization
export const optimizeFID = () => {
  // Break up long tasks
  const scheduleWork = (callback: () => void) => {
    if ("scheduler" in window && "postTask" in (window as any).scheduler) {
      (window as any).scheduler.postTask(callback);
    } else {
      setTimeout(callback, 0);
    }
  };

  return scheduleWork;
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("SW registered: ", registration);
    } catch (registrationError) {
      console.log("SW registration failed: ", registrationError);
    }
  }
};

// Critical path CSS for above-the-fold content
export const criticalCSS = `
  /* Critical styles for header and hero section */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1A3C6E 0%, #2563EB 100%);
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    text-align: center;
    line-height: 1.2;
  }
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }
  }
`;

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  // Run on DOM content loaded
  document.addEventListener("DOMContentLoaded", () => {
    addResourceHints();
    preventLayoutShift();
    optimizeLCP();
    optimizeImageLoading();
  });

  // Run on page load
  window.addEventListener("load", () => {
    preloadCriticalResources();
    registerServiceWorker();
  });

  // Inline critical CSS
  inlineCriticalCSS(criticalCSS);
};
