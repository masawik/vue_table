<script lang="ts" setup>
import { toRef, useSlots } from 'vue';

interface IPopupProps {
  isOpen: boolean;
  title: string;
}

const emit = defineEmits(['close']);
const props = defineProps<IPopupProps>();

const isOpen = toRef(props, 'isOpen');
const close = () => emit('close');

const slots = useSlots();
</script>

<template>
  <teleport to="body">
    <transition name="fade">
    <div
      v-if="isOpen"
      class="modal"
      style="display: block; background-color: rgba(0,0,0, .5)"
      tabindex="-1"
      @click="close"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        @click.stop
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>

            <button aria-label="Close"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    type="button"
                    @click="close"
            ></button>
          </div>

          <div v-if="slots.body" class="modal-body">
            <slot name="body">
              <slot name="body"/>
            </slot>
          </div>

          <div v-if="slots.footer" class="modal-footer">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
