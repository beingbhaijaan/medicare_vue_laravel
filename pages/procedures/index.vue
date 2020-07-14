<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Procedures"/>

        <!-- Main section
        ============================================= -->
        <div class="container">

            <div class="space_x5">

                <!-- Search Procedures
                ============================================= -->
                <div class="sidebar-widget">
                    <h2 class="bordered light">Search <span>Procedures</span></h2>
                    <div class="bg_light padding_10 clearfix m_bottom_20">
                        <form @submit.prevent.stop="doSearch()" class="d_flex align_center wrap_sm">
                            <input v-model="filters.search" type="text" placeholder="Search..." class="margin_5">
                            <div class="select margin_5 m_bottom_5">
                                <select v-model="filters.service_reference" class="margin_0">
                                    <option value="">Select a service</option>
                                    <option v-for="service in services" :value="service.reference" :key="service.reference">{{ service.menu_title }}</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-default btn-md f_size_12 margin_5"><i class="fa fa-search m_right_10"></i> Search</button>
                        </form>
                    </div>
                </div>

                <!-- List Procedures
                ============================================= -->
                <div class="row slide_procedures list_procedures text-center">
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="procedure in procedures" :key="procedure.id">
                        <nuxt-link :to="{ name: 'procedures-reference', params: { reference: procedure.reference } }">
                            <div class="img_slide" :style="`background-image: url(${procedure.image ? renderURL(procedure.image) : 'http://placehold.jp/800x520.png'});`"></div>
                        </nuxt-link>
                        <h4>
                            <nuxt-link :to="{ name: 'procedures-reference', params: { reference: procedure.reference } }">{{ procedure.name }}</nuxt-link>
                            <span class="f_size_12">{{ procedure.service.menu_title }}</span>
                        </h4>
                        <p>{{ procedure.summary }}</p>
                        <nuxt-link :to="{ name: 'procedures-reference', params: { reference: procedure.reference } }" class="btn btn-default">Read more</nuxt-link>
                    </div>
                    <div class="col-xs-12" v-if="!hasRecords && !loading">
                        <div class="space_x4 text-center">
                            <i class="fa fa-exclamation-triangle fa-2x"></i>
                            <p class="f_size_16 m_top_10">No procedure found</p>
                        </div>
                    </div>
                </div>

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
        </div>

    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import { mapGetters } from 'vuex'
    import { getPagedProcedures } from '@/services'
    import EasyURL from '@/utils/mixins/easyURL'

    export default {
        name: 'Procedures',
        components: { Banner },
        mixins: [EasyURL],
        data () {
            return {
                loading: false,
                procedures: [],
                currentPage: 1,
                lastPage: null,
                filters: {
                    service_reference: '',
                    search: null,
                    with: 'service'
                }
            }
        },
        computed: {
            ...mapGetters({ services: 'getServiceWithProcedures' }),
            hasRecords () {
                return this.procedures.length > 0
            }
        },
        created () {
            this.retriveProcedures()
        },
        methods: {
            retriveProcedures () {
                this.loading = true

                getPagedProcedures(this.$axios, this.currentPage, this.filters)
                    .then(({ data }) => {
                        this.currentPage = data.current_page
                        this.lastPage = data.last_page
                        this.procedures = data.data
                    })
                    .catch(error => { console.log(error) })
                    .then(() => { this.loading = false })
            },
            checkStep (step) {
                let page = this.currentPage + step

                if (page > 0 && page <= this.lastPage && page !== this.currentPage)
                    this.setPage(page)
            },
            setPage (page) {
                this.currentPage = page
                this.retriveProcedures()
            },
            doSearch () {
                this.currentPage = 1
                this.retriveProcedures()
            }
        }
    }
</script>
