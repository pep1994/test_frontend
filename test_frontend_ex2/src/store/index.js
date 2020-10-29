import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    countCart: ""
  },
  mutations: {
    setProducts: (state, payload) => {
      state.products = payload;
    },
    addToCart: (state, payload) => {
      if (state.cart.some(product => product.id == payload.id)) {
        let product = state.cart.find(product => product.id == payload.id);
        product.quantityInCart = payload.quantityInCart;
      } else {
        state.cart = [...state.cart, payload];

      }
    },
    addToCartPromo: (state, payload) => {
      if (state.cart.some(product => product.id == payload.id)) {
        let product = state.cart.find(product => product.id == payload.id);
        product.quantityInCart = payload.quantityInCart;
      } else {
        state.cart = [...state.cart, payload];
      }
    },
    setCountCart: state => {
      let sum = 0;
      state.cart.forEach(product => {
        sum += product.quantityInCart;
      })
      state.countCart = sum;
    },
    changeQuantity: (state, payload) => {
      if (state.cart.some(product => product.id == payload.id)) {
        let product = state.cart.find(product => product.id == payload.id);
        product.quantityInCart = payload.quantityInCart;
      }
    },
    removeFromCart: (state, payload) => {
      state.cart = state.cart.filter(product => product.id != payload);
      if (state.products.some(product => product.id == payload)) {
        let product = state.products.find(product => product.id == payload);
        product.quantityInCart = 0;
      }
    },
    emptyCart: state => {
      state.cart = [];
      state.products.forEach(product => {
        if (product.quantityInCart > 0) {
          product.quantityInCart = 0;
        }
      });
    }
  },
  actions: {
    setProducts: (context, payload) => {
      context.commit('setProducts', payload);
    }
  },
  modules: {
  }
})
