<template>
  <h3
    class="feedback"
    :data-feedback="
      this.$attrs.feedback == 'deletion' || this.$attrs.feedback == 'updated'
        ? 1
        : 0
    "
  >
    {{
      this.$attrs.feedback == 'deletion'
        ? 'Objet retrouvé'
        : this.$attrs.feedback == 'updated'
        ? 'Objet mis a jour'
        : 'Objet ajouté'
    }}
  </h3>
</template>

<script>
export default {
  name: 'RequestFeedback',
  beforeMount() {
    if (this.$store.getters['feedback/getFeedback'])
      this.$store.commit('feedback/setFeedback', null)
  },
}
</script>
