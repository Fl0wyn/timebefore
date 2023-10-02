<script setup>
import { ref } from 'vue'

import backgroundDark from '../assets/background-dark.svg'
import backgroundLight from '../assets/background-light.svg'
import moon from '../assets/moon.svg'
import sun from '../assets/sun.svg'

const dark = () => {
  document.body.setAttribute('data-bs-theme', 'dark')
  document.body.style.backgroundImage = `url("${backgroundDark}")`
  return moon
}

const light = () => {
  document.body.setAttribute('data-bs-theme', 'light')
  document.body.style.backgroundImage = `url("${backgroundLight}")`
  return sun
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