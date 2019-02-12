<template>
  <div class="weather-page">

    <div class="columns is-centered">
      <div class="column is-10 has-text-centered">
        <h1 class="title">Fort Lauderdale</h1>
        <p class="subtitle">02/11/2019 08:00pm</p>
      </div>
    </div>

    <div class="columns is-centered has-text-centered weather-description">
      <div class="column is-10">
        <p class="is-size-5">Partly Cloud</p>
      </div>
    </div>

    <div class="columns is-centered has-text-centered is-mobile">
      <div class="column is-4">
        <div class="temperature-box">
          <h2 class="title is-1">78</h2>
        </div>
      </div>
    </div>

    <div class="columns is-centered has-text-centered is-mobile">
      <div class="column is-2">
        <span>↓ 73</span>
      </div>
      <div class="column is-2">
        <span><span class="rotate-180">↓</span> 79</span>
      </div>
    </div>

    <div class="columns is-centered has-text-centered weather-other-values">
      <div class="column is-4 is-offset-6">
        <dl>
          <dt>Precipitation</dt>
          <dd>20%</dd>

          <dt>Hunidity</dt>
          <dd>87%</dd>

          <dt>Wind</dt>
          <dd>11.0mph SE</dd>
      </dl>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'WeatherPage'
}
</script>

<style lang="scss" scoped>
.temperature-box {
  $height: 120px;

  border: 1px solid #CCC;
  height: $height;

  .title {
    line-height: $height;
  }
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
    width: 60%;
    text-align: left;
  }

  dd {
    display: inline-block;
    width: 40%;
    text-align: right;
  }
}
</style>
