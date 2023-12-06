<script setup>

definePageMeta({
    layout:'onboarding'
})

let numeintreg = ref("")
let email = ref("")
let telefon = ref("")
let parola = ref("")
let confirmareparola = ref("")

let eDeAcord = ref(false)
let eAdministrator = ref(false)


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

</script>

<template>
    <q-card class="my-card" flat bordered>
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">brAInd.ro</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Inregistrare utilizator</div>
        <q-input standout="bg-indigo text-white" v-model="numeintreg" label="Nume complet" :rules="[val => !!val || 'Camp obligatoriu',val => (val && val.length > 4) || 'Min. 5 caractere']"/>
        <q-input standout="bg-indigo text-white"  bottom-slots  v-model="email"  lazy-rules :rules="mailRules" label="Adresa email" />
        <q-input hint="Minim 8 caractere, litere mari, mici, cifre si semne de punctuatie" lazy-rules :rules="passRules" type="password" standout="bg-indigo text-white" v-model="parola" label="Parola" />
        <q-input class="q-mt-md" type="password" standout="bg-indigo text-white" v-model="confirmareparola" lazy-rules :rules="confRules" label="Confirmare parola" />
        <q-input standout="bg-indigo text-white" v-model="telefon" label="Telefon mobil" />
      </q-card-section>

      <q-card-section>
        <q-checkbox v-model="eAdministrator" label="Confirm ca am calitatea de administrator si autoritatea de a semna contracte in numele firmei" />
        <q-checkbox v-model="eDeAcord" label="Sunt de acord cu termenii si conditiile" />
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Trimite" />
       
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