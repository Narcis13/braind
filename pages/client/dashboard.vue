
<script setup>
import { useUserStore } from '~/stores/userStore';
import {useNomenclatoareStore} from '~/stores/nomenclatoareStore'
console.log('Dashboard client prima linnie')
const utilizatorStore = useUserStore();
const nomenclatoareStore = useNomenclatoareStore()
console.log('Dashboard client dupa initializare store')
const clienti =  await $fetch(`/api/firme/nomenclatoare/client?cid=${utilizatorStore.firma.id}`, {
        method: "GET",
        headers: {
          "b-access-token":utilizatorStore.token
        }
      });
      console.log('Dashboard client dypa fetxh clienti')
nomenclatoareStore.baza.client_index=[]
clienti.map(c=>{
  nomenclatoareStore.baza.client_index.push(c)
})

const furnizori =  await $fetch(`/api/firme/nomenclatoare/furnizor?cid=${utilizatorStore.firma.id}`, {
        method: "GET",
        headers: {
          "b-access-token":utilizatorStore.token
        }
      });
      console.log('Dashboard client dupa fetch furnizori')
nomenclatoareStore.baza.furnizor_index=[]
furnizori.map(f=>{
  nomenclatoareStore.baza.furnizor_index.push(f)
})

const produsi =  await $fetch(`/api/firme/nomenclatoare/produs?cid=${utilizatorStore.firma.id}`, {
        method: "GET",
        headers: {
          "b-access-token":utilizatorStore.token
        }
      });
      console.log('Dashboard client dupa fetch produsi')
nomenclatoareStore.baza.produs_index=[]
produsi.map(p=>{
  nomenclatoareStore.baza.produs_index.push(p)
})

const serii =  await $fetch(`/api/firme/nomenclatoare/serie?cid=${utilizatorStore.firma.id}`, {
        method: "GET",
        headers: {
          "b-access-token":utilizatorStore.token
        }
      });
      console.log('Dashboard client dupa fetch serii')
nomenclatoareStore.baza.serie_index=[]
serii.map(s=>{
  nomenclatoareStore.baza.serie_index.push(s)
})

const gestiuni =  await $fetch(`/api/firme/nomenclatoare/gestiune?cid=${utilizatorStore.firma.id}`, {
        method: "GET",
        headers: {
          "b-access-token":utilizatorStore.token
        }
      });
      console.log('Dashboard client dupa fetch gestiuni')
nomenclatoareStore.baza.gestiune_index=[]
gestiuni.map(g=>{
  nomenclatoareStore.baza.gestiune_index.push(g)
})

const coduricpv = await $fetch(`/api/firme/info/coduricpv`, {
        method: "GET",
        headers: {
          "b-access-token":utilizatorStore.token
        }
      });
      console.log('Dashboard client dupa fetch coduri cpv')
nomenclatoareStore.baza.coduricpv =coduricpv      
// coduricpv.map(c=>{
//   nomenclatoareStore.baza.coduricpv.push(c) 
// })     
console.log('Dashboard client dupa insert coduri cpv') 
console.log('Dashboard client ultima linnie')
//console.log('coduri cpv',coduricpv)
</script>
<template>
    <div>
        DASHBOARD CLIENT {{ utilizatorStore.firma.denumire }}
    </div>
</template>