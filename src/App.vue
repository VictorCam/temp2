<script setup>
import { RouterView } from "vue-router";
import { useSettings } from './store.js'
let { disableAnimations } = useSettings()
</script>

<template>
  <TopBar :class="!disableAnimations ? 'disableAnimations' : ''" />
  <RouterView :class="!disableAnimations ? 'disableAnimations' : ''" v-slot="{ Component, route }">
    <Transition :name="route.meta.transition || 'fade'" :mode="route.meta.transitionMode || 'out-in'">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
.disableAnimations * {
  animation: none !important;
  transition: none !important;
}
</style>