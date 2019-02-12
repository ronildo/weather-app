<template>
  <div>
    <loading
      :active.sync="loading"
      :is-full-page="true"
      loader="dots"
      :color="color"
      :width="size"
      :height="size" />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'WLoading',

  components: {
    Loading
  },

  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    size: 200,
    color: '#0079FF'
  })
}
</script>

<style>

</style>
