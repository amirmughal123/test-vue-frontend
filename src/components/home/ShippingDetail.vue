<template>
  <div style="display:flex; flex-wrap: wrap; justify-content: space-between;" v-if="!addForm.open">
    <a-button @click="openShippingForm" type="dashed" class="dashed_btn add_address" style="min-height: 160px;">
      <PlusCircleFilled :style="{ color: 'blue' }"/>
      <span style="margin-top: 8px; color: blue;">Add shipping address</span>
    </a-button>
    <a-card id="shipping_cards" v-for="(ad, index) in listState.addresses" :key="index" class="add_address">
      <span>
        <CheckCircleFilled :style="{ color: 'blue', 'margin-right': '5px' }" />
        Default
      </span>
      <span class="m8_top f_w500">{{ ad.address }}</span>
      <span class="m8_top">(+61) 2047758916</span>
    </a-card>
    <div class="save_finish_btn">
      <a-button class="save-btn" type="primary" @click="handleAddressForm()">Save & Finish</a-button>
    </div>
  </div>
  <div v-if="addForm.open">
    <MyForm
      :formState="formState"
      layout='vertical'
      :onFinish="onFinish"
      :onFinishFailed="onFinishFailed"
    >
      <AutoCompleteSuggestion
        label='Address summary'
        name='address'
        :rules='[{ required: true, message: "Please input your address summary!" }]'
        addressChunks
        v-model:fieldValue="formState.address"
        v-model:addressNum="formState.addressNumber"
        v-model:countryValue="formState.country"
        v-model:zipcodeValue="formState.zipcode"
        v-model:streetValue="formState.street"
        v-model:stateValue="formState.state"
        v-model:cityValue="formState.city"
      />
      <a-space
        style="display: flex; margin-bottom: 8px"
        align="center"
        id="number_unit_zipcode"
      >
        <InputField
          label='Number'
          name='addressNumber'
          :rules='[{ required: true, message: "Please input your number!" }]'
          v-model:fieldValue="formState.addressNumber"
        />
        
        <InputField
          label='Unit/Building #'
          name='unit'
          v-model:fieldValue="formState.unit"
        />
        <InputField
          label='Zipcode'
          type='number'
          name='zipcode'
          :rules='[{ required: true, message: "Please input your zipcode!" }]'
          v-model:fieldValue="formState.zipcode"
        />
      </a-space>
      <InputField
        label='Street'
        name='street'
        :rules='[{ required: true, message: "Please input your street!" }]'
        v-model:fieldValue="formState.street"
      />
      <a-space
        style="display: flex; margin-bottom: 8px"
        align="center"
        id="city_state"
      >
        <InputField
          label='City'
          name='city'
          :rules='[{ required: true, message: "Please input your city!" }]'
          v-model:fieldValue="formState.city"
        />
        <InputField
          label='State'
          name='state'
          :rules='[{ required: true, message: "Please select your state!" }]'
          v-model:fieldValue="formState.state"
        />
      </a-space>
      <DropDownField
        label="Country"
        :rules='[{ required: true, message: "Please select your country!" }]'
        name="country"
        v-model:fieldValue="formState.country"
        :options="countriesList"
      />
      <InputField
        label='Contact name'
        name='contactName'
        v-model:fieldValue="formState.contactName"
      />
      <a-space
        style="display: flex; margin-bottom: 8px"
        align="end"
        id="receiving_hours"
      >
        <DropDownField
          label="Delivery receiving hours"
          :rules='[{ required: true, message: "Please select receiving hours!" }]'
          name="recHoursStart"
          v-model:fieldValue="formState.recHoursStart"
          :options="timeSlotsStart"
          :disabled="formState.allDay"
        />
        <DropDownField
          label=""
          name="recHoursEnd"
          v-model:fieldValue="formState.recHoursEnd"
          :options="timeSlotsEnd"
          :disabled="formState.allDay"
        />
      </a-space>
      <a-form-item name="allDay">
        <a-checkbox :checked="formState.allDay" @change="handleAllDay">
          All day
        </a-checkbox>
      </a-form-item>
      <a-space
        style="display: flex; margin-bottom: 8px"
        align="center"
      >
        <a-form-item name="dock">
          dock <a-switch v-model:checked="formState.dock" />
        </a-form-item>
        <a-form-item name="folklift">
          folklift <a-switch v-model:checked="formState.folklift" />
        </a-form-item>
      </a-space>
      <a-form-item name="deliveryNote" label="Delivery note">
        <a-textarea :rows="4" v-model:value="formState.deliveryNote"/>
      </a-form-item>
      <div class="form-next-btn-cont">
        <a-form-item id="shipping_secondary" style="margin-bottom: 0px; justify-content: flex-end; margin-right: 14px;">
          <a-button @click="handleBack()" type="secondary">Back</a-button>
        </a-form-item>
        <a-form-item style="margin-bottom: 0px; justify-content: flex-end;">
          <a-button class="save-btn" type="primary" html-type="submit">Save shipping details</a-button>
        </a-form-item>
      </div>
    </MyForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, defineProps } from 'vue';
import { PlusOutlined, PlusCircleFilled, CheckCircleFilled } from '@ant-design/icons-vue';
import { 
  InputField,
  PhoneNumberWithCode,
  MyForm,
  DropDownField,
  AutoCompleteSuggestion
} from '../shared'
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { countriesList, timeSlotsStart, timeSlotsEnd } from '@/utils/constants'
import type { CompanyShippingFormState, AddressListState } from '@/types/company-form'

interface AddFormType {
  open: boolean
}

export default defineComponent({
  props: ['handleShippingFormback', 'handleCompanyAddresses'],
  setup(props) {
    const addForm = reactive<AddFormType>({
      open: true
    })

    const defaultValues = () => {
      return {
        address: '',
        addressNumber: '',
        unit: '',
        zipcode: '',
        street: '',
        city: '',
        state: '',
        country: '',
        contactName: '',
        recHoursStart: '',
        recHoursEnd: '',
        allDay: false,
        dock: false,
        folklift: false,
        deliveryNote: ''
      }
    }

    const formState = reactive<CompanyShippingFormState>(defaultValues())

    const listState = reactive<AddressListState>({
      addresses: []
    })

    const openShippingForm = () => {
      addForm.open = true
    }

    const handleBack = () => {
      props.handleShippingFormback()
    }

    const handleAddressForm = () => {
      props.handleCompanyAddresses(listState.addresses)
    }

    const handleAllDay = (e) => {
      formState.allDay = e.target.checked
      formState.recHoursStart = '00:00'
      formState.recHoursEnd = '23:45'
    }

    const onFinish = (values: any) => {
      listState.addresses.push(values)
      Object.assign(formState, defaultValues())
      addForm.open = false
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }

    return {
      formState,
      listState,
      openShippingForm,
      onFinish,
      onFinishFailed,
      addForm,
      countriesList,
      timeSlotsStart,
      timeSlotsEnd,
      handleAllDay,
      handleBack,
      handleAddressForm
    }
  },
  components: {
    PlusOutlined,
    PlusCircleFilled,
    CheckCircleFilled,
    MyForm,
    InputField,
    PhoneNumberWithCode,
    DropDownField,
    VueGoogleAutocomplete,
    AutoCompleteSuggestion
  }
})
</script>

<style>
  #city_state .ant-space-item:nth-child(1) {
    width: 50%;
  }

  #city_state .ant-space-item:nth-child(2) {
    width: 50%;
  }

  #receiving_hours .ant-space-item:nth-child(1) {
    width: 50%;
  }

  #receiving_hours .ant-space-item:nth-child(2) {
    width: 50%;
  }

  #number_unit_zipcode .ant-space-item:nth-child(1) {
    width: 35%;
  }

  #number_unit_zipcode .ant-space-item:nth-child(2) {
    width: 35%;
  }

  #number_unit_zipcode .ant-space-item:nth-child(3) {
    width: 35%;
  }

  #shipping_secondary .ant-btn-secondary {
    background: lightgray;
  }

  #shipping_secondary .ant-btn-secondary:hover {
    color: black;
    border: 0px;
  }

  #shipping_cards .ant-card-body {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  .m8_top {
    margin-top: 8px;
  }

  .f_w500 {
    font-weight: 500;
  }

  .dashed_btn {
    width: 48%;
    min-height: 135px;
    margin-bottom: 24px;
    border-color: blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .add_address {
    width: 48%;
    min-height: 135px;
    margin-bottom: 24px;
  }

  .save_finish_btn {
    display: flex;
    margin-bottom: 0px;
    justify-content: flex-end;
    width: 100%;
  }

  .save-btn {
    background: blue;
  }

  .save-btn:hover {
    background: blue;
  }
</style>
