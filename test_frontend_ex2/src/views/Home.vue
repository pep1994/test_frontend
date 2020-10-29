<template>
<div class="home mt-5">
    <div class="container">

        <PromoMessage :showMessage="showPromo"></PromoMessage>

        <div class="title text-center text-dark">
            <h1>I miglior prodotti al miglior prezzo</h1>
        </div>

        <div v-if="error" class="alert alert-danger text-danger text-center">
            Errore, riprovare più tardi
        </div>

        <Product v-if="!error || !loading" :products="products"></Product>

        <Loading :showLoading="loading"></Loading>

    </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Product from "@/components/Product.vue";
import Loading from "@/components/Loading.vue";
import PromoMessage from "@/components/PromoMessage.vue";

export default {
    name: "Home",
    components: {
        Product,
        Loading,
        PromoMessage
    },
    data() {
        return {
            products: [],
            error: false,
            loading: false,
            showPromo: false,
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
    created: function () {
        if (!this.$store.state.products.length > 0) {
            this.loading = true;
            axios
                .get("https://5c3c998d29429300143fe514.mockapi.io/api/v1/products")
                .then((res) => {
                    console.log(this.loading)
                    this.$store.dispatch(
                        "setProducts",
                        res.data.map((product) => ({
                            ...product,
                            quantityInCart: 0
                        }))
                    );
                    this.products = this.$store.state.products;
                    this.loading = false;
                    this.error = false;
                    this.showPromoStart();
                })
                .catch((err) => {
                    console.log(err);
                    this.error = true;
                });
        } else {
            this.products = this.$store.state.products;
        }
    }
};
</script>
