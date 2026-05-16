import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue()
    ],
    define: {
        'process.env.NODE_ENV': JSON.stringify('development'),
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: true,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: false,
        __INTLIFY_JIT_COMPILATION__: false,
        __INTLIFY_DROP_MESSAGE_COMPILER__: false,
        __INTLIFY_PROD_DEVTOOLS__: true
    },
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
        emptyOutDir: false,
        sourcemap: true
    }
})
