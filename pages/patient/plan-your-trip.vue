<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Plan Your Trip"/>

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
    <div class="p_bottom_20 h-32 flex-show tb-sub-heading">
        <div class="col-xs-12 col-sm-5 p_bottom_20">
            DATE FROM <input type="date" class="w-130 h-32"> TO <input type="date" class="w-130 h-32"/>  
        </div>
        <div class="col-xs-12 col-sm-5 p_bottom_20 flex-show">
            <span class="flex-show"><input type="radio" name="range"> LOW TO HIGH</span> <span class="flex-show" style="margin-left:20px;"><input type="radio" name="range"> HIGH TO LOW</span>
        </div>
        <div class="col-xs-12 col-sm-2 p_bottom_20 ">
       
        </div>

    </div>
    
     <!-- first box-->
<div class="row">
    <div class="col-xs-12 col-sm-12 p_bottom_20">
    <div class="col-xs-12 col-sm-2 p_bottom_20 tb-sub-heading">
        <div class="p_bottom_20">
                <span class="flex-show"><input type="radio" name="list1"> 5 STAR</span>&nbsp;
                <span class="flex-show"><input type="radio" name="list1"> 4 STAR</span>&nbsp;
                <span class="flex-show"><input type="radio" name="list1"> 3 STAR</span>&nbsp;
                <span class="flex-show"><input type="radio" name="list1"> 2 STAR</span>
        </div>
    </div>
    <div class="col-xs-12 col-sm-2 p_bottom_20 tb-sub-heading">
        <div class="p_bottom_20">
                <span class="flex-show"><input type="radio" name="list2"> GYM</span>&nbsp;
                <span class="flex-show"><input type="radio" name="list2"> SWIMMING</span>&nbsp;
                <span class="flex-show"><input type="radio" name="list2"> BAR</span>&nbsp;
                <span class="flex-show"><input type="radio" name="list2"> RESTURANT</span>
        </div>
    </div>
    <div class="col-xs-12 col-sm-2 p_bottom_20 tb-sub-heading">
        <div class="p_bottom_20">
                <span class="flex-show"><input type="radio" name="list3"> PARKING</span>&nbsp;
                <span class="flex-show"><input type="radio" name="list3"> NON-AC</span>&nbsp;
                <span class="flex-show"><input type="radio" name="list3"> AC</span>&nbsp;
                <span class="flex-show"><input type="radio" name="list3"> RATING</span>
        </div>
    </div>
    <div class="col-xs-12 col-sm-4 p_bottom_20 tb-sub-heading">
        <div class="p_bottom_20">
                TOTAL ROOMS <input type="text" value="6080" class="w-130 h-32"> 
        </div>
    </div>
    <table style="width:100%;" class="ct-tb-1">

    <tr>
    <th>SL.N</th>
    <th>HOTEL</th>
     <th>COST/NIGHT</th>
      <th>RATING</th>
       <th>BOOK AN APPOINTMENT</th>
    </tr>
    <tr>
        <td>1</td>
        <td>XYZ</td>
        <td>2500</td>
        <td>4</td>
        <td><input type="button" value="BOOK" style="width:75px !important;"></td>
    </tr>
    <tr>
        <td>2</td>
        <td>XYZ</td>
        <td>2500</td>
        <td>4</td>
        <td><input type="button" value="BOOK" style="width:75px !important;"></td>
    </tr>
    <tr>
        <td>3</td>
        <td>XYZ</td>
        <td>2500</td>
        <td>4</td>
        <td><input type="button" value="BOOK" style="width:75px !important;"></td>
    </tr>
    
    </table>
     </div>
     </div>
    </div>                      </div>
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
        name: 'plan-your-trip',
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
