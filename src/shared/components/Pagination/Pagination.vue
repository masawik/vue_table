<!--eslint-disable vue/multi-word-component-names-->
<!--todo добавить формочку перемещения на указанную страницу при большом количестве страниц-->
<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import PaginationButton from './PaginationButton.vue'
import PaginationButtonPlaceHolder from './PaginationButtonPlaceHolder.vue'
import { range } from '@/shared/lib/range'

interface IPaginationProps {
  currentPage: number,
  totalPages: number,
  addNextPrevButtons?: boolean
  //количество кнопок которое нужно генерировать в левую и в правую сторону от кнопки текущей страницы
  countOfButtonsFromCurrent?: number
}

const props = withDefaults(defineProps<IPaginationProps>(), {
  addNextPrevButtons: true,
  countOfButtonsFromCurrent: 3,
})

const {
  currentPage,
  totalPages,
  addNextPrevButtons,
  countOfButtonsFromCurrent,
} = toRefs(props)

const pageData = computed(() => ({
  prevPage: currentPage.value > 1 ? currentPage.value - 1 : null,
  nextPage: currentPage.value < totalPages.value ? currentPage.value + 1 : null,
  isCurrentPageFirst: currentPage.value === 1,
  isCurrentPageLast: currentPage.value === totalPages.value,
}))

const pagesToGenerate = computed(() => {
  //todo fast fix. возможно, нужно сделать иначе
  if (totalPages.value < (countOfButtonsFromCurrent.value * 2) + 2) {
    return range(2, totalPages.value)
  }

  let start = currentPage.value - countOfButtonsFromCurrent.value
  let end = currentPage.value + countOfButtonsFromCurrent.value

  if (start < 2) {
    start = 2
    end = countOfButtonsFromCurrent.value * 2 + 2
  }

  if (end > totalPages.value) {
    end = totalPages.value
    start = totalPages.value - countOfButtonsFromCurrent.value * 2
  }

  return range(start, end)
})

const emit = defineEmits(['changePage'])

const changePageHandler = (page: number) => emit('changePage', page)
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="d-flex flex-column align-items-center"
  >
    <ul class="pagination">
      <!--   previous page button   -->
      <PaginationButton
        v-if="addNextPrevButtons"
        :disabled="pageData.prevPage === null"
        :text="'предыдущая страница'"
        @change-page="changePageHandler(pageData.prevPage)"
      />

      <!--   first page button   -->
      <PaginationButton
        :active="pageData.isCurrentPageFirst"
        :text="'1'"
        @change-page="changePageHandler(1)"
      />

      <!--  left  placeholder    -->
      <PaginationButtonPlaceHolder
        v-if="pagesToGenerate.length && pagesToGenerate[0] !== 2"
      />

      <!--   generated buttons   -->
      <PaginationButton
        v-for="pageNumber in pagesToGenerate"
        :key="pageNumber"
        :active="pageNumber === currentPage"
        :text="pageNumber"
        @change-page="changePageHandler(pageNumber)"
      />

      <!--  right  placeholder    -->
      <PaginationButtonPlaceHolder
        v-if="pagesToGenerate.length && pagesToGenerate.slice(-1)[0] !== totalPages - 1"
      />

      <!--   last page button   -->
      <PaginationButton
        :active="pageData.isCurrentPageLast"
        :text="totalPages"
        @change-page="changePageHandler(totalPages)"
      />

      <!--   next page button   -->
      <PaginationButton
        v-if="addNextPrevButtons"
        :disabled="pageData.nextPage === null"
        :text="'следующая страница'"
        @change-page="changePageHandler(pageData.nextPage)"
      />
    </ul>
  </div>
</template>

<style scoped>

</style>
