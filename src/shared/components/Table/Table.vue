<!--eslint-disable vue/multi-word-component-names-->
<script lang="ts" setup>
import { computed, toRefs } from 'vue'

import { Thead } from './Thead'
import { Tbody } from './Tbody'
import { ISortingState, ITableColumn, ITableRowData } from './types'

export interface ITableProps {
  columns: ITableColumn[];
  rowsData: ITableRowData[];
  addActionsColumn: boolean;
  sortingState: ISortingState;
}

const props = defineProps<ITableProps>()
const {
  columns,
  addActionsColumn,
  rowsData,
  sortingState,
} = toRefs(props)

const emit = defineEmits(['sort'])

const dataKeyOrder = computed(() => columns.value.map(column => column.dataKey))

const sortHandler = (headerDataKey: string) => {
  emit('sort', headerDataKey)
}

</script>

<template>
  <table class="table table-light table-hover table-bordered caption-top text-center">
    <slot name="beforeHeader" />
    <!--  todo нужно выносить отсюда Thead. слишком много проблем с сортировкой  -->
    <Thead
      :add-action-column="addActionsColumn"
      :columns="columns"
      :sorting-state="sortingState"
      @sort="sortHandler"
    >
      <template #action>
        <slot name="headerAction" />
      </template>
    </Thead>

    <Tbody
      :add-action-column="addActionsColumn"
      :data-key-order="dataKeyOrder"
      :rows-data="rowsData"
    >
      <template #action="{rowId}">
        <slot
          :row-id="rowId"
          name="rowActions"
        />
      </template>
    </Tbody>

    <slot name="footer" />
  </table>
</template>
