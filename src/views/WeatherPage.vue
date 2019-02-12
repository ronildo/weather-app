<template>
  <div class="weather-page">

    <div v-if="!loading">

      <div class="columns is-centered">
        <div class="column is-10 has-text-centered">
          <h1 class="title">{{ pageData.name }}</h1>
          <p class="subtitle">{{ dateAndTime | formatDate }}</p>
        </div>
      </div>

      <div class="columns is-centered has-text-centered weather-description">
        <div class="column is-10">
          <p class="is-size-5 capitalize">{{ getDescription }}</p>
        </div>
      </div>

      <div class="columns is-centered has-text-centered is-mobile">
        <div class="column is-6">
          <div class="temperature-box">
            <h2 class="title is-1">
              {{ getTemperature | temperatureConverter(unit) }}
              <span class="is-size-4 capitalize">{{ getUnit }}</span>
            </h2>
          </div>
        </div>
      </div>

      <div class="columns is-centered has-text-centered is-mobile">
        <div class="column is-3">
          <span>↓ {{ getMinTemp | temperatureConverter(unit) }}</span>
        </div>

        <div class="column is-3">
          <span>
            <span class="rotate-180">↓</span>
            {{ getMaxTemp | temperatureConverter(unit) }}
          </span>
        </div>
      </div>

      <div class="columns is-centered has-text-centered weather-other-values">
        <div class="column is-6">
          <dl>
            <dt>Precipitation</dt>
            <dd>{{ getPrecipitation }}</dd>

            <dt v-if="!!getHumidity">Humidity</dt>
            <dd v-if="!!getHumidity">{{ getHumidity }}%</dd>

            <dt>Wind</dt>
            <dd>{{ getWind }}mph {{ getWindDirection | degreesToCompass }}</dd>
        </dl>
        </div>
      </div>

    </div>

    <div v-else>
      <w-loading :loading="loading" />
    </div>

  </div>
</template>

<script>
import WLoading from '@/components/Ui/WLoading/WLoading'

export default {
  name: 'WeatherPage',

  components: {
    WLoading
  },

  props: {
    location: {
      type: String,
      required: true
    }
  },

  data: () => ({
    unit: 'fahrenheit',
    loading: true,
    pageData: null,
    dateAndTime: new Date()
  }),

  computed: {
    getUnit () {
      return `°${this.unit.charAt(0)}`
    },

    getWind () {
      return Math.round(this.pageData.wind.speed * 2.237)
    },

    getMinTemp () {
      return this.pageData.main.temp_min
    },

    getMaxTemp () {
      return this.pageData.main.temp_max
    },

    getHumidity () {
      return this.pageData.main.humidity
    },

    getDescription () {
      return this.pageData.weather[0].description
    },

    getTemperature () {
      return this.pageData.main.temp
    },

    getPrecipitation () {
      const { rain } = this.pageData
      return (rain && rain['3h']) ? `${rain['3h']}mm` : '-'
    },

    getWindDirection () {
      return this.pageData.wind.deg
    }
  },

  created () {
    this.loadData()
  },

  methods: {
    async loadData () {
      const url = `weather?q=${this.location}`
      const { data } = await this.$API_GET(url)
      console.log('data :', data)
      this.pageData = data
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.temperature-box {
  $height: 120px;

  background: rgba(#FFF, 0.2);
  border: 1px solid rgba(#FFF, 0.8);
  height: $height;

  .title {
    line-height: $height;
  }
}

.capitalize {
  text-transform: capitalize;
}

.weather-description,
.weather-other-values {
  margin: 5rem 0 0 0;
}

.rotate-180 {
  display: inline-block;
  transform: rotate(180deg)
}

dl {
  dt, dd {
    border-bottom: 1px solid #CCC;
    display: inline-block;
    height: 2.5rem;
    line-height: 2.5;
    width: 50%;
    text-align: left;
  }

  dd {
    display: inline-block;
    width: 50%;
    text-align: right;
  }
}
</style>
