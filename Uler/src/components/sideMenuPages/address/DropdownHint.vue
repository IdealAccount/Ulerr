<template>
  <div class="dropdown-wrapper">
    <div class="dropdown-container">
      <ul class="dropdown-list">
        <li class="dropdown-list__item"
            v-for="(item,i) of dropdownHint"
            :key="i"
            @click="getSelectItem(item)"
            tabindex="0"
        >
          {{item.fullname || item.housenum }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['dropdownHint', 'selectItem'],
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      getSelectItem(selectItem) {
        this.selectItem(selectItem)
        console.log(this.dropdownHint)
        this.dropdownHint.clear();
      }
    }

  }
</script>
<style lang="scss">
  .dropdown {
    &-wrapper {
      position: absolute;
      background: #fff;
      left: 0;
      top: 95%;
      width: 330px;
      z-index: 100;
      overflow: hidden;
      box-shadow: 1px 6px 5px rgba(0, 0, 0, .3);
      border-radius: 0 0 6px ;
    }
    &-container {
      width: 350px;
      height: 100%;
      max-height: calc(56px * 6);
      background: #fff;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    &-list {
      background: #fff;
      width: 100%;
      &__item {
        position: relative;
        padding: 0 20px;
        height: 56px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: .3s;
        word-break: break-word;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          height: 0;
          width: 2px;
          background: deepskyblue;
          transition: .3s;
        }
        &:hover,
        &:focus {
          background: #f3f3f3;
          &:before {
            height: 100%;
          }
        }
      }
    }
  }
</style>
