<script lang="ts" setup>
import { ITableColumn, ITableRowData, Table } from '@/shared/components';
import { Pagination } from '@/shared/components/Pagination';

const tableColumns: ITableColumn[] = [
  {
    view: 'Название',
    dataKey: 'name',
    sortable: true
  },
  {
    view: 'ФИО Директора',
    dataKey: 'SEOFullName',
    sortable: true
  },
  {
    view: 'Номер телефона',
    dataKey: 'phoneNumber',
    sortable: false
  }
];

const rowsData: ITableRowData[] = [
  {
    rowId: '1',
    data: {
      'name': 'ООО "пук"',
      'SEOFullName': 'Иванов П.П.',
      'phoneNumber': '+79999999999'
    }
  }
];

const sortHandler = (data: string) => {
  console.log(data);
};
</script>

<template>
  <div class="row mb-1 mt-3">
    <Table
      :addActionsColumn="true"
      :columns="tableColumns"
      :rowsData="rowsData"
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
      :currentPage='1'
      :totalPages="100"
      @changePage="sortHandler"
    />
  </div>
</template>
