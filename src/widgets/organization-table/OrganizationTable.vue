<script lang="ts" setup>
import { computed, ComputedRef, onMounted, ref, unref } from 'vue';
import { useStore } from 'vuex';

import { Table } from '@/shared/components';
import { Pagination } from '@/shared/components/Pagination';
import { OrganizationModel } from '@/entities/Organization/model';
import { IOrganizationData } from '@/entities/Organization/model/organizations';
import { convertOrganizationDataToTableRowData } from '@/entities/Organization/lib/convertOrganizationDataToTableRowData';
import { tableColumns } from '@/entities/Organization/config/organizationTableColumns';
import { FilterOrganizations } from '@/features';
import { Modal } from '@/shared/components/Modal';
import { AddNewOrganizationRecord } from '@/features';
import { DeleteOrganizationRecord } from '@/features';

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

const createNewRecordFormVisible = ref(false);
const openNewRecordForm = () => createNewRecordFormVisible.value = true;
const closeNewRecordForm = () => createNewRecordFormVisible.value = false;

const changePage = (newPage: number) => store.commit(OrganizationModel.mutations.setCurrentPage, newPage);

const sortHandler = (data: string) => store.commit(OrganizationModel.mutations.changeSortingState, data);
</script>

<template>
  <div>
    <div class="row mb-3 mt-4">
      <div class="col-3">
        <FilterOrganizations/>
      </div>
      <div class="col text-end">
        <button class="btn btn-warning" @click="openNewRecordForm">Добавить новую запись</button>

        <Modal
          :isOpen="createNewRecordFormVisible"
          :title="'Добавить новую запись'"
          @close="closeNewRecordForm"
        >
          <template v-slot:body>
            <!--     todo добавить поздравлялку об успешно добавленной записи       -->
            <AddNewOrganizationRecord
              @cancel="closeNewRecordForm"
              @submit="closeNewRecordForm"
            />
          </template>
        </Modal>

      </div>
    </div>

    <div class="row mb-1">
      <Table
        :addActionsColumn="true"
        :columns="tableColumns"
        :rowsData="rowsData"
        :sortingState="sortingState"
        @sort="sortHandler"
      >
        <template v-slot:rowActions="{rowId}">
          <DeleteOrganizationRecord
            :id="rowId"
          />
        </template>
      </Table>

      <Pagination
        :currentPage='currentPage'
        :totalPages="totalPages"
        @changePage="changePage"
      />
    </div>
  </div>
</template>
