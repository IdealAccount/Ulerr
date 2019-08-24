<template>
  <div class="popup-edit">
    <h4>Изменить имя карты</h4>
    <div class="popup-row">
        <input class="popup__input"
               placeholder="Введите имя карты"
               v-model="cardName"
               maxlength="13"
               v-focus
        >
    </div>
    <button class="popup__btn popup__btn-save"
            @click="saveCardName"
    >Save</button>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'edit',
    props: ['cardId'],
    directives: {
      focus: {
        inserted(el) {
          el.focus()
        }
      }
    },
    data() {
      return {
        cardName: '',
      }
    },
    methods: {
      ...mapActions(['changeCardName']),
      saveCardName() {
        this.changeCardName({name: this.cardName, id:this.cardId})
        this.cardName = '';
        this.$parent.$parent.$data.isShow = false;
      }
    }
  }
</script>
<style lang="scss">
</style>
