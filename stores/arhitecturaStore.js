import {defineStore} from 'pinia'

export const useArhitecturaStore = defineStore("arhitecturaStore",()=>{
    const arhitectura = ref(null)
    function seteazaArhitectura(data){
        arhitectura.value=data;
     }

     function arhitecturaModel(cheie){
        console.log('sunt in arhitectura model',arhitectura.value,cheie)
      //  if(typeof arhitectura[cheie] === 'string')
       let obj = {}
        try {
          obj=JSON.parse(arhitectura.value[cheie])
        } catch (e){
            console.log(e)
        }
      return obj;  
    }
    return {
       seteazaArhitectura,
       arhitecturaModel
    }
})