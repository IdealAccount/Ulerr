<template>
  <div class="address">
    <h3>Ваш адрес</h3>
    <div class="address-container">
      <form class="address-form" @click="">
        <!--Контейнер поля ввода -->
        <div v-for="(input,i) of formAddress"
             :class="['address-form__row', {'address-form__row--mini' : input.mini}]"
             :key="i"
        >
          <input :id="input.type"
                 :class="['address-form__input', {'address-form__input-select' : input.selectList}]"
                 v-model="formInputModel[input.type].val"
                 @input="getDropdownHint(formInputModel[input.type].val, input.type)"
                 @blur="validateForm(input.type)"
                 @focus="dropdownHintSet = []"
                 :key="input.type"
                 :required="input.required"
          >
          <label :for="input.type"
                 :class="['address-form__label',
                 validation[input.type] ? 'valid' :
                 validation[input.type] === false ? 'not-valid' :
                 validation[input.type] === null ? '' : '']"
                 :data-require="input.dataAttr"
                 @click="type = type === input.type ? 'null' : input.type"
          >
          </label>
          <dropdown-hint :dropdownHint="dropdownHint"
                         :selectItem="selectItem"
                         v-show="type === input.type"
                         v-if="input.dropdown"
                         :key="i"
                         ref="dropdown"
          ></dropdown-hint>
        </div> <!-- Контейнер поля в вода END -->
      </form>
      <button @click.prevent="showAddress" class="address__btn" :disabled="isDisabled">Submit</button>
      <ul class="result-list" v-if="isShow">
        <li v-for="item of address" class="result-list__item">
          <strong>{{item.str}}</strong>
        </li>
      </ul>

    </div>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import DropdownHint from './DropdownHint'
  import SelectList from './SelectList'

  export default {
    components: {
      DropdownHint,
      SelectList
    },
    watch: {},
    data() {
      return {
        validation: {
          city: null,
          street: null,
          house: null,
          region: null,
        },
        isOpen: false,
        isShow: false,

        type: null,

        address: '',

        isValid: false,
        dropdownHintSet: [],
      }
    },
    computed: {
      ...mapState([
        'formAddress',
        'formInputModel'
      ]),
      api() {
        return {
          city: '/api/v1/city?query=' + this.formInputModel.city.val,
          street: `/api/v1/street?aoguid=${this.formInputModel.city.id}&query=${this.formInputModel.street.val}`,
          house: `/api/v1/houses?aoguid=${this.formInputModel.street.id}`,
        }
      },
      isDisabled() {
        let disable;
        for (let val in this.validate) {
          if (val !== true) return result = true;
          else disable = false;
        }
        return disable;
      },
      dropdownHint() {
        return [...this.dropdownHintSet]
      }
    },
    methods: {
      ...mapActions([
        'setSelectInput',
        'getRegionAsync'
      ]),
      // Поиск и формирование массива с совпадениями (подсказками)
      async getDropdownHint(inputStr, type) {
        if (type === 'region' || type === 'building' || type === 'apartment' || !this.api) return;
        if (this.type !== type) this.type = type;

        let name = (type === 'house') ? 'housenum' : 'item_fullname';

        let res = await axios.get('https://fias1.euler.solutions:443' + this.api[type]);
        let {data} = res.data;

        this.dropdownHintSet = new Set();

        data.filter(item => {
          item.type = type;
          if (item[name].search(inputStr) !== -1) {
            this.setSelectInput({item, type});
            this.dropdownHintSet.add(item);
          }
        });
      },

      selectItem(item) {
        this.$emit('selectItem', item);
        let type = item.type;
        let propName = (type === 'house') ? 'housenum' : 'item_fullname';

        this.setSelectInput({item, type});
        this.getRegionAsync();
        this.formInputModel[type].val = item[propName];
      },
      validateForm(type) {
        if (type === 'apartment' || type === 'building') return;

        if (type === 'city' || type === 'street') {
          if (!this.formInputModel[type].id || !this.formInputModel[type].val) {
            return this.validation[type] = false;
          }
        }
        else if ((type === 'region') && !this.formInputModel[type].val) {
          return this.validation[type] = false;
        }
        else if ((type === 'house') && !this.formInputModel[type].housenum) {
          return this.validation[type] = false;
        }
        this.validation[type] = true;

        this.getRegionAsync();
        // this.dropdownHintSet = [];
      },
      showAddress() {
        this.isShow = !this.isShow;
        this.address = [
          {str: this.formInputModel.house.postalCode + ', '},
          {str: this.formInputModel.street.fullName + ', '},
          {str: 'д. ' + this.formInputModel.house.val + ', '},
          {str: 'к. ' + this.formInputModel.building.val + ', '},
          {str: 'кв.' + this.formInputModel.apartment.val},
        ]
      },
    }
  }
</script>
<style lang="scss">
  .address-container {
    padding: 0 60px;
  }

  .address-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &__row {
      position: relative;
      padding: 35px 20px 15px;
      margin-bottom: 20px;
      flex: 0 0 100%;
      &--mini {
        flex-basis: calc(100% / 3 - 15px);
      }
    }
    &__label {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(#c4c4c4, .7);
      border-radius: 6px;
      &:before {
        content: attr(data-require);
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        font-size: 18px;
        transition: .2s;
        color: #8FA0B7;
        letter-spacing: .3px;
      }
      &.not-valid {
        box-shadow: 0 0 6px red;
      }
      &.valid {
        box-shadow: 0 0 6px green;
      }
    }
    &__input {
      width: 100%;
      border: none;
      font-size: 18px;
      &:focus ~ .address-form__label {
        border-color: #00bfff;
        box-shadow: 0 0 6px #00bfff;
      }
      &:focus,
      &:valid {
        & ~ .address-form__label {
          &:before {
            font-size: 14px;
            top: 20px;
          }
        }
      }
    }
  }

  .open {
    position: absolute;
    cursor: pointer;
    z-index: 10;
    top: calc(50% - 15px);
    right: 20px;
    padding: 15px;
    border-radius: 50%;
    transition: .2s ease-in-out;
    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: calc(50% - 6px);
      display: block;
      width: 8px;
      height: 2px;
      background: #828282;
    }
    &:before {
      transform-origin: 3px 0;
      transform: rotate(45deg)
    }
    &:after {
      transform-origin: 7px -4px;
      transform: rotate(-45deg)
    }
    &.active {
      transform: rotate(-180deg)
    }
  }

  .result-list {
    display: flex;
    &__item {
      margin-right: 5px;
    }
  }

  .address__btn {
    padding: 10px 40px;
    border: 1px solid #c4c4c4;
    transition: .3s;
    margin-bottom: 30px;
    &:disabled {
      background: inherit;
      &:hover {
        background: #c4c4c4;
      }
    }
    &:hover {
      color: #fff;
      background: green;
    }
  }

</style>
