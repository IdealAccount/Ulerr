<template>
  <div class="popup-adding" @keypress.13="addingCard" :style="data.bankName ? popupStyle : ''">
    <h4>Добавить карту</h4>
    <transition name="fade-logo">
      <div class="popup__card-logo" v-if="data.bankLogoSmallLightSvg">
        <img :src="data.bankLogoSmallLightSvg">
      </div>
    </transition>

    <div class="popup-row"
    >
      <label class="popup__label" for="card-num">Номер карты:</label>
      <input :class="['popup__input',
                     isValid ? 'valid' :
                     isValid === false ? 'not-valid' :
                     (isValid === null) ? '' : '']"
             id="card-num"
             v-model="cardNumber"
             @blur="validCardNum"
             placeholder="Введите номер"
             required
             @input="getCardProps"
             maxlength="16"
             v-focus
      >
    </div>
    <div class="popup-row">
      <label class="popup__label" for="card-name">Название карты:</label>
      <input class="popup__input"
             id="card-name"
             placeholder="Введите название"
             v-model="cardName"
             maxlength="13"
             required
      >
    </div>
    <div class="popup-row">
      <label class="popup__label" for="card-confirm">Введите код подтверждения({{randNum}})</label>
      <input id="card-confirm"
             :class="['popup__input',
                       isConfirm === true ? 'valid' :
                       isConfirm === false ? 'not-valid' :
                       (isConfirm === null) ? '' : '']"
             v-model="confirmCode"
             @blur="cardConfirm"
             placeholder="Введите код"
             maxlength="4"
             required
      >
    </div>
    <button :class="['popup__btn popup__btn-add', isDisabled ? 'not-valid' : 'active']"
            :disabled="isDisabled"
            @click.prevent="addingCard"
    >Добавить
    </button>
    <validate v-if="validateShow" :validateErrors="validateErrors"/>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import Validate from './Validate'

  export default {
    name: 'adding',
    components: {
      Validate
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus();
        }
      }
    },
    data() {
      return {
        cardName: null,
        cardNumber: null,
        confirmCode: null,

        isValid: null,
        isConfirm: null,

        validateShow: false,

        cardNumberLength: 16,
        cardProps: {},
        data: {},
      }
    },
    computed: {
      // Генерация импровизированного кода подтверждения (по смс)
      randNum() {
        let min = 1000;
        let max = 9999;
        return Math.round(Math.random() * (max - min) + min)
      },
      ...mapGetters(['LAST_INDEX']),

      // Disabled кнопку отправки, если валидация не завершена
      isDisabled() {
        return this.isConfirm && this.isValid ? !!0 : !!1;
      },
      validateErrors() {
        return {
          cardNum: this.isValid,
          confirmCode: this.isConfirm
        }
      },
      popupStyle() {
        if (this.data.bankName) {
          return {
            background: `linear-gradient(45deg, ${this.data.formBackgroundColors[0]}, ${this.data.formBackgroundColors[1]})`,
            color: this.data.formTextColor,
          }
        }
      },
    },
    watch: {
      cardNumber() {
        this.isValid = null;
        this.cardNumber = this.cardNumber.replace(/[^0-9]/, "");
        if (this.cardNumber.length === 16) this.isValid = true;
      },
      confirmCode() {
        this.isConfirm = null;
        this.confirmCode = this.confirmCode.replace(/[^0-9]/, "");
        if ((this.confirmCode.length === 4) && (+this.confirmCode !== this.randNum)) {
          this.validateShow = true;
          return this.isConfirm = false;
        }
        if (+this.confirmCode === this.randNum) this.isConfirm = true;
      },
    },
    methods: {
      ...mapActions(['addCard']),
      // Валидация поля Card Number
      validCardNum() {
        if (this.cardNumber === null || this.cardNumber.length !== 16 || !isFinite(+this.cardNumber)) {
          this.validateShow = true;
          return this.isValid = false;
        }
        if (this.cardNumber.length === 16) {
          return this.isValid = true;
        }
      },
      // Валидация кода подтверждения
      cardConfirm() {
        if (+this.confirmCode === this.randNum) return this.isConfirm = true;
        if (this.confirmCode === null || this.confirmCode.length !== 4 || +this.confirmCode !== this.randNum || !isFinite(this.confirmCode)) {
          if (!this.validCardNum()) this.isValid = false;
          this.validateShow = true;
          return this.isConfirm = false;
        }

      },
      async getCardProps() {
        if (this.cardNumber.length !== 6) return;
        let res = await axios.get(`https://api.cardinfo.online?apiKey=2b2b2ebfc6566238a3405dae4686b60c&input=${this.cardNumber}`);
        this.data = res.data;
        this.cardName = this.data.bankName;
      },
      // Добавляем новую карту
      async addingCard() {
        // Если валидация не пройдена
        if (this.isDisabled) return;
        this.addCard({
          id: this.LAST_INDEX,
          name: this.cardName || this.data.bankName || `Моя карта ${this.LAST_INDEX}`,
          status: this.data.bankName ? !!1 : !!0,
          number: this.cardNumber,
          brand: this.data.bankName ? this.data.brandLogoLightSvg : this.data.brandLogoDarkSvg,
          bg: this.data.formBackgroundColors,
          color: this.data.formTextColor,
          logo: this.data.bankLogoSmallLightSvg
        });
        this.cardName = null;
        this.cardNumber = null;
        this.confirmCode = null;

        this.$parent.$parent.$data.isShow = false;
      },
    }
  }
</script>
<style lang="scss">
  .popup__card-logo {
    text-align: center;
    img {
      width: 50px;
      height: 50px;
    }
  }

  .fade-logo-enter-active {
    transition: all .4s ease-in-out;
  }

  .fade-logo-enter, .fade-logo-leave-to {
    opacity: 0;
    transform: scale(0);
  }



</style>
