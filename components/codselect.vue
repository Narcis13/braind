<script setup>


const columns = [

  { name: 'cod', align: 'center', label: 'Cod', field: 'cod', sortable: true },
  { name: 'denumire', align: 'left', label: 'Denumire', field: 'denumire', sortable: true },
]

let rows=reactive([])
let pagination= ref({
        rowsPerPage: 0
      })
let filter=ref('')
</script>


<template>
     <div style="max-height:400px">
          <q-card style="max-width: 400px;">
               <q-card-section class="row items-center q-pb-none">
                  <div class="text-h6">Selectie cod</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
               </q-card-section>

               <q-card-section >
                    <q-table
                         style="height: 400px"
                         flat bordered
                         dense
                         :rows="rows"
                         :columns="columns"
                         row-key="index"
                         virtual-scroll
                         v-model:pagination="pagination"
                         :rows-per-page-options="[0]"
                    >

                    <template v-slot:top-right>
                         <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                              <template v-slot:append>
                              <q-icon name="search" />
                              </template>
                         </q-input>
                    </template>
                    </q-table>

               </q-card-section>
           </q-card>
     </div>
</template>