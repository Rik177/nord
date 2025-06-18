export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface FormData {
  [key: string]: string | boolean;
}

// Общие правила валидации
export const commonValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[а-яёА-ЯЁa-zA-Z\s-]+$/,
    custom: (value: string) => {
      if (value.trim().length < 2) {
        return 'Имя должно содержать минимум 2 символа';
      }
      if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value)) {
        return 'Имя может содержать только буквы, пробелы и дефисы';
      }
      return null;
    }
  },
  phone: {
    required: true,
    pattern: /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
    custom: (value: string) => {
      const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
      if (cleanPhone.length < 10) {
        return 'Номер телефона должен содержать минимум 10 цифр';
      }
      if (!/^(\+7|8)?[489][0-9]{9}$/.test(cleanPhone)) {
        return 'Введите корректный российский номер телефона';
      }
      return null;
    }
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Введите корректный email адрес';
      }
      if (value.length > 254) {
        return 'Email адрес слишком длинный';
      }
      return null;
    }
  },
  message: {
    minLength: 10,
    maxLength: 1000,
    custom: (value: string) => {
      if (value.trim().length > 0 && value.trim().length < 10) {
        return 'Сообщение должно содержать минимум 10 символов';
      }
      if (value.length > 1000) {
        return 'Сообщение не должно превышать 1000 символов';
      }
      return null;
    }
  }
};

// Функция валидации одного поля
export const validateField = (value: string | boolean, rule: ValidationRule): string | null => {
  const stringValue = String(value);
  
  // Проверка обязательности
  if (rule.required && (!stringValue || stringValue.trim() === '')) {
    return 'Это поле обязательно для заполнения';
  }
  
  // Если поле пустое и не обязательное, пропускаем остальные проверки
  if (!stringValue || stringValue.trim() === '') {
    return null;
  }
  
  // Проверка минимальной длины
  if (rule.minLength && stringValue.length < rule.minLength) {
    return `Минимальная длина: ${rule.minLength} символов`;
  }
  
  // Проверка максимальной длины
  if (rule.maxLength && stringValue.length > rule.maxLength) {
    return `Максимальная длина: ${rule.maxLength} символов`;
  }
  
  // Проверка паттерна
  if (rule.pattern && !rule.pattern.test(stringValue)) {
    return 'Неверный формат данных';
  }
  
  // Кастомная валидация
  if (rule.custom) {
    return rule.custom(stringValue);
  }
  
  return null;
};

// Функция валидации всей формы
export const validateForm = (data: FormData, rules: ValidationRules): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  Object.keys(rules).forEach(fieldName => {
    const value = data[fieldName];
    const rule = rules[fieldName];
    const error = validateField(value, rule);
    
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
};

// Функция для очистки и форматирования телефона
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8)}`;
  }
  
  if (cleaned.length === 11 && cleaned[0] === '8') {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
  }
  
  if (cleaned.length === 11 && cleaned[0] === '7') {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
  }
  
  return phone;
};

// Защита от спама
export class SpamProtection {
  private static submissions: Map<string, number[]> = new Map();
  private static readonly MAX_SUBMISSIONS = 3;
  private static readonly TIME_WINDOW = 60000; // 1 минута
  private static readonly BLOCKED_DOMAINS = [
    'tempmail.org',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com'
  ];
  
  static isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const submissions = this.submissions.get(identifier) || [];
    
    // Удаляем старые записи
    const recentSubmissions = submissions.filter(time => now - time < this.TIME_WINDOW);
    
    if (recentSubmissions.length >= this.MAX_SUBMISSIONS) {
      return true;
    }
    
    // Добавляем новую запись
    recentSubmissions.push(now);
    this.submissions.set(identifier, recentSubmissions);
    
    return false;
  }
  
  static isDisposableEmail(email: string): boolean {
    const domain = email.split('@')[1]?.toLowerCase();
    return this.BLOCKED_DOMAINS.includes(domain);
  }
  
  static containsSuspiciousContent(text: string): boolean {
    const suspiciousPatterns = [
      /https?:\/\/[^\s]+/gi, // URL-ы
      /\b(viagra|casino|loan|bitcoin|crypto)\b/gi, // Спам слова
      /(.)\1{4,}/gi, // Повторяющиеся символы
      /[А-Я]{10,}/g, // Много заглавных букв подряд
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(text));
  }
  
  static validateHoneypot(honeypotValue: string): boolean {
    return honeypotValue === '';
  }
}

// Хук для валидации форм в реальном времени
export const useFormValidation = (initialData: FormData, rules: ValidationRules) => {
  const [data, setData] = React.useState<FormData>(initialData);
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Валидация поля при изменении
  const validateFieldRealTime = React.useCallback((fieldName: string, value: string | boolean) => {
    const rule = rules[fieldName];
    if (!rule) return;
    
    const error = validateField(value, rule);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error || ''
    }));
  }, [rules]);
  
  // Обновление данных поля
  const updateField = React.useCallback((fieldName: string, value: string | boolean) => {
    setData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Валидация только если поле уже было затронуто
    if (touched[fieldName]) {
      validateFieldRealTime(fieldName, value);
    }
  }, [touched, validateFieldRealTime]);
  
  // Отметка поля как затронутого
  const touchField = React.useCallback((fieldName: string) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
    
    // Валидация при первом касании
    validateFieldRealTime(fieldName, data[fieldName]);
  }, [data, validateFieldRealTime]);
  
  // Валидация всей формы
  const validateAll = React.useCallback(() => {
    const allErrors = validateForm(data, rules);
    setErrors(allErrors);
    
    // Отмечаем все поля как затронутые
    const allTouched = Object.keys(rules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);
    
    return Object.keys(allErrors).length === 0;
  }, [data, rules]);
  
  // Сброс формы
  const reset = React.useCallback(() => {
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
    reset,
    isValid: Object.keys(errors).length === 0 && Object.keys(touched).length > 0
  };
};