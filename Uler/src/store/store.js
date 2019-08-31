import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cards: [],
    formAddress: [
      {
        id: 1,
        required: true,
        dataAttr: 'Город *',
        dropdown: true,
        type: 'city'
      },
      {
        id: 2,
        required: true,
        dataAttr: 'Регион *',
        selectList: true,
        dropdown: true,
        type: 'region',
      },
      {
        id: 3,
        required: true,
        dataAttr: 'Улица *',
        dropdown: true,
        type: 'street'
      },
      {
        id: 4,
        required: true,
        dataAttr: 'Дом *',
        mini: true,
        dropdown: true,
        type: 'house'
      },
      {
        id: 5,
        required: true,
        dataAttr: 'Корпус',
        mini: true,
        type: 'building'
      },
      {
        id: 6,
        required: true,
        dataAttr: 'Квартира',
        mini: true,
        type: 'apartment'
      },
    ],
    formInputModel: {
      city: {
        parentId: null,
        id: '',
        val: ''
      },
      street: {
        parentId: '',
        id: '',
        val: '',
        fullName: '',
      },
      house: {
        id: '',
        val: '',
        housenum: '',
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
  },
  getters: {
    LAST_INDEX(state) {
      let lastIndex;
      if (state.cards.length) lastIndex = state.cards[state.cards.length - 1].id + 1;
      else lastIndex = 1;
      return lastIndex;
    },
  },
  mutations: {
    ADD_CARD(state, card) {
      state.cards.push(card);
    },
    REMOVE_CARD(state, cardId) {
      state.cards = state.cards.filter(card => card.id !== cardId)
    },
    ADD_ID(state) {
      state.cards.forEach((card, i) => card.id = i + 1)
    },
    CHANGE_NAME(state, payload) {
      if (!payload.name.length) return;
      state.cards.forEach(card => {
        if (card.id === payload.id) return card.name = payload.name;
      })
    },
    // Адрес
    SET_SELECT_INPUT(state, {item, type}) {
      if (type === 'house') {
        state.formInputModel[type].housenum = item.housenum;
        state.formInputModel[type].postalCode = item.postalcode;
      }
      else if (type === 'city' || type === 'street') {
        state.formInputModel[type].id = item.aoguid;
        state.formInputModel[type].parentId = item.parentguid
        state.formInputModel[type].fullName = item.fullname;
      }
    },
    GET_REGION(state, data) {
      let inputModel = state.formInputModel;
      if (!inputModel.city.val.length || (+inputModel.city.parentId === +inputModel.region.id)) return;
      state.formInputModel.region.val = data.fullname || data.item_fullname;
    },
  },
  actions: {
    removeCard({commit, state}, id) {
      commit('REMOVE_CARD', id)
    },
    addCard({commit, state}, card) {
      let check = false;
      for (let item of state.cards) {
        if (item.number === card.number) check = true;
      }
      return check ? alert("Эта карта уже существует") : commit('ADD_CARD', card);
    },
    changeCardName({commit, state}, payload) {
      commit('CHANGE_NAME', payload);
    },
    setSelectInput({commit, state}, {item, type}) {
      commit('SET_SELECT_INPUT', {item, type})
    },
    async getRegionAsync({commit, state}) {
      let res = await axios(`https://fias1.euler.solutions:443/api/v1/address?aoguid=${state.formInputModel.city.parentId}`);
      let {data} = res.data;
      await commit('GET_REGION', await data);
    },
  },
  plugins: [createPersistedState()]
});
