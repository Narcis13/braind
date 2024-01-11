<script setup>
import { useArhitecturaStore } from '~/stores/arhitecturaStore';
import { useUserStore } from '~/stores/userStore';
const utilizatorStore = useUserStore();
const arhitecturaStore = useArhitecturaStore()
const {id} = useRoute().params
console.log(arhitecturaStore.arhitecturaModel(id))
const arhitectura = arhitecturaStore.arhitecturaModel(id)
const columns = [
...arhitectura.proprietati.filter(obj=>obj.displayed_in_table)
]
console.log(arhitectura)
const rows = [
  {id:1,denumire:"Firma A",codfiscal:3453433},
  {id:2,denumire:"Firma B",codfiscal:46767777}
]

const selected = ref([])
</script>

<template>
     <q-page class=" column items-center justify-start q-gutter-md " >
        <div class="q-mt-xl">
            <q-table
                flat bordered
                :title="arhitectura.titlu"
                :rows="rows"
                :columns="columns"
                row-key="id"
                selection="single"
                v-model:selected="selected"
             />
        </div>
     </q-page>

</template>