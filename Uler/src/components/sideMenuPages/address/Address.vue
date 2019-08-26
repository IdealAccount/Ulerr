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
                 v-model="inputModel[input.type].val"
                 :required="input.required"
                 @input="getDropdownHint(inputModel[input.type].val, input.type)"
                 :key="input.type"
                 @blur="validateForm(input.type)"
          >
          <label :for="input.type"
                 :class="['address-form__label',
                 validation[input.type] ? 'valid' :
                 validation[input.type] === false ? 'not-valid' :
                 validation[input.type] === null ? '' : '']"
                 :data-require="input.dataAttr"
                 :data-id="i"
                 @click="type = type === input.type ? 'null' : input.type"

          >
          </label>
          <dropdown-hint :dropdownHint="dropdownHint"
                         :key="i"
                         ref="dropdown"
                         :data-id="i"
                         :selectItem="selectItem"
                         v-show="type===input.type"
                         v-if="input.dropdown"
          ></dropdown-hint>
        </div> <!-- Контейнер поля в вода END -->
      </form>
      <button @click.prevent="showAddress" class="address__btn" :disabled="isDisabled">Submit</button>

      <div class="form-result" v-if="isShow">
        <p v-text="address"></p>
      </div>

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
    data() {
      return {
        inputModel: {
          city: {
            parentId: null,
            id: '',
            val: ''
          },
          street: {
            parentId: '',
            id: '',
            val: ''
          },
          house: {
            val: '',
          },
          building: {
            val: '',
          },
          apartment: {
            val: '',
          },
          region: {
            id: '',
            val: '',
          }
        },
        validation: {
          city: null,
          street: null,
          house: null,
          region: null,
        },

        isOpen: false,
        isShow: false,

        index: null,
        type: null,

        cityOnFocus: false,
        streetOnFocus: false,
        houseOnFocus: false,
        address: '',
        inputStr: '',

        isValid: false,
        dropdownHintSet: [],
      }
    },
    computed: {
      ...mapState(['formAddress']),
      api() {
        return {
          city: '/api/v1/city?query=' + this.inputModel.city.val,
          street: `/api/v1/street?aoguid=${this.inputModel.city.id}&query=${this.inputModel.street.val}`,
          house: `/api/v1/houses?aoguid=${this.inputModel.street.id}`,
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
        return Array.from(this.dropdownHintSet)
      }
    },
    methods: {
      // Поиск и формирование массива с совпадениями (подсказками)
      async getDropdownHint(inputStr, type) {
        if (type === 'region' || type === 'building' || type === 'apartment' || !this.api) return;
        if (this.type !== type) this.type = type;

        let name = (type === 'house') ? 'housenum' : 'item_fullname';
        let res = await axios.get('https://fias1.euler.solutions:443' + this.api[type]);
        let {data} = await res.data;
        this.dropdownHintSet = new Set();

        data.filter(item => {
          item.type = type;
          if (item[name].search(inputStr) !== -1) {
            this.setSelectInput(type, item);
            this.dropdownHintSet.add(item);
          }
        });
      },

      selectItem(item) {
        this.$emit('selectItem', item);
        let type = item.type;
        let propName = type === 'house' ? 'housenum' : 'item_fullname'
        this.setSelectInput(type, item);
        this.setRegion(type);
        this.inputModel[type].val = item[propName];
      },
      setSelectInput(type, source) {
        if (type === 'house') {
          this.inputModel[type].housenum = source.housenum;
          this.inputModel[type].postalCode = source.postalcode;
        }
        else {
          if (type === 'city') {
            this.inputModel[type].id = source.aoguid;
            this.inputModel[type].parentId = source.parentguid
          } else if (type === 'street') {
            this.inputModel[type].id = source.aoguid;
            this.inputModel[type].parentId = source.parentguid
          }
        }
      },

      async setRegion(type) {
        if (!this.inputModel.city.val.length) return
        if (this.inputModel.city.parentId === this.inputModel.region.id) return;
        if (type === 'city') {
          let res = await axios(`https://fias1.euler.solutions:443/api/v1/address?aoguid=${this.inputModel.city.parentId}`);
          let {data} = res.data;
          this.inputModel.region.val = data.fullname || data.item_fullname;
          this.type = null;
        } else return;
      },
      validateForm(type) {
        if (type === 'city' || type === 'street') {
          if (!this.inputModel[type].id || !this.inputModel[type].val) {
            this.validation[type] = false;
          } else this.validation[type] = true;
        } else if (type === 'region') {
          if (!this.inputModel[type].val) this.validation[type] = false;
          else this.validation[type] = true;
        }
        else if (type === 'house') {
          if (!this.inputModel[type].housenum || !this.inputModel[type].postalCode) {
            this.validation[type] = false;
          } else this.validation[type] = true;
        } else this.validation[type] = null;
        this.setRegion(type);
      },
      showAddress() {
        this.isShow = !this.isShow;
        this.address = this.inputModel.house.postalCode + ', ' + this.inputModel.city.val + ', ' + this.inputModel.street.val + ', ' + this.inputModel.building.val + ', ' + this.inputModel.apartment.val
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
      font-weight: bold;
    }
  }

  .address__btn {
    padding: 10px 40px;
    border: 1px solid #c4c4c4;
    transition: .3s;
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
