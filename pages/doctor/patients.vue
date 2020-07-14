<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Patients"/>

        <!-- Main section
        ============================================= -->
        <div class="container">

            <div class="space_x5">

                <!-- Search Patients
                ============================================= -->
                <div class="sidebar-widget">
                    <h2 class="bordered light">Search <span>Patients</span></h2>
                    <div class="bg_light padding_10 clearfix">
                        <form class="d_flex align_center wrap_sm" @submit.prevent="search">
                            <input type="text" placeholder="Search by name, MRN ..." class="margin_5" v-model="filter.search">
                            <div class="select margin_5 m_bottom_5">
                                <select class="margin_0" v-model="filter.country_id">
                                    <option value="">Select a country</option>
                                    <option :value="country.id" v-for="country in countries" :key="country.id">{{ country.name }}</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-default btn-md f_size_12 margin_5"><i class="fa fa-search m_right_10"></i> Search</button>
                        </form>
                    </div>
                </div>

                <!-- Status Patients
                ============================================= -->
                <nav class="list_radio m_bottom_30">
                    <label>
                        <input type="radio" v-bind:value="'all'" v-model="filter.status">
                        <span>
                            All
                        </span>
                    </label>
                    <label>
                        <input type="radio" v-bind:value="0" v-model="filter.status">
                        <span>
                            Pending approval
                            <span class="badge badge-primary">{{ countPatients(false) }}</span>
                        </span>
                    </label>
                    <label>
                        <input type="radio" v-bind:value="1" v-model="filter.status">
                        <span>
                            Authorized
                            <span class="badge badge-primary">{{ countPatients() }}</span>
                        </span>
                    </label>
                </nav>

                <!-- List Doctors
                ============================================= -->
                <div class="list_items" v-if="!loading">
                    <div v-for="item in data" :key="item.id">
                        <div class="flag">
                            <span class="pending" v-if="!checkAuthorization(item.id).approved">Pending</span>
                            <span v-if="checkAuthorization(item.id).approved">Authorized</span>
                        </div>
                        <nuxt-link :to="{ name: 'patient-profile-mrn', params: {mrn: item.mrn} }" v-if="checkAuthorization(item.id).approved">
                            <div class="avatar avatar_patient m_bottom_10" :style="`${item.avatar ? `background-image: url( ${renderURL(item.avatar)});` : ''}`"></div>
                        </nuxt-link>
                        <div class="avatar avatar_patient m_bottom_10" :style="`${item.avatar ? `background-image: url( ${renderURL(item.avatar)});` : ''}`" v-else></div>
                        <h4 class="f_size_14 color_green text-center">
                            {{ item.full_name }}
                            <small class="show m_top_10">{{ item.address.country.name }}</small>
                        </h4>
                    </div>
                    <!-- Patient searched by MRN -->
                    <div v-if="patient.id">
                        <div class="avatar_cover" :style="`${patient.avatar ? `background-image: url( ${renderURL(patient.avatar)});` : ''}`"></div>
                        <div class="avatar avatar_patient m_bottom_10" :style="`${patient.avatar ? `background-image: url( ${renderURL(patient.avatar)});` : ''}`"></div>
                        <h4 class="f_size_14 color_green text-center">
                            {{ patient.full_name }}
                            <small class="show m_top_10">{{ patient.address.country.name }}</small>
                        </h4>
                        <button class="btn btn-light btn-sm btn-block m_top_20 f_size_10" @click.prevent="request(patient.id)">Request authorization</button>
                    </div>
                </div>

                <!-- Alerts
                ============================================= -->
                <div class="alert alert_light text-center" v-if="!hasRecords && (filter.status == 1 || filter.status == 'all') && !patient.id">
                    <i class="fa fa-user f_size_18"></i>
                    <p class="m_top_10 bold f_size_16">No authorized patient</p>
                    <p class="m_top_5">Search for patient's MRN to request authorization</p>
                </div>
                <div class="alert alert_light text-center" v-if="!hasRecords && filter.status == 0 && !patient.id">
                    <i class="fa fa-user f_size_18"></i>
                    <p class="m_top_5">Search for patient's MRN to request authorization</p>
                </div>

                <mdcr-loading v-if="loading" />

                <!-- Pagination
                ============================================= -->
                <mdcr-pagination v-if="hasRecords" :currentPage="currentPage" :lastPage="lastPage" @page="setPage"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { filterPatients, requestAccess } from '@/services/doctor'
    import EasyURL from '@/utils/mixins/easyURL'
    import Banner from '@/components/Banner'
    import Notify from '@/utils/sweetalert'
    import { mapGetters } from 'vuex'
    import { find, filter } from 'lodash'

    export default {
        name: 'Patients',
        middleware: 'confirmed-doctor',
        components: { Banner },
        mixins: [ EasyURL ],
        data () {
            return {
                filter: {
                    country_id: null,
                    search: '',
                    status: 'all'
                },
                data: [],
                currentPage: 0,
                lastPage: 0,
                total: 0,
                loading: true,
                authorizations: {},
                patient: {}
            }
        },
        computed: {
            ...mapGetters({
                countries: 'getCountries',
                user: 'getUser'
            }),
            hasRecords () {
                return this.data.length > 0
            }
        },
        created () {
            if (this.user && this.user.role_id == 4) {
                this.filter.country_id = this.user.userable.address.country_id
                this.search()
            }
        },
        methods: {
            search () {
                this.loading = true
                filterPatients(this.$axios, this.currentPage, this.filter)
                    .then(({data}) => {
                        if (data.data) {
                            this.currentPage = data.data.current_page
                            this.lastPage = data.data.last_page
                            this.data = data.data.data
                            this.patient = {}
                            this.authorizations = data.authorizedPatients
                        } else {
                            this.clearPaginationData()
                            this.patient = data.patient
                        }
                    })
                    .catch(error => {
                        Notify.error('Unable to load patient. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            setPage (value) {
                this.currentPage = value
                this.search()
            },
            checkAuthorization (patientId) {
                return find(this.authorizations, {id: patientId})
            },
            countPatients (approved = true) {
                return filter(this.authorizations, {approved: approved}).length
            },
            request (patientId) {
                this.loading = true
                requestAccess(this.$axios, patientId)
                    .then(({data}) => {
                        this.filter.search = ''
                        this.filter.status = 'all'
                        this.search()
                        Notify.success('Access requested successfully.')
                    })
                    .catch(error => {
                        Notify.error('Unable request access. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            clearPaginationData () {
                this.currentPage = 0
                this.lastPage = 0
                this.data = []
                this.authorizations = {}
            }
        },
        watch: {
            'filter.status' () {
                this.search()
            }
        },
        head () {
            return {
                title: 'Doctor | Search patients'
            }
        }
    }
</script>
