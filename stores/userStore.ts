import {defineStore} from 'pinia'
import {type UserPayload} from "~~/utils/types";

export const useUserStore = defineStore('userStore',()=>{
    const numarNorocos = ref(13)
    const utilizator = ref(<UserPayload|null>null)
    const eAutentificat = ref(false)
    const eAdmin = ref(false)
    const token = computed(()=>{
        return eAutentificat.value? utilizator.value?.token.token:'' 
    })

    function autentificare(payload:UserPayload){
       // console.log('Autentificare',payload)
        utilizator.value=payload;
        eAutentificat.value=true;
        eAdmin.value = payload.rol==='admin'
    } 

    function logout(){
        utilizator.value=null;
        eAutentificat.value=false;
        eAdmin.value=false;
    }

    return {
        numarNorocos,
        utilizator,
        autentificare,
        logout,
        eAutentificat,
        eAdmin,
        token
    }
}) 