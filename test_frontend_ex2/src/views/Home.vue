<template>
<div class="home pt-5" :style="{backgroundColor: returnTheme.bg}">
    <div class="container">

        <PromoMessage :showMessage="showPromo"></PromoMessage>

        <div class="title text-center text-dark">
            <h1 :style="{color: returnTheme.syntax}">I miglior prodotti al miglior prezzo</h1>
        </div>

        <ErrorAlert v-if="error" :errorMessage="printErrorMessage"></ErrorAlert>

        <Product v-if="!error || !loading" :products="products"></Product>

        <Loading :showLoading="loading"></Loading>

        <Pagination :loading="loading" :totalPages="totalPages" :currentPage="currentPage" :paginate="paginate" :activeClass="activeClass">
        </Pagination>

    </div>
</div>
</template>

<script>
import Product from "@/components/Product.vue";
import Loading from "@/components/Loading.vue";
import PromoMessage from "@/components/PromoMessage.vue";
import ErrorAlert from '@/components/ErrorAlert.vue'
import Pagination from '@/components/Pagination.vue'

export default {
    name: "Home",
    components: {
        Product,
        Loading,
        PromoMessage,
        ErrorAlert,
        Pagination
    },
    data() {
        return {
            products: [],
            error: false,
            loading: false,
            showPromo: false,
            errorMessage: "",
            totalPages: 0,
            currentPage: 0,
            limit: 6,
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
        },
        paginate(page) {
            let pageNumber = page ? page : 1;
            let offset = (pageNumber - 1) * this.limit;
            this.products = this.$store.state.products.slice(offset, (pageNumber * this.limit));
            this.totalPages = Math.ceil(this.$store.state.products.length / this.limit);
            this.currentPage = pageNumber;
        },
        activeClass(n) {
            return n == this.currentPage;
        }
    },
    computed: {
        printErrorMessage() {
            return this.errorMessage;
        },
        returnTheme() {
            let theme = this.$store.state.themeLight ? this.$store.state.light : this.$store.state.dark;
            return theme;
        }
    },
    created: function () {
        if (!this.$store.state.products.length > 0) {
            this.loading = true;
            this.$store.dispatch('fetchProducts').then(() => {
                    this.paginate();
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
            this.paginate();
        }
    }
};
</script>

<style lang="scss" scoped>
a.last::before {
    content: "...";
}

a.first::after {
    content: "...";
}
</style>
