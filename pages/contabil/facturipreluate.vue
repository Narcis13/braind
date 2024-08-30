<script setup>
import { useQuasar } from 'quasar'
import { useUserStore } from '~/stores/userStore';
const config = useRuntimeConfig()
const host=config.public.apihost;
const $q = useQuasar()
const userStore = useUserStore()
const loading = ref(true)
const rows = ref([])
const filter = ref('')
const selected = ref([])

const initialPagination = {
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 25
}

const columns = [
  { name: 'furnizor', required: true, label: 'Furnizor', align: 'left', field: row => row.numefurnizor, sortable: true },
  { name: 'client', required: true, label: 'Client', align: 'left', field: row => row.numeclient, sortable: true },
  { name: 'nrfact', required: true, label: 'Nr. factura', align: 'left', field: 'nrfact', sortable: true },
  { name: 'datafact', required: true, label: 'Data factura', align: 'center', field: row => formatDate(row.datafact), sortable: true },
  { name: 'totalfaratva', required: true, label: 'Total fara TVA', align: 'right', field: 'totalfaratva', sortable: true },
  { name: 'totalcutva', required: true, label: 'Total cu TVA', align: 'right', field: 'totalcutva', sortable: true },
  { name: 'tip', required: true, label: 'Tip', align: 'center', field: 'tip', sortable: true },
  { name: 'stare', required: true, label: 'Stare', align: 'center', field: 'stare', sortable: true },
]

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ro-RO')
}



const fetchData = async () => {
  try {
    loading.value = true
    const data = await $fetch("/api/firme/mesajeanaf/ultimele?days=60&cui="+userStore.firmacurenta.cui)
    rows.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
    $q.notify({
      color: 'negative',
      position: 'top',
      message: 'A aparut o eroare',
      icon: 'report_problem'
    })
  } finally {
    loading.value = false
  }
}

const printSelected = () => {
  console.log('Printing selected rows:', selected.value[0].id)
  window.open(host+'mesajepreluate/'+selected.value[0].id, '_blank');
  // Implement your print logic here
}

function exportSAGA(){
  let factura = selected.value[0]
  factura.itemi=JSON.parse(factura.itemi)
  console.log('Export saga',JSON.stringify(factura))
}
// Fetch data when component is mounted
fetchData()
</script>

<template>
  <q-page class="flex flex-center">
    <div style="width: 95%; max-width: 1200px;">
      <div class="text-h4 q-mb-md">Facturi preluate</div>
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :pagination="initialPagination"
        :loading="loading"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:top>
          <q-btn :disable="selected.length==0||selected.length>1" color="primary" label="PRINT" @click="printSelected" class="q-mr-sm" />
          <q-btn :disable="selected.length==0" color="primary" label="Export SAGA" @click="exportSAGA" class="q-mr-sm" />
          <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        </template>
      </q-table>
    </div>
  </q-page>
</template>