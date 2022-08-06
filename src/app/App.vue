<script lang="ts">
import { OrganizationTablePage } from '@/pages'

export default {
  name: 'App',
  components: { OrganizationTablePage }
}
</script>

<template>
  <div class="app container">
    <organization-table-page />
  </div>
</template>

<style>
@import "index.css";
</style>

<!--todo решить проблему с eslint-->
