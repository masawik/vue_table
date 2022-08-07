<script lang="ts" setup>
import { ITableCellData, ITableRowData } from '../types';
import { computed, toRef } from 'vue';

interface ITbodyProps {
  rowsData: ITableRowData[];
  dataKeyOrder: Array<ITableCellData['dataKey']>;
  addActionColumn: boolean;
}

const props = defineProps<ITbodyProps>();
const {
  dataKeyOrder,
  addActionColumn
} = props;

const rowsData = toRef(props, 'rowsData');

const isDataEmpty = computed(() => rowsData.value.length === 0);
const countOfColumns = addActionColumn ? dataKeyOrder.length + 1 : dataKeyOrder.length;
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
      <slot
        :rowId="rowId"
        name="action"
      />
    </td>
  </tr>

  <!-- заглушка для отсутствующих данных -->
  <tr v-if="isDataEmpty">
    <td :colspan="countOfColumns">
      данных нет
    </td>
  </tr>
  </tbody>
</template>
