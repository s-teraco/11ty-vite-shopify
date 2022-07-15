const TYPE = process.env.NODE_TYPE || process.env.NODE_ENV;


require('dotenv').config({ path: `.env/.env.${TYPE}` })

import path from 'path'
import { defineConfig } from 'vite'

import vitePluginHTML from "./plugins/vite-plugin-html";

console.log(TYPE);
console.log(process.env.OUTPUT_DIR);



export default defineConfig(({ command, mode }) => {
  return{
    root: process.env.OUTPUT_DIR,
    envDir: './.env/',
    base:command === 'serve' ? '/' : `/${process.env.OUTPUT_DIR}/${process.env.DEST_DIR}/`,
    resolve: {
      alias:[
        {
          find: '~',
          replacement: path.resolve(__dirname, 'src/')
        },
        {
          find: /(.)*\.\.\/img/,
          replacement:( command === 'serve' ) ? path.resolve(__dirname,'src/img'): 'src/img'
        },
      ]
    },
    build: {
      outDir: `${process.env.ASSETS_DIR}`,
      emptyOutDir: false,
      rollupOptions: {
        input: [
          'src/js/app.js',
          'src/scss/common.scss',
        ],
        output: {
            entryFileNames: 'main.js',
            assetFileNames: (assetInfo) => {
                let extType = assetInfo.name.split('.')[1];
                if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                    return assetInfo.name.replace("src/", "")
                }
                return `[name][extname]`;
            },
            chunkFileNames: '[name].js'
        },
        watch: {
          include: 'src/**'
        }
      }
    }
  }
})
