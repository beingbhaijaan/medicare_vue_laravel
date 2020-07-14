<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner :content="!loading ? post.title : 'Details'"/>

        <!-- Main section
        ============================================= -->
        <div class="container" v-if="!loading">
            <div class="row space_x5">

                <div class="col-xs-12 col-sm-8 col-md-7 blog-wrapper clearfix">

                    <h2 v-if="post.subtitle" class="bordered light">{{ post.subtitle }}</h2>

                    <article class="blog-item blog-full-width blog-detail">
                        <div class="blog-thumbnail m_bottom_20">
                            <img alt="" :src="renderURL(post.image)">
                            <div class="blog-date">
                                <p class="day f_size_30">{{ post.publish_date | formatDate('DD') }}</p>
                                <p class="monthyear">{{ post.publish_date | formatDate('MMM YYYY') }}</p>
                            </div>
                        </div>
                        <div class="big-font p_bottom_30" v-html="post.content"></div>

                        <!-- Go to www.addthis.com/dashboard to customize your tools -->
                        <mdcr-addthis />

                    </article>

                </div>

                <aside class="col-xs-12 col-sm-4 col-md-offset-1 col-md-4">

                    <!-- Search Widget
                    ============================================= -->
                    <div class="sidebar-widget" hidden>
                        <h2 class="bordered light">Search <span>Post</span></h2>
                        <div class="search clearfix m_bottom_40">
                            <form method="get" action="#.">
                                <input type="text" placeholder="Search...">
                                <button type="submit" class="search-icon"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                    </div>

                    <!-- Categories Widget
                    ============================================= -->
                    <div class="sidebar-widget clearfix" hidden>
                        <h2 class="bordered light">Categories</h2>
                        <ul class="tags">
                            <li><a href="#.">Dental Clinic</a></li>
                            <li><a href="#.">Heart Specialist</a></li>
                            <li><a href="#.">Eye Specialist</a></li>
                            <li><a href="#.">Dental Clinic</a></li>
                            <li><a href="#.">Heart Specialist</a></li>
                            <li><a href="#.">Eye Specialist</a></li>
                            <li><a href="#.">Dental Clinic</a></li>
                            <li><a href="#.">Heart Specialist</a></li>
                            <li><a href="#.">Eye Specialist</a></li>
                        </ul>
                    </div>

                    <!-- Recent Posts Widget
                    ============================================= -->
                    <div class="sidebar-widget light">
                        <h2 class="bordered light">Recent <span>posts</span></h2>
                        <div class="popular-post clearfix d_flex" v-for="item in recent" :key="item.reference">
                            <nuxt-link :to="{ name: 'blog-reference', params: { reference: item.reference } }">
                                <img :src="renderURL(item.image)" :alt="item.title">
                            </nuxt-link>
                            <nuxt-link class="f_size_16 d_flex align_center" :to="{ name: 'blog-reference', params: { reference: item.reference } }">{{ item.title }}</nuxt-link>
                        </div>
                    </div>

                    <div class="text-center">
                        <nuxt-link :to="{ name: 'blog' }" class="btn btn-default btn-sm"><i class="fa fa-rss m_right_5"></i>View all posts</nuxt-link>
                    </div>

                </aside>
            </div>
        </div>

    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import EasyURL from '@/utils/mixins/easyURL'
    import { getPostByReference, getRecentPosts } from '@/services'

    export default {
        name: 'BlogDetail',
        components: { Banner },
        mixins: [EasyURL],
        data () {
            return {
                post: null,
                recent: [],
                loading: false,
                loadingRecent: false
            }
        },
        created () {
            this.getPost()
            this.getRecent()
        },
        methods: {
            getPost () {
                this.loading = true
                getPostByReference(this.$axios, this.$route.params.reference)
                    .then(({ data }) => {
                        this.post = data
                    })
                    .catch(error => {console.log(error)})
                    .then(() => { this.loading = false })
            },
            getRecent () {
                this.loadingRecent = true
                getRecentPosts(this.$axios, { take: 3, orderBy: 'publish_date', orderByDirection: 'desc', except: this.$route.params.reference, exceptField: 'reference' })
                    .then(({ data }) => {
                        this.recent = data
                    })
                    .catch(error => {console.log(error)})
                    .then(() => { this.loadingRecent = false })
            }
        },
        head () {
            if (this.post)
                return {
                    title: `Blog | ${this.post.title}`,
                    meta: [
                        { hid: 'description', name: 'description', content: this.post.summary },
                        // Open graph meta tags
                        { hid: 'og:title', name: 'og:title', content: `Blog | ${this.post.title}` },
                        { hid: 'og:description', name: 'og:description', content: this.post.summary },
                        { hid: 'og:image', name: 'og:image', content: this.renderURL(this.post.image) },
                        { hid: 'og:url', name: 'og:url', content: `${process.env.stagingURL}/blog/${this.post.reference}` },
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
                title: 'Blog |',
                meta: [
                    { hid: 'description', name: 'description', content: 'Medicare blog post is being loaded' },
                    // Open graph meta tags
                    { hid: 'og:title', name: 'og:title', content: 'Blog |' },
                    { hid: 'og:description', name: 'og:description', content: 'Medicare blog post is being loaded' },
                    { hid: 'og:image', name: 'og:image', content: `${process.env.stagingURL}/images/medicare-share.jpg` },
                    { hid: 'og:url', name: 'og:url', content: `${process.env.stagingURL}/blog` },
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
