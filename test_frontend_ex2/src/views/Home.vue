<template>
  <div class="home">
    <div class="container">
        <div v-if="error" class="alert alert-danger text-danger text-center">Errore, riprovare più tardi</div>
        <Product v-if="!error || !loading" :products="products"></Product>
        <template v-if="loading">
          <div class="animate-container">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
        </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Product from '@/components/Product.vue';

export default {
  name: 'Home',
  components: {
    Product
  },
  data() {
    return {
      products: [],
      error: false,
      loading: false
    }
  },
  created: function(){
    if (!this.$store.state.products.length > 0) {
      this.loading = true;
      axios.get('https://5c3c998d29429300143fe514.mockapi.io/api/v1/products')
      .then(res => {
        this.$store.dispatch('setProducts', res.data.map(product => ({...product, quantityInCart: 0})));
        this.products = this.$store.state.products;
        this.loading = false;
        this.error = false;
        })
      .catch(err => {
        console.log(err)
        this.error = true;
      })
    } else {
      this.products = this.$store.state.products;
    }
  }
}
</script>

<style lang="scss" scoped>
    .animate-container {
      width: 300px;
      margin: 200px auto;
      text-align: center;
      position: relative;

      span {
        position: absolute;
        display: inline-block;
        width: 10px;
        height: 5px;
        background-color: #8e23f9;
        animation-name: animate-loading;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;

        &:first-child {
          top: 0;
          left: 15px;
        }

        &:nth-child(2) {
          top: 0;
          left: 28px;
          animation-delay: .4s;
        }

        &:nth-child(3) {
          top: 0;
          left: 41px;
          animation-delay: .6s;
        }

        &:nth-child(4) {
          top: 0;
          left: 54px;
          animation-delay: .8s;
        }

        &:nth-child(5) {
          top: 0;
          left: 67px;
          animation-delay: 1s;
        }
      }
    }

    @keyframes animate-loading {
      0% {
        height: 5px;
        background-color: #8e23f9;
        transform: translateY(0);
      }

      20% {
        height: 40px;
        background-color: #3498db;
        transform: translateY(-20px);
      }

      50% {
        height: 5px;
        background-color: #8e23f9;
        transform: translateY(0);
      }

      100% {
        height: 5px;
        background-color: #8e23f9;
        transform: translateY(0);
      }

    }
</style>
