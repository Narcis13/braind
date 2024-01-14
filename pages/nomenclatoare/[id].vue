<script setup>
import { useArhitecturaStore } from '~/stores/arhitecturaStore';
import { useUserStore } from '~/stores/userStore';
const utilizatorStore = useUserStore();
const arhitecturaStore = useArhitecturaStore()
const {id} = useRoute().params
console.log(arhitecturaStore.arhitecturaModel(id))
const arhitectura = arhitecturaStore.arhitecturaModel(id)
const columns = [
...arhitectura.proprietati.filter(obj=>obj.displayed_in_table)
]
console.log(arhitectura)
const adaugItem = ref(false)
const rows = [
  {id:1,denumire:"Firma A",codfiscal:3453433},
  {id:2,denumire:"Firma B",codfiscal:46767777}
]

const selected = ref([])
</script>

<template>
     <q-page class=" column items-center justify-start q-gutter-md " >
      <div class="text-h5 q-mt-xl">{{ arhitectura.titlu }}</div>
        <div class="q-mt-md">
            <q-table
                flat bordered
               
                :rows="rows"
                :columns="columns"
                row-key="id"
                selection="single"
                v-model:selected="selected"
             >

             <template v-slot:top>

                               
                                <div class="flex" style="min-width:200px;max-height:100px;">
                                    <q-btn  class="q-ma-sm" label="Sterge" icon="remove" >
                                        
                                    </q-btn>

                                    <q-btn  class="q-ma-sm" label="Adauga"   icon="add" @click="adaugItem=true">

                                    </q-btn>
                                
                                    <q-btn  class="q-ma-sm" label="Modifica"   icon="add" >

                                    </q-btn>
                                </div>

              </template>
            </q-table>
        </div>

        <q-dialog v-model="adaugItem">
               <q-card style="min-width: 350px;">
               <q-card-section class="row items-center q-pb-none">
                  <div class="text-h6">Adaug {{ id }}</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
               </q-card-section>

               <q-card-section>
                   <add-nomenclator-item :context="arhitectura" :tip_nomenclator="id"/>
               </q-card-section>
               </q-card>
       </q-dialog>

     </q-page>

</template>