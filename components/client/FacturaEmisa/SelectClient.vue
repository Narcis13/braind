<script setup>
let options= ref([])
 let stringOptions=['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']     
const clientSelectat = ref('')    
function filterFn (val, update, abort) {
        if (val.length < 2) {
          abort()
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }  


</script>

<template>
    <div>
        <q-select    
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            dense 
            bottom-slots 
            v-model="clientSelectat" 
            @filter="filterFn"
            :options="options" 
            label="Nume client"
            style="min-width: 300px;">
        
                <template v-slot:hint>
                Cautati client dupa nume
                </template>
                <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                        Niciun rezultat
                        </q-item-section>
                    </q-item>
        </template>

        </q-select>

    </div>
</template>



