import { createStore } from 'vuex'

import {
  model as OrganizationModel,
  NAMESPACE as OrganizationNamespace,
} from '@/entities/Organization/model/organizations'

export const store = createStore({
  modules: {
    [OrganizationNamespace]: OrganizationModel,
  },
})
