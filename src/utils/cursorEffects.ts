// Custom cursor effects and interactive animations
export const initCursorEffects = () => {
  // Only initialize on non-touch devices
  if (window.matchMedia('(pointer: fine)').matches) {
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    const cursorInner = document.createElement('div');
    
    // Add classes
    cursorOuter.classList.add('cursor-outer');
    cursorInner.classList.add('cursor-inner');
    
    // Append to body
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let innerX = 0;
    let innerY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Animate cursor
    const animateCursor = () => {
      // Smooth follow for outer cursor
      outerX += (mouseX - outerX) * 0.2;
      outerY += (mouseY - outerY) * 0.2;
      
      // Faster follow for inner cursor
      innerX += (mouseX - innerX) * 0.4;
      innerY += (mouseY - innerY) * 0.4;
      
      // Apply positions
      cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;
      cursorInner.style.transform = `translate(${innerX}px, ${innerY}px)`;
      
      // Continue animation
      requestAnimationFrame(animateCursor);
    };
    
    // Start animation
    animateCursor();
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        cursorOuter.classList.add('cursor-hover');
        cursorInner.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursorOuter.classList.remove('cursor-hover');
        cursorInner.classList.remove('cursor-hover');
      });
    });
    
    // Add click effect
    document.addEventListener('mousedown', () => {
      cursorOuter.classList.add('cursor-click');
      cursorInner.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', () => {
      cursorOuter.classList.remove('cursor-click');
      cursorInner.classList.remove('cursor-click');
    });
  }
};

// Interactive hover effects for cards and buttons
export const initHoverEffects = () => {
  // Magnetic effect for buttons
  const magneticButtons = document.querySelectorAll('.magnetic-effect');
  
  magneticButtons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = (button as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      (button as HTMLElement).style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      (button as HTMLElement).style.transform = 'translate(0, 0)';
    });
  });
  
  // Parallax effect for cards
  const parallaxCards = document.querySelectorAll('.parallax-card');
  
  parallaxCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${deltaY * -5}deg) rotateY(${deltaX * 5}deg)`;
      
      // Add shine effect
      const shine = card.querySelector('.card-shine') as HTMLElement;
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      
      const shine = card.querySelector('.card-shine') as HTMLElement;
      if (shine) {
        shine.style.background = 'none';
      }
    });
  });
};

// Scroll animations
export const initScrollAnimations = () => {
  // Only run if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    const scaleElements = document.querySelectorAll('.scale-in-element');
    const slideElements = document.querySelectorAll('.slide-in-element');
    
    // Fade in animation
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
    
    // Scale in animation
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
    
    // Slide in animation
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
  }
};