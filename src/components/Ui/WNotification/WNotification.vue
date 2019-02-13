<template>
  <div class="notification is-danger">
    <button
      class="delete"
      @click="$emit('on-close')"></button>
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'WNotification',

  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
