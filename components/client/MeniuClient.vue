<script setup>


import { useUserStore } from '~/stores/userStore';
const utilizatorStore = useUserStore();

function executa(link){
  console.log('executa',link)
  navigateTo("../nomenclatoare/"+link.ruta)
}

const  links1= [
    { icon: 'home', text: 'Clienti' ,ruta:'client'},
    { icon: 'whatshot', text: 'Furnizori', ruta:'furnizor' },
    { icon: 'subscriptions', text: 'Produse / servicii',ruta:'produs' }
  ]
const   links2= [
    { icon: 'folder', text: 'Facturi emise',ruta:'femise' },
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
   // { icon: 'settings', text: 'Settings' },
  //  { icon: 'flag', text: 'Report history' },
  //  { icon: 'help', text: 'Help' },
  //  { icon: 'feedback', text: 'Send feedback' }
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
          <client-card-client :denumire="utilizatorStore.firma.denumire" :cui="utilizatorStore.firma.cui"/>
          <q-list padding>

            <q-item-label header class="text-weight-bold text-uppercase">
                  Nomenclatoare
            </q-item-label>

            <q-item v-for="link in links1" :key="link.text" v-ripple clickable @click="executa(link)">
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-separator class="q-my-md" />
  
            <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-separator class="q-mt-md q-mb-xs" />
  
            <q-item-label header class="text-weight-bold text-uppercase">
              More from Youtube
            </q-item-label>
  
            <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-separator class="q-my-md" />
  
            <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
  
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
</template>
<style>
 
  
.YL__drawer-footer-link{
  color: inherit;
text-decoration: none;
font-weight: 500;
font-size: .75rem;
}


.YL__drawer-footer-link:hover {
  color: #000;
}
  
</style>