# Руководство по деплою

## Netlify (Рекомендуется)

### Автоматический деплой
1. Подключите репозиторий к Netlify
2. Настройте build команды:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Настройте переменные окружения (если нужны)

### Ручной деплой
```bash
npm run build
# Загрузите содержимое папки dist в Netlify
```

### Настройки Netlify
- Добавьте файл `_redirects` для SPA роутинга
- Настройте кэширование заголовков в `_headers`
- Включите форм-обработку для контактных форм

## Vercel

```bash
npm i -g vercel
vercel --prod
```

## GitHub Pages

1. Установите `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Добавьте в package.json:
```json
{
  "homepage": "https://yourusername.github.io/nordengineering",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Деплой:
```bash
npm run deploy
```

## Собственный сервер

### Nginx конфигурация
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    # Gzip сжатие
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA роутинг
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Service Worker
    location /sw.js {
        add_header Cache-Control "no-cache";
        proxy_cache_bypass $http_pragma;
        proxy_cache_revalidate on;
        expires off;
        access_log off;
    }
}
```

### Apache .htaccess
```apache
RewriteEngine On
RewriteBase /

# Handle Angular and Vue.js routes
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## Переменные окружения

Создайте файл `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_SITE_URL=https://yourdomain.com
VITE_ANALYTICS_ID=your-analytics-id
```

## Проверка перед деплоем

```bash
# Сборка
npm run build

# Проверка линтинга
npm run lint

# Валидация схем
npm run validate

# Анализ бандла
npm run analyze

# Предварительный просмотр
npm run preview
```

## Мониторинг после деплоя

1. Проверьте Core Web Vitals в Google PageSpeed Insights
2. Убедитесь, что Service Worker работает корректно
3. Проверьте PWA функциональность
4. Протестируйте формы обратной связи
5. Проверьте SEO метрики в Google Search Console

## Troubleshooting

### Проблемы с роутингом
- Убедитесь, что настроены редиректы для SPA
- Проверьте базовый URL в конфигурации

### Проблемы с кэшированием
- Очистите кэш браузера
- Проверьте заголовки кэширования
- Обновите Service Worker

### Проблемы с PWA
- Проверьте манифест
- Убедитесь, что Service Worker зарегистрирован
- Проверьте HTTPS соединение