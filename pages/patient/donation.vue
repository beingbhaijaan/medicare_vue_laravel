<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="DONATION"/>

        <!-- Content Page
        ============================================= -->
        <div class="container">
            <div class="space_x4">

                <div class="profile_sidebar1">

                    
                    <!-- Content Feed
                    ============================================= -->
                    <div id="content_feed">


                        <!-- Medical Records
                        ============================================= -->
                       <div class="padding_15 patient-form">

     <!-- third box-->
<div class="row">
    <div class="col-xs-12 col-sm-12 p_bottom_20">
            <div class="p_bottom_20">
            <table class="ct-tb-2">
            <tr>
                <td>DONATION AMOUNT </td>
                <td><input type="text" value="6080" class="w-130 h-32"></td>
            </tr>
            <tr>
                <td>FOR </td>
                <td><select  class="w-130 h-32">
                    <option>PET</option>
                    </select></td>
            </tr>
            </table>
                  
            </div>
            <div class="flex-show p_bottom_20">
                <span class="flex-show"><input type="radio"> MAKE IT ANONYMOUS</span> &nbsp;
            </div>
    <table style="width:50%;" class="ct-tb-1">
    <tr>
    <th>SL.N</th>
    <th>FOR</th>
     <th>AMOUNT</th>
     
    </tr>
    <tr>
    <td>1</td>
    <td>XYZ</td>
    <td>2500</td>
     </tr>
     <tr>
    <td>3</td>
    <td>XYZ</td>
    <td>2500</td>
     </tr>
    
    </table>
     </div>
     </div>
       
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
        name: 'Patient-record',
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
