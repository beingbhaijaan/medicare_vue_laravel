<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Doctor profile"/>

        <!-- Content Page
        ============================================= -->
        <div class="container">
            <div class="space_x4">

                <div class="profile_sidebar">
                    <!-- Profile Card Doctor
                    ============================================= -->
                    <div>
                        <affix relative-element-selector="#content_feed" style="width: 270px;">
                            <DoctorCard :record="record" :address="address" :specialties="specialties"/>
                        </affix>
                    </div>

                    <!-- Content Feed
                    ============================================= -->
                    <div id="content_feed">

                        <!-- Alert
                        ============================================= -->
                        <div class="alert alert-danger text-center" v-if="getUser && !getUser.userable.confirmed">
                            <p class="f_size_18"><strong>Attention <i class="fas fa-exclamation-triangle"></i></strong></p>
                            Keep your <nuxt-link :to="{ name: 'edit-profile' }">informations updated</nuxt-link>, to Medicare's Staff check out and approved your profile, releasing the access for all system's resources
                        </div>

                        <!-- Appointments
                        ============================================= -->
                        <p class="bold f_size_18 margin_0"><i class="fas fa-calendar-alt m_right_10"></i>Free Appointment Slots</p>
                        <mdcr-calendar :slots="slots" @monthChanged="getFreeSlots"></mdcr-calendar>
                        <ul class="legend">
                            <li class="bold m_bottom_10">Legend:</li>
                            <li><i class="fas fa-mouse-pointer m_left_2 m_right_8 color_green"></i> Click the marked days for more information</li>
                            <li><span class="available"></span> Days with appointment slots</li>
                            <li><span class="today"></span> Today</li>
                        </ul>

                        <div class="space_x1">
                            <hr>
                        </div>

                        <!-- Appointments feed
                        ============================================= -->
                        <AppointmentsFeed />

                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import AppointmentsFeed from '@/components/appointments/DoctorsFeed'
    import { getProfile, getFreeSlots } from '@/services/doctor'
    import DoctorCard from '@/components/doctor/ProfileCard'
    import Banner from '@/components/Banner'
    import Notify from '@/utils/sweetalert'
    import moment from 'moment-timezone'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Profile',
        middleware: 'doctor',
        components: { Banner, DoctorCard, AppointmentsFeed },
        data () {
            return {
                loading: false,
                address: {
                    country_id: null,
                    city: null,
                    complement: null,
                    address: null,
                    neighborhood: null,
                    zipcode: null
                },
                record: {
                    prn: null,
                    license_number: null,
                    workdays: null,
                    summary: null,
                    avatar: null,
                    first_name: null,
                    last_name: null,
                    email: null,
                    phone: null,
                    mobile: null,
                    dob: null,
                    gender: null
                },
                specialties: [],
                slots: []
            }
        },
        computed: {
            ...mapGetters(['getCountryNameById', 'getUserRoleName', 'getUser'])
        },
        created () {
            if (this.getUserRoleName === 'doctor') {
                this.getDoctor()
                this.getFreeSlots()
            }
        },
        methods: {
            getDoctor () {
                this.loading = true

                getProfile(this.$axios)
                    .then(({data}) => {
                        let props = Object.getOwnPropertyNames(this.record)
                        for (let prop of props)
                            if (data.userable[prop])
                                this.record[prop] = data.userable[prop]

                        this.specialties = data.specialties

                        props = Object.getOwnPropertyNames(this.address)
                        for (let prop of props)
                            if (data.address[prop])
                                this.address[prop] = data.address[prop]

                        this.record.email = data.user.email
                    })
                    .catch(error => {
                        Notify.error('Unable to load doctor. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            getFreeSlots (date = {}) {
                this.loading = true

                let month = date.month ? date.month : moment().month() + 1
                let year = date.year ? date.year : moment().year()

                getFreeSlots(this.$axios, month, year)
                    .then(({data}) => {
                        this.slots = data.map(slot => {
                            slot.date = slot.date.replace('-', '/').replace('-', '/')
                            slot.title = 'Schedule'
                            slot.desc = slot.time.replace(':00', '')

                            return slot
                        })
                    })
                    .catch(error => {
                        if (error.response.status === 429)
                            Notify.error('Wait just a little while and everything will be back on track.', 'Too many requests')
                        else
                            Notify.error('Unable to load slots. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            }
        },
        head () {
            return {
                title: `Doctor | ${this.record.first_name || ''}`
            }
        }
    }
</script>
