<script setup>
import { ref } from 'vue'

const dark = () => {
  document.body.setAttribute('data-bs-theme', 'dark')
  document.body.style.backgroundImage = 'url("img/background-dark.svg")'
  return "img/moon.svg"
}

const light = () => {
  document.body.setAttribute('data-bs-theme', 'light')
  document.body.style.backgroundImage = 'url("img/background-light.svg")'
  return "img/sun.svg"
}

const changeTheme = () => {
  if (document.body.getAttribute('data-bs-theme') === 'light') {
    imgTheme.value = dark()
  } else {
    imgTheme.value = light()
  }
}

const updateThemeToHour = () => {
  const hours = new Date().getHours()
  if (hours >= 19 || hours <= 7) {
    imgTheme.value = dark()
  } else {
    imgTheme.value = light()
  }
}

const imgTheme = ref(light())
updateThemeToHour()
</script>

<template>
  <img :src="imgTheme" id="img-theme" class="absolute top-0 right-0 cursor-pointer" @click="changeTheme">
</template>

<style scoped>
#img-theme {
  width: 5rem;
}

@media (min-width: 640px) {
  #img-theme {
    width: 10rem;
  }
}
</style>