import { createStore } from 'vuex';
import { model as OrganizationModel } from '@/entities/Organization/model/organizations';

export const store = createStore({
  modules: {
    organizations: OrganizationModel
  }
});
