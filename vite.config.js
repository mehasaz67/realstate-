import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The sandbox preview reaches this dev server through a proxy on port 3000.
// Vite >= 6.1 appends `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (supplied by the
// platform) to `server.allowedHosts`, so no host list is hardcoded here.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
})
