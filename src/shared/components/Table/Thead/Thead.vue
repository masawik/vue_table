<script lang="ts" setup>
import { toRefs } from 'vue';
import { ITableColumn } from '../types';

interface ITheadProps {
  columns: ITableColumn[];
  addActionColumn: boolean;
}

const props = defineProps<ITheadProps>();
const {
  columns,
  addActionColumn
} = toRefs(props);
</script>

<template>
  <thead>
  <tr class="table-primary">
    <th
      v-for="header in columns"
      :key="header.dataKey"
    >
      {{ header.view }}
    </th>

    <th v-if="addActionColumn">
      <slot name="action"/>
    </th>
  </tr>
  </thead>
</template>

<style scoped>

</style>
