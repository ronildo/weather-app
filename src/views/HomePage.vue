<template>
  <div class="home-page">
    <form novalidate @submit.prevent.stop="submitForm()">
      <div class="columns is-centered">
        <div class="column is-10">
          <w-input
            ref="input"
            :value="location"
            :error="error"
            :placeholder="placeholder"
            @input="onLocation" />
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column is-10">
          <w-button type="submit">Submit</w-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import WInput from '@/components/Ui/Form/WInput'
import WButton from '@/components/Ui/WButton/WButton'
import { SPECIAL_CHARACTER } from '@/utils/Regex'

export default {
  name: 'HomePage',

  components: {
    WInput,
    WButton
  },

  data: () => ({
    input: null,
    error: '',
    location: '',
    placeholder: 'Show me the weather in...'
  }),

  watch: {
    error (hasError) {
      if (hasError) this.focusInput()
    }
  },

  methods: {
    onLocation (location) {
      if (location) this.error = ''
      this.location = location
    },

    submitForm () {
      if (!this.location) {
        this.error = 'Please enter a location!'
        return
      }

      if (SPECIAL_CHARACTER.test(this.location)) {
        this.error = 'Special character are not allowed!'
        return
      }

      const { location } = this
      this.$router.push({ name: 'weather', params: { location } })
    },

    focusInput () {
      if (!this.input) {
        this.input = this.$refs.input.$el.getElementsByTagName('input')[0]
      }

      this.input.focus()
    }
  }
}
</script>
