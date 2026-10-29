import fs from 'node:fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {isPublishedPath} from './src/data/routes';

function routeStatusPlugin(): Plugin {
  return {
    name: 'route-status',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = (req.url || '/').split('?')[0];
        if (
          raw.startsWith('/@') ||
          raw.startsWith('/src/') ||
          raw.startsWith('/node_modules/') ||
          raw.includes('.')
        ) {
          return next();
        }
        if (!isPublishedPath(raw)) res.statusCode = 404;
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = (req.url || '/').split('?')[0];
        if (raw.includes('.') || raw.startsWith('/assets/')) return next();
        if (isPublishedPath(raw)) return next();
        const file = path.resolve(process.cwd(), 'dist/404.html');
        if (!fs.existsSync(file)) return next();
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        fs.createReadStream(file).pipe(res);
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), routeStatusPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
