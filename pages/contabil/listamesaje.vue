<script setup>
import {useFemiseStore} from '~/stores/femiseStore'
import { useUserStore } from '~/stores/userStore';

const userStore = useUserStore()
const femiseStore = useFemiseStore()

const config = useRuntimeConfig()
const host=config.public.apihost;
//console.log('Mesaje ANAF')
let mesaje=reactive([])
let initialPagination= {

page: 1,
rowsPerPage: 20
// rowsNumber: xx if getting data from a server
}

let toatemesajele =  await $fetch(host+'femise/listamesaje/4318016'+'/'+userStore.utilizator.id);     
//console.log('toate mesajele',toatemesajele.mesaje)  
mesaje=[...toatemesajele.mesaje]
const columns = [

{ name: 'datacreare', align: 'center', label: 'Data', field: 'data_creare', sortable: true },
{ name: 'detalii', label: 'Detalii', field: 'detalii', sortable: true },
{ name: 'id', label: 'ID', field: 'id' },
{ name: 'idsolicitare', align: 'left',label: 'ID Solicitare', field: 'id_solicitare' },
{ name: 'tip', label: 'TIP',align: 'left', field: 'tip', sortable: true }
]


</script>

<template>
    <div class="q-pa-xl text-h5">
        Lista mesaje ANAF (SPV)
        <q-table
                :pagination="initialPagination"
                :rows="mesaje"
                :columns="columns"
                
                row-key="id"

         >
        </q-table>
    </div>
</template>


