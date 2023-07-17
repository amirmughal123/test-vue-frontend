<template>
  <a-modal :maskClosable="false" :visible="fieldValue" title="Add New Company" @cancel="handleOk" width="629px">
    <slot/>
  </a-modal>
</template>

<script setup lang="ts">

defineProps<{
  fieldValue: boolean
}>()

const emit = defineEmits(['update:fieldValue'])

const handleOk = (e: MouseEvent) => {
  emit('update:fieldValue', false)
}

</script>

<style>
  .ant-modal-header {
    border: 0px;
    padding: 24px;
  }

  .ant-modal-footer {
    border: 0px;
  }

  .ant-modal-body {
    padding-top: 0px;
  }

  .ant-modal-footer {
    display: none;
  }

  .ant-modal-title {
    font-size: 24px;
  }
</style>
