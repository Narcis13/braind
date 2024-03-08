<script setup>
let options= [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
let produsCurent=ref(null)    
const um= ref('buc.')  
const cantitate = ref(1)
const pretUnitar = ref(0)

const valoare = computed(()=>{
  return cantitate.value*pretUnitar.value
})

const descriereProdus = computed(()=>{
  return produsCurent.value?produsCurent.value.descriere:''
})

const columns = [

  { name: 'nrcrt', align: 'center', label: 'Nr. crt.', field: 'nrcrt', sortable: true },
  { name: 'produs', label: 'Produs/serviciu', field: 'produs', sortable: true },
  { name: 'descriere', label: 'Descriere', field: 'descriere' },
  { name: 'um', label: 'U.M.', field: 'um' },
  { name: 'cantitate', label: 'Cantitate', field: 'cantitate' },
  { name: 'pret', label: 'Pret', field: 'pret', sortable: true },
  { name: 'valoare', label: 'Valoare', field: 'valoare', sortable: true}
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  }
]

function adaugaItem(){
  console.log('adauga item',produsCurent.value)
}
</script>


<template>
  <div class="column">

    <div class="row justify-evenly  q-mt-sm " >
      <q-table
      style="width:1150px"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
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

                    <q-btn color="grey-4" text-color="purple" glossy unelevated icon="add" label="Adauga" @click="adaugaItem"/>
              </div>
              <div class="q-ml-xl q-mb-md" style="max-width: 300px">
                <q-input
                  v-model="descriereProdus"
                  label="Descriere"
                  stacked
                  autogrow
                />
              </div>
      </q-card>

  </div>

</template>