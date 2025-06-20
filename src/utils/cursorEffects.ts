// This file contains utility functions for interactive effects

/**
 * Initialize scroll animations
 */
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-element, .scale-in-element, .slide-in-element');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible', 'scale-in-visible', 'slide-in-visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
  
  // Text reveal animations
  const textElements = document.querySelectorAll('.text-reveal');
  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.5 }
  );
  
  textElements.forEach(el => {
    textObserver.observe(el);
  });
}

/**
 * Initialize hover effects for interactive elements
 */
export function initHoverEffects() {
  // Magnetic effect for buttons
  const magneticButtons = document.querySelectorAll('.magnetic-effect');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = (button as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Reduce the effect strength
      const strength = 10;
      const xTransform = x / strength;
      const yTransform = y / strength;
      
      (button as HTMLElement).style.transform = `translate(${xTransform}px, ${yTransform}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      (button as HTMLElement).style.transform = 'translate(0, 0)';
    });
  });
  
  // Parallax card effect
  const parallaxCards = document.querySelectorAll('.parallax-card');
  
  parallaxCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / 20;
      const deltaY = (y - centerY) / 20;
      
      (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}

/**
 * Initialize cursor effects (empty implementation)
 * This function is kept for compatibility but doesn't implement custom cursor
 */
export function initCursorEffects() {
  // No custom cursor implementation
}