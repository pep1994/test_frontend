<template>
<div role="dialog" :style="styleModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header" :class="{'bg-dark': !theme}">
                <h5 class="modal-title">Attenzione</h5>
                <button :style="{color: returnTheme.syntax}" @click="showModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" :class="{'bg-dark': !theme}">
                <p>Vuoi davvero svuotare il carrello?</p>
            </div>
            <div class="modal-footer" :class="{'bg-dark': !theme}">
                <button @click="emptyCart" type="button" class="btn btn-danger" data-dismiss="modal">
                    Svuota
                </button>
                <button @click="showModal" type="button" class="btn btn-secondary">
                    Annulla
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Modal",
    data() {
        return {
            show: false,
        };
    },
    props: {
        showModal: {
            type: Function,
        },
        styleModal: {
            type: Object,
            default: function () {
                return {
                    position: "fixed",
                    top: 0,
                    left: "50%",
                    zIndex: "-10",
                    opacity: 0,
                    transition: "all 0.4s linear",
                    transform: "translate(-50%, -50%)",
                };
            },
        },
    },
    methods: {
        emptyCart() {
            this.showModal();
            this.$emit("resetPriceAndCart");
            this.$store.commit("emptyCart");
            this.$store.commit("setCountCart");
        },
    },
    computed: {
        theme() {
            return this.$store.state.themeLight;
        },
        returnTheme() {
            let theme = this.$store.state.themeLight ? this.$store.state.light : this.$store.state.dark;
            return theme;
        }
    }
};
</script>
