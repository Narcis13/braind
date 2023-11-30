import {defineStore} from 'pinia'

export const useUserStore = defineStore('userStore',()=>{
    const numarNorocos = ref(13)
    return {
        numarNorocos
    }
}) 