import { computed, ref } from "vue";
import { createGlobalState, useAsyncState, useToggle, usePreferredReducedMotion, useStorage } from '@vueuse/core'

export let useCounterStore = createGlobalState(() => {
  let count = ref(0);
  let doubleCount = computed(() => count.value * 2);
  let increment = () => count.value++;
  return { count, doubleCount, increment };
});

export let useSettings = createGlobalState(() => {
  let [disableAnimations, toggleAnimations] = useToggle(true);
  useStorage('disableAnimations', disableAnimations, localStorage);
  return { disableAnimations, toggleAnimations };
});