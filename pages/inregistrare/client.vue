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
</script>

<template>
    <q-card class="my-card" flat bordered>
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">brAInd.ro</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Inregistrare utilizator</div>
        <q-input standout="bg-indigo text-white" v-model="numeintreg" label="Nume complet" />
        <q-input standout="bg-indigo text-white" v-model="email" label="Adresa email" />
        <q-input standout="bg-indigo text-white" v-model="parola" label="Parola" />
        <q-input standout="bg-indigo text-white" v-model="confirmareparola" label="Confirmare parola" />
        <q-input standout="bg-indigo text-white" v-model="telefon" label="Telefon mobil" />
      </q-card-section>

      <q-card-section>
        <q-checkbox v-model="eAdministrator" label="Confirm ca am calitatea de administrator si autoritatea de a semna contracte in numele firmei" />
        <q-checkbox v-model="eDeAcord" label="Sunt de acord cu termenii si conditiile" />
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Trimite" />
        
      </q-card-actions>

    </q-card>
</template>
<style >
.my-card{
    width: 100%;
    max-width: 350px;
}

</style>