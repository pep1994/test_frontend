<template>
<div  class="animate-container d-flex justify-content-center align-items-center">
    <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        'show': {
            type: Boolean,
            required: true,
            default: function () {
                return false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.animate-container {
    width: 300px;
    margin: 350px auto;

    div {
        width: 100px;
        height: 100px;
        position: relative;

        span {
            position: absolute;
            display: inline-block;
            width: 10px;
            height: 5px;
            background-color: #8e23f9;
            animation-name: animate-loading;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;

            &:first-child {
                top: 0;
                left: 15px;
            }

            &:nth-child(2) {
                top: 0;
                left: 28px;
                animation-delay: 0.4s;
            }

            &:nth-child(3) {
                top: 0;
                left: 41px;
                animation-delay: 0.6s;
            }

            &:nth-child(4) {
                top: 0;
                left: 54px;
                animation-delay: 0.8s;
            }

            &:nth-child(5) {
                top: 0;
                left: 67px;
                animation-delay: 1s;
            }
        }
    }

}

@keyframes animate-loading {
    0% {
        height: 5px;
        background-color: #8e23f9;
        transform: translateY(0);
    }

    20% {
        height: 40px;
        background-color: #3498db;
        transform: translateY(-20px);
    }

    50% {
        height: 5px;
        background-color: #8e23f9;
        transform: translateY(0);
    }

    100% {
        height: 5px;
        background-color: #8e23f9;
        transform: translateY(0);
    }
}
</style>
