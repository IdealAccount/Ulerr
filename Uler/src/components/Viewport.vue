<template>
  <div class="viewport">
    <div class="viewport-body">
      <div class="side-menu__content">
        <transition name="fade">
          <router-view></router-view>
        </transition>
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
  .fade-enter-active, .fade-leave-active {
    transition: transform .3s ease-in-out, opacity .5s ease;
    z-index: 0;
    position: relative;
    top: 0;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(-100%)
  }
  .fade-enter-to, .fade-leave {
    opacity: 1;
    transform: translateX(0)
  }
</style>
