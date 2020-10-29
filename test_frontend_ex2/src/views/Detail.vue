<template>
<ProductDetail :product="product"></ProductDetail>
</template>

<script>
import ProductDetail from '@/components/ProductDetail.vue';
import axios from 'axios'

export default {
    name: 'Detail',
    components: {
        ProductDetail
    },
    data() {
        return {
            id: this.id = this.$route.params.id,
            products: [],
            product: {}
        }
    },
    watch: {
        $route: function (val) {
            this.id = val.params.id;
            this.product = this.products.find(product => product.id == this.id);
            if (!this.product) {
                this.$router.push('/');
            }
        }
    },
    created: function () {
        console.log('created')
        if (!this.$store.state.products.length > 0) {
            axios
                .get("https://5c3c998d29429300143fe514.mockapi.io/api/v1/products")
                .then((res) => {
                    let products = res.data.map((product) => ({
                        ...product,
                        quantityInCart: 0
                    }));
                    this.$store.dispatch(
                        "setProducts",
                        products
                    );
                    this.products = products;
                    this.product = this.products.find(product => product.id == this.id);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.products = this.$store.state.products;
            this.product = this.products.find(product => product.id == this.id);
        }

    }
}
</script>
