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
          <span :class="['open', {active : isOpen}]" @click="isOpen = !isOpen" v-if="input.selectList"></span>
          <input :id="input.type"
                 :class="['address-form__input', {'address-form__input-select' : input.selectList}]"
                 v-model="inputModel[input.type].val"
                 :required="input.required"
                 @input="showHint(inputModel[input.type].val, input.type)"
                 :key="input.type"
          >
          <label :for="input.type"
                 class="address-form__label"
                 :data-require="input.dataAttr"
                 @click="showDropdown(input.id)"
          >
          </label>
          <dropdown-hint :dropdownHint="input.id === index ? dropdownHintSet : []"
                         :key="i"
                         :selectItem="selectItem"
                         v-show="!isShow && (input.id === index)"
                         v-if="input.dropdown"
          ></dropdown-hint>
        </div> <!-- Контейнер поля в вода END -->
      </form>
      <button @click.prevent="showAddress" class="address__btn">Submit</button>

      <div class="form-result" v-if="false">
        <ul class="result-list">
          <li class="result-list__item">
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
            id: '',
            val: '',
          },
          building: {
            val: '',
          },
          apartment: {
            val: '',
          },
          region: {
            val: '',
          }
        },
        isOpen: false,
        isShow: false,

        index: '',

        cityOnFocus: false,
        streetOnFocus: false,
        houseOnFocus: false,

        inputStr: '',

        dropdownHintSet: [],
      }
    },
    computed: {
      ...mapState(['formAddress']),
      api() {
        return {
          city: '/api/v1/city?query=' + this.inputModel.city.val,
          region: '/api/v1/address?aoguid=' + this.inputModel.city.parentId,
          street: `/api/v1/street?aoguid=${this.inputModel.city.id}&query=${this.inputModel.street.val}`,
          house: `/api/v1/houses?aoguid=${this.inputModel.street.id}`,
        }
      },
    },
    methods: {
      showHint(inputStr, type) {
        this.inputStr = inputStr;
        if (type === 'apartment' || type === 'building') return;

        let res = axios.get('https://fias1.euler.solutions:443' + this.api[type])
        let {data} = res.data;
        this.dropdownHintSet = new Set();

        if (type === 'region') {
          data.forEach(searchQuery => {
            searchQuery.type = type;
            this.dropdownHintSet.add(searchQuery);
          })
        } else if (type === 'city') {
          console.log('type: city')
          data.filter(searchQuery => {
            if (searchQuery.item_fullname.search(this.inputStr) !== -1) {
              searchQuery.type = type;
              this.dropdownHintSet.add(searchQuery)
            }
          });
        } else if (type === 'house') {
          console.log('type house')
          data.filter(searchQuery => {
            console.log(searchQuery)
            if (searchQuery.housenum.search(this.inputStr) !== -1) {
              searchQuery.type = type;
              this.dropdownHintSet.add(searchQuery);
            }
          })
        } else if (type === 'street') {
          console.log('type: street')
          data.filter(searchQuery => {
            if (searchQuery.item_fullname.search(this.inputStr) !== -1) {
              searchQuery.type = type;
              this.dropdownHintSet.add(searchQuery)
            }
          });
        }


        // if (!inputStr.length) this.hintSet.clear();
      },
      selectItem(item) {
        this.$emit('selectItem', item);

        this.inputModel[item.type].id = item.aoguid || item.postalCode;
        this.inputModel[item.type].parentId ? item.parentguid : false;
        this.inputModel[item.type].val = item.item_fullname || item.housenum;

        this.dropdownHintSet.clear();

        this.isShow = !this.isShow;
      },
      showDropdown(id) {
        this.index = id;
        this.isShow = !this.isShow;
      },
      showAddress() {

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
      &--select {

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
    &:hover {
      color: #fff;
      background: green;
    }
  }

</style>
