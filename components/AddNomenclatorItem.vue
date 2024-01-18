<script setup>
import useValidare from '~/composables/useValidare';
import { useUserStore } from '~/stores/userStore';
const props=defineProps({
  tip_nomenclator:String,
  context:Object,
  optiuni:Object
})
const utilizatorStore = useUserStore();
const faraValidare = computed(()=>{
  return true;
})



const lipsaDate = computed(()=>{
   
   let interim=[]
   cimpuri_obligatorii.map(c=>{
    interim.push(formData[c]==null||formData[c]=="")
   })
  
   return interim.some(item => item === true);
})
//console.log('props optiuni',props.optiuni)

const formularRef = ref(null)

const validari = useValidare()
let validatori = reactive({})
const formData = reactive({});
let fields =reactive([])
let cimpuri_obligatorii=[]
props.context.proprietati.map(async p=>{
  let clone={...p}
  //console.log('clone si p',clone,p)


  if(!p.hidden_in_form){
   
    if("options" in p) {
    // clone.options= [...await hidrateaza(p.options[0])]
     clone.options=props.optiuni[p.name]
       fields.push(clone)
     // console.log('fields push clone',fields,clone)
    }
    else {
      fields.push(p)
     // console.log('fields push p',fields,p)
    }
  //  console.log('clona si optiuni',clone,optiuni)
  
    if(p.label.slice(-1)=="*") cimpuri_obligatorii.push(p.name);
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
//console.log(fields,"Proprietati add item in nomenclator")
function adauga(){
  let rezultate=[]
 
  fields.map(field=>{
    if("validare" in field){
      field.validare.map(v=>{
       rezultate.push(validari[v](formData[field.name])) 
      })
    }
  })
  console.log(fields,rezultate.every(item=>item===true))
}
</script>
<template>
<div ref="formularRef" class="q-gutter-y-md column " style="max-width: 400px">
     <div v-for="(field, index) in fields" :key="index" class="q-ma-sm">
          <q-input  dense bottom-slots :error="!validatori[field.name]" error-message="Continut invalid!" v-if="field.type=='QInput'" v-bind="field" v-model="formData[field.name]"/>
          <q-select  dense bottom-slots error-message="Continut invalid!" v-if="field.type=='QSelect'" v-bind="field" v-model="formData[field.name]"/>
          <q-checkbox  dense v-if="field.type=='QCheckbox'" v-bind="field" v-model="formData[field.name]"/>
            <!-- <component :is="field.type" v-bind="field" v-model="formData[field.name]" /> -->
    </div>
    <div class="flex flex-center">
      <q-btn :disable="lipsaDate" color="white" text-color="indigo" label="Adauga" @click="adauga">
        <q-tooltip v-if="lipsaDate" class="bg-accent">Campurile cu * sunt obligatorii</q-tooltip>
      </q-btn>
    </div>
</div>
</template>
