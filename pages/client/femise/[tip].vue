<script setup>
import {date} from 'quasar'
import {useNomenclatoareStore} from '~/stores/nomenclatoareStore'

const nomenclatoareStore = useNomenclatoareStore()
console.log('serii', nomenclatoareStore.baza.serie_index)
const route = useRoute();
const tipfactura = route.params.tip;
let options= [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
const model=ref('')    
const nrfact=ref(13000)
const serie=ref('AG')

const datacurenta= ref(date.formatDate( new Date(),'YYYY/MM/DD'))
const scadenta = new Date()
scadenta.setDate(scadenta.getDate()+90)
const datascadenta= ref(date.formatDate( scadenta,'YYYY/MM/DD'))
const modelDocument = reactive({
    client:null
})
function Adauga(){
    console.log('Adaug factura',modelDocument.client)
}
</script>

<template>
<q-page  class="flex justify-center">
    <div class=" q-mt-sm column items-center q-gutter-md" >
        <div class="q-mt-md" style="width:1150px">
                <div class="text-h6">
                   Factura {{ tipfactura }}
                </div>
        </div>
            <q-card class="q-mt-sm q-ml-xs row justify-evenly  q-gutter-md" style="width:1150px">
                
               <client-factura-emisa-select-client v-model="modelDocument.client"/>

                <q-input dense filled v-model="datacurenta" mask="date"  label="Data factura" style="max-width: 160px;">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="datacurenta">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                            </q-date>
                        </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>

                <q-input dense filled v-model="datascadenta" mask="date" :rules="['date']" label="Scadenta" style="max-width: 160px;">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="datascadenta">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                </q-input>

                <!-- <q-select dense v-model="model" :options="options" label="Standard" style="min-width: 200px;"/> -->
                <q-input label="Nr. factura" dense filled readonly v-model="nrfact"  :prefix="serie" stack-label style="min-width: 200px;">
                    <template v-slot:prepend>
                         <q-icon name="mail" />
                    </template>
                </q-input>

            </q-card>

           <client-factura-emisa-add-linie />

           <q-btn class="q-mt-md" color="white" text-color="black" label="Adauga" @click="Adauga"/>
    </div>
</q-page>
  

</template>

<style>
.debug {
    border: 1px solid black;
}
</style>