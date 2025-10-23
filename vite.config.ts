import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['workbox-window']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          let extType = info?.[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType || '')) {
            extType = 'images';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType || '')) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@styles': resolve(__dirname, './src/styles'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils')
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    strictPort: false,
    historyApiFallback: true
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: false
  },
  plugins: [
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.webp', 'favicon.ico'],
      manifest: {
        name: 'BlissHairStudio - Premium Hair Care',
        short_name: 'BlissHairStudio',
        description: 'Premium hair care products and styling services for beautiful, healthy hair',
        theme_color: '#E8B4B8',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['beauty', 'shopping', 'lifestyle']
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,png,svg,ico,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ],
  optimizeDeps: {
    include: ['workbox-window']
  }
});
