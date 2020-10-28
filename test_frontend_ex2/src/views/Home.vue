<template>
<div class="home mt-5">
    <div class="container">

        <div v-if="error" class="alert alert-danger text-danger text-center">
            Errore, riprovare più tardi
        </div>

        <Product v-if="!error || !loading" :products="products"></Product>

        <Loading :show="loading"></Loading>

    </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Product from "@/components/Product.vue";
import Loading from "@/components/Loading.vue";

export default {
    name: "Home",
    components: {
        Product,
        Loading
    },
    data() {
        return {
            products: [],
            error: false,
            loading: false,
        };
    },
    created: function () {
        if (!this.$store.state.products.length > 0) {
            this.loading = true;
            axios
                .get("https://5c3c998d29429300143fe514.mockapi.io/api/v1/products")
                .then((res) => {
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
                })
                .catch((err) => {
                    console.log(err);
                    this.error = true;
                });
        } else {
            this.products = this.$store.state.products;
        }
    },
};
</script>
