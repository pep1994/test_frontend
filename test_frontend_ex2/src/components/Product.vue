<template>
<div id="add-cart" class="row justify-content-center">

    <MessageAddToCart :show="show" :nameProduct="showNameProduct"></MessageAddToCart>

    <div v-for="product in products" :key="product.id" class="col-lg-4 col-md-6 mt-4 mb-2 d-flex justify-content-center">
        <div class="card" :style="{width: '18rem', color: returnTheme.syntax}" :class="{'bg-dark': !theme}">
            <img class="card-img-top" :src="product.image" :alt="product.name">
            <div class="card-body">
                <h5 class="card-title">{{product.name}}</h5>
                <p class="card-text">€ {{ product.price }}</p>
                <span v-if="product.promo_buy_one_get_one_free" class="promo">
                    <i class="fas fa-certificate"></i>
                </span>
                <span v-if="product.promo_buy_one_get_one_free" class="x2 text-danger">x2</span>
                <div class="d-flex justify-content-between">
                    <button v-if="product.promo_buy_one_get_one_free" @click="addToCartPromo(product.id)" class="btn btn-warning mt-2">Aggiungi al carrello</button>
                    <button v-else @click="addToCart(product.id)" class="btn btn-primary mt-2">Aggiungi al carrello</button>
                    <router-link :to="{name: 'Detail', params: {id: product.id}}" tag="button" class="btn btn-info btn-sm">Dettagli</router-link>
                </div>

            </div>
        </div>
    </div>

</div>
</template>

<script>
import MessageAddToCart from '@/components/MessageAddToCart.vue';

export default {
    name: 'Product',
    components: {
        MessageAddToCart
    },
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
            default: function () {
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
                this.nameProduct = `${product.name} x2 aggiunti al carrello`;
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
        },
        returnTheme() {
            let theme = this.$store.state.themeLight ? this.$store.state.light : this.$store.state.dark;
            return theme;
        },
        theme() {
            return this.$store.state.themeLight;
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    position: relative;

    .promo {
        color: #fdcf49;
        font-size: 45px;
        position: absolute;
        top: -22px;
        right: -16px;
    }

    .x2 {
        position: absolute;
        top: -6px;
        right: -5px;
        z-index: 10;
        font-size: 20px;
    }
}
</style>
