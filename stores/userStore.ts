
import {defineStore} from 'pinia'
import {type UserPayload} from "~~/utils/types";
import { type Firma } from '~~/utils/types';

export const useUserStore = defineStore('userStore',()=>{
    const numarNorocos = ref(13)
    const utilizator = ref(<UserPayload|null>null)
    const firma = ref(<Firma|null>null)
    const firme = ref(<Firma[]>[])
    const eAutentificat = ref(false)
    const eAdmin = ref(false)
    const onboarding_key =  ref(<string|null>null)//ref(<string|null>null)

    const firmacurenta = ref(<Firma|null>null)


    const firmaDefinita = computed(()=>{
       return firma.value!==null;
    })

    const token = computed(()=>{
        let fid = firma.value? firma.value.id : 0;      

        return eAutentificat.value? fid+" "+utilizator.value?.token.token:'' 
    })

    function schimbaFirmaCurenta(id:number){
      firme.value.map(f=>{
        if(f.id===id){
            firmacurenta.value = f
        }
      })
    }

    function autentificare(payload:UserPayload){
       // console.log('Autentificare',payload)
        utilizator.value=payload;
        eAutentificat.value=true;
        eAdmin.value = payload.rol==='admin'
    } 

    function asigneazaFirma(f:Firma){
        firma.value=f

    }

    function asigneazaFirme( f:Firma[]){
       console.log('Store: firmele contabilului',f)
       firme.value=f;
       firmacurenta.value=f[0];
    }

    function logout(){
        utilizator.value=null;
        eAutentificat.value=false;
        eAdmin.value=false;
        firma.value=null;
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
        firmaDefinita,
        asigneazaFirma,
        firma,
        firme,
        asigneazaFirme,
        firmacurenta,
        schimbaFirmaCurenta

    }
}) 