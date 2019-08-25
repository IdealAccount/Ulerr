<template>
  <div class="hint-wrapper">
    <div class="hint-container">
      <ul class="hint-list">
        <li class="hint-list__item"
            v-for="(item,i) of hintList"
            :key="i"
            @click="getSelectItem(item)"
        >
          {{item.fullname || item.housenum}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['hintList', 'selectItem'],
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
      getSelectItem(selectItem) {
        this.selectItem(selectItem)
      }
    }

  }
</script>
<style lang="scss">
  .hint-wrapper {
    position: absolute;
    background: #fff;
    left: -1px;
    top: 95%;
    width: 330px;
    z-index: 100;
    overflow: hidden;
    box-shadow: 1px 6px 5px rgba(0, 0, 0, .3);
  }

  .hint-container {
    width: 350px;
    height: 100%;
    max-height: calc(56px * 6);
    background: #fff;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .hint-list {
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
      &:hover {
        background: #f3f3f3;
        &:before {
          height: 100%;
        }
      }
    }
  }
</style>
