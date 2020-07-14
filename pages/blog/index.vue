<template>
    <section>
        <!-- Sub Page Banner
        ============================================= -->
        <Banner :content="page.name"/>

        <!-- Main section
        ============================================= -->
        <div class="container">
            <div class="row space_x5">

                <div class="col-xs-12 col-sm-8 col-md-7 blog-wrapper clearfix">

                    <h2 class="bordered light">Blog <span>Posts</span></h2>

                    <div class="space_x4 text-center" v-if="!hasRecords">
                        <i class="fa fa-rss fa-2x"></i>
                        <p class="f_size_16 m_top_10">No results found</p>
                    </div>

                    <article class="blog-item blog-full-width" v-for="post in posts" :key="post.id">
                        <nuxt-link :to="{ name: 'blog-reference', params: { reference: post.reference} }" class="blog-thumbnail">
                            <img alt="Title post" :src="renderURL(post.image)">
                        </nuxt-link>
                        <div class="blog-full-width-date">
                            <p class="day f_size_30">{{ post.publish_date | formatDate('DD')}}</p>
                            <p class="monthyear">{{ post.publish_date | formatDate('MMM YYYY')}}</p>
                        </div>
                        <div class="blog-content">
                            <nuxt-link class="blog-title" tag="h4" :to="{ name: 'blog-reference', params: { reference: post.reference} }">
                                {{ post.title }}
                            </nuxt-link>
                            <p>{{ post.summary }}</p>
                            <nuxt-link :to="{ name: 'blog-reference', params: { reference: post.reference} }" class="btn btn-default btn-mini btn-rounded m_top_15">
                                READ MORE
                            </nuxt-link>
                        </div>
                    </article>

                    <!-- Pagination
                    ============================================= -->
                    <nav class="custom_pagination text-center" v-if="hasRecords">
                        <ul class="pagination">
                            <li class="page-item" :disabled="currentPage === 1" @click="checkStep(-1)">
                                <button class="page-link" aria-label="Previous">
                                    <span><i class="fa fa-chevron-left"></i></span>
                                    <span class="sr-only">Previous</span>
                                </button>
                            </li>
                            <li :key="i" v-for="i in lastPage" class="page-item" :class="{ active : i == currentPage }" @click="setPage(i)"><button class="page-link">{{i}}</button></li>
                            <li class="page-item" :disabled="currentPage === lastPage" @click="checkStep(1)">
                                <button class="page-link" aria-label="Next">
                                    <span><i class="fa fa-chevron-right"></i></span>
                                    <span class="sr-only">Next</span>
                                </button>
                            </li>
                        </ul>
                    </nav>

                </div>

                <aside class="col-xs-12 col-sm-4 col-md-offset-1 col-md-4">

                    <!-- Search Post
                    ============================================= -->
                    <div class="sidebar-widget">
                        <h2 class="bordered light">Search <span>Post</span></h2>
                        <div class="search clearfix">
                            <input type="text" placeholder="Search..." v-model="search" @keyup.enter="doSearch">
                            <button type="button" class="search-icon" @click.prevent.stop="doSearch"><i class="fa fa-search"></i></button>
                        </div>
                    </div>
                    <div class="text-center">
                        <p v-if="searched">
                            Showing {{ posts.length }} of {{ total }} results for:
                            <strong class="color_green show m_top_5">{{ searched }}</strong>
                        </p>
                        <p v-else>Showing {{ posts.length }} of {{ total }} results</p>
                        <button v-if="searched" class="btn btn-default btn-mini btn-rounded float-none" @click.prevent.stop="clearSearch">
                            Clear search <i class="m_left_5 fa fa-times-circle"></i>
                        </button>
                    </div>

                    <!-- Categories Widget
                    ============================================= -->
                    <div class="sidebar-widget clearfix hidden">
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

                    <video style="width: 100%;" controls class="m_top_30">
                        <source src="movies/medical-promo-3.mp4" type="video/mp4">
                        Your browser does not support HTML5 video.
                    </video>

                </aside>
            </div>
        </div>

    </section>
</template>

<script>
    import Banner from '@/components/Banner'
    import LoadPage from '@/utils/mixins/loadPage'
    import EasyURL from '@/utils/mixins/easyURL'
    import { getPagedPosts } from '@/services'

    export default {
        name: 'Blog',
        components: { Banner },
        mixins: [LoadPage, EasyURL],
        data () {
            return {
                posts: [],
                currentPage: 1,
                lastPage: null,
                search: null,
                total: 0,
                searched: null,
            }
        },
        created () {
            this.getPosts()
        },
        computed: {
            hasRecords () {
                return this.posts.length > 0
            }
        },
        methods: {
            getPosts () {
                getPagedPosts(this.$axios, this.currentPage, { search: this.search, orderBy: 'publish_date', orderByDirection: 'desc' })
                    .then(({ data }) => {
                        this.posts = data.data
                        this.currentPage = data.current_page
                        this.lastPage = data.last_page
                        this.total = data.total
                    })
            },
            checkStep (step) {
                let page = this.currentPage + step

                if (page > 0 && page <= this.lastPage && page !== this.currentPage)
                    this.setPage(page)
            },
            setPage (page) {
                this.currentPage = page
                this.getPosts()
            },
            doSearch () {
                this.currentPage = 1
                this.searched = this.search
                this.getPosts()
            },
            clearSearch () {
                this.currentPage = 1
                this.searched = null
                this.search = null
                this.getPosts()
            }
        }
    }
</script>
