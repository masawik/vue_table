<script lang="ts" setup>
import { ITableCellData, ITableRowData } from '@/shared/ui/Table/types';
import { toRefs } from 'vue';

interface ITbodyProps {
  rowsData: ITableRowData[];
  dataKeyOrder: Array<ITableCellData['dataKey']>;
  addActionColumn: boolean;
}

const props = defineProps<ITbodyProps>();
const {
  rowsData,
  dataKeyOrder,
  addActionColumn
} = toRefs(props);
</script>

<template>
  <tbody class="table-group-divider">
  <tr
    v-for="{rowId, data} in rowsData"
    :key="rowId"
  >
    <td
      v-for="dataKey in dataKeyOrder"
      :key="`${rowId}_${dataKey}`"
    >
      {{ data[dataKey] }}
    </td>

    <td v-if="addActionColumn">
      <slot :rowId="rowId" name="action"/>
    </td>
  </tr>
  </tbody>
</template>
