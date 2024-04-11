<script setup>
import {useFemiseStore} from '~/stores/femiseStore'
import { useUserStore } from '~/stores/userStore';
import {useQuasar} from 'quasar'
const userStore = useUserStore()
const femiseStore = useFemiseStore()
const config = useRuntimeConfig()
const host=config.public.apihost;
const $q = useQuasar()
const filter=ref('')
let initialPagination= {

        page: 1,
        rowsPerPage: 20
        // rowsNumber: xx if getting data from a server
      }
const columns = [
  {
    name: 'client',
    required: true,
    label: 'Client',
    align: 'left',
   field:'client',
    sortable: true
  },
  { name: 'serie', align: 'center', label: 'Serie', field: 'serie', sortable: true },
  { name: 'numar', label: 'Numar', field: 'numar', sortable: true },
  { name: 'data', label: 'Data', field: 'data' },
  { name: 'valoare', label: 'Valoare', field: 'valoare' },
  { name: 'notainterna', label: 'Nota interna', field: 'notainterna' },
  { name: 'stare', label: 'Stare', field: 'stare', sortable: true }
]

let {data}=  await useFetch(host+'femise/toateinperioada', {
        method: "POST",
        headers: {
         // "b-access-token":userStore.token
        },
        body:{ }
      });
console.log('Utilizator',userStore.utilizator.rol)
femiseStore.lista=[]
if(data.value.succes){
   data.value.lista.map(item=>{
    femiseStore.lista.push(item)
   })
}
const selected = ref([])

function printFactura(){
  window.open(host+'femise/'+selected.value[0].id, '_blank');
  //console.log('printez factura',selected.value[0].id)
  selected.value=[]
}

async function trimiteFactura(){

  let raspuns =  await $fetch(host+'femise/trimite/'+selected.value[0].id);
   console.log('trimite factura ...')
}
async function schimbaStare(stare){

  let {data}=  await useFetch(`/api/firme/facturiemise/schimbastare`, {
        method: "POST",
        headers: {
          "b-access-token":userStore.token
        },
        body:{ id:selected.value[0].id,stare}
      });
  if (data.value.succes){
    $q.notify({
            type: 'positive',
            position:'top',
            timeout:2000,
            message:'Stare factura emisa schimbata cu succes!'
            })
            femiseStore.lista.map(f=>{
              if (f.id==selected.value[0].id) f.stare=stare
            })
            selected.value=[]
  }
}
</script>
<template>
  <div class="q-pa-md">
    <q-table
      :pagination="initialPagination"
      :rows="femiseStore.lista"
      :columns="columns"
      :filter="filter"
      row-key="id"
      selection="single"
      v-model:selected="selected"
    >
    <template v-slot:top>
      <q-btn-dropdown :disable="selected.length==0" color="grey-4" text-color="purple" label="Actiuni">
      <q-list>
        <q-item v-show="selected.length>0&&selected[0].stare=='draft'" clickable v-close-popup @click="schimbaStare('stearsa')">
          <q-item-section>
            <q-item-label>Sterge</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-show="selected.length>0&&selected[0].stare=='valida'" clickable v-close-popup @click="schimbaStare('anulata')">
          <q-item-section>
            <q-item-label>Anuleaza</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-show="selected.length>0&&selected[0].stare=='draft'" clickable v-close-popup @click="schimbaStare('valida')">
          <q-item-section>
            <q-item-label>Valideaza</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="printFactura">
          <q-item-section>
            <q-item-label>Print</q-item-label>
          </q-item-section>
        </q-item>

        <q-item  v-show="selected.length>0&&selected[0].stare=='valida'&&userStore.utilizator.rol=='contabil'" clickable v-close-popup @click="trimiteFactura">
          <q-item-section>
            <q-item-label>Trimite!</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
        
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
  </div>
</template>