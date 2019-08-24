<template>
  <div class="popup-adding" @keypress.13="addingCard">
    <h4>Добавить карту</h4>
    <div class="popup-row">
      <label class="popup__label" for="card-name">Название карты:</label>
      <input class="popup__input"
             id="card-name"
             placeholder="Введите название"
             v-model="cardName"
             maxlength="13"
             required
             v-focus
      >
    </div>
    <div class="popup-row"
    >
      <label class="popup__label" for="card-num">Номер карты:</label>
      <div :class="['popup__input-wrapper',
                   isValid ? 'valid' :
                   isValid === false ? 'not-valid' :
                   (isValid === null) ? '' : '']"
           :style="isValid === null && cardFocus ? focusStyle : ''"
      >
        <input
          class="popup__input"
          id="card-num"
          v-model="cardNumber"
          @focus="cardFocus = true"
          @blur="validCardNum"
          type="number"
          placeholder="Введите номер"
          required
        >
      </div>
    </div>
    <div class="popup-row">
      <label class="popup__label" for="card-confirm">Введите код подтверждения({{randNum}})</label>
      <div :class="['popup__input-wrapper',
                   isConfirm === true ? 'valid' :
                   isConfirm === false ? 'not-valid' :
                   (isConfirm === null) ? '' : '']"
           :style="isConfirm === null && codeFocus ? focusStyle : ''"
      >
        <input id="card-confirm"
               class="popup__input"
               v-model="confirmCode"
               @focus="codeFocus = true"
               @blur="cardConfirm"
               placeholder="Введите код"
               type="number"
               required
        >
      </div>
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
    props: ['show'],
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
        cardFocus: false,
        codeFocus: false,
        cardNumberLength: 16,
        cardProps: {},
        focusStyle: 'box-shadow: 0 0 6px deepskyblue'
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
      }
    },
    watch: {
      cardNumber() {
        this.isValid = null;
        if (this.cardNumber.length > 16) this.cardNumber = this.cardNumber.slice(0,16);
        if (this.cardNumber.length === 16) this.isValid = true;
      },
      confirmCode() {
        this.isConfirm = null;
        if (this.confirmCode.length > 4) this.confirmCode = this.confirmCode.slice(0,4);
        if (this.confirmCode.length === 4 && +this.confirmCode !== this.randNum) {
          this.validateShow = true;
          return this.isConfirm = false;
        }
        if (+this.confirmCode === this.randNum) this.isConfirm = true;
      }
    },
    methods: {
      ...mapActions(['addCard']),
      // Валидация поля Card Number
      validCardNum() {
        this.cardFocus = false;
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
        this.codeFocus = false;
        if (+this.confirmCode === this.randNum) return this.isConfirm = true;
        if (this.confirmCode === null || this.confirmCode.length !== 4 || +this.confirmCode !== this.randNum || !isFinite(this.confirmCode)) {
          if (!this.validCardNum()) this.isValid = false;
          this.validateShow = true;
          return this.isConfirm = false;
        }
      },
      // Добавляем новую карту
      async addingCard() {
        // Если валидация не пройдена
        if (this.isDisabled) return;
        let number = this.cardNumber.slice(0, 6);
        await axios
          .get(`https://api.cardinfo.online?apiKey=2b2b2ebfc6566238a3405dae4686b60c&input=${number}`)
          .then(response => response.data)
          .then(data => {
            return this.cardProps = {
              id: this.LAST_INDEX,
              name: this.cardName || data.bankName || `Моя карта ${this.LAST_INDEX}`,
              status: data.bankName ? !!1 : !!0,
              number: this.cardNumber,
              brand: data.brandLogoLightSvg,
              bg: data.formBackgroundColors,
              color: data.formTextColor,
              logo: data.bankLogoSmallLightSvg
            }
          })
          .catch(error => console.log(error));

        try {
          this.addCard(this.cardProps);
          this.cardName = null;
          this.cardNumber = null;
          this.confirmCode = null;

          this.$parent.$parent.$data.isShow = false;
        } catch (e) {
          alert('Вы пытались создать существующую карту')
        }
      },
    }
  }
</script>
