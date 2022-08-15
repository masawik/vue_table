<!--eslint-disable vue/multi-word-component-names-->
<script lang="ts" setup>
import { computed, toRefs } from 'vue'

import { ITableCellData, ITableRowData } from '../types'

interface ITbodyProps {
  rowsData: ITableRowData[];
  dataKeyOrder: Array<ITableCellData['dataKey']>;
  addActionColumn: boolean;
}

const props = defineProps<ITbodyProps>()
const {
  dataKeyOrder,
  addActionColumn,
  rowsData,
} = toRefs(props)

const isDataEmpty = computed(() => rowsData.value.length === 0)
const countOfColumns = addActionColumn ? dataKeyOrder.value.length + 1 : dataKeyOrder.value.length
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
          :row-id="rowId"
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
