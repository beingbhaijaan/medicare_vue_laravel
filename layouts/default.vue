<style>
    .preloader {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100vw;
        height: 100vh;
        z-index: 999999;
        background-color: #fafafa;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('/static/images/theme/preloader.gif');
    }
</style>

<template>
    <div id="wrapper" class="clearfix">

        <!-- <div class="preloader" v-if="loading || userLoading"></div> -->

        <Header :menuOpen="menuOpen" @toggleMenu="menuOpen = !menuOpen"/>

       <!-- <Sidebar :menuOpen="menuOpen" @toggleMenu="menuOpen = !menuOpen"/>--->

        <div id="content-index" @click="menuOpen = false">
            <nuxt/>
        </div> 

        <RegisterBar v-show="isGuest" @click="menuOpen = false"/>

        <Footer />

        <a href="#" class="back-to-top" id="back-to-top"><i class="fa fa-angle-up"></i></a>

    </div>
</template>

<script>
    import Header from '@/components/root/Header'
    import Sidebar from '@/components/root/Sidebar'
    import RegisterBar from '@/components/root/RegisterBar'
    import Footer from '@/components/root/Footer'
    import { mapActions, mapState } from 'vuex'
    import { isGuest } from '@/utils/auth'

    export default {
        name: 'Master',
        components: {
            Header,
            
            RegisterBar,
            Footer
        },
        data () {
            return {
                menuOpen: false
            }
        },
        computed: {
            ...mapState(['loading', 'userLoading']),
            isGuest () {
                if (process.browser) {
                    this.endUserLoading()
                    return isGuest(this.$store)
                }

                return true
            }
        },
        created () {
            this.initStore()
        },
        methods: {
            ...mapActions(['initStore', 'endUserLoading'])
        }
    }
</script>
