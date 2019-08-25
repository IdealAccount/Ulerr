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
        dataAttr: 'Регион *',
        selectList: true,
        value: 'region',

      },
      {
        id: 2,
        required: true,
        dataAttr: 'Город *',
        dropdown: true,
        value: 'city'
      },
      {
        id: 3,
        required: true,
        dataAttr: 'Улица *',
        dropdown: true,
        value: 'street'
      },
      {
        id: 4,
        required: true,
        dataAttr: 'Дом *',
        mini: true,
        dropdown: true,
        value: 'house'
      },
      {
        id: 5,
        required: true,
        dataAttr: 'Корпус',
        mini: true,
        value: 'building'
      },
      {
        id: 6,
        required: true,
        dataAttr: 'Квартира',
        mini: true,
        value: 'apartment'
      },
    ]
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
    }
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
      return check ? false : commit('ADD_CARD', card);
    },
    changeCardName({commit,state}, payload) {
      commit('CHANGE_NAME', payload);
    }
  },
  plugins: [createPersistedState()]
})
