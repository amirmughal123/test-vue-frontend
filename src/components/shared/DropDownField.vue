<template>
  <a-form-item
    :label="label"
    :rules="rules"
    :name="name"
  >
    <a-select
      :value="fieldValue"
      :options="options"
      @change="handleChange"
      :disabled="disabled"
    >
      <a-select-option v-for="(option, index) in options" :key="index" :value="option.value">{{option.label}}</a-select-option>
    </a-select> 
  </a-form-item>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'

  interface Rules {
    required: boolean
    message: string
  }

  interface OptionsState {
    label: string
    value: string
  }

  const props = defineProps<{
    label: String
    name?: String
    rules?: Array<Rules>
    fieldValue: String
    options: Array<OptionsState>
    disabled?: boolean
  }>()
  const emit = defineEmits(['update:fieldValue'])

  const handleChange = (value: string) => {
    emit('update:fieldValue', value)
  }

</script>
