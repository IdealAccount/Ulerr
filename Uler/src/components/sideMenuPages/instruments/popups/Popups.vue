<template>
  <div class="popup">
    <span class="popup-close" @click="closePopup"></span>
    <component :is="currentPopup" :key="currentPopup" :cardId="typeOfPopup.id ? typeOfPopup.id : null"></component>
  </div>
</template>

<script>
  import PopupAdding from './PopupAdding'
  import PopupEdit from './PopupEdit'
  import PopupRemove from './PopupRemove'

  export default {
    props: ['typeOfPopup'],
    components: {
      PopupAdding,
      PopupEdit,
      PopupRemove
    },
    computed: {
      currentPopup() {
        // if (this.typeOfPopup.type === 'remove') return 'PopupRemove';
        // if (this.typeOfPopup.type === 'adding') return 'PopupAdding';
        // if (this.typeOfPopup.type === 'edit') return 'PopupEdit';
        switch (this.typeOfPopup.type) {
          case 'remove':
            return 'PopupRemove'
            break;

          case 'adding':
            return 'PopupAdding'
            break;

          case 'edit':
            return 'PopupEdit'
            break;
        }
      }
    },
    methods: {
      closePopup() {
        this.$parent.$data.isShow = false
      }
    }
  }
</script>
<style lang="scss">
  .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    z-index: 100;
    padding: 40px 40px 30px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, .3);
    &-close {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 10;
      padding: 15px;
      cursor: pointer;
      &:before,
      &:after {
        position: absolute;
        content: '';
        display: block;
        width: 20px;
        height: 1px;
        background: #000;
      }
      &:before {
        transform: translate(-50%, -50%) rotate(-45deg)
      }
      &:after {
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
    h4 {
      text-align: center;
      margin-bottom: 30px;
    }
    &-row {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 20px;
    }
    &__label {
      margin-bottom: 10px;
    }
    &__input {
      width: 100%;
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, .2);
      border-radius: 4px;
      &:focus {
        box-shadow: 0 0 6px deepskyblue
      }
      &.not-valid {
        border-color: red;
        text-decoration: underline dotted red;
        box-shadow: 0 0 6px red;
        &-title {
          background: red;
          color: #fff;
        }
      }
      &.valid {
        box-shadow: 0 0 6px green;
        border-color: green;
        &-title {
          background: green;
          color: #fff;
        }
      }
    }
    &__btns-group {
      display: flex;
    }
    @import '@/assets/scss/_btn';
  }
</style>
