<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
        <router-link class="navbar-brand" to="/">Test_Frontend</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto p-2">
                <li class="nav-item mr-3">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="nav-item link-cart">
                    <router-link to="/cart"><i class="fas fa-shopping-cart"></i></router-link>
                    <span v-if="getCountCart > 0" class="count-cart bg-danger text-white text-center">{{getCountCart}}</span>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    computed: {
        getCountCart() {
            return this.$store.state.countCart;
        }
    }
}
</script>

<style scoped lang="scss">
    .link-cart {
        position: relative;

        .count-cart {
            position: absolute;
            top: -10px;
            right: -12px;
            width: 22px;
            height: 22px;
            border-radius: 100%;
        }
    }

    i {
        font-size: 20px;
    }
</style>