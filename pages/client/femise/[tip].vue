<script setup>
import {date,useQuasar} from 'quasar'
import {useNomenclatoareStore} from '~/stores/nomenclatoareStore'
import {useFemiseStore} from '~/stores/femiseStore'
import { useUserStore } from '~/stores/userStore';
const $q = useQuasar()
const userStore = useUserStore()
const femiseStore = useFemiseStore()
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
const mentiuni =ref('')
const intocmit = ref('E-FACTURA')
const cnp =ref('')
const datacurenta= ref(date.formatDate( new Date(),'YYYY/MM/DD'))
const scadenta = new Date()
scadenta.setDate(scadenta.getDate()+90)
const datascadenta= ref(date.formatDate( scadenta,'YYYY/MM/DD'))
const modelDocument = reactive({
    client:null
})
async function Adauga(){
    let fe ={
        idClient:modelDocument.client.value,
        dataFactura:datacurenta.value,
        scadenta:datascadenta.value,
        serie:serie.value,
        numar:nrfact.value,
        idSerieFactura:1,
        intocmit:intocmit.value,
        mentiuni:mentiuni.value,
        cnp:cnp.value,
        tip:'FISCALA',
        stare:'draft'
    }


    let {data}=  await useFetch(`/api/firme/facturiemise/noua`, {
        method: "POST",
        headers: {
          "b-access-token":userStore.token
        },
        body:{ antet:fe,itemi:femiseStore.linii}
      });
      if(data.value.succes){
            console.log('Adaug factura',fe,femiseStore.linii,data.value)

            $q.notify({
            type: 'positive',
            position:'top',
            timeout:2000,
            message:'Factura emisa cu succes!'
            })

            }
            else
            {
            $q.notify({
            type: 'negative',
            position:'top',
            timeout:2000,
            message:'EROARE!'
            })
            }
      
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
           <q-card class="q-pa-md q-mt-sm q-ml-xs row justify-evenly  q-gutter-md" style="width:1150px">
            <q-input outlined stacked v-model="intocmit" label="Intocmit de:" />
            <q-input outlined  stacked v-model="cnp" label="CNP" />
            <q-input outlined stacked autogrow v-model="mentiuni" label="Mentiuni" style="min-width: 250px;"/>
           </q-card>
           <q-btn class="q-mt-md" color="white" text-color="black" label="Adauga" @click="Adauga"/>
    </div>
</q-page>
  

</template>

<style>
.debug {
    border: 1px solid black;
}
</style>