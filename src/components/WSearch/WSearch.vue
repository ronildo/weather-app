<template>
  <form novalidate @submit.prevent.stop="submitForm()">
    <div class="columns is-centered">
      <div :class="`column is-${size}`">
        <w-input
          ref="input"
          :value="inputLocation"
          :error="error"
          :placeholder="placeholder"
          @input="onLocation" />
      </div>
    </div>

    <div class="columns is-centered">
      <div :class="`column is-${size}`">
        <w-button type="submit">Submit</w-button>
      </div>
    </div>
  </form>
</template>

<script>
import WInput from '@/components/Ui/Form/WInput'
import WButton from '@/components/Ui/WButton/WButton'
import { REGEX_SPECIAL_CHARACTER } from '@/utils/Regex'

export default {
  name: 'WSearch',

  props: {
    size: {
      type: Number,
      required: false,
      default: 10
    },

    location: {
      type: String,
      required: false,
      default: ''
    }
  },

  components: {
    WInput,
    WButton
  },

  data: () => ({
    input: null,
    error: '',
    inputLocation: '',
    placeholder: 'Show me the weather in...'
  }),

  watch: {
    // Watch the variable error if it's true, focus on the input
    error (hasError) {
      if (hasError) this.focusInput()
    }
  },

  created () {
    // When the component is created, set variable based on prop passed
    this.inputLocation = this.location
  },

  methods: {
    onLocation (location) {
      if (location) this.error = ''
      this.inputLocation = location
    },

    submitForm () {
      // Validate if user entered any value
      if (!this.inputLocation) {
        this.error = 'Please enter a location!'
        return
      }

      // Validate if user entered any special character
      if (REGEX_SPECIAL_CHARACTER.test(this.inputLocation)) {
        this.error = 'Special character are not allowed!'
        return
      }

      const { inputLocation: location } = this

      // Redirect user to weather page if no validation error
      this.$router.push({ name: 'weather', params: { location } })

      // If it's on weather page emmit event updating the value
      this.$emit('on-location-change')
    },

    focusInput () {
      // Focus on the input
      if (!this.input) {
        this.input = this.$refs.input.$el.getElementsByTagName('input')[0]
      }

      this.input.focus()
    }
  }
}
</script>

<style>

</style>
