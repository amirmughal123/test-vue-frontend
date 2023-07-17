<template>
  <a-list :grid="{ gutter: 16, column: 3 }" :data-source="companies">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card :title="item.name.toUpperCase()">
          <div style="display: flex; flex-direction: column;">
            <span>{{ `(${item.code})${item.directNumber}`  }}</span>
            <span>{{ item.url }}</span>
            <span v-if="item.courierCompaniesList.length">
              <a-tooltip placement="topLeft" :title="getCouriorCompanies()">
                <span style="color: blue; cursor: pointer;">Courier accounts</span>
              </a-tooltip>
            </span>
            <span v-else>No courier accounts</span>
            <h4>Shipping Addresses:</h4>
            <div style="padding-left: 10px; display: flex;flex-direction: column;">
              <span :key="index" v-for="(data, index) in getDataForShippingList(item.shippingAddresses).slice(0,3)">{{ `${index+1}: ${data}` }}</span>
              <a-tooltip v-if="item.shippingAddresses.length > 3" placement="topLeft" :title="getAddressToolTipData(item.shippingAddresses)">
                <span style="color: blue; cursor: pointer;">See all</span>
              </a-tooltip>
            </div>
          </div>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts" setup>

import type { companyState, CompanyShippingFormState } from '../../types/company-form'

const props = defineProps<{
  companies: Array<companyState>
}>()

const getCouriorCompanies = () => {
  let comp = ''
  for (const item of props.companies) {
    for (const iterator of item.courierCompaniesList) {
      if (comp) comp = `${comp}, ${iterator.companyName} - ${iterator.referenceNumber}`
      else comp = `${iterator.companyName} - ${iterator.referenceNumber}`
    }
  }
  return comp
}

const getDataForShippingList = (items: Array<CompanyShippingFormState>) => {
  let data = []
  let allAddressesUS = true

  for (const iterator of items) {
    if(iterator.country !== 'United States'){
      allAddressesUS = false
    }
  }
  if (allAddressesUS) {
    for (const itm of items) {
      data.push(itm.state)
    }
  } else {
    for (const itm of items) {
      data.push(itm.country)
    }
  }
  return data
}

const getAddressToolTipData = (items: Array<CompanyShippingFormState>) => {
  let data = []
  for (const iterator of items) {
    data.push(iterator.address)
  }

  return data.join(',')
}
</script>
