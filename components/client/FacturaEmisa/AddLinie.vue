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

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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
  console.log('adauga item')
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
 

    <q-card class="q-pb-md q-ml-xs q-mt-sm row justify-evenly  q-gutter-md" style="width:1150px">
                
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

      </q-card>

  </div>

</template>