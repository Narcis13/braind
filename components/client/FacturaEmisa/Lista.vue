<script setup>
const config = useRuntimeConfig()
const host=config.public.apihost;

const filter=ref('')
const columns = [
  {
    name: 'client',
    required: true,
    label: 'Client',
    align: 'left',

    sortable: true
  },
  { name: 'serie', align: 'center', label: 'Serie', field: 'serie', sortable: true },
  { name: 'numar', label: 'Numar', field: 'numar', sortable: true },
  { name: 'data', label: 'Data', field: 'data' },
  { name: 'valoare', label: 'Valoare', field: 'valoare' },
  { name: 'notainterna', label: 'Nota interna', field: 'notainterna' },
  { name: 'stare', label: 'Stare', field: 'stare', sortable: true }
]

let {data}=  await useFetch(host+'femise/toateinperioada', {
        method: "POST",
        headers: {
         // "b-access-token":userStore.token
        },
        body:{ }
      });
console.log(data.value)
const rows = [
  
]
</script>
<template>
  <div class="q-pa-md">
    <q-table
     
      :rows="rows"
      :columns="columns"
      row-key="client"
    >
    <template v-slot:top>
      <q-btn-dropdown color="primary" label="Actiuni">
      <q-list>
        <q-item clickable v-close-popup >
          <q-item-section>
            <q-item-label>Sterge</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup >
          <q-item-section>
            <q-item-label>Anuleaza</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup >
          <q-item-section>
            <q-item-label>Valideaza</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup >
          <q-item-section>
            <q-item-label>Print</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup >
          <q-item-section>
            <q-item-label>Trimite!</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
        
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
  </div>
</template>