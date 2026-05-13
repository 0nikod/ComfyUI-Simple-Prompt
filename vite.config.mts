import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue()
    ],
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
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
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
                '../../../scripts/domWidget.js',
                '../../../scripts/utils.js',
                /^primevue\/?.*/,
                /^@primevue\/themes\/?.*/,
            ],
            output: {
                dir: 'js',
                assetFileNames: 'assets/[name].[ext]',
                entryFileNames: 'main.js'
            }
        },
        outDir: 'js',
        sourcemap: false,
        assetsInlineLimit: 0,
        cssCodeSplit: false
    },
    server: {
        fs: {
            allow: ['..']
        },
        proxy: {
            '/simple-prompt': {
                target: 'http://127.0.0.1:8188',
                changeOrigin: true,
            }
        }
    }
})
