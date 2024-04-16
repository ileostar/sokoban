import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['btn-base', ' h-10 w-20 rd-2 outline-none'],
    ['view-base', 'text-3.5 flex gap-1 items-center font-mono'],
    ['flex-base', 'flex items-center justify-center'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetAnimations(),
    presetShadcn({
      color: 'red',
    }),
  ],
})
