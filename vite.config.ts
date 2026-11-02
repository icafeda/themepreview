import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // // Kích hoạt Tailwind CSS v4 Vite plugin
  ],
  resolve: {
    alias: {
      // Cấu hình alias path @ để dùng với Shadcn/UI sau này
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
