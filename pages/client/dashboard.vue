
<script setup>
import { useUserStore } from '~/stores/userStore';
const utilizatorStore = useUserStore();
//console.log(utilizatorStore.firma)
</script>
<template>
    <div>
        DASHBOARD CLIENT {{ utilizatorStore.firma.denumire }}
    </div>
</template>