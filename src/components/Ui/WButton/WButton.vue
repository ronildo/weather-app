<template>
  <button
    :type="type"
    class="button is-medium is-primary is-fullwidth">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'WButton',

  props: {
    type: {
      type: String,
      required: false,
      default: 'button'
    }
  }
}
</script>

<style>

</style>
