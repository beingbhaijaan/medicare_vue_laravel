<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Patient profile"/>

        <!-- Content Page
        ============================================= -->
        <div class="container">
            <div class="space_x4">

                <div class="profile_sidebar">

                    <!-- Profile Card Patient
                    ============================================= -->
                    <div>
                        <affix relative-element-selector="#content_feed" style="width: 270px;">
                            <PatientCard :record="record" :address="address"/>
                        </affix>
                    </div>

                    <!-- Content Feed
                    ============================================= -->
                    <div id="content_feed">

                        <!-- Appointments
                        ============================================= -->
                        <AppointmentsFeed />

                        <div class="space_x1">
                            <hr>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppointmentsFeed from '@/components/appointments/PatientsFeed'
    import MedicalRecords from '@/components/appointments/MedicalRecords'
    import PatientCard from '@/components/patient/ProfileCard'
    import { getProfile, getMedicalRecords } from '@/services/patient'
    import Banner from '@/components/Banner'
    import Notify from '@/utils/sweetalert'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Profile',
        middleware: 'patient',
        components: { Banner, PatientCard, AppointmentsFeed, MedicalRecords },
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
                    id: null,
                    mrn: null,
                    avatar: null,
                    first_name: null,
                    last_name: null,
                    email: null,
                    phone: null,
                    mobile: null,
                    dob: null,
                    gender: null
                },
                medicalRecords: []
            }
        },
        computed: {
            ...mapGetters(['getUserRoleName'])
        },
        created () {
            if (this.getUserRoleName === 'patient') {
                this.getPatient()
                this.getMedicalRecords()
            }
        },
        methods: {
            getPatient () {
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
                        Notify.error('Unable to load patient. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            getMedicalRecords () {
                this.loading = true

                getMedicalRecords(this.$axios)
                    .then(({data}) => {
                        this.medicalRecords = data
                    })
                    .catch(error => {
                        if (error.response.status !== 403)
                            Notify.error('Unable to load records. Try again later.')
                        else {
                            Notify.error('You need patients authorization to see their profile.', 'Not allowed')
                            this.$router.push({ name: 'doctor-patients' })
                        }
                    })
                    .then(() => {
                        this.loading = false
                    })
            }
        },
        head () {
            return {
                title: `Patient | ${this.record.first_name || ''}`
            }
        }
    }
</script>
