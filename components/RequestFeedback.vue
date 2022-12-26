<template>
  <h3
    class="feedback"
    :data-feedback="this.$attrs.feedback == 'deletion' ? 2 : 0"
  >
    {{ (this.$attrs.feedback == 'deletion') ? "Objet supprimé" : "à rajouter" }}
  </h3>
</template>

<script>
export default {
  name: 'RequestFeedback',
  data: () => ({}),

  //   mounted() {
  //     console.log(this.$attrs)
  //   },

  methods: {},
}
</script>
