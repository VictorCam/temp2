import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import webfontDownload from "vite-plugin-webfont-dl";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { VitePWA } from 'vite-plugin-pwa';
import UnoCSS from 'unocss/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
// import vueDevTools from 'vite-plugin-vue-devtools'

// check if env loads correctly
// import { loadEnv } from 'vite';
// (async () => {
//   console.log(loadEnv('development', process.cwd(), ['VITE_']));
// })()

//make sure assets path is correct
const path = './src/assets';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueRouter(),
    UnoCSS({
      rules: [
        [/^bgi-\[([\w\W]+)\]$/, ([, d]) => {
          return ({ 'background-image': `url('${path}/${d}');` })
        }],
        [/^mask-\[([\w\W]+)\]$/, ([, d]) => {
          return ({ 'mask': `url('${path}/${d}');` })
        }],
        [/^mask-size-\[([\w\W]+)\]$/, ([, d]) => {
          return ({ 'mask-size': `${d};` })
        }],
        [/^mask-repeat-\[([\w\W]+)\]$/, ([, d]) => {
          return ({ 'mask-repeat': `${d};` })
        }],
        [/^mask-position-\[([\w\W]+)\]$/, ([, d]) => {
          return ({ 'mask-position': `${d};` })
        }],
      ],
      shortcuts: {
        'btn': 'b b-solid b-gray-400 b-base rd cursor-pointer shadow-sm outline-none px2 text-gray-600 text-sm transition-all hover-(bg-gray-50 shadow) dark-(bg-dark-800 b-gray-500 text-gray-200) bg-light-500 dark-hover-(bg-dark-900)',
        'stack': 'grid [&>*]:[grid-area:1/1]',
        'bg-base': 'bg-white dark:bg-[#080808]',
        'bg-base-100': 'dark:bg-dark:100 bg-light-900',
        'bg-base-200': 'dark:bg-dark:200 bg-light-800',
        'bg-base-300': 'dark:bg-dark:300 bg-light-700',
        'bg-base-400': 'dark:bg-dark:400 bg-light-600',
        'c-base-100': 'c-black dark:c-light',
        'center': 'fixed -translate-x-50% -translate-y-50% left-50% top-50%',
        'input': 'rd-2 decoration-none b-none shadow-md shadow',
      },
      presets: [
        presetIcons(),
        presetUno()
      ],
      theme: {
        colors: {
          dark: {
            100: '#aaa',
            200: '#999',
            300: '#888',
            400: '#777',
            500: '#666',
            600: '#555',
            700: '#444',
            800: '#333',
            900: '#222',
          }
        },
        animation: {
          keyframes: {
            bg: '{ 0% { mask-position: 0% 0% } 100% { mask-position: 100% 0% } }'
          },
        }
      },
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'VictorCam Template',
        short_name: 'VC Template',
        theme_color: '#000',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    webfontDownload([]), //https://www.cdnfonts.com/
  ],
  assetsInclude: ['**/*.{jpg,jpeg,png,gif,svg}'],
  server: {
    port: 2020,
  }
});
