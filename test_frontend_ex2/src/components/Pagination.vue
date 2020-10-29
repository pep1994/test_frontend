<template>
<nav v-if="!loading && totalPages > 1" aria-label="Page navigation" class="d-flex justify-content-center mt-2">
    <ul class="pagination">

        <li v-if="currentPage > 1" class="page-item">
            <a class="page-link" @click="paginate(currentPage - 1)">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>

        <template v-for="n in totalPages">
            <li v-if="Math.abs(n - currentPage) < 3
            || n == totalPages || n == 1" :key="n" :class="{active: activeClass(n)}" class="page-item">
                <a class="page-link" @click="paginate(n)">{{n}}</a>
            </li>
        </template>

        <li v-if="currentPage < totalPages" class="page-item">
            <a class="page-link" @click="paginate(currentPage + 1)">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>

    </ul>
</nav>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        loading: {
            type: Boolean
        },
        paginate: {
            type: Function
        },
        totalPages: {
            type: Number
        },
        currentPage: {
            type: Number
        },
        activeClass: {
            type: Function
        }
    }
}
</script>

<style>

</style>
