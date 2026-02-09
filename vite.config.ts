import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' allows loading all env vars, including those set in Netlify console without VITE_ prefix
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This injects the API key from Netlify environment variables into the built code
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});