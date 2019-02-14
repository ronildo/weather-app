<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-10 has-text-centered">
        <h1 class="title">{{ city }}</h1>
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

          <div v-if="hasArrows" class="arrows">
            <div class="arrows__left">
              <button
                class="button"
                @click="$emit('on-prev-day')"
                v-text="'←'" />
            </div>
            <div class="arrows__right">
              <button
                class="button"
                @click="$emit('on-next-day')"
                v-text="'→'" />
            </div>

          </div>

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

    <div class="columns is-centered weather-other-values">
      <div class="column is-12">
        <dl>
          <dt>Precipitation</dt>
          <dd>{{ getPrecipitation }}</dd>

          <dt v-if="!!getHumidity">Humidity</dt>
          <dd v-if="!!getHumidity">{{ getHumidity }}%</dd>

          <dt>Wind</dt>
          <dd>{{ getWind }}mph {{ getWindDirection | degreesToCompass }}</dd>

          <dt>Sunrise</dt>
          <dd>{{ getSunrise | fromUnix }}</dd>

          <dt>Sunset</dt>
          <dd>{{ getSunset | fromUnix }}</dd>
      </dl>
      </div>
    </div>
  </div>
</template>

<script>
// This component basically holds date it has no methods or logic involved
export default {
  name: 'WWeather',

  props: {
    city: {
      type: String,
      required: false,
      default: ''
    },

    unit: {
      type: String,
      required: true
    },

    weather: {
      type: Object,
      required: true
    },

    hasArrows: {
      type: Boolean,
      required: false,
      default: false
    },

    dateAndTime: {
      type: [Date, String],
      required: true
    }
  },

  computed: {
    getUnit () {
      return `°${this.unit.charAt(0)}`
    },

    getWind () {
      return Math.round(this.weather.wind.speed * 2.237)
    },

    getMinTemp () {
      return this.weather.main.temp_min
    },

    getMaxTemp () {
      return this.weather.main.temp_max
    },

    getSunset () {
      return this.weather.sys.sunset
    },

    getSunrise () {
      return this.weather.sys.sunrise
    },

    getHumidity () {
      return this.weather.main.humidity
    },

    getDescription () {
      return this.weather.weather[0].description
    },

    getTemperature () {
      return this.weather.main.temp
    },

    getPrecipitation () {
      const { rain } = this.weather
      return (rain && rain['3h']) ? `${rain['3h']}mm` : '-'
    },

    getWindDirection () {
      return this.weather.wind.deg
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

.arrows {
  $offset: 80px;

  position: relative;

  &__left,
  &__right {
    left: -$offset;
    margin-top: 40px;
    position: absolute;
    top: 0%;
  }

  &__right {
    left: auto;
    right: -$offset;
  }
}

dl {
  dt, dd {
    border-bottom: 1px solid #CCC;
    display: inline-block;
    height: 2.5rem;
    line-height: 2.5;
    width: 40%;
    text-align: left;
  }

  dd {
    display: inline-block;
    width: 60%;
    text-align: right;
  }
}
</style>
