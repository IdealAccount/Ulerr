<template>
  <div class="hints-wrapper">
    <div class="hints-container">
      <ul class="city-list" v-if="hints.length">
        <li class="city-list__item" v-for="city of hints">
          {{city.item_fullname}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['hints'],
    data() {
      return {}
    }
  }
</script>
<style lang="scss">
  .hints-wrapper {
    position: absolute;
    left: 0;
    top: 100%;
    width: 330px;
    z-index: 10;
    overflow: hidden;
    box-shadow: 1px 6px 5px rgba(0, 0, 0, .3)
  }
  .hints-container {
    width: 350px;
    max-height: 300px;
    height: 100%;
    background: #fff;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .city-list {
    background: #fff;
    width: 100%;
    &__item {
      padding: 5px 20px;
    }
  }
</style>
