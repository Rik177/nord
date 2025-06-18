import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

// Общие правила валидации
export const commonValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[а-яёА-ЯЁa-zA-Z\s-]+$/,
    custom: (value: string) => {
      if (value && value.trim().length < 2) {
        return 'Имя должно содержать минимум 2 символа';
      }
      if (value && !/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value)) {
        return 'Имя может содержать только буквы, пробелы и дефисы';
      }
      return null;
    }
  },
  phone: {
    required: true,
    custom: (value: string) => {
      const phoneRegex = /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
        return 'Введите корректный номер телефона';
      }
      return null;
    }
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Введите корректный email адрес';
      }
      return null;
    }
  },
  message: {
    maxLength: 1000,
    custom: (value: string) => {
      if (value && value.length > 1000) {
        return 'Сообщение не должно превышать 1000 символов';
      }
      return null;
    }
  }
};

// Хук для валидации форм
export const useFormValidation = <T extends Record<string, any>>(
  initialData: T,
  rules: ValidationRules
) => {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: any): string | null => {
    const rule = rules[name];
    if (!rule) return null;

    // Проверка обязательности
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return 'Это поле обязательно для заполнения';
    }

    // Если поле пустое и не обязательное, пропускаем остальные проверки
    if (!value || (typeof value === 'string' && !value.trim())) {
      return null;
    }

    // Проверка минимальной длины
    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return `Минимальная длина: ${rule.minLength} символов`;
    }

    // Проверка максимальной длины
    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      return `Максимальная длина: ${rule.maxLength} символов`;
    }

    // Проверка паттерна
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return 'Неверный формат данных';
    }

    // Кастомная валидация
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [rules]);

  const updateField = useCallback((name: string, value: any) => {
    setData(prev => ({ ...prev, [name]: value }));
    
    // Валидация в реальном времени для уже затронутых полей
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  }, [touched, validateField]);

  const touchField = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, data[name]);
    setErrors(prev => ({ ...prev, [name]: error || '' }));
  }, [data, validateField]);

  const validateAll = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    const newTouched: FormTouched = {};
    
    Object.keys(rules).forEach(name => {
      newTouched[name] = true;
      const error = validateField(name, data[name]);
      if (error) {
        newErrors[name] = error;
      }
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  }, [data, rules, validateField]);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialData]);

  return {
    data,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    updateField,
    touchField,
    validateAll,
    reset
  };
};

// Утилиты для защиты от спама
export class SpamProtection {
  private static submissionTimes: Map<string, number[]> = new Map();
  private static readonly MAX_SUBMISSIONS_PER_HOUR = 5;
  private static readonly HOUR_IN_MS = 60 * 60 * 1000;

  static isRateLimited(clientId: string): boolean {
    const now = Date.now();
    const submissions = this.submissionTimes.get(clientId) || [];
    
    // Удаляем старые записи (старше часа)
    const recentSubmissions = submissions.filter(time => now - time < this.HOUR_IN_MS);
    
    if (recentSubmissions.length >= this.MAX_SUBMISSIONS_PER_HOUR) {
      return true;
    }
    
    // Обновляем записи
    recentSubmissions.push(now);
    this.submissionTimes.set(clientId, recentSubmissions);
    
    return false;
  }

  static validateHoneypot(value: string): boolean {
    // Honeypot поле должно быть пустым
    return !value || value.trim() === '';
  }

  static isDisposableEmail(email: string): boolean {
    const disposableDomains = [
      '10minutemail.com',
      'tempmail.org',
      'guerrillamail.com',
      'mailinator.com',
      'throwaway.email'
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    return disposableDomains.includes(domain);
  }

  static containsSuspiciousContent(text: string): boolean {
    const suspiciousPatterns = [
      /https?:\/\/[^\s]+/gi, // URL-ы
      /\b(viagra|casino|loan|bitcoin|crypto)\b/gi, // Спам слова
      /(.)\1{10,}/gi, // Повторяющиеся символы
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(text));
  }
}

// Форматирование телефона
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('8')) {
    return `+7${cleaned.slice(1)}`;
  }
  
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return `+${cleaned}`;
  }
  
  if (cleaned.length === 10) {
    return `+7${cleaned}`;
  }
  
  return phone;
};

// Валидация на стороне сервера (для Node.js)
export const serverValidation = {
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  validatePhone: (phone: string): boolean => {
    const phoneRegex = /^\+7[0-9]{10}$/;
    return phoneRegex.test(phone);
  },
  
  sanitizeInput: (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>]/g, '')
      .trim();
  }
};