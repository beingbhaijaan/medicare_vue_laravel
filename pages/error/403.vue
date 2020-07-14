<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Error 403"/>

        <div class="container">
            <div class="error-text">
                <h1 class="f_size_60">403</h1>
                <h3 class="m_bottom_40">Forbidden!</h3>
                <p>You don't have permission to access.</p>
                <nuxt-link :to="{ name: 'index' }" class="btn btn-default btn-rounded">go back to home</nuxt-link>
            </div>
        </div>

    </div>
</template>

<script>
    import Banner from '@/components/Banner'

    export default {
        name: 'Error403',
        components: { Banner },
        head () {
            return {
                title: 'Medicare | Error 403'
            }
        }
    }
</script>
