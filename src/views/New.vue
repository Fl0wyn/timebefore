<script setup>
import { ref, watch } from 'vue'
import Input from '@/components/Input.vue'
import { lang } from '@/locales/index'

const inputText = ref('')
const inputDate = ref('')
const inputTime = ref('')

const isInputValid = ref(false)

const goToCounterPage = () => {
  const msg = inputText.value
  const date = inputDate.value
  const hour = inputTime.value

  document.location.href = `?msg=${msg}&date=${date}&hour=${hour}:00`;
}

watch([inputDate, inputTime], ([x, y]) => {
  isInputValid.value = [x, y].every(z => z !== '')
})
</script>

<template>
  <div class="text-white font-semibold text-5xl pb-8">
    {{ isInputValid ? lang.homeTitleReady : lang.homeTitleEmpty }}
  </div>

  <div class="flex flex-col gap-4 text-start text-2xl">
    <Input label="Message" type="text" v-model="inputText" />
    <div class="grid grid-flow-col gap-4">
      <Input label="Date" type="date" v-model="inputDate" />
      <Input label="Heure" type="time" v-model="inputTime" />
    </div>
  </div>

  <button v-if="isInputValid" @click="goToCounterPage"
    class="w-full mt-6 text-2xl text-white hover:bg-white hover:text-slate-800 font-bold py-2 px-4 rounded">
    {{ lang.homeRunCounter }}
  </button>
</template>