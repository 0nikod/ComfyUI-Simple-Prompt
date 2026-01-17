import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: './src/main.ts',
            formats: ['es'],
            fileName: 'main'
        },
        rollupOptions: {
            external: [
                '../../../scripts/app.js',
                '../../../scripts/api.js',
            ],
            output: {
                dir: 'js',
            }
        },
        outDir: 'js',
        emptyOutDir: false
    }
})
