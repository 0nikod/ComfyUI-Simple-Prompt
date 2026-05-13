import { defineConfig } from 'vite'

export default defineConfig({
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: false,
        __INTLIFY_JIT_COMPILATION__: false,
        __INTLIFY_DROP_MESSAGE_COMPILER__: false,
        __INTLIFY_PROD_DEVTOOLS__: false
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
        emptyOutDir: false
    }
})
