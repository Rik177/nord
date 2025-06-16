import React from 'react';
import { X, Phone, Mail } from 'lucide-react';

export interface ConsultationFormData {
    name: string;
    phone: string;
    email: string;
    message: string;
}

interface ConsultationFormProps {
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    value: ConsultationFormData;
    setValue: (data: ConsultationFormData) => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ onClose, onSubmit, value, setValue}) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white">
                                Заказать консультацию
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Наш специалист свяжется с вами в ближайшее время
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
            
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                                Ваше имя*
                            </label>
                            <input
                                type="text"
                                required
                                value={value.name}
                                onChange={(e) => setValue({ ...value, name: e.target.value })}
                                className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                                Телефон*
                            </label>
                            <input
                                type="tel"
                                required
                                value={value.phone}
                                onChange={(e) => setValue({ ...value, phone: e.target.value })}
                                className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                value={value.email}
                                onChange={(e) => setValue({ ...value, email: e.target.value })}
                                className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                                Сообщение
                            </label>
                            <textarea
                                rows={4}
                                value={value.message}
                                onChange={(e) => setValue({ ...value, message: e.target.value })}
                                className="w-full p-3 rounded-md bg-lightBg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Опишите ваши требования или задайте вопрос..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                        >
                            Заказать консультацию
                        </button>
                    </form>
            
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Или свяжитесь с нами напрямую:
                        </p>
                        <div className="flex flex-col space-y-2">
                            <a href="tel:+71234567890" className="flex items-center text-primary hover:text-secondary">
                                <Phone className="h-4 w-4 mr-2" />
                                +7 (123) 456-78-90
                            </a>
                            <a href="mailto:info@nordengineering.ru" className="flex items-center text-primary hover:text-secondary">
                                <Mail className="h-4 w-4 mr-2" />
                                info@nordengineering.ru
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationForm;