<script lang="ts" setup>
import { computed, ComputedRef, onMounted, unref } from 'vue';
import { useStore } from 'vuex';

import { Table } from '@/shared/components';
import { Pagination } from '@/shared/components/Pagination';
import { OrganizationModel } from '@/entities/Organization/model';
import { IOrganizationData } from '@/entities/Organization/model/organizations';
import { convertOrganizationDataToTableRowData } from '@/entities/Organization/lib/convertOrganizationDataToTableRowData';
import { tableColumns } from '@/entities/Organization/config/organizationTableColumns';

const store = useStore();

onMounted(() => {
  store.dispatch(OrganizationModel.actions.fetchOrganizations);
});

const organizationsData: ComputedRef<IOrganizationData[]> =
  computed(() => store.getters[OrganizationModel.getters.slicedFilteredSortedOrganizations]);
const rowsData = computed(() => convertOrganizationDataToTableRowData(unref(organizationsData)));

const currentPage = computed(() => store.state['organizations'].pagination.currentPage);
const totalPages = computed(() => store.getters[OrganizationModel.getters.totalPagesCount]);

const sortingState = computed(() => store.state['organizations'].sortingState);

const changePage = (newPage: number) => store.commit(OrganizationModel.mutations.setCurrentPage, newPage);

const sortHandler = (data: string) => store.commit(OrganizationModel.mutations.changeSortingState, data);
</script>

<template>
  <div class="row mb-1 mt-3">
    <Table
      :addActionsColumn="true"
      :columns="tableColumns"
      :rowsData="rowsData"
      :sortingState="sortingState"
      @sort="sortHandler"
    >
      <template v-slot:beforeHeader>
        <caption>Organization List</caption>
      </template>

      <template v-slot:rowActions="rowSlotProps">
        <button>X</button>
      </template>
    </Table>

    <Pagination
      :currentPage='currentPage'
      :totalPages="totalPages"
      @changePage="changePage"
    />
  </div>
</template>
