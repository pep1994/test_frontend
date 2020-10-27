<template>
    <div id="add-cart" class="row justify-content-center">
        <div id="message-cart" v-show="show" class="alert alert-success text-success" role="alert">
            {{ showNameProduct }}
        </div>
        <div v-for="product in products" :key="product.id" class="col-md-4 mt-4 mb-2">
            <div  class="card" style="width: 18rem;">
                <img class="card-img-top" :src="product.image" :alt="product.name">
                <div class="card-body">
                    <h5 class="card-title">{{product.name}}</h5>
                    <p class="card-text">€ {{ product.price }}</p>
                    <button v-if="product.promo_buy_one_get_one_free" @click="addToCartPromo(product.id)" class="btn btn-warning mt-2">Paghi uno, prendi due</button>
                    <button v-else @click="addToCart(product.id)" class="btn btn-primary">Aggiungi al carrello</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Product',
    data() {
      return {
          show: false,
          nameProduct: "",
          timeOut: ""
      }
    },
    props: {
        'products': {
            type: Array,
            required: true,
            default: function() {
                return [];
            }
        }
    },
    methods: {
        addToCart(id) {
            clearTimeout(this.timeOut);
            this.show = true;
            let product = this.products.find(product => product.id == id);
            if (product) {
                this.nameProduct = `${product.name} aggiunto al carrello`;
                product.quantityInCart += 1;
                this.$store.commit('addToCart', product);
                this.$store.commit('setCountCart');
            }
            this.hideMessage();
        },
        addToCartPromo(id) {
            clearTimeout(this.timeOut);
            this.show = true;
            let product = this.products.find(product => product.id == id);
            if (product) {
                this.nameProduct = `${product.name} aggiunto al carrello`;
                product.quantityInCart += 2;
                this.$store.commit('addToCartPromo', product);
                this.$store.commit('setCountCart');
            }
            this.hideMessage();
        },
        hideMessage() {
            this.timeOut = setTimeout(() => {
                this.show = false;
            }, 1700);
        }
    },
    computed: {
        showNameProduct() {
            return this.nameProduct;
        }
    }
}
</script>

<style scoped>
    #message-cart {
        position: fixed;
        top: 75px;
        right: 15px;
        width: 180px;
    }
</style>