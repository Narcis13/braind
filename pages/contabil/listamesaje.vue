<script setup>
import {useFemiseStore} from '~/stores/femiseStore'
import { useUserStore } from '~/stores/userStore';
import {useQuasar} from 'quasar'
const $q = useQuasar()
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
$q.loading.show({
    delay: 400 // ms
  })
let toatemesajele =  await $fetch(host+'femise/listamesaje/4318016'+'/'+userStore.utilizator.id);  
$q.loading.hide()   
//console.log('toate mesajele',toatemesajele.mesaje)  
let prelucrate=[]
let selected = ref([])
toatemesajele.mesaje.map((element) => {
    element.data_creare=element.data_creare.substr(6,2)+'.'+element.data_creare.substr(4,2)+'.'+element.data_creare.substr(0,4)
    prelucrate.unshift(element)
});
mesaje=[...prelucrate]
const columns = [

{ name: 'datacreare', align: 'center', label: 'Data', field: 'data_creare', sortable: true },
{ name: 'detalii', label: 'Detalii', field: 'detalii', sortable: true },
{ name: 'id', label: 'ID', field: 'id' },
{ name: 'idsolicitare', align: 'left',label: 'ID Solicitare', field: 'id_solicitare' },
{ name: 'tip', label: 'TIP',align: 'left', field: 'tip', sortable: true }
]

async function descarca(){
 
 const r=   await $fetch(host+'femise/descarca/'+selected.value[0].id+'/'+userStore.utilizator.id);  
    console.log('descarc ID',r)
}

</script>

<template>
    <div class="q-pa-xl text-h5">
        Lista mesaje ANAF (SPV)
        <q-table
                :pagination="initialPagination"
                :rows="mesaje"
                :columns="columns"
                class="q-mt-md"
                row-key="id"
                selection="single"
                v-model:selected="selected"

         >
         <template v-slot:top-left>

                               
        <div class="flex" style="min-width:200px;max-height:100px;">


            <q-btn  class="q-ma-sm" label="Descarca"   icon="add" @click="descarca">

            </q-btn>

        </div>

</template>
        </q-table>
    </div>
</template>


