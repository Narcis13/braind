<script setup>
import {useFemiseStore} from '~/stores/femiseStore'
const femiseStore = useFemiseStore()
 
const um= ref('buc.')  
const editMode = ref(false)
const cantitate = ref(1)
const pretUnitar = ref(0)
const pagination = ref({

      rowsPerPage: 10
      // rowsNumber: xx if getting data from a server
    })
const valoare = computed(()=>{
  return parseFloat((cantitate.value*pretUnitar.value).toFixed(2))
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
  { name: 'descriere',align:'left', label: 'Descriere', style: 'width: 400px', classes: 'my-special-class',field: 'descriere' },
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
        um:femiseStore.produsCurent.um,
        cantitate:cantitate.value,
        pret:pretUnitar.value,
        valoare:parseFloat((cantitate.value*pretUnitar.value).toFixed(2))
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
    um:femiseStore.produsCurent.um,
    cantitate:cantitate.value,
    pret:pretUnitar.value,
    valoare:parseFloat((cantitate.value*pretUnitar.value).toFixed(2))
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
  <div class="column q-gutter-sm">

    <div class="row justify-evenly  q-mt-sm " >
      <q-table
        style="width:1150px"
        :rows="femiseStore.linii"
        :columns="columns"
        row-key="nrcrt"
        selection="single"
        v-model:pagination="pagination"
        v-model:selected="selected"
      >
      <template v-slot:top>
       <div class="row q-gutter-md">
        <q-btn :disable="selected.length==0" square color="grey-4" text-color="purple" icon="edit" @click="editLinie"/>
        <q-btn :disable="selected.length==0" square color="grey-4" text-color="purple" icon="delete" @click="stergLinie"/>
       </div>
      </template>

      <template v-slot:pagination="scope">
        <div class="row  " >
         <div class="text-subtitle1 text-weight-medium ">
          Total valoare: {{ total }} lei
         </div> 
      
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="first_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        />

        <q-btn
          icon="chevron_left"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />

        <q-btn
          icon="chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />

        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="last_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
        />
      </div>
      </template>

      <!-- <template v-slot:bottom>
        <div class="text-subtitle1 text-weight-medium text-right " style="width:1150px">
          Total valoare: {{ total }} lei
        </div>
      </template> -->

      </q-table>
    </div>
 

    <q-card >
                <div class="q-pb-md q-ml-xs q-mt-sm row justify-evenly  q-gutter-md" style="width:1150px">
       
                    <client-factura-emisa-select-produs v-model="femiseStore.produsCurent" />

                    <q-input readonly filled label="U.M." v-model="femiseStore.produsCurent.um" stacked style="max-width: 200px;">

                    </q-input>

                    <q-input filled label="Cantitate" type="number" v-model.number="cantitate" style="max-width: 100px;">
            
                    </q-input>

                    <q-input filled  label="Pret unitar" type="number" :rules="[val => val>=0 || 'Sunt acceptate doar valori pozitive']" v-model.number="pretUnitar" style="max-width: 100px;">
            
                    </q-input>

                    <q-input filled  label="Valoare" readonly type="number" v-model.number="valoare" style="max-width: 100px;">
            
                    </q-input>

                    <q-btn :disable="femiseStore.produsCurent.label==''||pretUnitar<0" color="grey-4" text-color="purple" glossy unelevated icon="add" :label="editMode?'Modifica':'Adauga'" @click="adaugaItem"/>
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
<style>
.my-special-class {
  max-width: 250px;
overflow: hidden;
}
</style>