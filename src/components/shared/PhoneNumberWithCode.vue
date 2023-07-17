<template>
  <a-form-item
    :label="label"
    :name="name"
    :rules="rules"
  >
    <a-input
      type="number"
      :value="fieldValue"
      @input="$emit('update:fieldValue', $event.target.value)"
    >
      <template #addonBefore>
        <a-select :value="codeValue" style="width: 160px" @change="handleChange" placeholder="Code">
          <a-select-option v-for="(country,index) in countriesPhoneCode" :key="index" :value="country.value">{{ country.label }}{{"   "}} {{ country.value }}</a-select-option>
        </a-select>
      </template>
    </a-input>
  </a-form-item>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { countriesPhoneCode } from '../../utils/constants'

  interface Rules {
    required: boolean
    message: string
  }

  const props = defineProps<{
    label: String
    name: String
    rules: Array<Rules>
    fieldValue: Number
    codeValue: string
  }>()

  const emits = defineEmits(['update:fieldValue', 'update:codeValue'])

  const handleChange = (value: string) => {
    emits('update:codeValue', value)
  }

</script>