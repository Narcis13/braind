
<script setup>
import { useUserStore } from '~/stores/userStore';
import {useNomenclatoareStore} from '~/stores/nomenclatoareStore'
const utilizatorStore = useUserStore();
const nomenclatoareStore = useNomenclatoareStore()

const clienti =  await $fetch(`/api/firme/nomenclatoare/client?cid=${utilizatorStore.firma.id}`, {
        method: "GET",
        headers: {
          "b-access-token":utilizatorStore.token
        }
      });
 
nomenclatoareStore.baza.client_index=[]
clienti.map(c=>{
  nomenclatoareStore.baza.client_index.push(c)
})
//console.log(utilizatorStore.firma)
</script>
<template>
    <div>
        DASHBOARD CLIENT {{ utilizatorStore.firma.denumire }}
    </div>
</template>