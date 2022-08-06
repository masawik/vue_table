<script lang="ts" setup>
//todo подумать что с этим сделать. нельзя использовать импорт с одного слоя.
import { SortingDirections } from '@/shared/config';

interface ISortableThProps {
  sorted?: SortingDirections;
}

const { sorted } = defineProps<ISortableThProps>();
</script>

<template>
  <th
    :class="{
    'sortableThAsc': sorted === SortingDirections.ASC,
    'sortableThDesc': sorted === SortingDirections.DESC
    }"
    class="btn-link sortableTh"


    role="button"
  >
    <slot/>
  </th>
</template>

<style scoped>
.sortableTh {
  position: relative;
  user-select: none;
}

.sortableTh::after {
  position: absolute;
  right: 0;
  display: none;
  width: 25px;
  height: 25px;
  font-size: 18px;
  transform-origin: center;
  content: "<";
}

.sortableThAsc::after,
.sortableThDesc::after {
  display: inline-block;
}

.sortableThAsc::after {
  transform: rotate(90deg);
}

.sortableThDesc::after {
  transform: translateX(-5px) rotate(-90deg);
}
</style>
