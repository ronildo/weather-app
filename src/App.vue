<template>
  <div id="app">
    <section class="section">
      <div class="container">

        <div class="app-container">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </div>

      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.section {
  padding-bottom: 0;
  padding-top: 0;
}
</style>

<style lang="scss">
@import './assets/scss/transitions';

html {
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
}

.app-container {
  min-height: 100vh;
  padding: 3rem 0;
}
</style>
