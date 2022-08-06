<script lang="ts" setup>
import { ITableColumn } from '../types';
import SortableTh from './SortableTh.vue';

interface ITheadProps {
  columns: ITableColumn[];
  addActionColumn: boolean;
}

const {
  columns,
  addActionColumn
} = defineProps<ITheadProps>();

</script>

<template>
  <thead>
  <tr class="table-primary">
    <template
      v-for="header in columns"
      :key="header.dataKey"
    >
      <component :is="header.sortable ? SortableTh : 'th'">
        {{ header.view }}
      </component>
    </template>


    <th v-if="addActionColumn">
      <slot name="action"/>
    </th>
  </tr>
  </thead>
</template>

<style scoped>

</style>
