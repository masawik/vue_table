<script lang="ts" setup>
import { ESortingDirections } from '../types';

interface ISortableThProps {
  sorted?: ESortingDirections;
}

const { sorted } = defineProps<ISortableThProps>();
const emit = defineEmits(['click']);

const clickHandler = () => emit('click');
</script>

<template>
  <th
    :class="{
    'sortableThAsc': sorted === ESortingDirections.ASC,
    'sortableThDesc': sorted === ESortingDirections.DESC
    }"
    class="btn-link sortableTh"

    role="button"
    tabindex="0"
    @click="clickHandler"
    @keypress.enter.space="clickHandler"
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
