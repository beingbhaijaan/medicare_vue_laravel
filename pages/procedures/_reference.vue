<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner :content="procedure ? procedure.name : 'Procedures'"/>

        <div class="space_x5" v-if="procedure">
            <div class="container">
                <div class="row">

                    <!-- Content Procedures
                    ============================================= -->
                    <div class="col-xs-12 col-sm-7 blog-wrapper clearfix">
                        <article class="blog-item blog-full-width blog-detail" id="procedure">
                            <div class="blog-thumbnail m_bottom_20">
                                <img :src="renderURL(procedure.image)" :alt="procedure.name">
                            </div>
                            <div class="big-font p_bottom_30" v-html="procedure.content"></div>

                            <!-- Go to www.addthis.com/dashboard to customize your tools -->
                            <mdcr-addthis />
                        </article>
                    </div>

                    <!-- Form Procedures
                    ============================================= -->
                    <div class="col-xs-12 col-sm-5 col-md-offset-1 col-md-4">
                        <affix class="sidebar-menu" relative-element-selector="#procedure" style="width: 340px;">
                            <h2 class="bordered light">Get a <span>Free Quote</span></h2>
                            <ContactForm type="procedure" :procedure="procedure.name" :contentLabel="'Tell us your concerns or doubts about ' + procedure.name + '...'"/>
                        </affix>
                    </div>

                </div>
            </div>
        </div>

        <!-- Related Procedures
        ============================================= -->
        <section class="space_x5 bg_light" v-if="procedures.length">
            <div class="padding_15 slide_procedures text-center">
                <h2 class="light m_bottom_40">Related <span>Procedures</span></h2>
                <Swiper instanceName="procedures" :options="proceduresOptions" :slides="related" :hideNavigation="true" type="profile"/>
            </div>
        </section>

    </div>
</template>

<script>
    import ContactForm from '@/components/ContactForm'
    import Banner from '@/components/Banner'
    import Swiper from '@/components/swipers/Main'
    import EasyURL from '@/utils/mixins/easyURL'
    import { getProcedureByReference, getRelatedProcedures } from '@/services'

    export default {
        name: 'ProceduresReference',
        components: { ContactForm, Banner, Swiper },
        mixins: [EasyURL],
        data () {
            return {
                procedure: null,
                procedures: [],
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
            related () {
                if (this.procedures)
                    return this.procedures.map(item => ({
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
            this.getProcedure()
            this.getRelated()
        },
        methods: {
            getProcedure () {
                this.loading = true
                getProcedureByReference(this.$axios, this.$route.params.reference)
                    .then(({ data }) => {
                        this.procedure = data
                    })
                    .catch(error => {console.log(error)})
                    .then(() => { this.loading = false })
            },
            getRelated () {
                this.loading = true
                getRelatedProcedures(this.$axios, this.$route.params.reference)
                    .then(({ data }) => {
                        this.procedures = data
                    })
                    .catch(error => {console.log(error)})
                    .then(() => { this.loading = false })
            }
        },
        head () {
            if (this.procedure)
                return {
                    title: `Procedures | ${this.procedure.name}`,
                    meta: [
                        { hid: 'description', name: 'description', content: this.procedure.summary },
                        // Open graph meta tags
                        { hid: 'og:title', name: 'og:title', content: `Procedures | ${this.procedure.name}` },
                        { hid: 'og:description', name: 'og:description', content: this.procedure.summary },
                        { hid: 'og:image', name: 'og:image', content: this.renderURL(this.procedure.image) },
                        { hid: 'og:url', name: 'og:url', content: `${process.env.stagingURL}/procedures/${this.procedure.reference}` },
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
                title: 'Procedures |',
                meta: [
                    { hid: 'description', name: 'description', content: 'Medicare procedure is being loaded' },
                    // Open graph meta tags
                    { hid: 'og:title', name: 'og:title', content: 'Blog |' },
                    { hid: 'og:description', name: 'og:description', content: 'Medicare procedure is being loaded' },
                    { hid: 'og:image', name: 'og:image', content: `${process.env.stagingURL}/images/medicare-share.jpg` },
                    { hid: 'og:url', name: 'og:url', content: `${process.env.stagingURL}/procedures` },
                    { hid: 'og:type', name: 'og:type', content: 'article' },
                    { hid: 'og:locale', name: 'og:locale', content: 'en_US' },
                    // Twitter meta tags
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
                    // awaiting medicare twitter account
                    // { hid: 'twitter:site', name: 'twitter:site', content: '@medicare' },
                    // { hid: 'twitter:creator', name: 'twitter:creator', content: '@medicare' },
                ]
            }
        }
    }
</script>
