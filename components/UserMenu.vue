<script setup>
import { useUserStore } from '~/stores/userStore';
const utilizatorStore = useUserStore();
function logout(){
    utilizatorStore.logout()
    navigateTo("/")
}

</script>
<template>
            <q-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                        <q-item-section>Valideaza  nr. telefon</q-item-section>
                        </q-item>
                        <q-item clickable  @click="logout">
                        <q-item-section>Inchidere sesiune</q-item-section>
                        </q-item>

                        <q-separator />
                        <q-item clickable v-close-popup>
                        <q-item-section>Help &amp; Feedback v.02102024</q-item-section>
                        </q-item>
                    </q-list>
        </q-menu>
</template>