<script setup>
import { ref, watch } from 'vue'

import vInput from '@/components/vInput.vue'

const inputText = ref('')
const inputDate = ref('')
const inputTime = ref('')

const isInputValid = ref(false)

const goToCounterPage = () => {
  const URL = `?msg=${inputText.value}&date=${inputDate.value}&hour=${inputTime.value}:00`
  document.location.href = URL;
}

watch([inputDate, inputTime], ([x, y]) => {
  isInputValid.value = [x, y].every(z => z !== '')
})
</script>

<template>
  <div class="text-white font-semibold text-5xl pb-8">
    {{ isInputValid ? "Parfait ! C'est prêt 😉" : "Oh non, c'est vide 🥺" }}
  </div>

  <div class="flex flex-col gap-4 text-start text-2xl">
    <v-input label="Message" type="text" v-model="inputText" />
    <div class="grid grid-flow-col gap-4">
      <v-input label="Date" type="date" v-model="inputDate" />
      <v-input label="Heure" type="time" v-model="inputTime" />
    </div>
  </div>

  <button v-if="isInputValid" @click="goToCounterPage"
    class="w-full mt-6 text-2xl text-white hover:bg-white hover:text-slate-800 font-bold py-2 px-4 rounded">
    Lancer le compteur
  </button>
</template>