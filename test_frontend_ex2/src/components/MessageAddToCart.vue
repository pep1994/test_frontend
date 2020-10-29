<template>
<div v-show="show" class="alert alert-success text-success message-cart" role="alert">
    {{ nameProduct }}
</div>
</template>

<script>
export default {
    name: 'MessageAddToCart',
    props: {
        show: {
            type: Boolean,
            default: function() {
                return false;
            }
        },
        nameProduct: {
            type: String,
            default: function() {
                return "";
            }
        }
    }

}
</script>

<style scoped>
.message-cart {
    position: fixed;
    top: 75px;
    right: 15px;
    width: 180px;
    z-index: 11;
}
</style>
