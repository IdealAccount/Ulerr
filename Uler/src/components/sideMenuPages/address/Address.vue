<template>
  <div class="address">
    <h3>Ваш адрес</h3>
    <div class="address-container">
      <form class="address-form" @click="">
        <div v-for="(input,i) of formAddress"
             :class="['address-form__row', {'address-form__row--mini' : input.mini}]"
        >
          <span :class="['open', {active : isOpen}]" @click="isOpen = !isOpen" v-if="input.selectList"></span>
          <input :id="input.value"
                 :class="['address-form__input', {'address-form__input-select' : input.selectList}]"
                 v-model="inputModel[input.value]"
                 :required="input.required"
                 @input="showHint(api[input.value], inputModel[input.value])"
          >
          <label :for="input.value"
                 class="address-form__label"
                 :data-require="input.dataAttr"
                 @click="index = i + 1"
          >
          </label>
          <dropdown-hint :dropdownHint="dropdownHint"
                         :key="i"
                         :selectItem="selectItem"
                         v-show="isShow || (index === i + 1)"
                         v-if="input.dropdown"
          ></dropdown-hint>
          <select-list v-else-if="input.selectList" v-show="isOpen"></select-list>
        </div>
      </form>
      <button @click.prevent="getAddress">Click</button>
      <div class="form-result" v-if="isShow">
        <ul class="result-list">
          <li class="result-list__item" v-for="(item,idx) in formData" :key="idx">
            <span>{{item}}</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
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
          city: null,
          street: null,
          house: null,
        },
        isOpen: false,
        isShow: false,

        index: '',

        cityOnFocus: false,
        streetOnFocus: false,
        houseOnFocus: false,

        inputValue: '',

        dropdownHintSet: [],
        selectedAoguid: '',
        cityAoguid: '',
        streetAoguid: '',
      }
    },
    updated() {
      console.log(this.inputModel.city)
    },
    computed: {
      ...mapState(['formAddress']),
      api() {
        return {
          city: '/api/v1/city?query=' + this.inputModel.city,
          street: `/api/v1/street?aoguid=${this.selectedAoguid}&query=${this.inputModel.street}`,
          house: `/api/v1/houses?aoguid=${this.selectedAoguid}`,
        }
      },
      dropdownHint() {
        return Array.from(this.dropdownHintSet);
      },
    },
    methods: {

      async showHint(api, inputVal) {
        this.inputValue = inputVal;

        let res = await axios.get('https://fias1.euler.solutions:443' + api)
        let {data} = res.data;
        // this.inputValue = this.inputValue.toLowerCase();
        this.dropdownHintSet = new Set();

        if (api === this.api.house) {
          console.log('!')
          data.filter(searchQuery => {
            if (searchQuery.housenum.search(this.inputValue) !== -1) this.dropdownHintSet.add(searchQuery);
          })
        }
        if (api === this.api.street) {

        }
        if (api === this.api.city) {

        }
        data.filter(searchQuery => {
          if (searchQuery.item_fullname.search(this.inputValue) !== -1) {
            this.dropdownHintSet.add(searchQuery)
          }
          // if (inputVal.length < 0) this.hintSet.clear();
        });
        // if (!inputVal.length) this.hintSet.clear();
      },
      selectItem(item) {
        this.$emit('selectItem', item)
        this.selectedAoguid = item.aoguid;
        this.inputValue = item.item_fullname;
        console.log(this.selectedAoguid)
      },
      openSelectList() {
        this.formData = {
          region: this.region + ',',
          city: `г. ${this.city},`,
          street: `пр-кт. ${this.street},`,
          house: `д. ${this.house},`,
          building: {
            get str() {
              if (!this.apartment) {
                return this.building ? `к. ${this.building}` : null
              } else return this.building ? `к. ${this.building},` : null
            }
          },
          apartment: this.apartment ? `кв. ${this.apartment}` : null,
        };
        console.log(this.formData);
        this.isShow = !this.isShow;

      },
      validateForm() {

      }
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
    padding: 15px;
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

</style>
