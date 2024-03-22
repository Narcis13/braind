<script setup>
import {useNomenclatoareStore} from '~/stores/nomenclatoareStore'
import { useArhitecturaStore } from '~/stores/arhitecturaStore';
import { useUserStore } from '~/stores/userStore';
import { useFemiseStore } from '~/stores/femiseStore';

const props = defineProps({
  
     modelValue:Object
})

const femiseStore = useFemiseStore()
const emit = defineEmits(['update:modelValue'])
const clientSelectat = ref(null)    
const nomenclatoareStore = useNomenclatoareStore()
const utilizatorStore = useUserStore();
const arhitecturaStore = useArhitecturaStore()
watch(nomenclatoareStore.baza.client_index,(nou,vechi)=>{
   
     const obj={value:nou[0].id,label:nou[0].denumire}
      console.log('S-a schimbat schimbarea ',obj)
     femiseStore.modelDocument.client=obj
     stringOptions=[...nomenclatoareStore.baza.client_index.map(item=>{return {value:item.id,label:item.denumire}})] 
     options.value.push(obj)
     emit('update:modelValue', obj)
})

//console.log(arhitecturaStore.arhitecturaModel(id))
const arhitectura = arhitecturaStore.arhitecturaModel('client')

const adaugmodificItem = ref(false)

let optiuni = {}
const hidrateaza = async (url)=>{

 return await $fetch(`/${url}`,{
              headers:{
               "b-access-token":utilizatorStore.token
              }
            })
}
arhitectura.proprietati.map(async item=>{
  if("options" in item){
   optiuni[item.name]=[... await hidrateaza(item.options[0])]
  }
 })
let alert = ref(false)
let mesajAlerta = ref('')


function afiseazaAlerta(mesaj){
   alert.value=true
   mesajAlerta.value=mesaj
}

let options= ref([])
 let stringOptions=[...nomenclatoareStore.baza.client_index.map(item=>{return {value:item.id,label:item.denumire}})]    
 //console.log('Selext client',stringOptions) 

function filterFn (val, update, abort) {
        if (val.length < 2) {
          abort()
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      }  
function inputvalue(value){
  console.log('input value',value)
  emit('update:modelValue', value)
}

</script>

<template>
    <div>
        <q-select    
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            dense 
            bottom-slots 
            v-model="femiseStore.modelDocument.client" 
            @filter="filterFn"
            @update:model-value="inputvalue"
            :options="options" 
            label="Nume client"
            style="min-width: 300px;">
        
                <template v-slot:hint>
                Cautati client dupa nume
                </template>
                <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                       <div> Niciun rezultat</div>
                       <q-btn color="indigo" icon="add" label="ADAUGA CLIENT" @click="adaugmodificItem=!adaugmodificItem"/>
                        </q-item-section>
                    </q-item>
        </template>

        </q-select>
        <q-dialog v-model="adaugmodificItem">
               <q-card style="min-width: 350px;">
               <q-card-section class="row items-center q-pb-none">
                  <div class="text-h6">Adaug client</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
               </q-card-section>

               <q-card-section >
                   <add-nomenclator-item mod="adaug" :optiuni="optiuni" :context="arhitectura" tip_nomenclator="client" @nonunic="afiseazaAlerta"/>
               </q-card-section>
               </q-card>
       </q-dialog>
       <q-dialog v-model="alert">
          <q-card>
            <q-card-section>
              <div class="text-h6">Alerta</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Acest client exista deja in baza de date!
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="AM INTELES" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
    </q-dialog>
    </div>
</template>



