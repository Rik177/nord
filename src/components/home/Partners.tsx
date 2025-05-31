import React from 'react';

const partnerLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/c/ce/Daikin-logo-png-transparent.png',
  'https://upload.wikimedia.org/wikipedia/commons/a/ad/Mitsubishi_Electric_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/4/4e/Carrier_Corporation_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2b/Toshiba_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9e/Panasonic_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/3/36/LG_logo_%282015%29.svg',
  'https://upload.wikimedia.org/wikipedia/commons/8/87/Bosch_logo.svg'
];

const Partners: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary text-center mb-8">
          Наши партнеры
        </h2>
        <div className="overflow-hidden">
          <div className="partner-logo-container">
            {/* First set of logos */}
            {partnerLogos.map((logo, index) => (
              <div key={`logo-1-${index}`} className="flex items-center justify-center min-w-[160px] mx-6">
                <img 
                  src={logo} 
                  alt={`Partner logo ${index + 1}`} 
                  className="max-h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
            {/* Duplicate set for seamless looping */}
            {partnerLogos.map((logo, index) => (
              <div key={`logo-2-${index}`} className="flex items-center justify-center min-w-[160px] mx-6">
                <img 
                  src={logo} 
                  alt={`Partner logo ${index + 1}`} 
                  className="max-h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;