
<script setup>
import { useUserStore } from '~/stores/userStore';
import { useQuasar } from 'quasar'
const utilizatorStore = useUserStore();
const $q = useQuasar()
const onboarding = utilizatorStore.onboarding_key;
//console.log(onboarding)
if(!onboarding){
    navigateTo("/")
}
definePageMeta({
    layout:'onboarding'
})
const config = useRuntimeConfig()

const host=config.public.apihost;
const codTrimis = ref(false)
const codsms = ref("")
async function trimiteSMS(){
    let response=  await $fetch(host+`smstrimiterecod/${onboarding}`, {
        method: "POST",
        headers: {
         
        },
        body: {
          
         
        },
      });

    if(response.succes) codTrimis.value=true;
}

async function valideazaCod(){
//navigateTo("/")
let response=  await $fetch(host+"validezcodsms", {
        method: "POST",
        headers: {
         
        },
        body: {
          key:onboarding,
          cod:codsms.value
         
        },
      });
    if(response.succes){
        $q.notify({
          type: 'positive',
          position:'top',
      
          message: 'Numar de telefon validat'
        })
        navigateTo("/")
    }  
    else{
        $q.notify({
          type: 'negative',
          position:'top',
      
          message: 'Cod eronat!'
        })
        codTrimis.value=false;
        codsms.value="";
    }
}

function gotoApp(){
    navigateTo("/")
}

</script>

<template>
    <div class="flex flex-center" style="height:90vh">
      <div class="column q-gutter-lg">
            <div class="text-center text-h5 text-indigo" style="width:450px">
                Bine ai venit pe platforma brAInd.ro
            </div>
            <q-card class="mt-md my-card">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">



                    <q-card-section class="text-subtitle2 q-pt-md">
                            Un e-mail a fost transmis pe adresa de email indicata de dumneavoastra la inregistare cu un link de activare a contului dumneavoastra. Pentru noi securitatea datelor este o prioritate!
                    </q-card-section>
                    <q-separator inset />

                    <q-card-section>
                            In aceasta etapa ar fi oportun sa validam numarul de telefon (puteti face acest lucru si ulterior in meniul aplicatiei) prin trimiterea unui cod prin sms. Numarul de telefon validat va permite o securitate sporita a contului dumneavoastra!
                    </q-card-section>
                    <q-card-actions vertical class="q-pa-md">
                        <q-btn @click="trimiteSMS" flat v-if="!codTrimis">Trimite cod prin SMS</q-btn>
                        <q-input v-if="codTrimis" v-model="codsms" label="Introduceti codul primit"  >


                            <template v-slot:after>
                            <q-btn @click="valideazaCod" round  flat icon="send" >
                                <q-tooltip  class="bg-accent">Trimite!</q-tooltip>
                            </q-btn>
                            </template>
                        </q-input>
                        <q-btn v-if="!codTrimis" @click="gotoApp" flat>Mai tirziu! Mergi la aplicatie</q-btn>
                    </q-card-actions>
            </q-card>
      </div>  

    </div>
</template>
<style>

.my-card {
    width: 100%;
    max-width: 450px;
}

</style>