<!--eslint-disable vue/multi-word-component-names-->
<script lang="ts" setup>
import { toRefs } from 'vue'

import { ISortingState, ITableColumn } from '../types'
import SortableTh from './SortableTh.vue'

interface ITheadProps {
  columns: ITableColumn[];
  addActionColumn: boolean;
  sortingState: ISortingState;
}

const props = defineProps<ITheadProps>()

const {
  sortingState,
  columns,
  addActionColumn,
} = toRefs(props)

const emit = defineEmits(['sort'])

const sortHandler = (dataKey: ITableColumn['dataKey']) => {
  emit('sort', dataKey)
}

</script>

<template>
  <thead>
    <tr class="table-primary">
      <template
        v-for="{sortable, dataKey, view} in columns"
        :key="dataKey"
      >
        <SortableTh
          v-if="sortable"
          :sorted="dataKey === sortingState.dataKey ? sortingState.direction : null"
          @click="sortHandler(dataKey)"
        >
          {{ view }}
        </SortableTh>

        <th v-else>
          {{ view }}
        </th>
      </template>


      <th v-if="addActionColumn">
        <slot name="action" />
      </th>
    </tr>
  </thead>
</template>

<style scoped>

</style>
