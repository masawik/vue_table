<script lang="ts" setup>
import { Thead } from './Thead';
import { Tbody } from './Tbody';
import { computed, toRef } from 'vue';
import {
  ITableColumn,
  ITableRowData,
  ISortingState
} from './types';

export interface ITableProps {
  columns: ITableColumn[];
  rowsData: ITableRowData[];
  addActionsColumn: boolean;
  sortingState: ISortingState;
}

const props = defineProps<ITableProps>();
const {
  columns,
  addActionsColumn
} = props;
const rowsData = toRef(props, 'rowsData');
const sortingState = toRef(props, 'sortingState');

const emit = defineEmits(['sort']);

const dataKeyOrder = computed(() => columns.map(column => column.dataKey));

const sortHandler = (headerDataKey: string) => {
  emit('sort', headerDataKey);
};

</script>

<template>
  <table class="table table-light table-hover table-bordered caption-top text-center">
    <slot name="beforeHeader"/>
    <!--  todo нужно выносить отсюда Thead. слишком много проблем с сортировкой  -->
    <Thead
      :addActionColumn="addActionsColumn"
      :columns="columns"
      :sortingState="sortingState"
      @sort="sortHandler"
    >
    <template v-slot:action>
      <slot name="headerAction"/>
    </template>
    </Thead>

    <Tbody
      :addActionColumn="addActionsColumn"
      :dataKeyOrder="dataKeyOrder"
      :rowsData="rowsData"
    >
    <template v-slot:action="rowSlotProps">
      <slot
        :rowSlotProps="rowSlotProps"
        name="rowActions"
      />
    </template>
    </Tbody>

    <slot name="footer"/>
  </table>
</template>
