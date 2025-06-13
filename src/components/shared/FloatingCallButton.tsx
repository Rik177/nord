import React from 'react';
import { Phone } from 'lucide-react';

const FloatingCallButton: React.FC = () => {
  return (
    <a
      href="tel:+71234567890"
      className="fixed bottom-24 left-6 z-40 bg-primary hover:bg-opacity-90 text-white rounded-full p-3 shadow-lg transition-all duration-300 group"
      aria-label="Позвонить"
    >
      <Phone className="h-5 w-5" />
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        +7 (123) 456-78-90
      </div>
    </a>
  );
};

export default FloatingCallButton;