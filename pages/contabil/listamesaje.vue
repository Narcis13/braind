<script setup>

import { useUserStore } from '~/stores/userStore';
import {useQuasar} from 'quasar'
const $q = useQuasar()
const userStore = useUserStore()


const config = useRuntimeConfig()
const host=config.public.apihost;
//console.log('Mesaje ANAF')
const processing = ref(false)
let mesaje=reactive([])
let mesajepreluate=await $fetch("/api/firme/mesajeanaf/ultimele?days=60&cui="+userStore.firmacurenta.cui)
console.log('Mesaje preluate ANAF',mesajepreluate)
let initialPagination= {

page: 1,
rowsPerPage: 20
// rowsNumber: xx if getting data from a server
}
function estepreluat(id){
  let r=false
  mesajepreluate.map(m=>{
    if (id==m.idmesaj) r=true
  })
  return r;
}
$q.loading.show({
    delay: 400 // ms
  })
  console.log('CUI firma curenta',userStore.firmacurenta.cui)
let toatemesajele =  await $fetch(host+'femise/listamesaje/'+userStore.firmacurenta.cui+'/'+userStore.utilizator.id);  
$q.loading.hide()   
//console.log('toate mesajele',toatemesajele.mesaje)  
let prelucrate=[]
let selected = ref([])
toatemesajele.mesaje.map((element) => {
    element.data_creare=element.data_creare.substr(6,2)+'.'+element.data_creare.substr(4,2)+'.'+element.data_creare.substr(0,4)
    element.preluat=estepreluat(element.id)
   // element.id=parseInt(element.id)
    prelucrate.unshift(element)
});
mesaje=[...prelucrate.sort((a, b) => new Date(b.data_creare.split('.').reverse().join('-')) - new Date(a.data_creare.split('.').reverse().join('-')))]
//console.log('prelucrate',prelucrate)
const columns = [

{ name: 'datacreare', align: 'center', label: 'Data', field: 'data_creare', sortable: true },
{ name: 'detalii', label: 'Detalii', field: 'detalii', sortable: true },
{ name: 'id', label: 'ID', field: 'id' },
{ name: 'idsolicitare', align: 'left',label: 'ID Solicitare', field: 'id_solicitare' },
{ name: 'tip', label: 'TIP',align: 'left', field: 'tip', sortable: true }
]

function prepfactura(factura){
  let facturaprelucrata={}

  facturaprelucrata.nrfact=typeof factura['nrfact'] == 'object'? factura['nrfact']['_']:factura['nrfact']
  facturaprelucrata.datafact=typeof factura['datafact'] == 'object'? factura['datafact']['_']:factura['datafact']
  facturaprelucrata.scadenta=typeof factura['scadenta'] == 'object'? factura['scadenta']['_']:factura['scadenta']
  facturaprelucrata.cuiclient=typeof factura['cuiclient'] == 'object'? factura['cuiclient']['_']:factura['cuiclient']
  facturaprelucrata.cuifurnizor=typeof factura['cuifurnizor'] == 'object'? factura['cuifurnizor']['_']:factura['cuifurnizor']
  facturaprelucrata.fullcuiclient=typeof factura['fullcuiclient'] == 'object'? factura['fullcuiclient']['_']:factura['fullcuiclient']
  facturaprelucrata.fullcuifurnizor=typeof factura['fullcuifurnizor'] == 'object'? factura['fullcuifurnizor']['_']:factura['fullcuifurnizor']
  facturaprelucrata.ibanfurnizor=typeof factura['ibanfurnizor'] == 'object'? factura['ibanfurnizor']['_']:factura['ibanfurnizor']
  facturaprelucrata.numeclient=typeof factura['numeclient'] == 'object'? factura['numeclient']['_']:factura['numeclient']
  facturaprelucrata.procenttva=typeof factura['procenttva'] == 'object'? factura['procenttva']['_']:factura['procenttva']
  facturaprelucrata.numefurnizor=typeof factura['numefurnizor'] == 'object'? factura['numefurnizor']['_']:factura['numefurnizor']
  facturaprelucrata.note=typeof factura.note == 'object'? factura.note.join(';'):factura.note
  facturaprelucrata.note=facturaprelucrata.note.slice(0,1000)
  //facturaprelucrata.ibanfurnizor=factura.ibanfurnizor
  //facturaprelucrata.fullcuifurnizor=factura.fullcuifurnizor
  //facturaprelucrata.fullcuiclient=factura.fullcuiclient
  let itemi=[]
  factura.itemi.map((item) => {
    itemi.push({
      nrcrt:typeof item['nrcrt'] == 'object'? item['nrcrt']['_']:item['nrcrt'],
      cantitate:typeof item['cantitate'] == 'object'? item['cantitate']['_']:item['cantitate'],
      denumire:typeof item['denumire'] == 'object'? item['denumire']['_']:item['denumire'],
      pret:typeof item['pret'] == 'object'? item['pret']['_']:item['pret'],
      tva:item['tva']
    })
  })


  facturaprelucrata.itemi=JSON.stringify(itemi)
  facturaprelucrata.totalcutva=parseFloat(factura.totalcutva)
  facturaprelucrata.totalfaratva=parseFloat(factura.totalfaratva)
//console.log('factura prelucrata',facturaprelucrata)
return facturaprelucrata
}

async function descarcaBulk() {
  processing.value = true
  const unprocessedMessages = mesaje.filter(m => !m.preluat&&(m.tip!=='ERORI FACTURA'))
  console.log('mesaje neprocesate',unprocessedMessages)
  for (const message of unprocessedMessages) {
    try {
      const r = await $fetch(host + 'femise/descarca/' + message.id + '/' + userStore.utilizator.id + '/' + message.id_solicitare)
      const data_factura = JSON.parse(r)
      const _cac=data_factura.Invoice['$']['xmlns:cac']?'cac:':''
      const _cbc=data_factura.Invoice['$']['xmlns:cbc']?'cbc:':''
      const linii = Array.isArray(data_factura.Invoice[_cac+'InvoiceLine']) 
        ? data_factura.Invoice[_cac+'InvoiceLine'] 
        : [data_factura.Invoice[_cac+'InvoiceLine']]
      //console.log('linii',_cac,_cbc)
      let itemi = linii.map((linie) => (
      linie[_cbc+'ID']
      ?{
        nrcrt: linie[_cbc+'ID'],
        cantitate: linie[_cbc+'InvoicedQuantity']['_'],
        denumire: linie[_cac+'Item'][_cbc+'Name'],
        pret: linie[_cac+'Price'][_cbc+'PriceAmount']['_'],
        tva: linie[_cac+'Item'][_cac+'ClassifiedTaxCategory'][_cbc+'Percent']
      }
      :{
        nrcrt: '1',
        cantitate: '1',
        denumire: 'ATIPIC',
        pret: '1',
        tva: '19'
      }
      ))

      const factura = {
        nrfact: data_factura.Invoice[_cbc+'ID'],
        datafact: data_factura.Invoice[_cbc+'IssueDate'],
        scadenta: data_factura.Invoice[_cbc+'DueDate']?data_factura.Invoice[_cbc+'DueDate']:data_factura.Invoice[_cbc+'IssueDate'],
        note: data_factura.Invoice[_cbc+'Note'] ? data_factura.Invoice[_cbc+'Note'] : '',
        totalfaratva: data_factura.Invoice[_cac+'LegalMonetaryTotal'][_cbc+'TaxExclusiveAmount']['_'],
        totalcutva: data_factura.Invoice[_cac+'LegalMonetaryTotal'][_cbc+'TaxInclusiveAmount']['_'],
        procenttva: data_factura.Invoice[_cac+'TaxTotal'][_cac+'TaxSubtotal'][_cac+'TaxCategory'][_cbc+'Percent'],
        numefurnizor: message.tip == 'FACTURA TRIMISA' ? userStore.firmacurenta.denumire : data_factura.Invoice[_cac+'AccountingSupplierParty'][_cac+'Party'][_cac+'PartyLegalEntity'][_cbc+'RegistrationName'],
        ibanfurnizor: data_factura.Invoice[_cac+'PaymentMeans'] 
          ? Array.isArray(data_factura.Invoice[_cac+'PaymentMeans'])
            ? data_factura.Invoice[_cac+'PaymentMeans'][0][_cac+'PayeeFinancialAccount']?data_factura.Invoice[_cac+'PaymentMeans'][0][_cac+'PayeeFinancialAccount'][_cbc+'ID']:'NESPECIFICAT'
            : data_factura.Invoice[_cac+'PaymentMeans'][_cac+'PayeeFinancialAccount']?data_factura.Invoice[_cac+'PaymentMeans'][_cac+'PayeeFinancialAccount'][_cbc+'ID']:'NESPECIFICAT'
          : 'NESPECIFICAT',
        cuifurnizor: message.tip == 'FACTURA TRIMISA' ? userStore.firmacurenta.cui : data_factura.Invoice[_cac+'AccountingSupplierParty'][_cac+'Party'][_cac+'PartyTaxScheme'][_cbc+'CompanyID'],
        fullcuifurnizor: message.tip == 'FACTURA TRIMISA' ? userStore.firmacurenta.cuifull : data_factura.Invoice[_cac+'AccountingSupplierParty'][_cac+'Party'][_cac+'PartyTaxScheme'][_cbc+'CompanyID'],
        numeclient: message.tip == 'FACTURA PRIMITA' ? userStore.firmacurenta.denumire : data_factura.Invoice[_cac+'AccountingCustomerParty'][_cac+'Party'][_cac+'PartyLegalEntity'][_cbc+'RegistrationName'],
        cuiclient: message.tip == 'FACTURA PRIMITA' ? userStore.firmacurenta.cui : data_factura.Invoice[_cac+'AccountingCustomerParty'][_cac+'Party'][_cac+'PartyTaxScheme']?data_factura.Invoice[_cac+'AccountingCustomerParty'][_cac+'Party'][_cac+'PartyTaxScheme'][_cbc+'CompanyID']:data_factura.Invoice[_cac+'AccountingCustomerParty'][_cac+'Party'][_cac+'PartyLegalEntity'][_cbc+'CompanyID'],
        fullcuiclient: message.tip == 'FACTURA PRIMITA' ? userStore.firmacurenta.cuifull : data_factura.Invoice[_cac+'AccountingCustomerParty'][_cac+'Party'][_cac+'PartyTaxScheme']?data_factura.Invoice[_cac+'AccountingCustomerParty'][_cac+'Party'][_cac+'PartyTaxScheme'][_cbc+'CompanyID']:data_factura.Invoice[_cac+'AccountingCustomerParty'][_cac+'Party'][_cac+'PartyLegalEntity'][_cbc+'CompanyID'],
        itemi
      }
      
      const payload = {
        datamesaj: message.data_creare.split('.').reverse().join('-'),
        idmesaj: message.id,
        idsolicitare: message.id_solicitare,
        tip: message.tip,
        iduser: userStore.utilizator.id,
        idfirma: userStore.firmacurenta.id,
        stare: 'preluat',
        primalinie:itemi[0].denumire.substr(0,100),
        ...prepfactura(factura)
      }
      
      const { data } = await useFetch(`/api/firme/mesajeanaf/preluare`, {
        method: "POST",
        headers: {
          "b-access-token": userStore.token
        },
        body: payload
      })
      
      if (data.value.succes) {
        message.preluat = true
      }
    } catch (error) {
      console.error('Error processing message:', message.id, error)
    }
  }
  
  processing.value = false
  selected.value = []
}

async function descarca(){
 
 const r=   await $fetch(host+'femise/descarca/'+selected.value[0].id+'/'+userStore.utilizator.id+'/'+selected.value[0].id_solicitare);  
    const data_factura = JSON.parse(r)

    const linii=Array.isArray(data_factura.Invoice['cac:InvoiceLine'])?data_factura.Invoice['cac:InvoiceLine']:[data_factura.Invoice['cac:InvoiceLine']]
    let itemi=[]
    linii.map((linie) => {
      itemi.push({
        nrcrt:linie['cbc:ID'],
        cantitate:linie['cbc:InvoicedQuantity']['_'],
        denumire:linie['cac:Item']['cbc:Name'],
        pret:linie['cac:Price']['cbc:PriceAmount']['_'],
        tva:linie['cac:Item']['cac:ClassifiedTaxCategory']['cbc:Percent']
        
      })

    })

    const factura = {
        nrfact:data_factura.Invoice['cbc:ID'],
        datafact:data_factura.Invoice['cbc:IssueDate'],
        scadenta:data_factura.Invoice['cbc:DueDate'],
        note:data_factura.Invoice['cbc:Note']?data_factura.Invoice['cbc:Note']:'',
        totalfaratva:data_factura.Invoice['cac:LegalMonetaryTotal']['cbc:TaxExclusiveAmount']['_'],
        totalcutva:data_factura.Invoice['cac:LegalMonetaryTotal']['cbc:TaxInclusiveAmount']['_'],
        numefurnizor:selected.value[0].tip=='FACTURA TRIMISA'?userStore.firmacurenta.denumire:data_factura.Invoice['cac:AccountingSupplierParty']['cac:Party']['cac:PartyLegalEntity']['cbc:RegistrationName'],
        ibanfurnizor:data_factura.Invoice['cac:PaymentMeans']? Array.isArray(data_factura.Invoice['cac:PaymentMeans'])? data_factura.Invoice['cac:PaymentMeans'][0]['cac:PayeeFinancialAccount']['cbc:ID']:data_factura.Invoice['cac:PaymentMeans']['cac:PayeeFinancialAccount']['cbc:ID']:'NESPECIFICAT',
        cuifurnizor:selected.value[0].tip=='FACTURA TRIMISA'?userStore.firmacurenta.cui:data_factura.Invoice['cac:AccountingSupplierParty']['cac:Party']['cac:PartyTaxScheme']['cbc:CompanyID'],
        fullcuifurnizor:selected.value[0].tip=='FACTURA TRIMISA'?userStore.firmacurenta.cuifull:data_factura.Invoice['cac:AccountingSupplierParty']['cac:Party']['cac:PartyTaxScheme']['cbc:CompanyID'],
        numeclient:selected.value[0].tip=='FACTURA PRIMITA'?userStore.firmacurenta.denumire:data_factura.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PartyLegalEntity']['cbc:RegistrationName'],
        cuiclient:selected.value[0].tip=='FACTURA PRIMITA'?userStore.firmacurenta.cui:data_factura.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PartyTaxScheme']['cbc:CompanyID'],
        fullcuiclient:selected.value[0].tip=='FACTURA PRIMITA'?userStore.firmacurenta.cuifull:data_factura.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PartyTaxScheme']['cbc:CompanyID'],
        itemi
    }
  const payload = {
    datamesaj:selected.value[0].data_creare.split('.').reverse().join('-'),
    idmesaj:selected.value[0].id,
    idsolicitare:selected.value[0].id_solicitare,
    tip:selected.value[0].tip,
    iduser:userStore.utilizator.id,
    idfirma:userStore.firmacurenta.id,
    stare:'preluat',
    ...prepfactura(factura)
  }
   

    let {data}=  await useFetch(`/api/firme/mesajeanaf/preluare`, {
        method: "POST",
        headers: {
          "b-access-token":userStore.token
        },
        body: payload
      });
      if(data.value.succes){
        mesaje.map(m=>{
          if(m.id==selected.value[0].id){
            m.preluat=true
          }
        })
        selected.value=[]
      }
      console.log('descarc ID',data_factura.Invoice,data_factura.Invoice['cac:PaymentMeans']? Array.isArray(data_factura.Invoice['cac:PaymentMeans'])? data_factura.Invoice['cac:PaymentMeans'][0]['cac:PayeeFinancialAccount']['cbc:ID']:data_factura.Invoice['cac:PaymentMeans']['cac:PayeeFinancialAccount']['cbc:ID']:'NESPECIFICAT')
}

</script>

<template>
    <div class="q-pa-xl text-h5">
        Lista mesaje ANAF (SPV)
        <q-table
                :pagination="initialPagination"
                :rows="mesaje"
                :columns="columns"
                dense
                class="q-mt-md"
                row-key="id"
                selection="single"
                v-model:selected="selected"

         >
         <template v-slot:top-left>

                               
              <div class="flex" style="min-width:200px;max-height:100px;">


                  <q-btn :disable="selected.length==0||selected[0].preluat" class="q-ma-sm" label="Descarca"   icon="add" @click="descarca">
                 

                  </q-btn>
                  <q-btn  :disable="processing" class="q-ma-sm" label="Descarca tot"   icon="add" @click="descarcaBulk"></q-btn>

              </div>

       </template>

       <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :class="{ 'text-blue': props.row.preluat, 'text-black': !props.row.preluat }"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
        </q-table>
    </div>
</template>


