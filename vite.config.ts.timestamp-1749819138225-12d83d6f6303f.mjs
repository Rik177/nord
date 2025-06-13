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
      test: /\.(jpe?g|png)$/i,
      webp: {
        quality: 85
      }
    })
  ],
  optimizeDeps: {
    include: ["react", "react-dom"]
  },
  build: {
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"]
        }
      }
    }
  },
  server: {
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
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBpbWFnZXRvb2xzIH0gZnJvbSAndml0ZS1pbWFnZXRvb2xzJztcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlLW9wdGltaXplcic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCh7XG4gICAgICBqc3hSdW50aW1lOiAnYXV0b21hdGljJyxcbiAgICAgIGJhYmVsOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICBbJ0BiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWpzeCcsIHsgcnVudGltZTogJ2F1dG9tYXRpYycgfV1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pLFxuICAgIGltYWdldG9vbHMoKSxcbiAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoe1xuICAgICAgdGVzdDogL1xcLihqcGU/Z3xwbmcpJC9pLFxuICAgICAgd2VicDoge1xuICAgICAgICBxdWFsaXR5OiA4NSxcbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICB9LFxuICBidWlsZDoge1xuICAgIGNzc01pbmlmeTogdHJ1ZSxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtU2VjdXJpdHktUG9saWN5JzogW1xuICAgICAgICBcImRlZmF1bHQtc3JjICdzZWxmJ1wiLFxuICAgICAgICBcInNjcmlwdC1zcmMgJ3NlbGYnICd1bnNhZmUtaW5saW5lJyAndW5zYWZlLWV2YWwnXCIsXG4gICAgICAgIFwic3R5bGUtc3JjICdzZWxmJyAndW5zYWZlLWlubGluZScgaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbVwiLFxuICAgICAgICBcImltZy1zcmMgJ3NlbGYnIGh0dHBzOi8vaW1hZ2VzLnBleGVscy5jb20gaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZyBkYXRhOiBodHRwczovLyouZ29vZ2xlLmNvbSBodHRwczovLyouZ29vZ2xlYXBpcy5jb21cIixcbiAgICAgICAgXCJmb250LXNyYyAnc2VsZicgaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbVwiLFxuICAgICAgICBcImNvbm5lY3Qtc3JjICdzZWxmJyBodHRwczovLyouZ29vZ2xlLmNvbVwiLFxuICAgICAgICBcImZyYW1lLXNyYyAnc2VsZicgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbVwiLFxuICAgICAgICBcImZyYW1lLWFuY2VzdG9ycyAnbm9uZSdcIixcbiAgICAgICAgXCJmb3JtLWFjdGlvbiAnc2VsZidcIixcbiAgICAgICAgXCJiYXNlLXVyaSAnc2VsZidcIlxuICAgICAgXS5qb2luKCc7ICcpLFxuICAgICAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsXG4gICAgICAnWC1GcmFtZS1PcHRpb25zJzogJ0RFTlknLFxuICAgICAgJ1gtWFNTLVByb3RlY3Rpb24nOiAnMTsgbW9kZT1ibG9jaycsXG4gICAgICAnUmVmZXJyZXItUG9saWN5JzogJ3N0cmljdC1vcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nLFxuICAgICAgJ1N0cmljdC1UcmFuc3BvcnQtU2VjdXJpdHknOiAnbWF4LWFnZT0zMTUzNjAwMDsgaW5jbHVkZVN1YkRvbWFpbnMnXG4gICAgfVxuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLDBCQUEwQjtBQUVuQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsUUFDTCxTQUFTO0FBQUEsVUFDUCxDQUFDLHFDQUFxQyxFQUFFLFNBQVMsWUFBWSxDQUFDO0FBQUEsUUFDaEU7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsSUFDWCxtQkFBbUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxTQUFTLFdBQVc7QUFBQSxFQUNoQztBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osUUFBUSxDQUFDLFNBQVMsV0FBVztBQUFBLFFBQy9CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCwyQkFBMkI7QUFBQSxRQUN6QjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsRUFBRSxLQUFLLElBQUk7QUFBQSxNQUNYLDBCQUEwQjtBQUFBLE1BQzFCLG1CQUFtQjtBQUFBLE1BQ25CLG9CQUFvQjtBQUFBLE1BQ3BCLG1CQUFtQjtBQUFBLE1BQ25CLDZCQUE2QjtBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
