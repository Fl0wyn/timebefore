<script setup>
import { lang } from '@/locales/index'
</script>

<template>
  <div class="bg-red-600 font-semibold text-4xl p-4 rounded shadow">
    {{ lang.errorMessage }}
  </div>
</template>