<template>
  <div class="field">

    <label
      v-if="label"
      class="label">{{ label }}</label>

    <div class="control">
      <input
        v-model="getValue"
        :type="type"
        :placeholder="placeholder"
        class="input is-large">
    </div>

  </div>
</template>

<script>
export default {
  name: 'WInput',

  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    value: {
      type: String,
      required: true
    },

    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },

  data: () => ({
    localInput: null
  }),

  computed: {
    getValue: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
