<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

import vTheme from '@/components/vTheme.vue'
import HomePage from '@/views/HomePage.vue'
import FinishPage from '@/views/FinishPage.vue'

const p = new URL(document.location).searchParams;
const params = {
  date: p.get("date"),
  hour: p.get("hour"),
  msg: p.get("msg"),
}

const isNotEmpty = ref(true)
const date = ref([])
const msg = params.msg
const error = ref(null)
const isFinish = ref(false)
let intervalID;

if (Object.values(params).every(x => x === null)) {
  isNotEmpty.value = false
} else {
  const endDate = dayjs(`${params.date}T${params.hour}+02:00`)

  if (endDate.isValid()) {

    const updateDate = () => {
      date.value = [
        { k: endDate.diff(dayjs(), 'y'), v: 'ans' },
        { k: endDate.diff(dayjs(), 'M'), v: 'mois' },
        { k: endDate.diff(dayjs(), 'w'), v: 'semaines' },
        { k: endDate.diff(dayjs(), 'd'), v: 'jours' },
        { k: endDate.diff(dayjs(), 'h'), v: 'heures' },
        { k: endDate.diff(dayjs(), 's'), v: 'secondes' }
      ]
      if (date.value[5].k <= 0) {
        isFinish.value = true
        clearInterval(intervalID);
      }
    }

    updateDate();
    intervalID = setInterval(updateDate, 1000);
  } else {
    error.value = 'Date invalide'
  }
}

const formatDate = (d) => {
  const dv = (d.k <= 1 && d.v !== 'mois')
    ? d.v.slice(0, -1)
    : d.v
  return `${d.k} ${dv}`
}
</script>

<template>
  <a href="/timebefore.html" class="hover:outline hover:text-white text-[#fcaf3c] rounded p-2 absolute bottom-2 right-2">
    Nouveau
  </a>

  <v-theme />

  <div v-if="isNotEmpty">
    <h1 class="text-7xl font-bold mb-8">{{ msg }}</h1>

    <div class="bg-red-600 font-semibold text-4xl p-4 rounded shadow" v-if="error">Erreur: {{ error }}</div>

    <finish-page v-if="isFinish" />

    <div v-if="!error && !isFinish">
      <div class="text-6xl font-bold " v-for="d in date" :key="d.v">
        {{ formatDate(d) }}
      </div>
    </div>
  </div>

  <home-page v-if="!isNotEmpty" />
</template>
