<template>
  <div class="validate-errors" v-if="errors.length">
    <ul class="validate-errors__list">
      <li v-for="error of errors"
          class="validate-errors__item">
        {{error}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['validateErrors'],
    data() {
      return {}
    },
    computed: {
      errors() {
        let err = [];
        if (!this.validateErrors.cardNum) {
          err.push('Укажите номер карты')
        }
        if (!this.validateErrors.confirmCode) {
          err.push('Введите код подтверждения')
        }
        return err;
      }
    }
  }
</script>

<style lang="scss">
  .validate-errors {
    position: absolute;
    z-index: 100;
    right: 30px;
    top: 54%;
    transform: translate(100%);
    width: 180px;
    background: rgba(#d9534f,.9);
    color: #fff;
    border-radius: 4px;
    box-shadow: 1px 2px 6px rgba(0, 0, 0, .3);
    font-size: 12px;
  /*  &:before {
      content: '';
      position: absolute;
      z-index: -1;
      left: 0;
      top: 50%;
      transform: translate(-100%, -50%);
      display: block;
      border: 20px solid;
      border-color: transparent #fff transparent transparent;
    }*/
    &__list {
      padding: 20px 10px;
    }
    &__item {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
