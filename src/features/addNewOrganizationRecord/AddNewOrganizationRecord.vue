<script lang="ts" setup>
import { useStore } from 'vuex';
import { ref, watch } from 'vue';
import { OrganizationModel } from '@/entities/Organization/model';
import { IOrganizationData } from '@/entities/Organization/model/organizations';
import { isValidPhoneNumber } from '@/shared/lib/isValidPhoneNumber';

const store = useStore();
const emit = defineEmits(['submit', 'cancel']);

const name = ref('');
const principalName = ref('');
const phoneNumber = ref('');

const isFormValid = ref(false);

const validateForm = () => {
  if (name.value.length < 3 || name.value.length > 40) return;
  if (principalName.value.length < 3 || principalName.value.length > 16) return;
  if (!isValidPhoneNumber(phoneNumber.value)) return;

  isFormValid.value = true;
};

watch([name, principalName, phoneNumber], validateForm);

const submitHandler = () => {
  const newOrganizationData: IOrganizationData = {
    id: Date.now(),
    name: name.value,
    phoneNumber: phoneNumber.value,
    principalName: principalName.value
  };

  store.commit(OrganizationModel.mutations.addOrganizations, [newOrganizationData]);
  emit('submit');
};
</script>

<template>
  <!-- todo добавить валидацию  -->
  <form @submit.prevent="submitHandler">
    <div class="mb-3">
      <label class="form-label" for="name">Название организации</label>
      <input
        id="name"
        v-model="name"
        class="form-control"
        maxlength="40"
        minlength="3"
        placeholder="ООО 'Витязь'"
        required
        type="text">
    </div>

    <div class="mb-3">
      <label class="form-label" for="principalName">Имя директора</label>
      <input
        id="principalName"
        v-model="principalName"
        class="form-control"
        maxlength="16"
        minlength="3"
        placeholder="Иванов П.Г."
        required
        type="text">
    </div>

    <div class="mb-3">
      <label class="form-label" for="phoneNumber">Номер телефона</label>
      <!--todo добавить форматтер номера телефона-->
      <input
        id="phoneNumber"
        v-model="phoneNumber"
        class="form-control"
        maxlength="20"
        minlength="10"
        placeholder="+7 (828) 534-2962"
        required
        type="text">
    </div>

    <div class="d-flex justify-content-end">
      <button
        class="btn btn-danger cancel-button"
        type="button"
        @click="emit('cancel')"
      >
        Отмена
      </button>

      <button
        :disabled="!isFormValid"
        class="btn btn-primary"
        type="submit"
      >
        Добавить запись
      </button>
    </div>
  </form>
</template>

<style scoped>
.cancel-button {
  margin-right: 10px;
}
</style>
