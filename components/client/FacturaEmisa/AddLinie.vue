<script setup>
let options= [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
</script>


<template>
            <q-card class="q-pb-md q-mt-xl row justify-evenly  q-gutter-md" style="width:1150px">
                
                <q-select v-model="model" :options="options" label="Standard" style="min-width: 300px;"/>

                <q-input filled  style="max-width: 100px;">

                </q-input>

                <q-input filled  style="max-width: 100px;">
         
                </q-input>

                <q-input filled  style="max-width: 100px;">
         
                </q-input>

                <q-select v-model="model" :options="options" label="Standard" style="min-width: 200px;"/>

            </q-card>
</template>