<template>
<table v-if="cart.length > 0" class="table">
    <thead>
        <tr>
            <th scope="col">Immagine</th>
            <th scope="col">Nome</th>
            <th scope="col">Prezzo unitario</th>
            <th scope="col">Quantità</th>
            <th scope="col">Promo</th>
            <th scope="col">Prezzo totale</th>
            <th scope="col">Azioni</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="product in cart" :key="product.id">
            <td scope="row">
                <img width="120" :src="product.image" :alt="product.name" />
            </td>
            <td>{{ product.name }}</td>
            <td>€ {{ product.price }}</td>
            <td>
                <select @change="changeQuantity($event, product.id)">
                    <template v-if="!product.promo_buy_one_get_one_free">
                        <option v-for="num in product.quantityInCart + 8" :value="num" :selected="num == product.quantityInCart" :key="num">
                            {{ num }}
                        </option>
                    </template>
                    <template v-else>
                        <option v-for="num in getEvenNumbers(product.quantityInCart + 8)" :value="num" :selected="num == product.quantityInCart" :key="num">
                            {{ num }}
                        </option>
                    </template>
                </select>
            </td>
            <td>
                <span v-if="!product.promo_buy_one_get_one_free">-</span>
                <span v-else>
                    <i class="fas fa-star"></i>
                    <h6>Due prodotti al prezzo di uno</h6>
                </span>
            </td>
            <td>€ {{ sumPrice(product) }}</td>
            <td>
                <button class="btn btn-danger" @click="removeFromCart(product.id)">
                    Rimuovi dal carrello
                </button>
            </td>
        </tr>
        <tr>
            <th>Totale carrello</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="font-weight-bold">€ {{ totalSumCart }}</td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    name: "TableCart",
    props: {
        cart: {
            type: Array,
            required: true,
            default: function () {
                return [];
            },
        },
        totalSumCart: {
            type: String,
        },
    },
    methods: {
        changeQuantity(event, id) {
            this.$emit("resetPrice", 0);
            let product = this.cart.find((product) => product.id == id);
            if (product) {
                console.log(event.target.value);
                product.quantityInCart = Number(event.target.value);
                this.$store.commit("changeQuantity", product);
                this.$store.commit("setCountCart");
            }
        },
        getEvenNumbers(numbers) {
            let evenNumbers = [];
            for (let i = 1; i <= numbers; i++) {
                const number = i;
                if (number % 2 == 0) {
                    evenNumbers.push(number);
                }
            }
            return evenNumbers;
        },
        sumPrice(product) {
            let sum = product.promo_buy_one_get_one_free ?
                (product.price * product.quantityInCart) / 2 :
                product.price * product.quantityInCart;
            return sum.toFixed(2);
        },
        removeFromCart(id) {
            this.$emit("resetPrice", 0);
            this.$emit(
                "setCart",
                this.cart.filter((product) => product.id != id)
            );
            this.$store.commit("removeFromCart", id);
            this.$store.commit("setCountCart");
        },
    },
};
</script>

<style scoped>
i {
    color: #fdcf49;
    font-size: 22px;
}
</style>
