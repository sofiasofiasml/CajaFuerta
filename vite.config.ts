import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './': funciona en GitHub Pages (subcarpeta del repo) y en cualquier hosting.
export default defineConfig({ base: './', plugins: [react()] });
