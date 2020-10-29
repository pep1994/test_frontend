<template>
    <ProductDetail :product="product"></ProductDetail>
</template>

<script>
import ProductDetail from '@/components/ProductDetail.vue';

export default {
    name: 'Detail',
    components: {
      ProductDetail
    },
    data() {
        return {
            id: "",
            product: ""
        }
    },
    created: function () {
        this.id = this.$route.params.id;
        this.product = this.$store.state.products.find(product => product.id == this.id);
    }
}
</script>
