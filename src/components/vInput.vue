<script setup>
import { computed } from 'vue'
const props = defineProps({
  label: String,
  type: String,
  modelValue: String
});

const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <div>
    <label>{{ label }}</label>
    <input class="text-slate-800 w-full rounded p-2 my-2" :type="type" v-model="value">
  </div>
</template>