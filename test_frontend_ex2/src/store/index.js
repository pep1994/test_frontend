import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    countCart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).reduce((acc, currentVal) => acc + currentVal.quantityInCart, 0) : 0,
    themeLight: true,
    light: {
      syntax: '#555',
      bg: '#eee'
    },
    dark: {
      syntax: '#ddd',
      bg: '#555'
    }
  },
  mutations: {
    setProducts: (state, payload) => {
      state.products = payload;
    },
    addToCart: (state, payload) => {
      if (state.cart.some(product => product.id == payload.id)) {
        let product = state.cart.find(product => product.id == payload.id);
        product.quantityInCart = payload.quantityInCart;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      } else {
        state.cart = [...state.cart, payload];
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    addToCartPromo: (state, payload) => {
      if (state.cart.some(product => product.id == payload.id)) {
        let product = state.cart.find(product => product.id == payload.id);
        product.quantityInCart = payload.quantityInCart;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      } else {
        state.cart = [...state.cart, payload];
        localStorage.setItem('cart', JSON.stringify(state.cart));
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
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, payload) => {
      state.cart = state.cart.filter(product => product.id != payload);
      if (state.products.some(product => product.id == payload)) {
        let product = state.products.find(product => product.id == payload);
        product.quantityInCart = 0;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    emptyCart: state => {
      state.cart = [];
      localStorage.removeItem('cart');
      state.products.forEach(product => {
        if (product.quantityInCart > 0) {
          product.quantityInCart = 0;
        }
      });
    },
    toggleTheme: state => {
      state.themeLight = !state.themeLight;
    }
  },
  actions: {
    fetchProducts: (context) => {
      return axios.get("https://5c3c998d29429300143fe514.mockapi.io/api/v1/products")
            .then(res => {
                context.commit(
                    "setProducts",
                    res.data.map((product) => ({
                        ...product,
                        quantityInCart: context.state.cart.some(p => p.id == product.id) ? context.state.cart.find(p => p.id == product.id).quantityInCart : 0
                    }))
                );  
            })
            .catch((err) => {
              console.log(err)
              throw new Error('Errore di connessione, riprovare più tardi');
            });
    }
  }
})
