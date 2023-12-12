<script setup>
import { useQuasar } from 'quasar'
import { useUserStore } from '~/stores/userStore';

definePageMeta({
    layout:'onboarding'
})
const config = useRuntimeConfig()

const host=config.public.apihost;
const utilizatorStore = useUserStore();

let numeintreg = ref("")
let email = ref("")
let telefon = ref("")
let parola = ref("")
let confirmareparola = ref("")

let eDeAcord = ref(false)
let eAdministrator = ref(false)

const $q = useQuasar()

let mailRules= [value=>{
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)||'Email invalid!'
}]
//^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$
let passRules= [value=>{
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/.test(value)||'Parola insuficient de complexa !'
}]
let confRules= [value=>{
  return value===parola.value||'Parola introdusa difera de cea de mai sus!'
}]

let telRules = [value =>{
  let length = value.length
  let start =value.substring(0,2)
  return /^\d+$/.test(value)&&length==10&&start=="07"||"Nr. telefon invalid"
}]

const numeRef = ref(null);
const telRef  =ref(null);
const parolaRef = ref(null);
const confirmareparolaRef = ref(null);
const emailRef = ref(null);

let formularComplet = ()=>{
numeRef.value.validate()
telRef.value.validate()
parolaRef.value.validate()
emailRef.value.validate()
confirmareparolaRef.value.validate()
return !numeRef.value.hasError&&!telRef.value.hasError&&!emailRef.value.hasError&&!parolaRef.value.hasError&&!confirmareparolaRef.value.hasError&&eDeAcord.value&&eAdministrator.value

}

async function  trimite(){
  console.log('functia trimite',formularComplet())
  if(formularComplet()){
//trimite formular
let response=  await $fetch(host+"registeruser", {
        method: "POST",
        headers: {
         
        },
        body: {
          email:email.value,
          password:parola.value,
          numeintreg:numeintreg.value,
          telefon:telefon.value,
          rol:"client"
         
        },
      });
if(response.succes){
  $q.notify({
          type: 'positive',
          position:'top',
          timeout:3000,
          message: 'Formular trimis cu succes! Verificati casuta de email pentru validarea adresei de e-mail!'
        })
        utilizatorStore.setOnboardingUser(response.utilizator.urlverificare)
        navigateTo("./welcome")
        //redirect spre pagina de welcome
}

  }
  else {
    $q.notify({
          type: 'negative',
          position:'top',
          timeout:2500,
          message: 'Formular invalid. Verificati datele introduse!'
        })
  }
}

</script>

<template>
    <q-card class="my-card" flat bordered>
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">brAInd.ro</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Inregistrare utilizator</div>
        <q-input ref="numeRef" standout="bg-indigo text-white" v-model="numeintreg" label="Nume complet" :rules="[val => !!val || 'Camp obligatoriu',val => (val && val.length > 4) || 'Min. 5 caractere']"/>
        <q-input ref="emailRef" standout="bg-indigo text-white"  bottom-slots  v-model="email"  lazy-rules :rules="mailRules" label="Adresa email" />
        <q-input ref="parolaRef" hint="Minim 8 caractere, litere mari, mici, cifre si semne de punctuatie" lazy-rules :rules="passRules" type="password" standout="bg-indigo text-white" v-model="parola" label="Parola" />
        <q-input ref="confirmareparolaRef" class="q-mt-md" type="password" standout="bg-indigo text-white" v-model="confirmareparola" lazy-rules :rules="confRules" label="Confirmare parola" />
        <q-input ref="telRef" standout="bg-indigo text-white" v-model="telefon" lazy-rules :rules="telRules" label="Telefon mobil" />
      </q-card-section>

      <q-card-section>
        <q-checkbox v-model="eAdministrator" label="Confirm ca am calitatea de administrator si autoritatea de a semna contracte in numele firmei" />
        <q-checkbox v-model="eDeAcord" label="Sunt de acord cu termenii si conditiile" />
      </q-card-section>

      <q-card-actions>
        <q-btn  flat color="primary" label="Trimite" @click="trimite"/>
       
        <q-space />
        <q-btn flat color="secondary" label="Termeni si Conditii" />
      </q-card-actions>

    </q-card>
</template>
<style >
.my-card{
    width: 100%;
    max-width: 350px;
}

</style>