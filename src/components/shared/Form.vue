<template>
  <a-form
    :model="formState"
    name="company_detail"
    :layout="layout"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <slot />
  </a-form>
</template>

<script setup lang="ts">

  import { onMounted } from 'vue';

  interface CourierCompany {
    companyName: string;
    referenceNumber: string;
    id: number | null;
  }

  interface FormState {
    name?: string;
    url?: string;
    directNumber?: number;
    courierCompaniesList: CourierCompany[]
  }

  const props = defineProps<{
    formState?: FormState,
    layout?: string,
    onFinish?: () => {},
    onFinishFailed?: () => {},
  }>()

</script>
