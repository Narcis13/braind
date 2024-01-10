
<script setup>
import { useQuasar } from 'quasar'
import { useUserStore } from '~/stores/userStore';
import { useArhitecturaStore } from '~/stores/arhitecturaStore';

const props=defineProps({
  onboarding:{
    type:Boolean,
    default:false
  }
})

//console.log(props.onboarding)
const utilizatorStore = useUserStore();
const arhitecturaStore = useArhitecturaStore()

const config = useRuntimeConfig()
const host=config.public.apihost;
const $q = useQuasar()
const bannerVizibil = ref(false)
const tab = ref("mails")
const splitterModel = ref(20)

const denumire = ref(utilizatorStore.firmaDefinita?utilizatorStore.firma.denumire:"")
const cui = ref(utilizatorStore.firmaDefinita?utilizatorStore.firma.cui:"")
const adresa = ref(utilizatorStore.firmaDefinita?utilizatorStore.firma.adresa:"")
const judet = ref(utilizatorStore.firmaDefinita?utilizatorStore.firma.judet:"")
const localitate = ref(utilizatorStore.firmaDefinita?utilizatorStore.firma.oras:"")
const formajuridica = ref(utilizatorStore.firmaDefinita?utilizatorStore.firma.forma_juridica:"")
const codcaen = ref(utilizatorStore.firmaDefinita?utilizatorStore.firma.codCAEN:"")
const capitalsocial = ref(utilizatorStore.firmaDefinita?utilizatorStore.firma.capital_social:"")
const regcom = ref(utilizatorStore.firmaDefinita?utilizatorStore.firma.registru_comert:"")

function actualizare(){
  console.log('Actualizare ...',utilizatorStore.firma)
}
async function firmanoua(){
const response = await $fetch("/api/firme/inregistrare",{
  method: "POST",
        headers: {
          "b-access-token":utilizatorStore.token
        },
        body: {
          denumire:denumire.value,
          cui:cui.value,
          judet:judet.value,
          oras:localitate.value,
          adresa:adresa.value,
          formajuridica:formajuridica.value,
          id_user:utilizatorStore.utilizator.id

          
        }
})
if(response.succes){
  console.log('firma nou creata',response.firma)
  bannerVizibil.value=true
}

}
</script>

<template>
    <div>
      <q-banner v-show="bannerVizibil" rounded class="bg-indigo-8 text-white">

          Firma a fost inregistrata cu succes! Ulterior in aplicatie aveti posibilitatea de a actualiza datele firmei.

          <template v-slot:action>
            <q-btn flat color="white" label="Descarca contract" />
            <q-btn flat color="white" label="Mergi la plata" />
          </template>
      </q-banner>

        <div class="text-h4 q-mb-md">{{ onboarding? 'Inrolare client':'Actualizare date client' }}</div>
        <p>Trebuie sa introduceti datele necesare configurarii complete a contului firmei dumneavoastra.</p>
    <q-splitter
      v-model="splitterModel"
      style="height: 250px"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-tab name="mails" icon="mail" label="Date principale" />
          <q-tab name="alarms" icon="alarm" label="Alte informatii" />
          <q-tab name="movies" icon="movie" label="Administratori" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="mails">
            <div class="text-h4 q-mb-md">Informatii de baza</div>
            <div class="row q-gutter-md" >
                <q-input :readonly="!onboarding" v-model="cui" label="Cod fiscal" />
                <q-input :readonly="!onboarding"  v-model="denumire" label="Nume firma" />
                <q-input  v-model="judet" label="Judet" />
                <q-input v-model="localitate" label="Localitate" />
                <q-input v-model="adresa" label="Adresa sediu" />
                <q-btn-toggle
                  v-model="formajuridica"
                  class="my-custom-toggle"
                  no-caps
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="primary"
                  :options="[
                    {label: 'PFA', value: 'PFA'},
                    {label: 'SRL', value: 'SRL'}
                  ]"
      />
            </div>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h4 q-mb-md">Alte informatii</div>
            <div class="row q-gutter-md" >
                <q-input  v-model="capitalsocial" label="Capital social" />
                <q-input v-model="regcom" label="Nr. Registru Comert" />
                <q-input  v-model="codcaen" label="Cod CAEN" />

                <!-- <q-uploader
                 :url="uploadURL"
                 :form-fields="ff"
                 auto-upload
                 field-name="sigla"
                 class="col-6 col-md-5"
                 max-file-size="1048576"
                 accept=".jpg,.png, image/*"
                 color="secondary"
                 label="Schimba sigla"
                 flat
                 bordered
                 @uploaded="siglaUrcata"
                 @rejected="onRejected"
                 style="max-width: 200px"
              /> -->
              <q-uploader
                 :url="host+'uploadsigla'"
                 auto-upload
                 field-name="sigla"
                 class="col-6 col-md-5"
                 max-file-size="1048576"
                 accept=".jpg,.png, image/*"
                 color="secondary"
                 label="Logo firma"
                 flat
                 bordered
                 style="max-width: 200px"
              />

              <q-uploader

                auto-upload
                field-name="sigla"
                class="col-6 col-md-5"
                max-file-size="1048576"
                accept=".jpg,.png, image/*"
                color="secondary"
                label="Certificat CUI"
                flat
                bordered
                style="max-width: 200px"
                />

                <q-uploader

                  auto-upload
                  field-name="sigla"
                  class="col-6 col-md-5"
                  max-file-size="1048576"
                  accept=".jpg,.png, image/*"
                  color="secondary"
                  label="Act constitutiv"
                  flat
                  bordered
                  style="max-width: 200px"
                  />


            </div>
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h4 q-mb-md">Movies</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
    <div class="flex flex-center q-mt-xl">
      <q-btn class="q-pa-sm" outline rounded color="indigo" :label="onboarding?'Inregistreaza firma':'Actualizare date'" @click="onboarding?firmanoua():actualizare()"/>
    </div>
  </div>
</template>
<style>
.my-custom-toggle{
  border: 1px solid #027be3;
}
 
</style>
