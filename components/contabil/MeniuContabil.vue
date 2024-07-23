<script setup>
import { useUserStore } from '~/stores/userStore';
const prompt = ref(false)
const nouafirma = ref(null)
const userStore = useUserStore()
function executa(link){
  console.log('executa',link)
  navigateTo(link.ruta)
}

let optiuni=ref([])


function schimbaFirma(){
  console.log('schimbaFirma',userStore.firme[1].denumire)
prompt.value = !prompt.value

optiuni.value=[]
userStore.firme.map(f=>{
  optiuni.value.push({label:f.denumire, value:f.id})
})
}

function comutaFirma(){
  console.log('comuta firma',typeof nouafirma.value.value)
userStore.schimbaFirmaCurenta(nouafirma.value.value)
}
const   linksfe= [
    { icon: 'folder', text: 'Facturi fiscale',ruta:'/contabil/femise/fiscala' },
    { icon: 'restore', text: 'Facturi proforma',ruta:'/contabil/femise/proforma'  },
    { icon: 'watch_later', text: 'Avize',ruta:'/contabil/femise/avize' },
    { icon: 'thumb_up_alt', text: 'Facturi recurente',ruta:'/contabil/femise/recurente'  }
  ] 



const  links1= [

    { icon: 'subscriptions', text: 'Lista mesaje ANAF',ruta:'/contabil/listamesaje' }
  ]
const   links2= [
    { icon: 'folder', text: 'Library' },
    { icon: 'restore', text: 'History' },
    { icon: 'watch_later', text: 'Watch later' },
    { icon: 'thumb_up_alt', text: 'Liked videos' }
  ]
const    links3= [
    { icon: 'local_movies', text: 'YouTube Premium' },
    { icon: 'local_movies', text: 'Movies & Shows' },
    { icon: 'videogame_asset', text: 'Gaming' },
    { icon: 'live_tv', text: 'Live' }
  ]
const     links4= [
    { icon: 'settings', text: 'Settings' },
    { icon: 'flag', text: 'Report history' },
    { icon: 'help', text: 'Help' },
    { icon: 'feedback', text: 'Send feedback' }
  ]
const    buttons1=[
    { text: 'About' },
    { text: 'Press' },
    { text: 'Copyright' },
    { text: 'Contact us' },
    { text: 'Creators' },
    { text: 'Advertise' },
    { text: 'Developers' }
  ]
const   buttons2= [
    { text: 'Terms' },
    { text: 'Privacy' },
    { text: 'Policy & Safety' },
    { text: 'Test new features' }
  ]

</script>

<template>
        <q-scroll-area class="fit">

                  <q-card v-if="userStore.eAutentificat" flat bordered class="my-card bg-grey-9" >
                      <q-card-section>
                        <div class="row items-center no-wrap">
                          <div class="col">
                            <div class="text-h6 text-white">Firma curenta:</div>
                         
                          </div>

                          <div class="col-auto">
                            <q-btn color="grey-2" round flat icon="more_vert">
                              <q-menu cover auto-close>
                                <q-list>
                                  <q-item clickable @click="schimbaFirma">
                                    <q-item-section>Schimba firma curenta</q-item-section>
                                  </q-item>
                                  <!-- <q-item clickable>
                                    <q-item-section>Send Feedback</q-item-section>
                                  </q-item>
                                  <q-item clickable>
                                    <q-item-section>Share</q-item-section>
                                  </q-item> -->
                                </q-list>
                              </q-menu>
                            </q-btn>
                          </div>
                        </div>
                      </q-card-section>

                      <q-card-section>
                        <div class="col">
                           <div class="text-h6 text-white">{{userStore.firmacurenta? userStore.firmacurenta.denumire: 'Nicio firma selectata'}}</div>
                           <div class="text-subtitle2 text-white">CUI: {{userStore.firmacurenta? userStore.firmacurenta.cui: ''}}</div>
                        </div>
                      </q-card-section>


                   </q-card>


          <q-list padding>
            <q-item v-for="link in links1" :key="link.text" v-ripple clickable @click="executa(link)">
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-separator class="q-my-md" />
  
            <q-expansion-item group="somegroup" icon="edit_calendar" label="Facturi emise" header-class="text-weight-bold text-uppercase">
            <q-card>
              <q-card-section>

                <q-item v-for="link in linksfe" :key="link.text" v-ripple clickable  @click="executa(link)">
                    <q-item-section avatar>
                      <q-icon color="grey" :name="link.icon" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ link.text }}</q-item-label>
                    </q-item-section>
            </q-item>

              </q-card-section>
            </q-card>
          </q-expansion-item>
  
         
  
            
  
            <q-separator class="q-mt-md q-mb-lg" />
  
            <div class="q-px-md text-grey-9">
              <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
                <a
                  v-for="button in buttons1"
                  :key="button.text"
                  class="YL__drawer-footer-link"
                  href="javascript:void(0)"
                >
                  {{ button.text }}
                </a>
              </div>
            </div>
            <div class="q-py-md q-px-md text-grey-9">
              <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
                <a
                  v-for="button in buttons2"
                  :key="button.text"
                  class="YL__drawer-footer-link"
                  href="javascript:void(0)"
                >
                  {{ button.text }}
                </a>
              </div>
            </div>
          </q-list>
        </q-scroll-area>

        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Schimba Firma</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-select v-model="nouafirma" :options="optiuni" label="Firme" />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Abandon" v-close-popup />
                <q-btn :disable="!nouafirma" flat label="Schimba" v-close-popup @click="comutaFirma"/>
              </q-card-actions>
            </q-card>
    </q-dialog>

</template>
<style>
 
  
.YL__drawer-footer-link{
  color: inherit;
text-decoration: none;
font-weight: 500;
font-size: .75rem;
}
.my-card{
  width: 100%;
  max-width: 250px;
}

.YL__drawer-footer-link:hover {
  color: #000;
}
  
</style>