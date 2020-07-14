<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Doctors"/>

        <!-- Main section
        ============================================= -->
        <div class="container">

            <div class="space_x5">

                <!-- Search Doctors
                ============================================= -->
                <div class="sidebar-widget">
                    <h2 class="bordered light">Search <span>Doctors</span></h2>
                    <div class="bg_light padding_10 clearfix">
                        <form class="d_flex align_center wrap_sm" @submit.prevent="search">
                            <input type="text" placeholder="Search by name, PRN ..." class="margin_5" autofocus v-model="filter.search">
                            <div class="select margin_5 m_bottom_5">
                                <select class="margin_0" v-model="filter.specialty">
                                    <option value="">Select a specialty</option>
                                    <option :value="specialty.id" v-for="specialty in specialties" :key="specialty.id">{{ specialty.name }}</option>
                                </select>
                            </div>
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

                <!-- Status Doctors
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
                <div class="list_items">
                    <div v-for="item in data" :key="item.id">
                        <div class="flag" v-if="hasAuthorization(item.id)">
                            <span class="pending" v-if="!checkAuthorization(item.id).approved">Pending</span>
                            <span v-if="checkAuthorization(item.id).approved">Authorized</span>
                        </div>
                        <nuxt-link :to="{ name: 'doctor-profile-prn', params: {prn: item.prn} }">
                            <div class="avatar avatar_doctor" :style="`${item.avatar ? `background-image: url( ${renderURL(item.avatar)});` : ''}`"></div>
                        </nuxt-link>
                        <h4 class="f_size_14 color_green text-center">
                            {{ item.full_name }}
                            <small class="show m_top_10"><span v-for="specialty in item.specialties" :key="specialty.id">{{ specialty.name }} </span></small>
                        </h4>
                        <dl class="dl-horizontal m_top_20">
                            <dt>Work days:</dt>
                            <dd>{{ item.workdays }}</dd>
                            <dt>Summary:</dt>
                            <dd>{{ item.summary }}</dd>
                        </dl>
                        <hr>
                        <div class="d_flex text-center m_bottom_15 justify_center f_size_11" v-if="hasAuthorization(item.id) && checkAuthorization(item.id).indicated_by">
                            <div class="avatar avatar_doctor w_30 margin_0" :style="`${checkAuthorization(item.id).indicated_by.avatar ? `background-image: url( ${renderURL(checkAuthorization(item.id).indicated_by.avatar)});` : ''}`"></div>
                            <div class="m_left_8 text-left">
                                <strong class="show">Indicated by:</strong>
                                {{ checkAuthorization(item.id).indicated_by.full_name }}
                            </div>
                         </div>
                        <div class="text-center" v-if="!hasAuthorization(item.id)">
                            <button class="btn btn-default btn-sm" @click.prevent="allowAccess(item.id)"><i class="fas fa-thumbs-up m_right_5"></i> Authorize access</button>
                        </div>
                        <div class="text-center" v-if="hasAuthorization(item.id)">
                            <button class="btn btn-default btn-sm" @click.prevent="acceptAccess(item.id)" v-if="!checkAuthorization(item.id).approved"><i class="fas fa-thumbs-up m_right_5"></i> Approve access</button>
                            <button class="btn btn-light btn-sm" @click.prevent="removeAccess(item.id)" v-if="checkAuthorization(item.id).approved"><i class="fas fa-thumbs-down m_right_5"></i> Revoke access</button>
                        </div>
                    </div>
                </div>

                <!-- Alerts
                ============================================= -->
                <div class="alert alert_light text-center" v-if="!hasRecords">
                    <i class="fa fa-user-md fa-2x"></i>
                    <p class="m_top_10 bold f_size_16" v-if="authorizations.length == 0 && filter.status == 1">To schedule an appointment you need to authorize a doctor to access your profile</p>
                    <p class="m_top_10 bold f_size_16" v-else>No doctors found</p>
                    <a href="" @click.prevent="clearFilter" v-if="authorizations.length == 0 && filter.status == 1">Click here to search</a>
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
    import { filterDoctors, getSpecialties, authorizeAccess, revokeAccess, approveAccess } from '@/services/patient'
    import Banner from '@/components/Banner'
    import EasyURL from '@/utils/mixins/easyURL'
    import Notify from '@/utils/sweetalert'
    import { mapGetters } from 'vuex'
    import { find, filter } from 'lodash'

    export default {
        name: 'Doctors',
        middleware: 'patient',
        components: { Banner },
        mixins: [ EasyURL ],
        data () {
            return {
                filter: {
                    country_id: null,
                    specialty: '',
                    search: '',
                    status: 'all'
                },
                data: [],
                currentPage: 0,
                lastPage: 0,
                total: 0,
                loading: true,
                authorizations: {},
                specialties: []
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
            if (this.$route.name == 'schedule-appointment') {
                this.filter.status = 1
            }
            this.initSpecialties()
            if (this.user && this.user.role_id == 3) {
                this.filter.country_id = this.user.userable.address.country_id
                this.search()
            }
        },
        methods: {
            search () {
                this.loading = true
                filterDoctors(this.$axios, this.currentPage, this.filter)
                    .then(({data}) => {
                        this.currentPage = data.data.current_page
                        this.lastPage = data.data.last_page
                        this.data = data.data.data
                        this.authorizations = data.authorizedPatients
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
            hasAuthorization (doctorId) {
                return find(this.authorizations, {id: doctorId}) || false
            },
            checkAuthorization (doctorId) {
                return find(this.authorizations, {id: doctorId}) ? find(this.authorizations, {id: doctorId}) : null
            },
            countPatients (approved = true) {
                return filter(this.authorizations, {approved: approved}).length
            },
            initSpecialties () {
                getSpecialties(this.$axios)
                    .then(({data}) => {
                        this.specialties = data
                    })
                    .catch(error => {
                        Notify.error('Unable to load specialties.')
                    })
            },
            allowAccess (doctorId) {
                authorizeAccess(this.$axios, doctorId)
                    .then(({data}) => {
                        this.search()
                    })
                    .catch(error => {
                        Notify.error('Unable to authorize.')
                    })
            },
            removeAccess (doctorId) {
                revokeAccess(this.$axios, doctorId)
                    .then(({data}) => {
                        this.search()
                    })
                    .catch(error => {
                        Notify.error('Unable to revoke.')
                    })
            },
            acceptAccess (doctorId) {
                approveAccess(this.$axios, doctorId)
                    .then(({data}) => {
                        this.search()
                    })
                    .catch(error => {
                        Notify.error('Unable to revoke.')
                    })
            },
            clearFilter () {
                this.filter.search = ''
                this.filter.specialty = ''
                this.filter.status = 'all'
            }
        },
        watch: {
            'filter.status' () {
                this.search()
            }
        },
        head () {
            return {
                title: 'Patient | Search doctors'
            }
        }
    }
</script>
