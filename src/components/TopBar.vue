<script setup>
import { useI18n } from 'vue-i18n';
import { useToggle, useColorMode } from '@vueuse/core';
import {useSettings} from '../store.js'

let { disableAnimations, toggleAnimations } = useSettings()
const { locale, availableLocales } = useI18n({ useScope: "global" })

let [showSettings, toggleSettings] = useToggle()

let languageCode = {
  'en': 'English',
  'es': 'Espanol',
}

locale.value = localStorage.getItem('locale') || 'en'
const setLocale = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}

let mode = useColorMode({
  modes: {
    contrast: 'contrast dark',
    cafe: 'cafe',
  }
})

let ColorModes = [
  {
    name: 'auto',
    icon: 'i-carbon-laptop'
  },
  {
    name: 'dark',
    icon: 'i-carbon-moon'
  },
  {
    name: 'light',
    icon: 'i-carbon-sun'
  },
  {
    name: 'cafe',
    icon: 'i-carbon-cafe'
  },
  {
    name: 'contrast',
    icon: 'i-carbon-contrast'
  }
]

</script>

<template>
  <header class="z1 b-b b-solid dark:b-dark-200 b-light-900">
    <div class="sm:mx3 flex items-center gap3 p3 h6">
      <div class="i-logos-vue p1 animate-rubber-band animate-iteration-infinite animate-duration-1s"></div>
      <h1 class="mr-auto text-5 font-bold">{{ $t("temp") }}</h1>
      <nav
        class="<sm:(bg-none mb-8 mx-auto fixed gap5) w-fit p2 rd-3 bottom-0 left-0 right-0 flex gap3 items-center justify-center z-50">
        <router-link :to="'/'" class="btn no-underline px1 py0.5"><i class="i-bx-bxs-home p2 mr1"></i>Home</router-link>
        <button class="btn" @click="toggleSettings()"><i class="i-bx-bxs-cog p2 mr1"></i>Settings</button>
      </nav>
    </div>
    <Transition name="slide">
      <div v-if="showSettings" class="hfit fixed bottom-0 left-0 right-0 bg-base-100 p5 flex gap4 flex-col">
        <div class="animate-custom flex gap2">
          <button v-for="colorMode in ColorModes" class="btn" @click="mode = colorMode.name"><i class="p2 mr1" :class="colorMode.icon" />{{ colorMode.name }}</button>
        </div>
        <div @click="toggleSettings()" class="i-bx-x p1 cursor-pointer absolute m2 top-0 right-0"></div>
        <div class="animate-custom flex gap4 items-center">
          <form class="btn p1" @submit.prevent>
            <label class="c-base-100 mr5" for="locale">Language</label>
            <select id="locale" class="bg-transparent b-none" v-model="locale" @change="setLocale(locale)" aria-label="Select Language" >
              <option class="bg-base-100" v-for="lang in availableLocales" :value="lang" :key="lang">
                {{ languageCode[lang] }}
              </option>
            </select>
          </form>
          <div class="btn p1 flex gap1 items-center">
            <p class="c-base-100">Animations &nbsp;</p><button @click="toggleAnimations()" :class="{ 'bg-green-500': disableAnimations }" class="cursor-pointer b-none h5 w10 rd-full transition-all duration-300">
              <div class="h4 w4 rd-full relative dark:bg-light-100 bg-dark-100 left--0.8 transition-all duration-300" :class="disableAnimations ? 'translate-x-[120%]' : 'translate-x-0'"></div>
            </button>
          </div>
          <button class="b-none rd p1 flex items-center b-red b-1px bg-transparent text-3.7 cursor-pointer c-red b-solid">
            <div class="i-solar-trash-bin-trash-bold mr1"></div>Reset Settings</button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style>
html.cafe {
  filter: sepia(0.9) hue-rotate(315deg) brightness(0.9);
}

html.contrast {
  filter: contrast(2);
}

html.dark {
  background: #080808;
  color-scheme: dark;
}
</style>