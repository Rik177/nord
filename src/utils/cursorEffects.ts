/**
 * Initialize hover effects for interactive elements
 */
export const initHoverEffects = () => {
  // Only run on devices with hover capability
  if (window.matchMedia('(hover: hover)').matches) {
    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.magnetic-effect');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e: MouseEvent) => {
        const target = element as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Limit the movement to a reasonable amount
        const maxMove = 10;
        const moveX = Math.max(Math.min(x * 0.2, maxMove), -maxMove);
        const moveY = Math.max(Math.min(y * 0.2, maxMove), -maxMove);
        
        target.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      element.addEventListener('mouseleave', () => {
        const target = element as HTMLElement;
        target.style.transform = 'translate(0px, 0px)';
      });
    });
    
    // Parallax card effect
    const parallaxCards = document.querySelectorAll('.parallax-card');
    
    parallaxCards.forEach(card => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const target = card as HTMLElement;
        const rect = target.getBoundingClientRect();
        
        // Calculate mouse position relative to card center
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Apply subtle rotation
        target.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        
        // Add shine effect
        const shine = target.querySelector('.card-shine') as HTMLElement;
        if (shine) {
          shine.style.background = `radial-gradient(circle at ${x * 100 + 50}% ${y * 100 + 50}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const target = card as HTMLElement;
        target.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        
        const shine = target.querySelector('.card-shine') as HTMLElement;
        if (shine) {
          shine.style.background = 'none';
        }
      });
    });
  }
};

/**
 * Initialize scroll animations
 */
export const initScrollAnimations = () => {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    // Fade in elements
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      fadeObserver.observe(element);
    });
    
    // Scale in elements
    const scaleElements = document.querySelectorAll('.scale-in-element');
    
    const scaleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scale-in-visible');
          scaleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    scaleElements.forEach(element => {
      scaleObserver.observe(element);
    });
    
    // Slide in elements
    const slideElements = document.querySelectorAll('.slide-in-element');
    
    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in-visible');
          slideObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    slideElements.forEach(element => {
      slideObserver.observe(element);
    });
    
    // Text reveal elements
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    const textRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          textRevealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    textRevealElements.forEach(element => {
      textRevealObserver.observe(element);
    });
    
    // Staggered animations
    const staggerContainers = document.querySelectorAll('.stagger-visible');
    
    staggerContainers.forEach(container => {
      const staggerItems = container.querySelectorAll('.stagger-item');
      staggerItems.forEach((item, index) => {
        (item as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      });
    });
  }
};