<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-light fixed-top" :class="{ 'bg-dark': !theme }">
    <router-link class="navbar-brand" to="/">Test_Frontend</router-link>
    <button class="navbar-toggler"  type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" :style="{backgroundColor: '#42b983'}"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto p-2">
            <li class="nav-item mr-4">
                <button @click="toggleTheme" class="btn btn-sm" :class="{'btn-dark': theme, 'btn-light': !theme}">
                    {{themeMessage}}
                </button>
            </li>
            <li class="nav-item mr-4">
                <router-link to="/">Home</router-link>
            </li>
            <li class="nav-item link-cart">
                <router-link to="/cart"><i class="fas fa-shopping-cart"></i></router-link>
                <span v-if="getCountCart > 0" class="count-cart bg-danger text-white text-center">{{ getCountCart }}</span>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        toggleTheme() {
            this.$store.commit('toggleTheme');
        }
    },
    computed: {
        getCountCart() {
            return this.$store.state.countCart;
        },
        theme() {
            return this.$store.state.themeLight;
        },
        themeMessage() {
            let message = this.$store.state.themeLight ? 'Dark' : 'Light';
            return message;
        }
    },
};
</script>

<style lang="scss" scoped>
.link-cart {
    i {
        position: relative;
    }

    .count-cart {
        position: absolute;
        top: 4px;
        right: 8px;
        width: 22px;
        height: 22px;
        border-radius: 100%;
    }
}
.nav-item {
    color: #42b983;
    text-align: end;
}

i {
    color: #42b983;
    font-size: 20px;
}

@media screen and (max-width: 991px) {

    .link-cart {
        padding: 12px;
        .count-cart {
            top: 110px;
            right: 21px;
        }
    }
}
</style>
