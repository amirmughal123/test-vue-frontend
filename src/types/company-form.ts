export interface CourierCompany {
  companyName: string;
  referenceNumber: string;
  id: number | null;
}

export interface CompanyFormState {
  name: string;
  url: string;
  directNumber: string | null;
  code?: string
  courierCompaniesList: CourierCompany[]
}

export interface CompanyShippingFormState {
  address: string;
  addressNumber: string;
  unit: string | null;
  zipcode: string;
  street: string;
  city: string;
  state: string;
  country: string;
  contactName?: string;
  recHoursStart: string;
  recHoursEnd: string;
  allDay: boolean;
  dock: boolean;
  folklift: boolean;
  deliveryNote: string;
}

export interface AddressListState {
  addresses: CompanyShippingFormState[]
}

export interface companyState extends  CompanyFormState {
  shippingAddresses: Array<CompanyShippingFormState>
}
