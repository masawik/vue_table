<script lang="ts" setup>
import { useStore } from 'vuex'

import debounce from 'lodash/debounce'
import { OrganizationModel } from '@/entities/Organization/model'

const store = useStore()

const inputHandler = debounce((e: Event) => {
  const target = e.target as HTMLInputElement
  store.commit(OrganizationModel.mutations.setFilterQuery, target.value)
}, 500)
</script>

<template>
  <input
    class="form-control"
    placeholder="Найти по ФИО..."
    type="text"
    @input="inputHandler"
  >
</template>

<style scoped>

</style>
