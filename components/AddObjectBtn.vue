<!-- Les components.vue sont des bout d'élément html, souvent atomique (ex: les buttons) avec leur partie js unique  
on peut les réutiliser à l'infinis

Leurs structures html/js/css ne diffère pas des pages. C'est simplement qu'ils ont une tâche plus focus-->
<template>
  <NuxtLink
    class="btn--link add--link push--right"
    color="primary"
    to="/objects/add"
    justify="end"
    align="end"
    >Signaler un objet perdu</NuxtLink
  >
</template>

<script>
export default {
  name: 'AddObjectBtn',
  data: () => ({}),
  methods: {},
}
</script>
