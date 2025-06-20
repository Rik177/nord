import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add a class to enable custom cursor only after page load
document.addEventListener('DOMContentLoaded', () => {
  // Check if device supports hover
  if (window.matchMedia('(pointer: fine)').matches) {
    document.documentElement.classList.add('custom-cursor-enabled');
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);