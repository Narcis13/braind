
<script setup>
import { useQuasar } from 'quasar'
import { useUserStore } from '~/stores/userStore';

const config = useRuntimeConfig()
const host=config.public.apihost;

const utilizatorStore = useUserStore();
let email=ref('')
let parola=ref('')
const $q = useQuasar()
async function login(){

  let response=  await $fetch(host+"login", {
        method: "POST",
        headers: {
         
        },
        body: {
          email:email.value,
          password:parola.value,
         
        },
      });
    //  console.log('Raspuns de la autentificare',response)

      if(response.succes){
       utilizatorStore.autentificare({...response.loggeduser,token:response.token})
      //  utilizatorStore.setELogat()
      //  if(response.utilizator.e_admin) utilizatorStore.setEAdmin()
      const {rol}= response.loggeduser
      if(rol=="admin") navigateTo("./dashboard")
      if(rol=="contabil") navigateTo("./contabil/dashboard")
      if(rol=="client") navigateTo("./client/dashboard")
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