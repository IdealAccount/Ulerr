<template>
  <div class="address">
    <h3>Ваш адрес</h3>
    <div class="address-container">
      <form class="address-form">
        <div class="address-form__row">
          <span :class="['open', {active : isOpen}]" @click="isOpen = !isOpen"></span>
          <input id="region"
                 class="address-form__input address-form__input-select"
                 v-model="region"
                 required
          >
          <label for="region" class="address-form__label" data-require="Регион *"></label>
          <transition>
            <ul class="region-list" v-if="isOpen">
              <li class="region-list__item"></li>
            </ul>
          </transition>
        </div>
        <div class="address-form__row">
          <input id="city"
                 class="address-form__input"
                 v-model="city"
                 required
          >
          <label for="city" class="address-form__label" data-require="Город *"></label>
        </div>
        <div class="address-form__row">
          <input id="street"
                 class="address-form__input"
                 v-model="street"
                 required
          >
          <label for="street" class="address-form__label" data-require="Улица *"></label>
        </div>
        <div class="address-form__multiply">
          <div class="address-form__row">
            <input id="house"
                   class="address-form__input"
                   v-model="house"
                   required
            >
            <label for="house" class="address-form__label" data-require="Дом *"></label>
          </div>
          <div class="address-form__row">
            <input id="building"
                   class="address-form__input"
                   v-model="building"
                   required
            >
            <label for="building" class="address-form__label" data-require="Корпус"></label>
          </div>
          <div class="address-form__row">
            <input id="apartment"
                   class="address-form__input"
                   v-model="apartment"
                   required
            >
            <label for="apartment" class="address-form__label" data-require="Квартира"></label>
          </div>
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
  export default {
    data() {
      return {
        region: null,
        city: null,
        street: null,
        house: null,
        building: null,
        apartment: null,
        isOpen: false,
        isShow: false,
        formData: {}
      }
    },
    mounted() {
    },
    methods: {
      getAddress() {
        axios
          .get('https://fias1.euler.solutions/api/swagger/index.html')
          .then(response => {
            document.body.append(response.data)
          })
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
    padding: 15px;
    &__row {
      position: relative;
      padding: 35px 20px 15px;
      margin-bottom: 20px;
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
    &__multiply {
      display: flex;
      justify-content: space-between;
      .address-form__row {
        width: calc(100% / 3 - 15px);
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
      &-select {

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
