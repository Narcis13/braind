<script setup>
import { useUserStore } from '~/stores/userStore';
const utilizatorStore = useUserStore();

if(utilizatorStore.eAutentificat){
  navigateTo("./dashboard")
}
else
{
    navigateTo("./autentificare")
}
</script>


<template>
    <div>
        INDEX
    </div>
</template>