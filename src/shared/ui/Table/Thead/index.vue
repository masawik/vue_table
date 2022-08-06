<script lang="ts" setup>
import { toRefs } from 'vue';
import { ITableColumn } from '../types';

interface ITheadProps {
  columns: ITableColumn[];
}

const props = defineProps<ITheadProps>();
const { columns } = toRefs(props);
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
  </tr>
  </thead>
</template>

<style scoped>

</style>
