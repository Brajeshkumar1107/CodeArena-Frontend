import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The runner API is served on port 8081. The dev proxy avoids CORS by
// forwarding /api and /actuator to the backend.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      },
      '/actuator': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
});