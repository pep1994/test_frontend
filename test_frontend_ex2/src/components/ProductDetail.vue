<template>
<div class="card py-4" :style="{backgroundColor: returnTheme.bg, color: returnTheme.syntax}">

    <MessageAddToCart :show="show" :nameProduct="showNameProduct"></MessageAddToCart>

    <img class="card-img-top" :src="product.image" :alt="product.name">
    <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate suscipit cumque laboriosam perferendis necessitatibus ea quasi et impedit animi. Molestiae omnis, cumque commodi illum neque a error enim voluptatibus quo.</p>
        <h6 class="card-text">Prezzo: € {{product.price}}</h6>
        <div v-if="product.promo_buy_one_get_one_free">
            <div>
                <i class="fas fa-star"></i>
                <h6>Due prodotti al prezzo di uno</h6>
            </div>
        </div>
        <div class="d-flex justify-content-between">

            <router-link to="/" tag="button" class="btn btn-secondary back">Back</router-link>
            <button v-if="product.promo_buy_one_get_one_free" class="btn btn-warning" @click="addToCartPromo()">Aggiungi al carrello</button>
            <button v-else class="btn btn-primary" @click="addToCart()">Aggiungi al carrello</button>
        </div>
    </div>
</div>
</template>

<script>
import MessageAddToCart from '@/components/MessageAddToCart.vue';

export default {
    name: 'ProductDetail',
    components: {
        MessageAddToCart
    },
    data() {
        return {
            nameProduct: "",
            show: false,
            timeOut: ""
        }
    },
    props: {
        product: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    methods: {
        addToCart() {
            clearTimeout(this.timeOut);
            this.show = true;
            this.nameProduct = `${this.product.name} aggiunto al carrello`;
            this.product.quantityInCart += 1;
            this.$store.commit('addToCart', this.product);
            this.$store.commit('setCountCart');
            this.hideMessage();
        },
        addToCartPromo() {
            clearTimeout(this.timeOut);
            this.show = true;
            this.nameProduct = `${this.product.name} x2 aggiunti al carrello`;
            this.product.quantityInCart += 2;
            this.$store.commit('addToCartPromo', this.product);
            this.$store.commit('setCountCart');
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
        theme() {
            return this.$store.state.themeLight;
        },
        returnTheme() {
            let theme = this.$store.state.themeLight ? this.$store.state.light : this.$store.state.dark;
            return theme;
        }
    }
}
</script>

<style lang="scss" scoped>
i {
    color: #fdcf49;
    font-size: 22px;
}

.card {
    display: block;

    .card-img-top {
        width: 50%;
    }

}
</style>
