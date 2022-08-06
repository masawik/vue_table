<script lang="ts" setup>
import { Thead } from './Thead';
import { Tbody } from './Tbody';
import { computed, toRefs } from 'vue';
import { ITableColumn, ITableRowData } from '@/shared/ui/Table/types';

export interface ITableProps {
  caption?: string;
  columns: ITableColumn[];
  rowsData: ITableRowData[];
}

const props = defineProps<ITableProps>();

const {
  caption,
  columns,
  rowsData
} = toRefs(props);

const dataKeyOrder = computed(() => columns.value.map(column => column.dataKey));
</script>

<template>
  <table class="table table-light table-hover table-bordered caption-top text-center">
    <caption v-if="caption">{{ caption }}</caption>
    <Thead :columns="columns"/>

    <Tbody
      :dataKeyOrder="dataKeyOrder"
      :rowsData="rowsData"
    />

    <slot name="footer"/>
  </table>
</template>
