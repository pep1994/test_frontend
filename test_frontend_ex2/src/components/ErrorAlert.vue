<template>
<div class="alert alert-danger text-danger text-center">
    {{ errorMessage }}
</div>
</template>

<script>
export default {
    name: 'ErrorAlert',
    props: {
        errorMessage: {
            type: String,
            default: function() {
                return "Errore";
            }
        }
    }
}
</script>
