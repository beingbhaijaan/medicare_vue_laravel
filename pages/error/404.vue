<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Error 404"/>

        <div class="container">
            <div class="error-text">
                <h1 class="f_size_60">404</h1>
                <h3 class="m_bottom_40">Page not found!</h3>
                <p>Oops! Sorry, an error has occured.</p>
                <nuxt-link :to="{ name: 'index' }" class="btn btn-default btn-rounded">go back to home</nuxt-link>
            </div>
        </div>

    </div>
</template>

<script>
    import Banner from '@/components/Banner'

    export default {
        name: 'Error404',
        components: { Banner },
        head () {
            return {
                title: 'Medicare | Error 404'
            }
        }
    }
</script>
