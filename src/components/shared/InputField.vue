<template>
  <a-form-item
    :label="label"
    :name="name"
    :rules="rules"
  >
    <a-input
      :type='type'
      :value="fieldValue"
      @input="$emit('update:fieldValue', $event.target.value)"
      :disabled="disabled"
    />
  </a-form-item>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'

  interface Rules {
    required: boolean
    message: string
  }

  const props = defineProps<{
    label: String
    name: String
    rules?: Array<Rules>
    fieldValue: String
    type?: string
    disabled?: boolean
  }>()

  defineEmits(['update:fieldValue'])

</script>
