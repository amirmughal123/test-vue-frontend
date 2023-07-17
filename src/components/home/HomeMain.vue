<template>
  <a-layout id='custom-layout'>
    <div class="list-cont">
      <div class="list-header">
        <h1 class="primary-color">Companies</h1>
        <a-button class="add-btn" type="primary" @click="showModal">Add new company</a-button>
      </div>
      <List :companies="existCompanies.companies"/>
    </div>
    <div v-if="modal">
      <Modal v-model:fieldValue="modal">
        <a-tabs v-model:activeKey="tabState.activeKey">
          <a-tab-pane key="1" tab="Company details">
            <CompanyDetailTab :handleCompanyForm="handleCompanyForm"/>
            <a-alert v-if="errorMessage" :message="errorMessage" type="error" style="margin-top: 10px;" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Shipping details" disabled>
              <ShippingTab :closeModal="closeModal" :handleShippingFormback="handleShippingFormback" :handleCompanyAddresses="handleCompanyAddresses"/>
            </a-tab-pane>
        </a-tabs>
      </Modal>
    </div>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'

import CompanyDetailTab from './CompanyDetail.vue'
import ShippingTab from './ShippingDetail.vue'
import { Modal, List } from '../shared'
import type { HomeTabsState, companyListsState } from '../../types/home-container'
import type { CompanyFormState, companyState } from '../../types/company-form'

export default defineComponent({
  setup() {
    const modal = ref<boolean>(false);
    const errorMessage = ref<string>('')
    const currentCompany = ref<companyState>()

    const showModal = () => {
      modal.value = true
    }

    const closeModal = () => {
      modal.value = false
      tabState.activeKey = '1'
    }

    const tabState = reactive<HomeTabsState>({
      activeKey: '1'
    })

    const companyList = reactive<companyListsState>({
      companies: []
    })

    const existCompanies = reactive<companyListsState>({
      companies: []
    })

    const handleCompanyForm = (data: CompanyFormState) => {
      currentCompany.value = {...data, shippingAddresses: currentCompany?.value?.shippingAddresses.length ? currentCompany?.value?.shippingAddresses : []}
      const index = existCompanies.companies.map(e => e.name.toLowerCase().trim()).indexOf(data.name.toLowerCase().trim());
      if (index == -1) {
        errorMessage.value = ''
        tabState.activeKey = '2'
      } else {
        errorMessage.value = 'Company already exists please update the company name'
      }
    }

    const handleCompanyAddresses = (data: any) => {
      currentCompany.value = {
        shippingAddresses: data,
        name: currentCompany?.value?.name || '',
        url: currentCompany?.value?.url || '',
        directNumber: currentCompany?.value?.directNumber || null,
        code: currentCompany?.value?.code || '',
        courierCompaniesList: currentCompany?.value?.courierCompaniesList || []
      }

      existCompanies.companies.push(currentCompany.value)
      localStorage.setItem('companies', JSON.stringify([...existCompanies.companies]))
      modal.value = false
      tabState.activeKey = '1'
    }

    const handleShippingFormback = () => {
      tabState.activeKey = '1'
    }

    onMounted(() => {
      let existingCompanies = localStorage.getItem('companies')
      if (existingCompanies) existCompanies.companies = JSON.parse(existingCompanies)
    })

    return {
      modal,
      closeModal,
      showModal,
      errorMessage,
      tabState,
      existCompanies,
      companyList,
      handleCompanyForm,
      handleShippingFormback,
      handleCompanyAddresses
    }
  },
  components: {
    CompanyDetailTab,
    ShippingTab,
    Modal,
    List
  }
})
</script>

<style>
  .ant-layout {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
  }

  .ant-tabs-top > .ant-tabs-nav, .ant-tabs-bottom > .ant-tabs-nav, .ant-tabs-top > div > .ant-tabs-nav, .ant-tabs-bottom > div > .ant-tabs-nav {
    margin: 0 0 24px 0;
  }

  .ant-tabs-tab {
    padding: 0 0 8px 0;
  }

  .list-cont {
    width: 80%;
    margin-top: 5%;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
  }

  .add-btn {
    background: blue;
  }

  .primary-color {
    color: blue;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: blue;
  }
</style>
