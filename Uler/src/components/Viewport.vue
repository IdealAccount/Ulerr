<template>
  <div class="viewport">
    <div class="viewport-body">
      <div class="side-menu__content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .viewport {
    max-width: 1140px;
    width: 100%;
    height: 100%;
    &-body {
      h3 {
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 50px;
      }
    }
  }

  .side-menu__content {
    height: 100%;
    padding: 40px;
  }
</style>
