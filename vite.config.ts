import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '192.168.0.7',
		port: 3010
	},
	preview: {
		host: '192.168.0.7',
		port: 3010
	}
});
