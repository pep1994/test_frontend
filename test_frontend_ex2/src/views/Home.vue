<template>
<div class="home mt-5">
    <div class="container">

        <PromoMessage :showMessage="showPromo"></PromoMessage>

        <div class="title text-center text-dark">
            <h1>I miglior prodotti al miglior prezzo</h1>
        </div>

        <ErrorAlert v-if="error" :errorMessage="printErrorMessage"></ErrorAlert>

        <Product v-if="!error || !loading" :products="products"></Product>

        <Loading :showLoading="loading"></Loading>

    </div>
</div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";
import Product from "@/components/Product.vue";
import Loading from "@/components/Loading.vue";
import PromoMessage from "@/components/PromoMessage.vue";
import ErrorAlert from '@/components/ErrorAlert.vue'

export default {
    name: "Home",
    components: {
        Product,
        Loading,
        PromoMessage,
        ErrorAlert
    },
    data() {
        return {
            products: [],
            error: false,
            loading: false,
            showPromo: false,
            errorMessage: "",
            promoStyle: {
                position: "fixed",
                top: "-50px",
                left: 0,
                zIndex: "-10",
                opacity: 0,
                transition: "all 0.7s linear"
            }
        };
    },
    methods: {
        showPromoStart() {
            setTimeout(() => {
                this.showPromo = true;
            }, 2500);
        }
    },
    computed: {
      printErrorMessage() {
          return this.errorMessage;
      }
    },
    created: function () {
        if (!this.$store.state.products.length > 0) {
            this.loading = true;

            this.$store.dispatch('fetchProducts').then(() => {
                    this.products = this.$store.state.products;
                    this.loading = false;
                    this.error = false;
                    this.showPromoStart();
                })
                .catch(err => {
                    this.loading = false;
                    this.error = true;
                    this.errorMessage = err;
                })

        } else {
            this.products = this.$store.state.products;
        }
    }
};
</script>
