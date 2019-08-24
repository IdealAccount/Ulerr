<template>
  <div class="instruments">
    <h3>Мои инструменты</h3>
    <div class="instruments-container">
      <div class="instruments-row">
        <card v-for="card of cards"
              :key="card.id"
              :data-id="card.id"
              :card="card"
        ></card>
        <button type="button"
                class="btn"
                data-btn="add"
                @click.prevent="showPopup"
        >
          <img src="../../../assets/img/plus.svg">
          <span>Добавить карту</span>
        </button>
      </div>
      <div class="instruments-row">
        <button type="button"
                class="btn"
                data-btn="purse">
          <img src="../../../assets/img/plus.svg">
          <span>Добавить кошелек</span>
        </button>
      </div>
      <transition name="slide-fade">
        <popups v-if="isShow" :typeOfPopup="typeOfPopup"/>
      </transition>
    </div>
  </div>
</template>
<script>
  import Card from './Card'
  import Popups from './popups/Popups'
  import {mapState} from 'vuex'
  export default {
    components: {
      Card,
      Popups
    },
    data() {
      return {
        isShow: false,
        typeOfPopup: {
          type: 'adding',
          id: null,
        },
      }
    },
    computed: {
      ...mapState(['cards']),
    },
    methods: {
      showPopup() {
        this.typeOfPopup.type = 'adding';
        this.isShow = !this.isShow
      },
    }
  }
</script>
<style lang="scss">
  .instruments-container {
    position: relative;
    padding: 0 60px;
  }
  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 8px;
    background: #e5e5e5;
    height: 120px;
    img {
      width: 40px;
      margin-bottom: 15px;
    }
  }
  .instruments-row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

</style>
