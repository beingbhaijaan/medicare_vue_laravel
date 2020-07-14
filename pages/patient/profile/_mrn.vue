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
                            <PatientCard :record="record" :address="address" @addRecord="historyPreset()" @indicate="indicatePreset()"/>
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

                        <!-- Medical Records
                        ============================================= -->
                        <MedicalRecords :records="medicalRecords" :patient="record" />
                    </div>

                </div>
            </div>

            <!-- Medical Record
            ============================================= -->
            <CreateMedicalRecord :showModal="showHistoryModal" :patientId="historyPatientId"/>

            <!-- Indicate Doctor
            ============================================= -->
            <IndicateDoctor :showModal="showIndicateModal" :patientId="historyPatientId"/>
        </div>

    </div>
</template>

<script>
    import CreateMedicalRecord from '@/components/doctor/CreateMedicalRecord'
    import IndicateDoctor from '@/components/doctor/IndicateDoctor'
    import AppointmentsFeed from '@/components/appointments/DoctorsFeed'
    import MedicalRecords from '@/components/appointments/MedicalRecords'
    import PatientCard from '@/components/patient/ProfileCard'
    import { getPatientProfile, getMedicalRecords } from '@/services/doctor'
    import Banner from '@/components/Banner'
    import Notify from '@/utils/sweetalert'
    import { mapGetters } from 'vuex'
    import bus from '@/utils/bus'

    export default {
        name: 'Profile',
        middleware: 'doctor',
        components: { Banner, PatientCard, AppointmentsFeed, CreateMedicalRecord,  IndicateDoctor, MedicalRecords },
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
                    id:null,
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
                medicalRecords: [],
                showIndicateModal: false,
                showHistoryModal: false,
                historyPatientId: ''
            }
        },
        computed: {
            ...mapGetters(['getUserRoleName'])
        },
        created () {
            bus.$on('close', (refresh) => this.close(refresh))
            if (this.getUserRoleName === 'doctor') {
                this.getPatient()
                this.getMedicalRecords()
            }
        },
        methods: {
            getPatient () {
                this.loading = true

                getPatientProfile(this.$axios, this.$route.params.mrn)
                    .then(({data}) => {
                        let props = Object.getOwnPropertyNames(this.record)
                        for (let prop of props)
                            if (data[prop])
                                this.record[prop] = data[prop]

                        this.specialties = data.specialties

                        props = Object.getOwnPropertyNames(this.address)
                        for (let prop of props)
                            if (data.address[prop])
                                this.address[prop] = data.address[prop]

                        this.record.email = data.user.email
                    })
                    .catch(error => {
                        if (error.response.status !== 403)
                            Notify.error('Unable to load patient. Try again later.')
                        else {
                            Notify.error('You need patients authorization to see their profile.', 'Not allowed')
                            this.$router.push({ name: 'doctor-patients' })
                        }
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            getMedicalRecords () {
                this.loading = true

                getMedicalRecords(this.$axios, this.$route.params.mrn)
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
            },
            historyPreset () {
                this.historyPatientId = this.record.id

                this.showHistoryModal = true
            },
            indicatePreset () {
                this.historyPatientId = this.record.id

                this.showIndicateModal = true
            },
            close (refresh = false) {
                this.showHistoryModal = false
                this.showIndicateModal = false
                if (refresh)
                    this.getMedicalRecords()
            }
        },
        head () {
            return {
                title: `Doctor | Patient ${this.record.first_name || ''}`
            }
        }
    }
</script>
