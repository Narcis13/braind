import {defineStore} from 'pinia'

export const useFemiseStore = defineStore('femiseStore',()=>{

    const linii = reactive([])


    return {
        linii
    }
})