<script lang="ts" setup>
import { ITableCellData, ITableRowData } from '@/shared/ui/Table/types';
import { toRefs } from 'vue';

interface ITbodyProps {
  rowsData: ITableRowData[];
  dataKeyOrder: Array<ITableCellData['dataKey']>;
}

const props = defineProps<ITbodyProps>();
const {
  rowsData,
  dataKeyOrder
} = toRefs(props);
</script>

<template>
  <tbody class="table-group-divider">
  <tr
    v-for="rowData in rowsData"
    :key="rowData.rowId"
  >
    <td
      v-for="dataKey in dataKeyOrder"
      :key="`${rowData.rowId}_${dataKey}`"
    >
      {{ rowData.data[dataKey] }}
    </td>
  </tr>
  </tbody>
</template>
