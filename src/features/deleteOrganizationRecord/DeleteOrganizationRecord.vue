<script lang="ts" setup>
import { IOrganizationData } from '@/entities/Organization/model/organizations';
import { OrganizationModel } from '@/entities/Organization/model';
import { useStore } from 'vuex';

interface IDeleteOrganizationRecordProps {
  id: IOrganizationData['id'];
}

const store = useStore();

const { id } = defineProps<IDeleteOrganizationRecordProps>();

//Возможно, стоит вынести обратно в виджет, чтобы не создавать новую функцию на каждую строку таблицы
const deleteRecordHandler = () => {
  store.dispatch(OrganizationModel.actions.deleteOrganization, id);
};
</script>

<template>
  <button
    aria-label="удалить запись"
    class="btn btn-danger btn-sm"
    @click="deleteRecordHandler"
  >X
  </button>
</template>
