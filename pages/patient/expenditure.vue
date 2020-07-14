<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Expenditure"/>

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
   
    <div class="p_bottom_20">
        <div class="col-xs-12 col-sm-4 p_bottom_20">
            TOTAL INCOME <input type="text" value="6080" class="w-130 h-32"> 
        </div>
        <div class="col-xs-12 col-sm-5 p_bottom_20">
            DATE FROM <input type="date" class="w-130 h-32"> TO <input type="date" class="w-130 h-32"/> 
        </div>
        <div class="col-xs-12 col-sm-3 p_bottom_20 flex-show">
        <input type="radio"> CHOW INCOME in Graph
        </div>

    </div>
     <!-- first box-->
<div class="row">
    <div class="col-xs-12 col-sm-12 p_bottom_20 ">
    <div class=" p_bottom_20 flex-show ">
    <span class="flex-show"><input type="radio"> THIS MONTH</span>&nbsp; <span class="flex-show"><input type="radio"> PREVIOUS MONTH</span>
   </div>
    <table style="width:100%;" class="ct-tb-1">
    <tr>
    <th>SL.N</th>
    <th>DATE</th>
     <th>HOSPITLA</th>
      <th>TOTAL PATIENTS</th>
       <th>AMOUNT</th>
        <th>DESCRIPTION</th>
         <th>DETAILS</th>
    </tr>
    <tr>
        <td>1</td>
        <td>22/3/20</td>
        <td>CHECK DESCRIPTION</td>
        <td>5</td>
        <td>1590</td>
        <td>ABCD, HOSPITAL</td>
        <td><input id="bt_hsptl" type="button" value="SHOW" style="width:100% !important;"></td>
    </tr>
    <tr>
        <td>1</td>
        <td>22/3/20</td>
        <td>CHECK DESCRIPTION</td>
        <td>5</td>
        <td>1590</td>
        <td>ABCD, HOSPITAL</td>
        <td><input type="button" value="SHOW" style="width:100% !important;"></td>
    </tr>
    <tr>
        <td>1</td>
        <td>22/3/20</td>
        <td>CHECK DESCRIPTION</td>
        <td>5</td>
        <td>1590</td>
        <td>ABCD, HOSPITAL</td>
        <td><input type="button" value="SHOW" style="width:100% !important;"></td>
    </tr>
    
    </table>
     </div>
     </div>
     <!-- 2nd box-->
<div id="ct_hsptl" class="row">
    <div class="col-xs-12 col-sm-12 p_bottom_20">
    <table style="width:50%;" class="ct-tb-1">
    <tr>
    <th>SL.N</th>
      <th>HOSPITLA</th>
      <th>TOTAL PATIENTS</th>
       <th>AMOUNT</th>
         <th>DETAILS</th>
    </tr>
    <tr>
        <td>1</td>
        <td>CHECK DESCRIPTION</td>
        <td>5</td>
        <td>1590</td>
        <td><input id="ct_patient" type="button" value="SHOW" style="width:100% !important;"></td>
    </tr>
    <tr>
       <td>1</td>
        <td>CHECK DESCRIPTION</td>
        <td>5</td>
        <td>1590</td>
        <td><input id="ct_patient" type="button" value="SHOW" style="width:100% !important;"></td>
    </tr>
    <tr>
        <td>1</td>
        <td>CHECK DESCRIPTION</td>
        <td>5</td>
        <td>1590</td>
        <td><input id="ct_patient" type="button" value="SHOW" style="width:100% !important;"></td>
    </tr>
    </table>
     </div>
     </div>
     <!-- 3rd box-->
<div id="ct-patient" class="row">
    <div class="col-xs-12 col-sm-12 p_bottom_20">
    <table style="width:50%;" class="ct-tb-1">
    <tr>
    <th>SL.N</th>
      <th>PATIENT NAME</th>
      <th>NEXT APPOINTMENTS</th>
       <th>AMOUNT</th>
    </tr>
    <tr>
        <td>1</td>
        <td>VISHNU</td>
        <td>22/04/20</td>
        <td>1590</td>
    </tr>
    <tr>
         <td>1</td>
        <td>VISHNU</td>
        <td>22/04/20</td>
        <td>1590</td>
    </tr>
    <tr>
         <td>1</td>
        <td>VISHNU</td>
        <td>22/04/20</td>
        <td>1590</td>
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
        name: 'expenditure',
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
