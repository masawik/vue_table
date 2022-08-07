import { ESortingDirections } from '@/shared/components';
import { getPrefixer } from '@/shared/lib/getPrefixer';
import { ROWS_PER_PAGE } from '@/entities/Organization/config/tableConfig';

export const NAMESPACE = 'organizations';

export interface IOrganizationData {
  id: number,
  name: string,
  principalName: string,
  phoneNumber: string
}

interface IOrganizationState {
  organizations: IOrganizationData[];
  sortingState: {
    dataKey: keyof IOrganizationData,
    direction: ESortingDirections
  };
  filters: {
    dataKey: Exclude<keyof IOrganizationData, 'id'>,
    query: string
  };
  pagination: {
    currentPage: number,
    rowsPerPage: number
  };
}

const initialSortingState: IOrganizationState['sortingState'] = {
  dataKey: 'id',
  direction: ESortingDirections.ASC
};

type TActionProps = {
  state: IOrganizationState,
  commit: any,
  getters: any
}

export const model = {
  namespaced: true,
  state: (): IOrganizationState => ({
    organizations: [],
    sortingState: { ...initialSortingState },
    filters: {
      dataKey: 'principalName',
      query: ''
    },
    pagination: {
      currentPage: 1,
      rowsPerPage: ROWS_PER_PAGE
    }
  }),
  getters: {
    sortedOrganizations(state: IOrganizationState) {
      const newOrganizationList = [...state.organizations];
      newOrganizationList
        .sort((o1, o2) => {
          const [sortingValue1, sortingValue2] =
            [o1[state.sortingState.dataKey], o2[state.sortingState.dataKey]];
          const bothNumber = typeof sortingValue1 === 'number' && typeof sortingValue2 === 'number';
          const bothString = typeof sortingValue1 === 'string' && typeof sortingValue2 === 'string';

          let compareResult = 0;
          if (bothNumber) {
            compareResult = sortingValue1 - sortingValue2;
          } else if (bothString) {
            compareResult = sortingValue1.toLowerCase()
              .localeCompare(sortingValue2.toLowerCase());
          }

          if (state.sortingState.direction === ESortingDirections.DESC) {
            compareResult = compareResult * -1;
          }

          return compareResult;
        });

      return newOrganizationList;
    },
    filteredSortedOrganizations(state: IOrganizationState, getters: any) {
      const organizations: IOrganizationData[] = getters.sortedOrganizations;
      const query = state.filters.query;

      if (!query) return organizations;

      return organizations
        .filter(od => od[state.filters.dataKey].toLowerCase()
          .includes(query));
    },
    slicedFilteredSortedOrganizations(state: IOrganizationState, getters: any) {
      const organizations: IOrganizationData[] = getters.filteredSortedOrganizations;
      const currentPage = state.pagination.currentPage - 1;

      const startIndex = (currentPage * state.pagination.rowsPerPage);
      const endIndex = (startIndex + state.pagination.rowsPerPage);

      return organizations.slice(startIndex, endIndex);
    },
    totalPagesCount(state: IOrganizationState, getters: any) {
      const organizations: IOrganizationData[] = getters.filteredSortedOrganizations;
      return Math.ceil(organizations.length / state.pagination.rowsPerPage);
    }
  },
  mutations: {
    setOrganizations(state: IOrganizationState, organizations: IOrganizationData[]) {
      state.organizations = organizations;
    },
    addOrganizations(state: IOrganizationState, organizations: IOrganizationData[]) {
      state.organizations = [...state.organizations, ...organizations];
    },
    deleteOrganizationById(state: IOrganizationState, organizationId: IOrganizationData['id']) {
      state.organizations = state.organizations.filter(od => od.id !== organizationId);
    },
    changeSortingState(state: IOrganizationState, dataKey: IOrganizationState['sortingState']['dataKey']) {
      const {
        dataKey: currentDataKey,
        direction: currentDirection
      } = state.sortingState;

      if (currentDataKey === dataKey) {
        if (currentDirection === ESortingDirections.ASC) {
          state.sortingState.direction = ESortingDirections.DESC;
        } else {
          state.sortingState = { ...initialSortingState };
        }
      }

      if (currentDataKey !== dataKey) {
        state.sortingState = {
          dataKey: dataKey,
          direction: ESortingDirections.ASC
        };
      }

      state.pagination.currentPage = 1;
    },
    setFilterQuery(state: IOrganizationState, query: string) {
      state.filters.query = query.toLowerCase();
      state.pagination.currentPage = 1;
    },
    setCurrentPage(state: IOrganizationState, newPage: number) {
      state.pagination.currentPage = newPage;
    }
  },
  actions: {
    async fetchOrganizations({ commit }: TActionProps) {
      const orgDataModule = await import('@/entities/Organization/config/OrganizationData.json');
      commit('setOrganizations', orgDataModule.default);
    },
    async createNewOrganizationRecord({ commit }: TActionProps, newOrganizationData: IOrganizationData) {
      commit('addOrganizations', [newOrganizationData]);
    },
    async deleteOrganization({
      commit,
      getters
    }: TActionProps, id: IOrganizationData['id']) {
      commit('deleteOrganizationById', id);
      const sliceAfterDeleting: Array<IOrganizationData> = getters.slicedFilteredSortedOrganizations;

      if (sliceAfterDeleting.length === 0) {
        commit('setCurrentPage', getters.totalPagesCount);
      }
    }
  }
};

const withPrefix = getPrefixer(NAMESPACE);

export const getters = {
  sortedOrganizations: withPrefix('sortedOrganizations'),
  filteredSortedOrganizations: withPrefix('filteredSortedOrganizations'),
  slicedFilteredSortedOrganizations: withPrefix('slicedFilteredSortedOrganizations'),
  totalPagesCount: withPrefix('totalPagesCount')
};

export const mutations = {
  setOrganizations: withPrefix('setOrganizations'),
  addOrganizations: withPrefix('addOrganizations'),
  deleteOrganizationById: withPrefix('deleteOrganizationById'),
  changeSortingState: withPrefix('changeSortingState'),
  setFilterQuery: withPrefix('setFilterQuery'),
  setCurrentPage: withPrefix('setCurrentPage')
};

export const actions = {
  fetchOrganizations: withPrefix('fetchOrganizations'),
  createNewOrganizationRecord: withPrefix('createNewOrganizationRecord'),
  deleteOrganization: withPrefix('deleteOrganization')
};
