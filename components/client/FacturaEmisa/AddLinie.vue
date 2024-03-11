<script setup>
import {useFemiseStore} from '~/stores/femiseStore'
const femiseStore = useFemiseStore()
let produsCurent=ref({label:'',descriere:'',value:0})    
const um= ref('buc.')  
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
  return produsCurent.value?produsCurent.value.descriere:''
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
  produsCurent.value={label:'',descriere:'',value:0}
}

function adaugaItem(){
  console.log('adauga item',valoare)
  femiseStore.linii.push({
    nrcrt:femiseStore.linii.length+1,
    produs:produsCurent.value.label,
    descriere:produsCurent.value.descriere,
    um:um.value,
    cantitate:cantitate.value,
    pret:pretUnitar.value,
    valoare:cantitate.value*pretUnitar.value
  })
  resetLinie()
}

function stergLinie(){
  femiseStore.linii.forEach((item, index) => {
    if (item.nrcrt === selected.value[0].nrcrt) {
      femiseStore.linii.splice(index, 1);
    }
});
selected.value=[]
}

function editLinie(){

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
       
                    <client-factura-emisa-select-produs v-model="produsCurent" />

                    <q-input filled label="U.M." v-model="um" stacked style="max-width: 100px;">

                    </q-input>

                    <q-input filled label="Cantitate" type="number" v-model.number="cantitate" style="max-width: 100px;">
            
                    </q-input>

                    <q-input filled  label="Pret unitar" type="number" v-model.number="pretUnitar" style="max-width: 100px;">
            
                    </q-input>

                    <q-input filled  label="Valoare" readonly type="number" v-model.number="valoare" style="max-width: 100px;">
            
                    </q-input>

                    <q-btn :disable="produsCurent.label==''" color="grey-4" text-color="purple" glossy unelevated icon="add" label="Adauga" @click="adaugaItem"/>
              </div>
              <div class="q-ml-xl q-mb-md" style="max-width: 300px">
                <q-input
                  v-model="produsCurent.descriere"
                  label="Descriere"
                  stacked
                  autogrow
                />
              </div>
      </q-card>

  </div>

</template>