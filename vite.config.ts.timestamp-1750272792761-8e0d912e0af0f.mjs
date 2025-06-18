// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { imagetools } from "file:///home/project/node_modules/vite-imagetools/dist/index.js";
import { ViteImageOptimizer } from "file:///home/project/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }]
        ]
      }
    }),
    imagetools(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      gifsicle: { optimizationLevel: 7, interlaced: false },
      mozjpeg: { quality: 80 },
      optipng: { optimizationLevel: 7 },
      pngquant: { quality: [0.65, 0.8], speed: 4 },
      svgo: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: false }
        ]
      },
      webp: { quality: 85 },
      avif: { quality: 80 }
    })
  ],
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "lucide-react"]
  },
  build: {
    target: "es2015",
    cssMinify: "esbuild",
    minify: "esbuild",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          icons: ["lucide-react"],
          swiper: ["swiper"],
          helmet: ["react-helmet-async"]
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          return `assets/[ext]/[name]-[hash].${ext}`;
        }
      }
    },
    // Увеличиваем лимит для предупреждений о размере чанков
    chunkSizeWarningLimit: 1e3
  },
  server: {
    port: 3008,
    headers: {
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' https://images.pexels.com https://upload.wikimedia.org data: https://*.google.com https://*.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://*.google.com",
        "frame-src 'self' https://www.google.com",
        "frame-ancestors 'none'",
        "form-action 'self'",
        "base-uri 'self'"
      ].join("; "),
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      // Кэширование статических ресурсов
      "Cache-Control": "public, max-age=31536000"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBpbWFnZXRvb2xzIH0gZnJvbSAndml0ZS1pbWFnZXRvb2xzJztcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlLW9wdGltaXplcic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCh7XG4gICAgICBqc3hSdW50aW1lOiAnYXV0b21hdGljJyxcbiAgICAgIGJhYmVsOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICBbJ0BiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWpzeCcsIHsgcnVudGltZTogJ2F1dG9tYXRpYycgfV1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pLFxuICAgIGltYWdldG9vbHMoKSxcbiAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoe1xuICAgICAgdGVzdDogL1xcLihqcGU/Z3xwbmd8Z2lmfHRpZmZ8d2VicHxzdmd8YXZpZikkL2ksXG4gICAgICBnaWZzaWNsZTogeyBvcHRpbWl6YXRpb25MZXZlbDogNywgaW50ZXJsYWNlZDogZmFsc2UgfSxcbiAgICAgIG1vempwZWc6IHsgcXVhbGl0eTogODAgfSxcbiAgICAgIG9wdGlwbmc6IHsgb3B0aW1pemF0aW9uTGV2ZWw6IDcgfSxcbiAgICAgIHBuZ3F1YW50OiB7IHF1YWxpdHk6IFswLjY1LCAwLjhdLCBzcGVlZDogNCB9LFxuICAgICAgc3Znbzoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgeyBuYW1lOiAncmVtb3ZlVmlld0JveCcsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICB7IG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJywgYWN0aXZlOiBmYWxzZSB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB3ZWJwOiB7IHF1YWxpdHk6IDg1IH0sXG4gICAgICBhdmlmOiB7IHF1YWxpdHk6IDgwIH1cbiAgICB9KVxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJywgJ2x1Y2lkZS1yZWFjdCddLFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzMjAxNScsXG4gICAgY3NzTWluaWZ5OiAnZXNidWlsZCcsXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICByb3V0ZXI6IFsncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgIGljb25zOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgICAgICAgIHN3aXBlcjogWydzd2lwZXInXSxcbiAgICAgICAgICBoZWxtZXQ6IFsncmVhY3QtaGVsbWV0LWFzeW5jJ11cbiAgICAgICAgfSxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZm8gPSBhc3NldEluZm8ubmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGNvbnN0IGV4dCA9IGluZm9baW5mby5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAoL1xcLihwbmd8anBlP2d8c3ZnfGdpZnx0aWZmfGJtcHxpY28pJC9pLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9pbWFnZXMvW25hbWVdLVtoYXNoXS4ke2V4dH1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoL1xcLih3b2ZmMj98ZW90fHR0ZnxvdGYpJC9pLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9mb250cy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgYXNzZXRzL1tleHRdL1tuYW1lXS1baGFzaF0uJHtleHR9YDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vIFx1MDQyM1x1MDQzMlx1MDQzNVx1MDQzQlx1MDQzOFx1MDQ0N1x1MDQzOFx1MDQzMlx1MDQzMFx1MDQzNVx1MDQzQyBcdTA0M0JcdTA0MzhcdTA0M0NcdTA0MzhcdTA0NDIgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQzRlx1MDQ0MFx1MDQzNVx1MDQzNlx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0UgXHUwNDQwXHUwNDMwXHUwNDM3XHUwNDNDXHUwNDM1XHUwNDQwXHUwNDM1IFx1MDQ0N1x1MDQzMFx1MDQzRFx1MDQzQVx1MDQzRVx1MDQzMlxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwOCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1TZWN1cml0eS1Qb2xpY3knOiBbXG4gICAgICAgIFwiZGVmYXVsdC1zcmMgJ3NlbGYnXCIsXG4gICAgICAgIFwic2NyaXB0LXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnICd1bnNhZmUtZXZhbCdcIixcbiAgICAgICAgXCJzdHlsZS1zcmMgJ3NlbGYnICd1bnNhZmUtaW5saW5lJyBodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tXCIsXG4gICAgICAgIFwiaW1nLXNyYyAnc2VsZicgaHR0cHM6Ly9pbWFnZXMucGV4ZWxzLmNvbSBodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnIGRhdGE6IGh0dHBzOi8vKi5nb29nbGUuY29tIGh0dHBzOi8vKi5nb29nbGVhcGlzLmNvbVwiLFxuICAgICAgICBcImZvbnQtc3JjICdzZWxmJyBodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tXCIsXG4gICAgICAgIFwiY29ubmVjdC1zcmMgJ3NlbGYnIGh0dHBzOi8vKi5nb29nbGUuY29tXCIsXG4gICAgICAgIFwiZnJhbWUtc3JjICdzZWxmJyBodHRwczovL3d3dy5nb29nbGUuY29tXCIsXG4gICAgICAgIFwiZnJhbWUtYW5jZXN0b3JzICdub25lJ1wiLFxuICAgICAgICBcImZvcm0tYWN0aW9uICdzZWxmJ1wiLFxuICAgICAgICBcImJhc2UtdXJpICdzZWxmJ1wiXG4gICAgICBdLmpvaW4oJzsgJyksXG4gICAgICAnWC1Db250ZW50LVR5cGUtT3B0aW9ucyc6ICdub3NuaWZmJyxcbiAgICAgICdYLUZyYW1lLU9wdGlvbnMnOiAnREVOWScsXG4gICAgICAnWC1YU1MtUHJvdGVjdGlvbic6ICcxOyBtb2RlPWJsb2NrJyxcbiAgICAgICdSZWZlcnJlci1Qb2xpY3knOiAnc3RyaWN0LW9yaWdpbi13aGVuLWNyb3NzLW9yaWdpbicsXG4gICAgICAnU3RyaWN0LVRyYW5zcG9ydC1TZWN1cml0eSc6ICdtYXgtYWdlPTMxNTM2MDAwOyBpbmNsdWRlU3ViRG9tYWlucycsXG4gICAgICAvLyBcdTA0MUFcdTA0NERcdTA0NDhcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDM4XHUwNDQ1IFx1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0M1x1MDQ0MFx1MDQ0MVx1MDQzRVx1MDQzMlxuICAgICAgJ0NhY2hlLUNvbnRyb2wnOiAncHVibGljLCBtYXgtYWdlPTMxNTM2MDAwJ1xuICAgIH1cbiAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUywwQkFBMEI7QUFFbkMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLFFBQ0wsU0FBUztBQUFBLFVBQ1AsQ0FBQyxxQ0FBcUMsRUFBRSxTQUFTLFlBQVksQ0FBQztBQUFBLFFBQ2hFO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLElBQ1gsbUJBQW1CO0FBQUEsTUFDakIsTUFBTTtBQUFBLE1BQ04sVUFBVSxFQUFFLG1CQUFtQixHQUFHLFlBQVksTUFBTTtBQUFBLE1BQ3BELFNBQVMsRUFBRSxTQUFTLEdBQUc7QUFBQSxNQUN2QixTQUFTLEVBQUUsbUJBQW1CLEVBQUU7QUFBQSxNQUNoQyxVQUFVLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzNDLE1BQU07QUFBQSxRQUNKLFNBQVM7QUFBQSxVQUNQLEVBQUUsTUFBTSxpQkFBaUIsUUFBUSxNQUFNO0FBQUEsVUFDdkMsRUFBRSxNQUFNLG9CQUFvQixRQUFRLE1BQU07QUFBQSxRQUM1QztBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQU0sRUFBRSxTQUFTLEdBQUc7QUFBQSxNQUNwQixNQUFNLEVBQUUsU0FBUyxHQUFHO0FBQUEsSUFDdEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxTQUFTLGFBQWEsb0JBQW9CLGNBQWM7QUFBQSxFQUNwRTtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osUUFBUSxDQUFDLFNBQVMsV0FBVztBQUFBLFVBQzdCLFFBQVEsQ0FBQyxrQkFBa0I7QUFBQSxVQUMzQixPQUFPLENBQUMsY0FBYztBQUFBLFVBQ3RCLFFBQVEsQ0FBQyxRQUFRO0FBQUEsVUFDakIsUUFBUSxDQUFDLG9CQUFvQjtBQUFBLFFBQy9CO0FBQUEsUUFDQSxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGdCQUFNLE9BQU8sVUFBVSxLQUFLLE1BQU0sR0FBRztBQUNyQyxnQkFBTSxNQUFNLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDaEMsY0FBSSx1Q0FBdUMsS0FBSyxVQUFVLElBQUksR0FBRztBQUMvRCxtQkFBTywrQkFBK0IsR0FBRztBQUFBLFVBQzNDO0FBQ0EsY0FBSSwyQkFBMkIsS0FBSyxVQUFVLElBQUksR0FBRztBQUNuRCxtQkFBTyw4QkFBOEIsR0FBRztBQUFBLFVBQzFDO0FBQ0EsaUJBQU8sOEJBQThCLEdBQUc7QUFBQSxRQUMxQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCwyQkFBMkI7QUFBQSxRQUN6QjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsRUFBRSxLQUFLLElBQUk7QUFBQSxNQUNYLDBCQUEwQjtBQUFBLE1BQzFCLG1CQUFtQjtBQUFBLE1BQ25CLG9CQUFvQjtBQUFBLE1BQ3BCLG1CQUFtQjtBQUFBLE1BQ25CLDZCQUE2QjtBQUFBO0FBQUEsTUFFN0IsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
