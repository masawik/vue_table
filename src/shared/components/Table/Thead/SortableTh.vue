<script lang="ts" setup>
import { SortStates } from '@/shared/components';

interface ISortableThProps {
  sorted?: SortStates;
}

const { sorted } = defineProps<ISortableThProps>();
</script>

<template>
  <th
    :class="{
    'sortableThAsc': sorted === SortStates.ASC,
    'sortableThDesc': sorted === SortStates.DESC
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
