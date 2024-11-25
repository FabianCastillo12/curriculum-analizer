/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public', // Generará los archivos del Service Worker en esta carpeta
  register: true, // Registrar automáticamente el Service Worker
  skipWaiting: true, // Activar el Service Worker automáticamente después de instalarlo
  disable: process.env.NODE_ENV === 'development', // Solo activar en producción
});

const nextConfig = withPWA({
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
});

module.exports = nextConfig;
