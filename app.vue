<script setup>
import { useUserStore } from '~/stores/userStore';
const userStore = useUserStore()

</script>
<template>
  <div>
    <q-input v-model="userStore.numarNorocos" rounded outlined label="Rounded outlined" />
  </div>
</template>
