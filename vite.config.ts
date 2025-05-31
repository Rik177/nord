import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png)$/i,
      webp: {
        quality: 85,
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'nonce-${Buffer.from(Math.random().toString()).toString('base64')}';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' https://images.pexels.com data:;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self';
        frame-ancestors 'none';
        form-action 'self';
        base-uri 'self';
        upgrade-insecure-requests;
      `.replace(/\s+/g, ' ').trim(),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    }
  }
});