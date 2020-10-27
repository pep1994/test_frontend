<template>
    <div class="cart">

        <div role="dialog" :style="{position: styleModal.position, top: styleModal.top, left: styleModal.left, zIndex: styleModal.zIndex, opacity: styleModal.opacity, transition: styleModal.transition, transform: styleModal.translate}">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Attenzione</h5>
                        <button @click="showModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Vuoi davvero svuotare il carrello?</p>
                    </div>
                    <div class="modal-footer">
                        <button @click="emptyCart" type="button" class="btn btn-danger" data-dismiss="modal">Svuota</button>
                        <button @click="showModal" type="button" class="btn btn-secondary">Annulla</button>
                    </div>
                </div>
            </div>
        </div>

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
                    <img width="120" :src="product.image" :alt="product.name">
                </td>
                <td>{{product.name}}</td>
                <td>€ {{product.price}}</td>
                <td>
                    <select @change="changeQuantity($event, product.id)">
                        <template v-if="!product.promo_buy_one_get_one_free">
                            <option  v-for="num in product.quantityInCart + 8" :value="num" :selected="num == product.quantityInCart" :key="num">
                                {{ num }}
                            </option>
                        </template>
                        <template v-else>
                            <option  v-for="num in getEvenNumbers(product.quantityInCart + 8)" :value="num" :selected="num == product.quantityInCart" :key="num">
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
                <td>
                    € {{ sumPrice(product) }}
                </td>
                <td>
                    <button class="btn btn-danger" @click="removeFromCart(product.id)">Rimuovi dal carrello</button>
                </td>
                </tr>
                <tr>
                    <th>Totale carrello</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="font-weight-bold">€ {{totalSumCart}}</td>
                </tr>
            </tbody>
        </table>

        <div v-if="cart.length > 0" class="d-flex justify-content-center">
            <button @click="showModal" class="btn btn-lg btn-danger">Svuota carrello</button>
        </div>

        <template v-else>
            <div class="alert alert-danger text-danger text-center">Il carrello è vuoto</div>
            <router-link to="/" class="btn btn-lg btn-warning text-info">Inizia lo shopping</router-link>
        </template>

    </div>
</template>

<script>
export default {
    data() {
        return {
            cart: [],
            totalPrice: 0,
            show: false,
            styleModal: {
                position: 'fixed',
                top: 0,
                left: '50%',
                zIndex: '-10',
                opacity: 0,
                transition: 'all 0.4s linear',
                translate: 'translate(-50%, -50%)'
            }
        }
    },
    methods: {
      getCart() {
          this.cart = this.$store.state.cart;
          console.log(this.cart)
      },
      changeQuantity(event, id) {
          this.totalPrice = 0;
          let product = this.cart.find(product => product.id == id);
          if (product) {
              console.log(event.target.value)
              product.quantityInCart = Number(event.target.value);
              this.$store.commit('changeQuantity', product);
              this.$store.commit('setCountCart');
          }
      },
      sumPrice(product) {
          let sum = product.promo_buy_one_get_one_free ? (product.price * product.quantityInCart) / 2 : product.price * product.quantityInCart;
          return sum.toFixed(2);
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
        removeFromCart(id) {
            this.totalPrice = 0;
            this.cart = this.cart.filter(product => product.id != id);
            this.$store.commit('removeFromCart', id);
            this.$store.commit('setCountCart');
        },
        showModal() {
            this.show = !this.show;
            this.styleModal.top = this.show ? '50%' : 0;
            this.styleModal.zIndex = this.show ? 15 : '-10';
            this.styleModal.opacity = this.show ? 1 : 0;
        },
        emptyCart() {
            this.showModal();
            this.totalPrice = 0;
            this.cart = [];
            this.$store.commit('emptyCart');
            this.$store.commit('setCountCart');
        }
    },
    computed: {
        totalSumCart() {
            this.cart.forEach(product => {
                this.totalPrice += product.promo_buy_one_get_one_free ? (product.price * product.quantityInCart) / 2 : product.price * product.quantityInCart;
            })
            return this.totalPrice.toFixed(2);
        }

    },
    created: function() {
        this.getCart();
    }
}
</script>

<style lang="scss" scoped>
    i {
        color: #FDCF49;
        font-size: 22px;
    }
</style>
