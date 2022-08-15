<script lang="ts" setup>
import { useStore } from 'vuex'

import { IOrganizationData } from '@/entities/Organization/model/organizations'
import { OrganizationModel } from '@/entities/Organization/model'

interface IDeleteOrganizationRecordProps {
  id: IOrganizationData['id'];
}

const store = useStore()

const props = defineProps<IDeleteOrganizationRecordProps>()

//Возможно, стоит вынести обратно в виджет, чтобы не создавать новую функцию на каждую строку таблицы
const deleteRecordHandler = () => {
  store.dispatch(OrganizationModel.actions.deleteOrganization, props.id)
}
</script>

<template>
  <button
    aria-label="удалить запись"
    class="btn btn-danger btn-sm"
    @click="deleteRecordHandler"
  >
    X
  </button>
</template>
