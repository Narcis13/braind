

<template>
    <q-layout view="hHh lpR fFf" class="bg-grey-1">
      <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
            v-if="utilizatorStore.eAutentificat"
          />
  

  
          <q-space />
  

  
          <div class="q-gutter-sm row items-center no-wrap" v-if="utilizatorStore.eAutentificat">
            <q-btn round dense flat color="grey-8" icon="video_call" v-if="$q.screen.gt.sm">
              <q-tooltip>Create a video or post</q-tooltip>
            </q-btn>
            <q-btn round dense flat color="grey-8" icon="apps" v-if="$q.screen.gt.sm">
              <q-tooltip>Apps</q-tooltip>
            </q-btn>
            <q-btn round dense flat color="grey-8" icon="message" >
              <q-tooltip>Messages</q-tooltip>
            </q-btn>
            <q-btn round dense flat color="grey-8" icon="notifications">
              <q-badge color="red" text-color="white" floating>
                2
              </q-badge>
              <q-tooltip>Notifications</q-tooltip>
            </q-btn>
            <q-btn round flat >
              <q-avatar size="48px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <user-menu />
              <q-tooltip>Account</q-tooltip>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>
  
      <q-drawer
        v-model="leftDrawerOpen"
        v-if="utilizatorStore.eAutentificat"
        show-if-above 
        bordered
        class="bg-grey-2"
        :width="300"
      >
        <client-meniu-client v-if="utilizatorStore.utilizator&&utilizatorStore.firmaDefinita&&utilizatorStore.utilizator.rol=='client'"/>
        <!-- <contabil-meniu-contabil v-if="utilizatorStore.eAutentificat&&utilizatorStore.utilizator.rol=='contabil'"/> -->
        <contabil-meniu-contabil v-if="utilizatorStore.utilizator&&utilizatorStore.utilizator.rol=='contabil'" />
      </q-drawer>
  
      <q-page-container>
        <slot />
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
      import { useUserStore } from '~/stores/userStore';
      const utilizatorStore = useUserStore();
      const leftDrawerOpen = ref(false)
     
      //console.log(utilizatorStore.utilizator.rol)
      function toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
  
      function logout(){
        utilizatorStore.logout()
        navigateTo("/")
      }
  



  </script>
