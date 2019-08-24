<template>
  <aside>
    <ul class="side-menu">
      <li class="side-menu__item" v-for="link of links" :key="link.name">
        <router-link class="side-menu__link" :to="link.path">{{link.name}}</router-link>
      </li>
    </ul>
  </aside>
</template>
<script>
  export default {
    data() {
      return {
        links: [],
      }
    },
    mounted() {
      this.links = this.$router.options.routes;
    }
  }
</script>
<style lang="scss">
  aside {
  }
  .side-menu {
    /*position: fixed;*/
    padding: 30px 0;
    background: #f3f3f3;
    width: 250px;
    height: 100%;
    &__item {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__link {
      display: block;
      padding: 10px 20px;
      transition: background-color .3s ease;
      &:hover {
        background: #c4c4c4;
      }
    }
  }
  .router-link-exact-active {
    background: #c4c4c4;
    font-weight: bold;
  }
</style>
