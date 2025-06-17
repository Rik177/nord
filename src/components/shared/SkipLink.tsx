import React from 'react';

const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="skip-link sr-only-focusable bg-primary text-white px-4 py-2 rounded-md font-semibold"
      style={{
        position: 'absolute',
        top: '-40px',
        left: '6px',
        zIndex: 1000,
        transition: 'top 0.3s ease'
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '6px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-40px';
      }}
    >
      Перейти к основному содержимому
    </a>
  );
};

export default SkipLink;