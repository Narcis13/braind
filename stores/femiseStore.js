import {defineStore} from 'pinia'

export const useFemiseStore = defineStore('femiseStore',()=>{

    const linii = reactive([])

    function renumeroteaza(){
        let idx=0
        linii.map(l=>{
          idx++
          l.nrcrt=idx
        })
    }
    return {
        linii,
        renumeroteaza
    }
})