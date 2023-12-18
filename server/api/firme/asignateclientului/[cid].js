export default defineEventHandler( (event)=>{
    const {cid} = event.context.params
    return {firma:cid}
})