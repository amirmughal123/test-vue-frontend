<template>
  <MyForm
    :formState="formState"
    layout='vertical'
    :onFinish="onFinish"
    :onFinishFailed="onFinishFailed"
  >
    <InputField
      label='Company name'
      name='name'
      :rules='[{ required: true, message: "Please input your company name!" }]'
      v-model:fieldValue="formState.name"
    />
    <PhoneNumberWithCode
      label='Direct number'
      name='directNumber'
      :rules='[{ required: true, max: 12, min:7, message: "Please input your direct number max length is 12 and min 7!" }]'
      v-model:fieldValue="formState.directNumber"
      v-model:codeValue="codeState.code"
    />
    <InputField
      label='Company URL (Web link)'
      name='url'
      :rules='[{ required: true, pattern: /^(ftp|http|https):\/\/[^ "]+$/, message: "Please input correct company url!" }]'
      v-model:fieldValue="formState.url"
    />
    <a-space
      id="courier"
      v-for="(company, index) in formState.courierCompaniesList"
      :key="company.id"
      style="display: flex; margin-bottom: 8px"
      align="center"
      size="large"
    >
      <DropDownField
        :label="'Courier company #'+(index + 1)"
        :name="['courierCompaniesList', index, 'name']"
        v-model:fieldValue="company.companyName"
        :options="courierList"
      />
      <InputField
        label='Reference number'
        :name="['courierCompaniesList', index, 'referenceNumber']"
        v-model:fieldValue="company.referenceNumber"
        :disabled="getReferenceNumberDisabled(company)"
      />
      <a-button :disabled="getReferenceNumberDisabled(company)" type="link" @click="removeCourierCompany(company)" danger style="padding-left: 0px;">
        <DeleteOutlined />
        Remove
      </a-button>
    </a-space>
    <a-form-item>
      <a-button :disabled="getAnothorCompanyDisable()" type="link" @click="addCourierCompany" style="padding-left: 0px; font-size: 14px;">
        <PlusCircleFilled :style="{color: 'blue'}"/>
        <span class="link-color">Add another courier company</span>
      </a-button>
    </a-form-item>
    <div class="form-next-btn-cont">
      <a-form-item style="margin-bottom: 0px; justify-content: flex-end;">
        <a-button class="add-btn" type="primary" html-type="submit">Next</a-button>
      </a-form-item>
    </div>
  </MyForm>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { MinusCircleOutlined, PlusOutlined, PlusCircleFilled, DeleteOutlined } from '@ant-design/icons-vue';
import { courierList } from '@/utils/constants'

import { InputField, PhoneNumberWithCode, MyForm, DropDownField } from '../shared'
import type { CompanyFormState } from '@/types/company-form'

export default defineComponent({
  props:["handleCompanyForm"],
  setup(props) {
    const formState = reactive<CompanyFormState>({
      name: '',
      url: '',
      directNumber: null,
      courierCompaniesList: [{
        companyName: '',
        referenceNumber: '',
        id: 1
      }]
    })

    const codeState = reactive<{ code: string }>({
      code: '+92' //default value
    })

    const removeCourierCompany = (item: CourierCompany) => {
      if (formState.courierCompaniesList.length > 1) {
        let index = formState.courierCompaniesList.indexOf(item);
        if (index !== -1) {
          formState.courierCompaniesList.splice(index, 1);
        }
      } else {
        formState.courierCompaniesList[0] = {
          companyName: '',
          referenceNumber: '',
          id: Date.now(),
        }
      }
    };

    const addCourierCompany = () => {
      formState.courierCompaniesList.push({
        companyName: '',
        referenceNumber: '',
        id: Date.now(),
      });
    };

    const getReferenceNumberDisabled = (company) => {
      return !(company.companyName)
    }

    const getAnothorCompanyDisable = () => {
      return !(formState.courierCompaniesList[0]?.companyName && formState.courierCompaniesList.length >= 1)
    }

    const onFinish = (values: any) => {
      let courierComps = []
      if (!formState.courierCompaniesList[formState.courierCompaniesList.length-1].companyName) {
        courierComps = [...formState.courierCompaniesList.splice(formState.courierCompaniesList.length-1, 1)]
      } else {
        courierComps = [...formState.courierCompaniesList]
      }
      props.handleCompanyForm({...formState, code: codeState.code})
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }

    const disabled = computed(() => {
      return !(formState.name && formState.url)
    })

    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
      addCourierCompany,
      removeCourierCompany,
      // dynamicValidateForm, 
      courierList,
      codeState,
      getReferenceNumberDisabled,
      getAnothorCompanyDisable,
      // props
    }
  },
  components: {
    MyForm,
    InputField,
    PhoneNumberWithCode,
    DropDownField,
    MinusCircleOutlined,
    PlusOutlined,
    PlusCircleFilled,
    DeleteOutlined
  }
});
</script>

<style>
  .form-next-btn-cont {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  #courier .ant-space-item:nth-child(1) {
    width: 42%;
  }

  #courier .ant-space-item:nth-child(2) {
    width: 42%;
  }

  #courier .ant-space-item:nth-child(3) {
    width: 14%;
  }

  .add-btn {
    background: blue;
  }

  .link-color {
    color: blue;
  }
</style>
