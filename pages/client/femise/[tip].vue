<script setup>
import {date,useQuasar} from 'quasar'
import {useNomenclatoareStore} from '~/stores/nomenclatoareStore'
import {useFemiseStore} from '~/stores/femiseStore'
import { useUserStore } from '~/stores/userStore';
const config = useRuntimeConfig()
const host=config.public.apihost;
const $q = useQuasar()
const userStore = useUserStore()
const femiseStore = useFemiseStore()
const nomenclatoareStore = useNomenclatoareStore()

const route = useRoute();
const tipfactura = route.params.tip;

const ultimul_numar = await $fetch("/api/firme/facturiemise/numarfactura",{
    headers: {
          "b-access-token":userStore.token
        }
})  
const suntdrafturi= ref(ultimul_numar.drafts>0)
console.log('serii', nomenclatoareStore.baza.serie_index,ultimul_numar)
const nrfact=ref(ultimul_numar.nrfact)
const serie=ref(ultimul_numar.serie)
const mentiuni =ref('')
const notainterna=ref('')
const intocmit = ref('E-FACTURA')
const cnp =ref('')
const datacurenta= ref(date.formatDate( new Date(),'YYYY/MM/DD'))
const scadenta = new Date()
scadenta.setDate(scadenta.getDate()+90)
const datascadenta= ref(date.formatDate( scadenta,'YYYY/MM/DD'))
const idUltimaFactura=ref(0)


async function resetFactura(){
mentiuni.value=''
cnp.value=''
notainterna.value=''
intocmit.value='E-FACTURA'
femiseStore.linii=[]
femiseStore.modelDocument.client=null;
const ultimulnumar = await $fetch("/api/firme/facturiemise/numarfactura",{
    headers: {
          "b-access-token":userStore.token
        }
}) 
nrfact.value=ultimulnumar.nrfact
serie.value=ultimulnumar.serie
}

function print(){
   // resetFactura()
   console.log(host+'femise/'+idUltimaFactura.value)
   window.open(host+'femise/'+idUltimaFactura.value, '_blank');

}
const facturaValida = computed(()=>{
    return femiseStore.linii.length>0&&femiseStore.modelDocument.client
}
)
async function Adauga(){
    let fe ={
        idClient:femiseStore.modelDocument.client.value,
        dataFactura:datacurenta.value,
        scadenta:datascadenta.value,
        serie:serie.value,
        numar:nrfact.value,
        idSerieFactura:1,
        intocmit:intocmit.value,
        mentiuni:mentiuni.value,
        notainterna:notainterna.value,
        cnp:cnp.value,
        tip:'FISCALA',
        stare:'draft',
        id_client:userStore.firma.id
    }


    let {data}=  await useFetch(`/api/firme/facturiemise/noua`, {
        method: "POST",
        headers: {
          "b-access-token":userStore.token
        },
        body:{ antet:fe,itemi:femiseStore.linii}
      });
      if(data.value.succes){
            //console.log('Adaug factura',fe,femiseStore.linii,data.value)

            $q.notify({
            type: 'positive',
            position:'top',
            timeout:2000,
            message:'Factura emisa cu succes!'
            })
            nrfact.value++; // aici am de lucru....
            idUltimaFactura.value=data.value.antetfe.id
            femiseStore.lista.unshift({
                client:femiseStore.modelDocument.client.label,
                numar:fe.numar,
                serie:fe.serie,
                stare:'draft',
                notainterna:fe.notainterna,
                data:fe.dataFactura,
                id:data.value.antetfe.id,
                valoare:femiseStore.linii.reduce((acc, product) => acc + product.valoare, 0)
            })
             resetFactura()
             suntdrafturi.value=true
           //  navigateTo('/client/dashboard') dar asa va fi pina la urma
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
const handleStareSchimbata = ()=>{
    suntdrafturi.value=false
    resetFactura()
}
</script>

<template>
<q-page  class="flex justify-center">
    <div class=" q-mt-sm column items-center q-gutter-md" >
     <div v-if="suntdrafturi" class="text-h5 text-red">Exista facturi emise cu stare 'draft' in anul curent! Fie le validati fie le stergeti! </div>
        <q-list bordered>
                <q-expansion-item
                   v-if="!suntdrafturi"
                    group="somegroup"
                    icon="explore"
                    label="Introducere date factura emisa"
                    default-opened
                    header-class="text-primary"
                    class="q-pa-md"
                >
                <div class=" row q-mt-md" style="width:1150px">
                        <div class="text-h6">
                              Factura {{ tipfactura }}
                        </div>
                        <q-btn class="q-ml-md" round color="black" icon="refresh" @click="resetFactura">
                            <q-tooltip>
                                 Reset Factura
                             </q-tooltip>
                        </q-btn>
                 </div>
                        <q-card class="q-mt-sm q-ml-xs row justify-evenly  q-gutter-md" style="width:1150px">
                            
                        <client-factura-emisa-select-client v-model="femiseStore.modelDocument.client"/>

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
                        <q-input outlined  stacked v-model="notainterna" label="Nota interna" />
                    </q-card>
                    <div class="flex flex-center q-gutter-md">
                        <q-btn :disable="!facturaValida" class="q-mt-md" color="white" text-color="black" label="Salveaza draft" @click="Adauga"/>
                        <q-btn :disable="idUltimaFactura==0" class="q-mt-md" color="white" text-color="black" label="Printeaza" @click="print"/>

                    </div>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item group="somegroup" icon="perm_identity" label="Lista facturi emise" header-class="text-teal"  class="q-pa-md">
                    <div class="q-mt-md" style="width:1150px">
                        <client-factura-emisa-lista @stareschimbata="handleStareSchimbata"/>
                    </div>
                </q-expansion-item>

        </q-list>

        
    </div>
</q-page>
  

</template>

<style>
.debug {
    border: 1px solid black;
}
</style>