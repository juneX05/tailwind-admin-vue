<script setup>
import {useGlobalStore} from "./stores/globalStore";

const globalStore = useGlobalStore()

</script>

<template>
  <!-- App preloader-->
  <div
      class="app-preloader fixed z-50 grid h-full w-full place-content-center bg-slate-50 dark:bg-navy-900"
      :class="{ 'animate-[var(--ease-in-out)_fade-out_500ms_forwards]' : !globalStore.preloader}"
  >
    <div class="app-preloader-inner relative inline-block h-48 w-48"></div>
  </div>

  <!-- Page Wrapper -->
  <div
      id="root"
      class="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900"
      :class="{ 'cloak' : globalStore.preloader }"
  >
    <router-view></router-view>
  </div>
</template>
