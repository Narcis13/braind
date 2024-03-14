import {defineStore} from 'pinia'

export const useFemiseStore = defineStore('femiseStore',()=>{

    const linii = reactive([])
    let produsCurent=ref({label:'',descriere:'',value:0})   
    function renumeroteaza(){
        let idx=0
        linii.map(l=>{
          idx++
          l.nrcrt=idx
        })
    }
    return {
        linii,
        renumeroteaza,
        produsCurent
    }
})