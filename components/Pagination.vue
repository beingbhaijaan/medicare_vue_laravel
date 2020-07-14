<template>
    <nav class="custom_pagination text-center m_top_30">
        <ul class="pagination">
            <li :class="`page-item ${(currentPage === 1) ? 'disabled' : null}`" @click="checkPage(currentPage - 1)">
                <button aria-label="Previous" class="page-link">
                    <span><i class="fa fa-chevron-left"></i></span>
                    <span class="sr-only">Previous</span>
                </button>
            </li>
            <li :key="i" v-for="i in lastPage" :class="`page-item ${(i === currentPage) ? 'active' : null}`"  @click="checkPage(i)"><button class="page-link">{{i}}</button></li>
            <li :class="`page-item ${(currentPage === lastPage) ? 'disabled' : null}`"  @click="checkPage(currentPage + 1)">
                <button aria-label="Next" class="page-link">
                    <span><i class="fa fa-chevron-right"></i></span>
                    <span class="sr-only">Next</span>
                </button>
            </li>
        </ul>
    </nav>
</template>
<style lang="scss">
    .page-item.active .page-link{
        background-color: #2ccdac;
        border-color: #2ccdac;
    }
    .page-item .page-link{
        color: #2ccdac;
    }
</style>
<script>
    export default {
        name: 'Pagination',
        props: ['currentPage', 'lastPage'],
        methods: {
            checkPage (page) {
                if (page > 0 && page <= this.lastPage && page !== this.currentPage)
                    this.$emit('page', page)
            }
        }
    }
</script>
