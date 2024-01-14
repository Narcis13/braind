
export default function useValidare(){

    return {
        caNumar,
        caText
    }
} 

function caNumar(config){

}

function caText(valoare){
 //   console.log("validare ca text",valoare)
    if(!valoare) return true
    else
    return valoare.length==0||valoare.length>2;
}

