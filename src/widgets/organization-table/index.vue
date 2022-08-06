<script lang="ts" setup>
import { ITableColumn, ITableRowData, Table } from '@/shared/ui/Table';

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
  },
  {
    view: '',
    dataKey: 'action',
    sortable: false
  }
];

const rowsData: ITableRowData[] = [
  {
    rowId: '1',
    data: {
      'name': 'ООО "пук"',
      'SEOFullName': 'Иванов П.П.',
      'phoneNumber': '+79999999999',
      'action': 'X'
    }
  }
];

</script>

<template>
  <div class="row mb-1 mt-3">
    <Table
      :caption="'Organization List'"
      :columns="tableColumns"
      :rowsData="rowsData"
    >
    </Table>
  </div>
</template>
