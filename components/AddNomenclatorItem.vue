<script setup>
import useValidare from '~/composables/useValidare';
const props=defineProps({
  tip_nomenclator:String,
  context:Object
})

const faraValidare = computed(()=>{
  return true;
})
const validari = useValidare()
let validatori = reactive({})
const formData = reactive({});
let fields =[]
props.context.proprietati.map(p=>{
  if(!p.hidden_in_form){
    fields.push(p)
    if("default_value" in p){
      formData[p.name]=p.default_value
    }
    else
    formData[p.name]=null

    if("validare" in p){
      validatori[p.name]=computed(()=>{
        let rezultat=true
        p.validare.map(v=>{
           rezultat=rezultat&&validari[v](formData[p.name])
        })
     //   return validari[p.validare[0]](formData[p.name])
     return rezultat;
      })
    }
    else
    validatori[p.name]=faraValidare

  }
})
console.log(validatori,"Proprietati add item in nomenclator")
function adauga(){
  console.log(formData)
}
</script>
<template>
<div class="q-gutter-y-md column " style="max-width: 400px">
     <div v-for="(field, index) in fields" :key="index" class="q-ma-sm">
          <q-input dense bottom-slots :error="!validatori[field.name]" error-message="Continut invalid!" v-if="field.type=='QInput'" v-bind="field" v-model="formData[field.name]"/>
          <q-select dense bottom-slots error-message="Continut invalid!" v-if="field.type=='QSelect'" v-bind="field" v-model="formData[field.name]"/>
          <q-checkbox dense v-if="field.type=='QCheckbox'" v-bind="field" v-model="formData[field.name]"/>
            <!-- <component :is="field.type" v-bind="field" v-model="formData[field.name]" /> -->
    </div>
    <div class="flex flex-center">
      <q-btn color="white" text-color="indigo" label="Adauga" @click="adauga"/>
    </div>
</div>
</template>
