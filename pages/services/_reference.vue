<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner :content="service ? service.title : 'Services'"/>

        <!-- Content Service
        ============================================= -->
        <div class="space_x5 " v-if="service" >
            <article class="container big-font">
                <div v-html="service.content"></div>
            </article>
        </div>

        <!-- Procedures
        ============================================= -->
        <section class="space_x5 bg_light" v-if="procedures.length">
            <div class="padding_15 slide_procedures text-center">
                <h2 class="light m_bottom_40">Related <span>Procedures</span></h2>
                <Swiper instanceName="procedures" :options="proceduresOptions" :slides="procedures" :hideNavigation="true" type="profile"/>
            </div>
        </section>

    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import Swiper from '@/components/swipers/Main'
    import EasyURL from '@/utils/mixins/easyURL'
    import { getServiceByReference } from '@/services'

    export default {
        name: 'ServicesReference',
        components: { Banner, Swiper },
        mixins: [EasyURL],
        data () {
            return {
                service: null,
                loading: false,
                loadingRecent: false,
                proceduresOptions: {
                    loop: false,
                    centeredSlides: false,
                    spaceBetween: 30,
                    breakpoints: {
                        320: {
                            slidesPerView: 1
                        },
                        640: {
                            slidesPerView: 2
                        },
                        960: {
                            slidesPerView: 3
                        },
                        1270: {
                            slidesPerView: 4
                        },
                        1590: {
                            slidesPerView: 5
                        },
                        1910: {
                            slidesPerView: 6
                        },
                        2230: {
                            slidesPerView: 7
                        }
                    }
                }
            }
        },
        computed: {
            procedures () {
                if (this.service)
                    return this.service.procedures.map(item => ({
                        image: item.image,
                        name: item.name,
                        content: item.summary,
                        buttons: [{
                            to: { name: 'procedures-reference', params: { reference: item.reference } },
                            text: 'Read more'
                        }]
                    }))

                return []
            }
        },
        created () {
            this.getService()
        },
        methods: {
            getService () {
                this.loading = true
                getServiceByReference(this.$axios, this.$route.params.reference)
                    .then(({ data }) => {
                        this.service = data
                    })
                    .catch(error => {console.log(error)})
                    .then(() => { this.loading = false })
            }
        },
        head () {
            if (this.service)
                return {
                    title: `Services | ${this.service.title}`,
                    meta: [
                        { hid: 'description', name: 'description', content: this.service.summary },
                        // Open graph meta tags
                        { hid: 'og:title', name: 'og:title', content: `Services | ${this.service.title}` },
                        { hid: 'og:description', name: 'og:description', content: `This service section is designed for explaining ${this.service.name}` },
                        { hid: 'og:image', name: 'og:image', content: `${process.env.stagingURL}/images/medicare-share.jpg` },
                        { hid: 'og:url', name: 'og:url', content: `${process.env.stagingURL}/services/${this.service.reference}` },
                        { hid: 'og:type', name: 'og:type', content: 'article' },
                        { hid: 'og:locale', name: 'og:locale', content: 'en_US' },
                        // Twitter meta tags
                        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
                        // awaiting medicare twitter account
                        // { hid: 'twitter:site', name: 'twitter:site', content: '@medicare' },
                        // { hid: 'twitter:creator', name: 'twitter:creator', content: '@medicare' },
                    ]
                }

            return {
                title: 'Services |',
                meta: [
                    { hid: 'description', name: 'description', content: 'Medicare service is being loaded' },
                    // Open graph meta tags
                    { hid: 'og:title', name: 'og:title', content: 'Services |' },
                    { hid: 'og:description', name: 'og:description', content: 'Medicare service is being loaded' },
                    { hid: 'og:image', name: 'og:image', content: `${process.env.stagingURL}/images/medicare-share.jpg` },
                    { hid: 'og:url', name: 'og:url', content: `${process.env.stagingURL}/services` },
                    { hid: 'og:type', name: 'og:type', content: 'article' },
                    { hid: 'og:locale', name: 'og:locale', content: 'en_US' },
                    // Twitter meta tags
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
                    // awaiting medicare twitter account
                    // { hid: 'twitter:site', name: 'twitter:site', content: '@medicare' },
                    // { hid: 'twitter:creator', name: 'twitter:creator', content: '@medicare' },
                ]
            }
        },
        head () {
            return {
                title: this.service ? `Services | ${this.service.menu_title}` : 'Services |'
            }
        }
    }
</script>
