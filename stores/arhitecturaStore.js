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

    let actions = {
      async codfiscal(ctx){
       // console.log(ctx)
       if(ctx.name!==null&&ctx.name.length>0){
        const response = await $fetch(ctx.host+"partenerinfo", {
          method: "POST",
          headers: {
           
          },
          body: {
           cui:ctx.name
           
          },
        }); 
      //  console.log('caut date',response)
         
          return response.partener;
       }
     return {};
      }
    }
    return {
       seteazaArhitectura,
       arhitecturaModel,
       actions
    }
})