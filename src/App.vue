<script setup>
import { watch } from 'vue'
import Theme from '@/components/Theme.vue'
import ButtonNew from '@/components/ButtonNew.vue'

import New from '@/views/New.vue'
import Counter from '@/views/Counter.vue'

const p = new URL(document.location).searchParams;

const params = {
  date: p.get("date"),
  hour: p.get("hour"),
  msg: p.get("msg")
}

const status = Object.values(params).every(x => x === null)
  ? 'new'
  : 'counter'
</script>

<template>
  <theme />
  <button-new />

  <New v-if="status === 'new'" />
  <Counter v-if="status === 'counter'" :params="params" />
</template>