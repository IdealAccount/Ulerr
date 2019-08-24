<template>
  <div class="popup-remove" >
    <h4>Удалить карту?</h4>
    <div class="popup__btns-group" @click="selectionAction">
      <button class="popup__btn popup__btn-remove" data-btn="remove">Remove</button>
      <button class="popup__btn popup__btn-cancel" data-btn="cancel">Cancel</button>
    </div>
  </div>
</template>
<script>
  import {mapActions,mapMutations} from 'vuex'
  export default {
    props: ['cardId'],
    methods: {
      ...mapActions(['removeCard']),
      ...mapMutations(['ADD_ID']),

      selectionAction(event) {
        let target = event.target;

        if (target.tagName !== 'BUTTON') return;

        if (target.dataset.btn === 'remove') {
          this.removeCard(this.cardId);
          // После удаления карты присваиваем оставшимся ID по порядку
          this.ADD_ID();
          // Закрыть Popup
          this.$parent.$parent.$data.isShow = false
        }
        // Если отмена, закрыть Popup
        if (target.dataset.btn === 'cancel') this.$parent.$parent.$data.isShow = false;
      }
    }
  }
</script>
<style lang="scss">
  .popup-remove {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
