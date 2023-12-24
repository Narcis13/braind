

const forbiddenError = createError({
    statusCode: 403,
    statusMessage: "Forbidden",
  });

  export default defineEventHandler(async (event) => {


   let  accessToken = event.node.req.headers["b-access-token"] as string;
   let tokens = null
   
   
   if(event.node.req.url?.substring(0,4)=="/api"){
    if(accessToken){
        tokens=accessToken?.split(" ");
        console.log('token: ',tokens[1],tokens[0])
    }
    else {
        throw forbiddenError 
    }
    

   }

  })