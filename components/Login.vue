
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

            <div class="q-gutter-y-md column flex-center" style="max-width: 400px">
                <h5>Autentificare</h5>
                <q-input v-model="email" clearable filled color="purple-12"  label="Adresa mail" />
                <q-input v-model="parola" clearable filled color="purple-12"  label="Parola"  type="password" />
                
                <q-btn color="primary" label="Autentificare !"  @click="login"/>
            </div>

    </div>

  
</template>