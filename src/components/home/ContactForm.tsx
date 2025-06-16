import React, { useState } from 'react';

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
  agreement: boolean;
}

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    message: '',
    agreement: false,
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: checked,
    }));
    
    // Clear error when user checks
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя';
    }
    
    if (!formState.phone.trim()) {
      newErrors.phone = 'Пожалуйста, введите ваш телефон';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Пожалуйста, введите ваш email';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Пожалуйста, введите корректный email';
    }
    
    if (!formState.agreement) {
      newErrors.agreement = 'Необходимо согласие на обработку персональных данных';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // Simulate form submission
      setTimeout(() => {
        setSubmitted(true);
        setFormState({
          name: '',
          phone: '',
          email: '',
          message: '',
          agreement: false,
        });
      }, 500);
    }
  };

  return (
    <section className="py-12 bg-primary text-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-center mb-2">
            Остались вопросы?
          </h2>
          <p className="text-center mb-8 text-gray-300">
            Оставьте заявку, и наш специалист свяжется с вами в ближайшее время
          </p>
          
          {submitted ? (
            <div className="bg-white/10 rounded-lg p-8 text-center">
              <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop mb-4">
                Спасибо за обращение!
              </h3>
              <p className="mb-6">
                Ваша заявка успешно отправлена. Наш специалист свяжется с вами в ближайшее время.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="inline-block bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Отправить еще
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/10 rounded-lg p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-semibold">
                    Ваше имя*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:border-secondary ${
                      errors.name ? 'border-accent' : ''
                    }`}
                  />
                  {errors.name && (
                    <p className="text-accent text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 font-semibold">
                    Телефон*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:border-secondary ${
                      errors.phone ? 'border-accent' : ''
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-accent text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:border-secondary ${
                      errors.email ? 'border-accent' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-accent text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-semibold">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={1}
                    className="w-full p-3 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    checked={formState.agreement}
                    onChange={handleCheckboxChange}
                    className={`mt-1 mr-2 ${errors.agreement ? 'ring-2 ring-accent' : ''}`}
                  />
                  <label htmlFor="agreement" className="text-sm">
                    Я согласен на обработку персональных данных в соответствии с{' '}
                    <a href="#" className="text-secondary hover:underline">
                      политикой конфиденциальности
                    </a>
                  </label>
                </div>
                {errors.agreement && (
                  <p className="text-accent text-sm mt-1">{errors.agreement}</p>
                )}
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                >
                  Отправить
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;