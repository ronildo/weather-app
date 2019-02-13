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
    getUrl () {
      const method = (this.selectedDay === 'Today') ? 'weather' : 'forecast'
      return `${method}?q=${this.location}`
    },

    getToday () {
      const today = new Date().toISOString()
      const day = today.split('-')[2].substring(0, 2)
      const month = today.split('-')[1]
      const year = today.split('-')[0]

      return `${year}-${month}-${day}`
    },

    getDateAndtime () {
      return this.pageData.dt_txt || new Date()
    }
  },

  created () {
    this.loadTodayData()
  },

  watch: {
    location (newLocation) {
      if (this.selectedDay === 'Today') {
        this.loadTodayData()
      } else {
        this.load5Days()
      }
    }
  },

  methods: {
    async loadTodayData () {
      try {
        const { data } = await this.$API_GET(this.getUrl)
        this.pageData = data
        this.city = this.pageData.name
        this.loading = false
        this.fiveDayIndex = 0
      } catch (error) {
        this.pageError = true
      }
    },

    async load5Days () {
      try {
        const { data } = await this.$API_GET(this.getUrl)
        this.fiveDayData = this.getFiveDaysForecast(data)
        this.city = data.city.name
        this.defineFiveDayData()
        this.loading = false
        this.hasArrows = true
      } catch (error) {
        this.pageError = true
      }
    },

    getFiveDaysForecast ({ list }) {
      const today = this.getToday
      let lastSelected = {}
      return list.filter(forecast => {
        if (
          lastSelected.dt_txt !== forecast.dt_txt &&
          forecast.dt_txt.includes('12:00:00') &&
          !forecast.dt_txt.includes(today)
        ) {
          lastSelected = forecast
          return forecast
        }
      })
    },

    onSelectDay (item) {
      this.loading = true
      this.pageData = {}
      this.selectedDay = item

      if (item !== 'Today') {
        this.load5Days()
      } else {
        this.loadTodayData()
      }
    },

    getNextDayForecast () {
      let forecast
      if (!this.fiveDaySelectedDay) {
        forecast = this.fiveDayData.list[0]
        this.fiveDaySelectedDay = forecast.dt_txt
      }

      return forecast
    },

    defineFiveDayData () {
      this.pageData = this.fiveDayData[this.fiveDayIndex]
    },

    onNextDay () {
      if (this.fiveDayIndex === this.fiveDayData.length - 1) return
      this.fiveDayIndex++
      this.defineFiveDayData()
    },

    onPrevDay () {
      if (this.fiveDayIndex === 0) return
      this.fiveDayIndex--
      this.defineFiveDayData()
    },

    goBack () {
      this.$router.push('/')
    },

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
