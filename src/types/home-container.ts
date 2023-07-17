import type { companyState  } from './company-form'

export interface companyListsState {
  companies: Array<companyState>
}

export interface HomeTabsState {
  activeKey: string;
}