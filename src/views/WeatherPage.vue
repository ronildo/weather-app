<template>
  <div class="weather-page">

    <transition name="fade" mode="out-in">
      <div key="page-data" v-if="!loading">

        <div class="columns is-mobile">
          <div class="column is-offset-3 is-6">
            <div class="buttons has-addons">

              <div
                v-for="(item) in daysOptions"
                :key="`option-${item}`"
                :class="['button', { 'is-selected is-info': item === selectedDay }]"
                v-text="item"
                @click="onSelectDay(item)" />

            </div>
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
        <w-loading :loading="loading" />
      </div>
    </transition>

  </div>
</template>

<script>
import WLoading from '@/components/Ui/WLoading/WLoading'
import WWeather from '@/components/WWeather/WWeather'

export default {
  name: 'WeatherPage',

  components: {
    WLoading,
    WWeather
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

  methods: {
    async loadTodayData () {
      const { data } = await this.$API_GET(this.getUrl)
      this.pageData = data
      this.city = this.pageData.name
      this.loading = false
      this.fiveDayIndex = 0
    },

    async load5Days () {
      const { data } = await this.$API_GET(this.getUrl)
      this.fiveDayData = this.getFiveDaysForecast(data)
      this.city = data.city.name
      this.defineFiveDayData()
      this.loading = false
      this.hasArrows = true
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
    }
  }
}
</script>
