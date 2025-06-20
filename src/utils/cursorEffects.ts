// Custom cursor and interactive effects implementation

// Custom cursor implementation
export const initCursorEffects = () => {
  // Only initialize on non-touch devices
  if (window.matchMedia('(pointer: fine)').matches) {
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    const cursorInner = document.createElement('div');
    
    cursorOuter.classList.add('cursor-outer');
    cursorInner.classList.add('cursor-inner');
    
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      cursorOuter.style.left = `${e.clientX}px`;
      cursorOuter.style.top = `${e.clientY}px`;
      
      cursorInner.style.left = `${e.clientX}px`;
      cursorInner.style.top = `${e.clientY}px`;
    });
    
    // Handle mouse down/up events
    document.addEventListener('mousedown', () => {
      cursorOuter.classList.add('cursor-click');
      cursorInner.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', () => {
      cursorOuter.classList.remove('cursor-click');
      cursorInner.classList.remove('cursor-click');
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursorOuter.classList.add('cursor-hover');
        cursorInner.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursorOuter.classList.remove('cursor-hover');
        cursorInner.classList.remove('cursor-hover');
      });
    });
  }
};

// Magnetic button effect
export const initHoverEffects = () => {
  // Only initialize on non-touch devices
  if (window.matchMedia('(pointer: fine)').matches) {
    const magneticElements = document.querySelectorAll('.magnetic-effect');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = (element as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Limit the movement to a small range
        const maxMove = 10;
        const moveX = (x / rect.width) * maxMove;
        const moveY = (y / rect.height) * maxMove;
        
        (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      element.addEventListener('mouseleave', () => {
        (element as HTMLElement).style.transform = 'translate(0, 0)';
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
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${deltaY * -3}deg) rotateY(${deltaX * 5}deg)`;
      });
      
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }
};

// Scroll animations
export const initScrollAnimations = () => {
  const fadeElements = document.querySelectorAll('.fade-in-element');
  const scaleElements = document.querySelectorAll('.scale-in-element');
  const slideElements = document.querySelectorAll('.slide-in-element');
  const staggerContainers = document.querySelectorAll('.stagger-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  const scaleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scale-in-visible');
        scaleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in-visible');
        slideObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
  
  scaleElements.forEach(element => {
    scaleObserver.observe(element);
  });
  
  slideElements.forEach(element => {
    slideObserver.observe(element);
  });
  
  // Staggered animation for lists
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.closest('.stagger-visible');
        if (!parent) {
          entry.target.closest('.stagger-item')?.parentElement?.classList.add('stagger-visible');
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  staggerContainers.forEach(container => {
    staggerObserver.observe(container);
  });
};