<template>
  <v-row justify="center" class="mt-4">
    <v-col cols="12" sm="8" md="5" lg="4">
      <v-card>
        <v-card-text v-if="urlPathname == '/'" >
          Pas de compte?
          <NuxtLink to="/register">Je m'inscris</NuxtLink></v-card-text
        >
        <v-card-text v-if="urlPathname == '/register'">
          Déjà un compte?
          <NuxtLink to="/">Me connecter</NuxtLink></v-card-text
        >
      </v-card>
    </v-col>
  </v-row>
</template> 

<script setup>
import { ref, onBeforeMount } from '@nuxtjs/composition-api'

const urlPathname = ref();
onBeforeMount(() => {
  urlPathname.value = window.location.pathname;
})
</script>

<style></style>
