<template>
  <div class="weather-page">

    <transition name="slide" mode="out-in">
      <w-search
        class="search-box"
        v-if="showSearch"
        :size="6"
        :location="location"
        @on-location-change="toggleSearch" />
    </transition>

    <transition name="fade" mode="out-in">
      <div key="page-data" v-if="!loading">

        <div class="columns is-mobile">
          <div class="column is-offset-3 is-4">
            <div class="buttons has-addons">

              <div
                v-for="(item) in daysOptions"
                :key="`option-${item}`"
                :class="['button', { 'is-selected is-info': item === selectedDay }]"
                v-text="item"
                @click="onSelectDay(item)" />

            </div>
          </div>

          <div class="column is-1">
            <button
              class="button"
              @click="toggleSearch()"
              v-text="'Change City'" />
          </div>
        </div>

        <w-weather
          :city="city"
          :unit="unit"
          :weather="pageData"
          :has-arrows="hasArrows"
          :date-and-time="getDateAndtime"
          @on-next-day="onNextDay"
          @on-prev-day="onPrevDay" />

      </div>

      <div key="loader" v-else>
        <w-loading
          v-if="!pageError"
          :loading="loading" />
      </div>
    </transition>

    <transition name="slide">
      <div
        v-if="pageError"
        class="columns is-centered is-mobile">
        <div class="column  is-4">
          <w-notification
            content="Invalid location!"
            @on-close="goBack" />
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import WSearch from '@/components/WSearch/WSearch'
import WWeather from '@/components/WWeather/WWeather'
import WLoading from '@/components/Ui/WLoading/WLoading'
import WNotification from '@/components/Ui/WNotification/WNotification'

export default {
  name: 'WeatherPage',

  components: {
    WSearch,
    WWeather,
    WLoading,
    WNotification
  },

  props: {
    location: {
      type: String,
      required: true
    }
  },

  data: () => ({
    city: '',
    unit: 'fahrenheit',
    loading: true,
    pageData: {},
    pageError: false,
    showSearch: false,
    hasArrows: false,
    fiveDayData: null,
    fiveDayIndex: 0,
    fiveDaySelectedDay: null,
    selectedDay: 'Today',
    daysOptions: [
      'Today',
      '5 Days'
    ]
  }),

  computed: {
    // This method makes the URL for our api
    // Based if it's for Today or 5Days
    getUrl () {
      const method = (this.selectedDay === 'Today') ? 'weather' : 'forecast'
      return `${method}?q=${this.location}`
    },

    // Get today's date on the format YYYY-MM-DD
    getToday () {
      const today = new Date().toISOString()
      const day = today.split('-')[2].substring(0, 2)
      const month = today.split('-')[1]
      const year = today.split('-')[0]

      return `${year}-${month}-${day}`
    },

    // This getter return either day of forcast or today's date
    getDateAndtime () {
      return this.pageData.dt_txt || new Date()
    }
  },

  created () {
    // When component is created Today's data is loaded
    this.loadTodayData()
  },

  watch: {
    /*
      If a new location is entered on search component
      A new API fetch happens respecting the selction
      if it's for 1 day or 5 days.
    */
    location (newLocation) {
      if (this.selectedDay === 'Today') {
        this.loadTodayData()
      } else {
        this.load5Days()
      }
    }
  },

  methods: {
    // Load the data from API using async/wait
    async loadTodayData () {
      try {
        const { data } = await this.$API_GET(this.getUrl)
        this.pageData = data
        // City is passed a prop to weather component
        this.city = this.pageData.name
        // Reset fivaDayIndex variable
        this.fiveDayIndex = 0
        // Data has been loaded
        this.loading = false
      } catch (error) {
        // If location is not found a error message is displayed
        this.pageError = true
      }
    },

    async load5Days () {
      try {
        const { data } = await this.$API_GET(this.getUrl)
        // Extract data from response to be used with specific logic for the app
        this.fiveDayData = this.getFiveDaysForecast(data)
        this.city = data.city.name
        // Define the data to be used on the view
        this.defineFiveDayData()
        this.loading = false
        this.hasArrows = true
      } catch (error) {
        this.pageError = true
      }
    },

    getFiveDaysForecast ({ list }) {
      /*
        The idea for this is to only show noon forecast for each day
      */
      const today = this.getToday
      let lastSelected = {}
      return list.filter(forecast => {
        if (
          // prevents to load data from same day
          lastSelected.dt_txt !== forecast.dt_txt &&
          // Only select data for noon
          forecast.dt_txt.includes('12:00:00') &&
          // Do not add data for today
          !forecast.dt_txt.includes(today)
        ) {
          lastSelected = forecast
          return forecast
        }
      })
    },

    onSelectDay (item) {
      // Set loading true while fetching data from API
      this.loading = true
      // Clean data object
      this.pageData = {}
      // Mark item clicked
      this.selectedDay = item

      if (item !== 'Today') {
        this.load5Days()
      } else {
        this.loadTodayData()
      }
    },

    defineFiveDayData () {
      // Select data to be displayed based on index
      this.pageData = this.fiveDayData[this.fiveDayIndex]
    },

    onNextDay () {
      // Do not change main data if it's the last item of the array
      if (this.fiveDayIndex === this.fiveDayData.length - 1) return
      this.fiveDayIndex++
      this.defineFiveDayData()
    },

    onPrevDay () {
      // Do not change main data if it's first item of the array
      if (this.fiveDayIndex === 0) return
      this.fiveDayIndex--
      this.defineFiveDayData()
    },

    // Method used to go back to home if an error is shown
    goBack () {
      this.$router.push('/')
    },

    // Toggle Search box
    toggleSearch () {
      this.pageError = false
      this.showSearch = !this.showSearch
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  margin: 0 0 40px 0;
}
</style>
