<script setup>

const route = useRoute();
const tipfactura = route.params.tip;
let options= [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
const model=ref('')      
const date= ref('2019/02/01')
</script>

<template>
<q-page  class="flex justify-center">
    <div class=" q-mt-sm column items-center" style="width:1280px">
        <div class="q-mt-md" style="width:1150px">
                <div class="text-h6">
                   Factura {{ tipfactura }}
                </div>
        </div>
            <q-card class="q-mt-sm row justify-evenly  q-gutter-md" style="width:1150px">
                
               <client-factura-emisa-select-client />

                <q-input dense filled v-model="date" mask="date" :rules="['date']" style="max-width: 160px;">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="date">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                            </q-date>
                        </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>

                <q-input dense filled v-model="date" mask="date" :rules="['date']" style="max-width: 160px;">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="date">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                </q-input>

                <q-select dense v-model="model" :options="options" label="Standard" style="min-width: 200px;"/>

            </q-card>

           <client-factura-emisa-add-linie />
    </div>
</q-page>
  

</template>

<style>
.debug {
    border: 1px solid black;
}
</style>