<script setup>
import {useFemiseStore} from '~/stores/femiseStore'
const femiseStore = useFemiseStore()
 
const um= ref('buc.')  
const editMode = ref(false)
const cantitate = ref(1)
const pretUnitar = ref(0)

const valoare = computed(()=>{
  return cantitate.value*pretUnitar.value
})

const total = computed(()=>{
  let suma=0
  femiseStore.linii.map(r=>{
    suma+=r.valoare
  })
  return suma;
})

const descriereProdus = computed(()=>{
  return femiseStore.produsCurent.value?femiseStore.produsCurent.value.descriere:''
})
const selected = ref([])
const columns = [

  { name: 'nrcrt', align: 'center', label: 'Nr. crt.', field: 'nrcrt', sortable: true },
  { name: 'produs', align:'left',label: 'Produs/serviciu', field: 'produs', sortable: true },
  { name: 'descriere',align:'left', label: 'Descriere', field: 'descriere' },
  { name: 'um', label: 'U.M.', field: 'um' },
  { name: 'cantitate', label: 'Cantitate', field: 'cantitate' },
  { name: 'pret', label: 'Pret', field: 'pret', sortable: true },
  { name: 'valoare', label: 'Valoare', field: 'valoare', sortable: true}
]



function resetLinie(){
  um.value='buc.'
  cantitate.value=1
  pretUnitar.value=0
  femiseStore.produsCurent={label:'',descriere:'',value:0}
}

function adaugaItem(){

  console.log('adauga item',femiseStore.produsCurent)
  if(editMode.value){
     editMode.value=false
     if(selected.value.length>0){
      femiseStore.linii[selected.value[0].nrcrt-1]={
        nrcrt:selected.value[0].nrcrt,
        produs:femiseStore.produsCurent.label,
        idprodus:femiseStore.produsCurent.value,
        descriere:femiseStore.produsCurent.descriere,
        um:um.value,
        cantitate:cantitate.value,
        pret:pretUnitar.value,
        valoare:cantitate.value*pretUnitar.value
      }
      selected.value=[]
     }
  }
  else{
    femiseStore.linii.push({
    nrcrt:femiseStore.linii.length+1,
    produs:femiseStore.produsCurent.label,
    idprodus:femiseStore.produsCurent.value,
    descriere:femiseStore.produsCurent.descriere,
    um:um.value,
    cantitate:cantitate.value,
    pret:pretUnitar.value,
    valoare:cantitate.value*pretUnitar.value
  })
  }

  resetLinie()
}

function stergLinie(){
  femiseStore.linii.forEach((item, index) => {
    if (item.nrcrt === selected.value[0].nrcrt) {
      femiseStore.linii.splice(index, 1);
    }
});
selected.value=[]
femiseStore.renumeroteaza()
}

function editLinie(){
console.log(selected.value[0])
editMode.value=true
um.value=selected.value[0].um
  cantitate.value=selected.value[0].cantitate
  pretUnitar.value=selected.value[0].pret
  femiseStore.produsCurent={label:selected.value[0].produs,descriere:selected.value[0].descriere,value:selected.value[0].idprodus}
}
</script>


<template>
  <div class="column">

    <div class="row justify-evenly  q-mt-sm " >
      <q-table
        style="width:1150px"
        :rows="femiseStore.linii"
        :columns="columns"
        row-key="nrcrt"
        selection="single"
        v-model:selected="selected"
      >
      <template v-slot:top>
       <div class="row q-gutter-md">
        <q-btn :disable="selected.length==0" square color="grey-4" text-color="purple" icon="edit" @click="editLinie"/>
        <q-btn :disable="selected.length==0" square color="grey-4" text-color="purple" icon="delete" @click="stergLinie"/>
       </div>
      </template>
      <template v-slot:bottom>
        <div class="text-subtitle1 text-weight-medium text-right " style="width:1150px">
          Total valoare: {{ total }} lei
        </div>
      </template>

      </q-table>
    </div>
 

    <q-card >
                <div class="q-pb-md q-ml-xs q-mt-sm row justify-evenly  q-gutter-md" style="width:1150px">
       
                    <client-factura-emisa-select-produs v-model="femiseStore.produsCurent" />

                    <q-input filled label="U.M." v-model="um" stacked style="max-width: 100px;">

                    </q-input>

                    <q-input filled label="Cantitate" type="number" v-model.number="cantitate" style="max-width: 100px;">
            
                    </q-input>

                    <q-input filled  label="Pret unitar" type="number" v-model.number="pretUnitar" style="max-width: 100px;">
            
                    </q-input>

                    <q-input filled  label="Valoare" readonly type="number" v-model.number="valoare" style="max-width: 100px;">
            
                    </q-input>

                    <q-btn :disable="femiseStore.produsCurent.label==''" color="grey-4" text-color="purple" glossy unelevated icon="add" :label="editMode?'Modifica':'Adauga'" @click="adaugaItem"/>
              </div>
              <div class="q-ml-xl q-mb-md" style="max-width: 300px">
                <q-input
                  v-model="femiseStore.produsCurent.descriere"
                  label="Descriere"
                  stacked
                  autogrow
                />
              </div>
      </q-card>

  </div>

</template>