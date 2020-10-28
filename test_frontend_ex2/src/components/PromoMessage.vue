<template>
<div role="dialog" :style="promoStyle">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    Solo per un periodo limitato !
                    <span id="promo-icon">
                        <i class="fas fa-certificate"></i>
                        <span class="x2 text-danger">x2</span>
                    </span>
                </h5>
                <button @click="showMessage = !showMessage" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Approfitta dell'offerta <b>x2</b> su alcuni prodotti</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'PromoMessage',
    data() {
        return {
            promoStyle: {
                position: "fixed",
                top: "-50px",
                left: 0,
                zIndex: "-10",
                opacity: 0,
                transition: "all 0.7s linear"
            }
        }
    },
    props: {
        'showMessage': {
            type: Boolean,
            default: function () {
                return false;
            }
        }
    },
    watch: {
        showMessage: function (val) {
            console.log(val)
            this.promoStyle.top = val ? '27px' : '-50px';
            this.promoStyle.zIndex = val ? 15 : '-10';
            this.promoStyle.opacity = val ? 1 : 0;
        }
    }
}
</script>

<style lang="scss" scoped>
#promo-icon {
    color: #fdcf49;
    font-size: 45px;
    position: relative;

    .x2 {
        font-size: 22px;
        position: absolute;
        top: 11px;
        left: 10px;
    }
}
</style>
