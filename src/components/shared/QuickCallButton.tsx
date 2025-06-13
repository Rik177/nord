import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';

const QuickCallButton: React.FC = () => {
  const [showCallForm, setShowCallForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    
    // Здесь будет отправка данных на сервер
    console.log('Callback request:', formData);
    
    setIsSubmitted(true);
    setTimeout(() => {
      setShowCallForm(false);
      setIsSubmitted(false);
      setFormData({ name: '', phone: '' });
    }, 3000);
  };

  return (
    <>
      {/* Quick Call Button */}
      <button
        onClick={() => setShowCallForm(true)}
        className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 animate-pulse"
        aria-label="Заказать обратный звонок"
      >
        <Phone className="h-6 w-6" />
      </button>

      {/* Callback Form Modal */}
      {showCallForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white">
                    Обратный звонок
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Оставьте номер телефона, мы перезвоним в течение 5 минут
                  </p>
                </div>
                <button 
                  onClick={() => setShowCallForm(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Ваше имя*
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Как к вам обращаться?"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Телефон*
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="flex items-center text-green-700 dark:text-green-300 text-sm">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>Перезвоним в течение 5 минут в рабочее время</span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Пн-Пт: 9:00-18:00, Сб: 10:00-16:00
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                  >
                    Заказать звонок
                  </button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a href="/privacy-policy" className="text-primary hover:underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-primary dark:text-white mb-2">
                    Заявка принята!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Мы перезвоним вам в ближайшее время
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Номер заявки: #{Date.now().toString().slice(-6)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickCallButton;