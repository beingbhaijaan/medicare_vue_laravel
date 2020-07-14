<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="medical prediction"/>

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
        <div class="col-xs-12 col-sm-12 p_bottom_20 tb-sub-heading">
          ENTER SYMPTOMS <input type="text" value="ABCD" style="width: 200px !important;margin:0 5px;" class="h-32">
        </div>
<div class="col-xs-12 col-sm-12 p_bottom_20">
        <div class="flex-show ct-btns tb-sub-heading">
            <span>FEVER</span>
            <span>COUGH</span>
            <span>BACK PAIN</span>
            <span class="active">HEAD ACHE</span>
            <input type="button" value="PREDICT" style="width:100px !important;">
        </div>
        
</div>
    </div>
    
     <!-- first box-->
<div class="row">
    <div class="col-xs-12 col-sm-12 p_bottom_20">
    <table style="width:100%;" class="ct-tb-1">
    <tr>
    <th>SL.N</th>
    <th>PREDICTION</th>
      <th>SYMPTOMS</th>
       <th>ACCURACY PERCENTAGE</th>
        <th>BOOK AN APPOINTMENT</th>
        
    </tr>
    <tr>
        <td>1</td>
        <td>abcd</td>
        <td>Fever, Headache, Backpain</td>
        <td>79%</td>
        <td><input type="button" value="BOOK" style="width:75px !important;"></td>
    </tr>
    <tr>
        <td>2</td>
        <td>abcd</td>
        <td>Fever, Headache, Backpain</td>
        <td>79%</td>
        <td><input type="button" value="BOOK" style="width:75px !important;"></td>
    </tr>
    <tr>
        <td>3</td>
        <td>abcd</td>
        <td>Fever, Headache, Backpain</td>
        <td>79%</td>
        <td><input type="button" value="BOOK" style="width:75px !important;"></td>
    </tr>
    </table>
     </div>
     </div>
      <!-- 2ND box-->
<div class="row">
    <div class="col-xs-12 col-sm-12 p_bottom_20">
    <div class="col-xs-12 col-sm-8 p_bottom_20 tb-sub-heading">
    <span>BOOK AN APPOINTMENT FOR XYZ</span>
     <div class="flex-show p_bottom_20" style="margin-top:8px;">
                <span>SEARCH BY</span>
                <span class="flex-show"><input type="radio"> DOCTOR</span> &nbsp;
                <span class="flex-show"><input type="radio"> HOSPITAL</span>&nbsp;
               
        </div>
    </div> 
    <div class="col-xs-12 col-sm-4 p_bottom_20">
     <div class="p_bottom_20 tb-sub-heading" style="text-align:right;">
      ENTER HOSPITAL NAME OR DOCTOR NAME <input type="text" value="6080" class="w-130 h-32" style="margin-top:8px;"> 
               
        </div>
    </div>    
    <table style="width:100%;" class="ct-tb-1">
    <tr>
    <th>SL.N</th>
    <th>DOCTOR</th>
      <th>HOS</th>
       <th>RATING</th>
        <th>BOOK AN APPOINTMENT</th>
        
    </tr>
    <tr>
        <td>3</td>
        <td>abcd</td>
        <td>xyz Hospital</td>
        <td>4</td>
        <td><input type="button" value="BOOK" style="width:75px !important;"></td>
    </tr>
    <tr>
        <td>3</td>
        <td>abcd</td>
        <td>xyz Hospital</td>
        <td>4</td>
        <td><input type="button" value="BOOK" style="width:75px !important;"></td>
    </tr>
    <tr>
        <td>3</td>
        <td>abcd</td>
        <td>xyz Hospital</td>
        <td>4</td>
        <td><input type="button" value="BOOK" style="width:75px !important;"></td>
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
        name: 'medical-prediction',
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
