<template>
  <a-form-item
    :label="label"
    :name="name"
    :rules="rules"
  >
    <vue-google-autocomplete
      id="map"
      classname="ant-col ant-form-item-control ant-form-item-control-input ant-form-item-control-input-content ant-form-item ant-input"
      placeholder="address"
      v-on:placechanged="getAddressData"
    >
    </vue-google-autocomplete>
  </a-form-item>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import VueGoogleAutocomplete from "vue-google-autocomplete";

  interface Rules {
    required: boolean
    message: string
  }

  const props = defineProps<{
    label: String
    name: String
    rules?: Array<Rules>
    fieldValue?: String
    addressNum?: string
    countryValue?: string
    zipcodeValue?:string
    streetValue?:string
    stateValue?: string
    cityValue?: string
    type?: string
    disabled?: boolean
    addressChunks?: boolean
  }>()

  const emits = defineEmits([
    'update:fieldValue',
    'update:addressNum',
    'update:countryValue',
    'update:zipcodeValue',
    'update:streetValue',
    'update:stateValue',
    'update:cityValue'
  ])

  const getAddressData = (addressData, placeResultData, id) => {
    emits('update:fieldValue', placeResultData.formatted_address)
    if (props.addressChunks) {
      const formatedAddresses = placeResultData.formatted_address.split(',')
      emits('update:addressNum', addressData.street_number)
      emits('update:countryValue', addressData.country)
      emits('update:zipcodeValue', addressData.postal_code)
      emits('update:streetValue', addressData.route)
      emits('update:stateValue', addressData.administrative_area_level_1)
      emits('update:cityValue', formatedAddresses[1].trim())
    }
  }

</script>
