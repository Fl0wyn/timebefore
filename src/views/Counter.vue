<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

import Error from '@/views/Error.vue'
import Finished from '@/views/Finished.vue'
import { lang } from '@/locales/index'

const props = defineProps({
  params: Object,
});

const status = ref('counter')
const date = ref([])
const msg = props.params.msg

let intervalID;

const endDate = dayjs(`${props.params.date}T${props.params.hour}+02:00`)
const diffDate = (dd) => ({ k: endDate.diff(dayjs(), dd), v: lang[dd] })

const finishPage = () => {
  status.value = 'finished'
  clearInterval(intervalID);
}

const updateDate = () => {
  date.value = [
    diffDate('y'),
    diffDate('M'),
    diffDate('w'),
    diffDate('d'),
    diffDate('h'),
    diffDate('s')
  ]
  if (diffDate('s').k <= 0) finishPage()
}

const formatDate = (d) => {
  const dv = (d.k <= 1 && d.v !== 'mois')
    ? d.v.slice(0, -1)
    : d.v
  return `${d.k} ${dv}`
}

if (endDate.isValid()) {
  updateDate();
  intervalID = setInterval(updateDate, 1000);
} else {
  status.value = 'error'
}
</script>

<template>
  <Error v-if="status === 'error'" />
  <Finished v-if="status === 'finished'" />

  <div v-if="status === 'counter'">
    <h1 class="text-7xl font-bold mb-8">{{ msg }}</h1>
    <div class="text-6xl font-bold " v-for="d in date" :key="d.v">
      {{ formatDate(d) }}
    </div>
  </div>
</template>