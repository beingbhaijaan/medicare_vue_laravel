<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Patient profile"/>

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
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 r">
            <h2 class="light bordered record-heading">
                Enter Personal Details
                <img src="/images/icons/man.png" alt="Patient" style="width:64px;height:64px;float:right;">
            </h2>
        </div>
    </div>
    <form>
    <div class="row">
    <div class="col-xs-12 col-sm-4 p_bottom_20 h-345 ct-padding-top">
    <table>
    <tr>
    <td class="w-100">HEIGHT</td>
    <td class="w-100"><input type="text" name=""></td>
    <td><select style="width: 50px !important;">
    <option>INCH</option>
    <option>CM</option>
    <option>FT</option>
    </select></td>
    </tr>
    <tr>
    <td class="w-100">WEIGHT</td>
    <td><input type="text" name=""></td>
    </tr>
    <tr>
    <td class="w-100">DOB</td>
    <td><input type="date" name=""></td>
    <td></td>
    </tr>
    </table>
    <br>
    <table>
    <tr>
    <td class="w-100">CHEST</td>
    <td><input type="text" name=""></td>
    </tr>
    <tr>
    <td class="w-100">WAIST</td>
    <td><input type="text" name=""></td>
    </tr>
    <tr>
    <td class="w-100">SHOULDER</td>
    <td><input type="text" name=""></td>
    <td></td>
    </tr>
    <tr>
    <td class="w-100">THIGH</td>
    <td><input type="text" name=""></td>
    
    </tr>
    </table>
    </div>
    <div class="col-xs-12 col-sm-3 p_bottom_20 h-345 ct-border ct-padding-top">
    <p style="font-size:14px;">WHAT IS THE BODY TYPE</p>
    <div class="form-group">
    <span class="flex-show">
    <input type="radio" style="margin-right:5px;"> Ectomorph</span>
    <p style="padding-left:26px;"> Lean and Long with difficulty building muscle</p>
    </div>
    <div class="form-group">
     <span class="flex-show">
     <input type="radio" style="margin-right:5px;"> Endomorph
     </span>
      <p style="padding-left:26px;">Big, high body fat, often pear shaped, with a high tendency to store body fat.</p>
      </div>
      <div class="form-group">
     <span class="flex-show">
      <input type="radio" style="margin-right:5px;"> Mesomorph
      </span>
       <p style="padding-left:26px;"> Muscular and well built, with a high metabolism and responsive muscle cells</p>
       </div>
       <p style="font-size:14px;">YOUR BMI FORM THE ABOVE IMFORMATION IS: 61</p>
    </div>
    <div class="col-xs-12 col-sm-5 p_bottom_20 h-345 ct-padding-top">
    <table>
    <tr>
    <td class="w-100">BP</td>
    <td><input type="text" name=""></td>
    </tr>
    <tr>
    <td class="w-100">CHOLESTEROL</td>
    <td><input type="text" name=""></td>
    </tr>
    <br>
    </table>
    <table>
    <tr>
    <td colspan="2">EYE SIGHT</td>
    
    </tr>
    <tr>
    <td class="w-100">LEFT EYE</td>
    <td><input type="text" name=""></td>
    </tr>
    <tr>
    <td class="w-100">RIGHT EYE</td>
    <td><input type="text" name=""></td>
    </tr>
    
    </table>
    <table>
    <tr>
    <td class="w-150">SPHERE(SPH)-RIGHT</td>
    <td><input type="text" name=""></td>
    <td class="w-150">SPHERE(SPH)-LEFT</td>
    <td><input type="text" name=""></td>
    </tr>
    <tr>
    <td class="w-150">CYLINDER(CYL)-RIGHT</td>
    <td><input type="text" name=""></td>
    <td class="w-150">CYLINDER(CYL)-LEFT</td>
    <td><input type="text" name=""></td>
    </tr>
    
    </table>
    </div>
     </div>
 <!-- Second box-->
<div class="row">
    <div class="col-xs-12 col-sm-12 p_bottom_20 ">
    <h4>PRESENT DISEASE <span style="float:right;"><input type="button" value="+"></span></h4>
    <table style="width:100%;" class="ct-tb-1">
    <tr>
    <th>SL.N</th>
    <th>DISEASE</th>
     <th>DOCTOR</th>
      <th>HOSPITAL</th>
       <th>DATE</th>
        <th>PRICRIPTION</th>
         <th>BOOK APPOITMENT</th>
    </tr>
    <tr>
    <td><input type="text" name=""></td>
    <td><input type="text" name=""></td>
    <td><input type="text" name=""></td>
    <td><input type="text" name=""></td>
    <td><input type="text" name=""></td>
    <td><input type="text" name=""></td>
    <td><input type="button" value="+"></td>
    </tr>
    
    </table>
     </div>
     </div>
     <!-- third box-->
<div class="row">
    <div class="col-xs-12 col-sm-12 p_bottom_20">
    <h4>PRECRIPTION <span style="float:right;"><input type="button" value="+"></span></h4>
    <p>No medical history found entered, Please enter by using the add button</p>
    <table style="width:50%;" class="ct-tb-1">
    <tr>
    <th>SL.N</th>
    <th>DISEASE</th>
     <th>DOCTOR</th>
     
    </tr>
    <tr>
    <td><input type="text" name=""></td>
    <td><input type="text" name=""></td>
    <td><input type="text" name=""></td>
     </tr>
    
    </table>
     </div>
     </div>
     <p><input type="submit" value="Save" style="min-width:200px !important; width:200px !important;height:40px;"></p>
       </form> 
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
