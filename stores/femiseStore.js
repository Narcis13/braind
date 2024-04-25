import {defineStore} from 'pinia'

export const useFemiseStore = defineStore('femiseStore',()=>{

    const linii = reactive([])
    const lista=reactive([])
    let produsCurent=ref({label:'',descriere:'',um:'',value:0})   
    const modelDocument = reactive({
        client:null
    })
    function renumeroteaza(){
        let idx=0
        linii.map(l=>{
          idx++
          l.nrcrt=idx
        })
    }
    return {
        linii,
        lista,
        renumeroteaza,
        produsCurent,
        modelDocument
    }
})