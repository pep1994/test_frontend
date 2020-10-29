<template>
<div>
    <ErrorAlert v-if="error" :errorMessage="printErrorMessage"></ErrorAlert>
    <ProductDetail v-else :product="product"></ProductDetail>
</div>
</template>

<script>
import ProductDetail from '@/components/ProductDetail.vue';
import ErrorAlert from '@/components/ErrorAlert.vue'

export default {
    name: 'Detail',
    components: {
        ProductDetail,
        ErrorAlert
    },
    data() {
        return {
            id: this.id = this.$route.params.id,
            products: [],
            product: {},
            error: false,
            errorMessage: ""
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
    computed: {
        printErrorMessage() {
            return this.errorMessage;
        }
    },
    created: function () {
        console.log('created')
        if (!this.$store.state.products.length > 0) {
            this.$store.dispatch('fetchProducts').then(() => {
                    this.error = false;
                    this.products = this.$store.state.products;
                    this.product = this.products.find(product => product.id == this.id);
                })
                .catch(err => {
                    this.error = true;
                    this.errorMessage = err;
                })
        } else {
            this.products = this.$store.state.products;
            this.product = this.products.find(product => product.id == this.id);
        }
    }
}
</script>
