<template>
  <div class="viewport">
    <div class="viewport-body">
      <div class="side-menu__content">
        <transition name="fade" mode="out-in">
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
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-leave-active {
    transition: .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(-20%);
    opacity: 0;
  }

</style>
