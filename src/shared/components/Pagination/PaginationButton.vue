<script lang="ts" setup>
import { toRefs } from 'vue';

interface IPaginationButtonItem {
  disabled?: boolean;
  active?: boolean;
  text: string | number;
}

const props = defineProps<IPaginationButtonItem>();
const {
  disabled,
  text,
  active
} = toRefs(props);

const emit = defineEmits(['changePage']);
</script>

<template>
  <li
    :class="{'disabled': disabled, 'active': active}"
    class="page-item"
  >
    <button
      :disabled="disabled || active"
      class="page-link"
      @click="emit('changePage')"
    >
      {{ text }}
    </button>
  </li>
</template>
