
<script setup>
import { useQuasar } from 'quasar'
import useValidare from '~/composables/useValidare';
import { useUserStore } from '~/stores/userStore';
import { useArhitecturaStore } from '~/stores/arhitecturaStore';

const config = useRuntimeConfig()
const host=config.public.apihost;
const {caNumar} = useValidare()
console.log('Validare composable',caNumar)
const utilizatorStore = useUserStore();
const arhitecturaStore = useArhitecturaStore()
let email=ref('')
let parola=ref('')
let firmaclientului =null
const $q = useQuasar()

async function login(){
try {
  let response=  await $fetch(host+"login", {
        method: "POST",
        headers: {
         
        },
        body: {
          email:email.value,
          password:parola.value,
         
        },
      });
    //console.log('Raspuns de la autentificare',JSON.parse(response.arhitectura.client))

      if(response.succes){
       utilizatorStore.autentificare({...response.loggeduser,token:response.token})
       arhitecturaStore.seteazaArhitectura(response.arhitectura)
      // utilizatorStore.arhitectura=response.arhitectura;
      //  utilizatorStore.setELogat()
      //  if(response.utilizator.e_admin) utilizatorStore.setEAdmin()
      const {rol,id}= response.loggeduser
      const verb = rol=='client'?"asignateclientului":"asignatecontabilului";
     // console.log('verb',verb)
      try {
         firmaclientului = await $fetch(`/api/firme/${verb}/${id}`,{
              headers:{
               "b-access-token":utilizatorStore.token
              }
            })
            if(firmaclientului){
              if(rol=='client') utilizatorStore.asigneazaFirma(firmaclientului);
              if(rol=='contabil') utilizatorStore.asigneazaFirme(firmaclientului.firme);
              
         //updateaza storeul User cu informatiile firmei
             }

            if(rol=="admin") navigateTo("./dashboard")
            if(rol=="contabil") navigateTo("./contabil/dashboard")
            if(rol=="client") firmaclientului? navigateTo("./client/dashboard"):navigateTo("./client/onboarding")  
      }
      catch (error) {
        $q.notify({
          type: 'negative',
          position:'top',
      
          message: error.message
        })
        navigateTo("./eroare")
      }

     // console.log('Firma asignata',firmaclientului)

      }
      else {
        $q.notify({
          type: 'negative',
          position:'top',
      
          message: 'Autentificare esuata !'
        })
         email.value=""
         parola.value=""
      }
} catch (error) {
  console.log('Eroare autentificare',error)
}

} 

</script>



<template>
   <div class="flex flex-center q-pa-md">

            <div class="q-gutter-y-md column " style="max-width: 400px">
                <h5>Autentificare</h5>
                <q-input v-model="email" clearable filled color="purple-12"  label="Adresa mail" />
                <q-input v-model="parola" clearable filled color="purple-12"  label="Parola"  type="password" />
                
                <q-btn color="primary" label="Autentificare !"  @click="login"/>

                <a class="q-mt-xl doc-link " :href=" host " target="_blank" rel="noopener">Am uitat parola...<span class="q-icon" aria-hidden="true" role="presentation"><svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg></span></a>
            </div>

    </div>

  
</template>
<style>

.doc-link {
    color: #a3090e;
    text-decoration: none;
    border-bottom: 1px dotted currentColor;
    outline: 0;
    transition: color .28s ease-in-out;
}
</style>