<template>
<div class="cart mt-5">

    <Modal @resetPriceAndCart="reset" :showModal="showModal" :style="styleModal"></Modal>
    <TableCart :cart="cart" :totalSumCart="totalSumCart" @resetPrice="totalPrice = $event" @setCart="cart = $event"></TableCart>

    <div v-if="cart.length > 0" class="d-flex justify-content-center">
        <button @click="showModal" class="btn btn-lg btn-danger">
            Svuota carrello
        </button>
    </div>

    <template v-else>
        <div class="alert alert-danger text-danger text-center">
            Il carrello è vuoto
        </div>
        <router-link to="/" class="btn btn-lg btn-warning text-info">Inizia lo shopping</router-link>
    </template>

</div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import TableCart from "@/components/TableCart.vue";

export default {
    components: {
        Modal,
        TableCart,
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
            console.log(this.cart);
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
    },
    created: function () {
        this.getCart();
    },
};
</script>
