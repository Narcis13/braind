import {defineStore} from 'pinia'
import {type UserPayload} from "~~/utils/types";
import { type Firma } from '~~/utils/types';

export const useUserStore = defineStore('userStore',()=>{
    const numarNorocos = ref(13)
    const utilizator = ref(<UserPayload|null>null)
    const firma = ref(<Firma|null>null)
    const eAutentificat = ref(false)
    const eAdmin = ref(false)
    const onboarding_key =  ref(<string|null>null)//ref(<string|null>null)

    const firmaDefinita = computed(()=>{
       return firma.value!==null;
    })

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

    function setOnboardingUser(key:string){
        onboarding_key.value=key;
    }

    return {
        numarNorocos,
        utilizator,
        autentificare,
        logout,
        eAutentificat,
        eAdmin,
        token,
        onboarding_key,
        setOnboardingUser,
        firmaDefinita
    }
}) 