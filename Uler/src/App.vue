<template>
  <div id="app">
    <Navigation/>
    <div class="flex-container">
      <side-menu></side-menu>
      <viewport/>
    </div>
  </div>
</template>

<script>
  import Navigation from './components/navigation/Navigation'
  import SideMenu from './components/SideMenu'
  import Viewport from './components/Viewport'
export default {
  name: 'App',
  components: {
    Navigation,
    SideMenu,
    Viewport
  }
}
</script>

<style lang="scss">
  @import './assets/scss/main';
  body {
    height: 1000px;
    font-size: 16px;
    font-family: 'Helvetica', 'Arial', sans-serif;
  }
  .flex-container {
    display: flex;
    min-height: 100vh;
  }

</style>
