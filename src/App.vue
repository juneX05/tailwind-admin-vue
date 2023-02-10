<script setup>
</script>

<template>
  <!-- App preloader-->
  <div
      class="app-preloader fixed z-50 grid h-full w-full place-content-center bg-slate-50 dark:bg-navy-900"
  >
    <div class="app-preloader-inner relative inline-block h-48 w-48"></div>
  </div>

  <!-- Page Wrapper -->
  <div
      id="root"
      class="min-h-100vh cloak flex grow bg-slate-50 dark:bg-navy-900"
  >
    <router-view></router-view>
  </div>
</template>

<script>


</script>
