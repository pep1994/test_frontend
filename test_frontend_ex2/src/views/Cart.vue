<template>
<div class="cart py-5" :style="{backgroundColor: returnTheme.bg, color: returnTheme.syntax, minHeight: '100vh'}">

    <h2 class="mb-5">Riepilogo carrello</h2>
    <Modal @resetPriceAndCart="reset" :showModal="showModal" :styleModal="styleModal"></Modal>
    <TableCart class="mb-5" :cart="cart" :totalSumCart="totalSumCart" @resetPrice="totalPrice = $event" @setCart="cart = $event"></TableCart>

    <div v-if="cart.length > 0" class="d-flex justify-content-center">
        <button @click="showModal" class="btn btn-lg btn-danger">
            Svuota carrello
        </button>
    </div>

    <template v-else>
        <div class="row justify-content-center">
            <div class="col-6">
                <ErrorAlert :errorMessage="'Carrelo vuoto'" class="mb-5"></ErrorAlert>
            </div>
        </div>
        <router-link to="/" class="btn btn-lg" :class="{'btn-dark': theme, 'btn-light': !theme, 'text-dark': !theme, 'text-light': theme}">Inizia lo shopping</router-link>
    </template>

</div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import TableCart from "@/components/TableCart.vue";
import ErrorAlert from '@/components/ErrorAlert.vue'

export default {
    components: {
        Modal,
        TableCart,
        ErrorAlert
    },
    data() {
        return {
            cart: [],
            totalPrice: 0,
            show: false,
            styleModal: {
                position: "fixed",
                top: 0,
                left: "50%",
                zIndex: "-10",
                opacity: 0,
                transition: "all 0.4s linear",
                transform: "translate(-50%, -50%)",
            },
        };
    },
    methods: {
        getCart() {
            this.cart = this.$store.state.cart;
        },
        showModal() {
            this.show = !this.show;
            this.styleModal.top = this.show ? "50%" : 0;
            this.styleModal.zIndex = this.show ? 15 : "-10";
            this.styleModal.opacity = this.show ? 1 : 0;
        },
        reset() {
            this.cart = [];
            this.totalPrice = 0;
        },
    },
    computed: {
        totalSumCart() {
            this.cart.forEach((product) => {
                this.totalPrice += product.promo_buy_one_get_one_free ?
                    (product.price * product.quantityInCart) / 2 :
                    product.price * product.quantityInCart;
            });
            return this.totalPrice.toFixed(2);
        },
        returnTheme() {
            let theme = this.$store.state.themeLight ? this.$store.state.light : this.$store.state.dark;
            return theme;
        },
        theme() {
            return this.$store.state.themeLight;
        }
    },
    created: function () {
        this.getCart();
    },
};
</script>
