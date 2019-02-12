<template>
  <div class="home-page">
    <form novalidate @submit.prevent.stop="submitForm()">
      <div class="columns is-centered">
        <div class="column is-two-thirds">
          <w-input :value="location" :placeholder="placeholder" @input="onLocation"/>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column is-two-thirds">
          <w-button type="submit">Submit</w-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import WInput from '@/components/Ui/Form/WInput'
import WButton from '@/components/Ui/WButton/WButton'

export default {
  name: 'HomePage',

  components: {
    WInput,
    WButton
  },

  data: () => ({
    location: '',
    placeholder: 'Show me the weather in...'
  }),

  methods: {
    onLocation (location) {
      this.location = location
    },

    submitForm () {
      console.log('submit-form')
      this.location = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  // min-height: 100vh;
  margin: 10vh 0 0;
  // border: 1px solid #FF0;
}
</style>
