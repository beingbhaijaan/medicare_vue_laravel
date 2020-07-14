<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Edit Profile"/>

        <!-- Content Page
        ============================================= -->
        <div class="container">
            <div class="space_x4">
                <form v-if="roleName" @submit.prevent.stop="updateProfile()">
                    <h4 class="text-center m_bottom_50">Update your information</h4>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-offset-1 col-md-3 m_bottom_40 text-center">
                            <p class="f_size_20 bold">Image profile</p>
                            <label for="img_profile" class="margin_0">
                                <div v-if="roleName === 'doctor'">
                                    <div v-if="record.avatar" class="avatar avatar_doctor" :style="`background-image: url( ${dirtyImage ? record.avatar : renderURL(record.avatar) } )`"></div>
                                    <div v-else class="avatar avatar_doctor"></div>
                                </div>
                                <div v-if="roleName === 'patient'">
                                    <div v-if="record.avatar" class="avatar avatar_patient" :style="`background-image: url( ${dirtyImage ? record.avatar : renderURL(record.avatar) } )`"></div>
                                    <div v-else class="avatar avatar_patient"></div>
                                </div>
                                <span class="btn btn-light btn-sm"><i class="fas fa-sync-alt m_right_5"></i>Change</span>
                                <input type="file" accept=".png, .jpg, .jpeg" class="hide" id="img_profile" @change="updateImage($event)">
                                    <span v-if="errors['record.avatar']" class="error">{{ errors['record.avatar'][0] }}</span>
                            </label>
                            <div class="clearfix m_bottom_30"></div>
                            <span v-if="roleName === 'patient'" class="label label-primary label-md"><b>MRN</b> {{ record.mrn }}</span>
                            <span v-if="roleName === 'doctor'" class="label label-primary label-md"><b>PRN</b> {{ doctor.prn }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-7 m_bottom_40">
                            <p class="f_size_20 bold text-center">Personal</p>
                            <div class="row cols_10">
                                <div class="col-xs-12 col-sm-6">
                                    <input type="text" placeholder="* First name" v-model="record.first_name">
                                    <span v-if="errors['record.first_name']" class="error">{{ errors['record.first_name'][0] }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <input type="text" placeholder="* Last name" v-model="record.last_name">
                                    <span v-if="errors['record.last_name']" class="error">{{ errors['record.last_name'][0] }}</span>
                                </div>
                                <div class="col-xs-12">
                                    <input type="text" placeholder="* Email" v-model="record.email">
                                    <span v-if="errors['record.email']" class="error">{{ errors['record.email'][0] }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <input type="text" placeholder="* Phone number" v-model="record.phone">
                                    <span v-if="errors['record.phone']" class="error">{{ errors['record.phone'][0] }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <input type="text" placeholder="Mobile number" v-model="record.mobile">
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <input type="date" placeholder="Date of birth" v-model="record.dob">
                                    <span v-if="errors['record.dob']" class="error">{{ errors['record.dob'][0] }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <div class="select">
                                        <select type="text" v-model="record.gender" placeholder="gender">
                                            <option value="">Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="roleName === 'doctor'">
                        <div class="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 m_bottom_40">
                            <hr class="m_bottom_40">
                            <p class="f_size_20 bold text-center">Professional</p>
                            <div class="row cols_10 m_bottom_40">
                                <div class="col-xs-12 col-sm-6">
                                    <multiselect v-model="specialties" :options="allSpecialties || []" track-by="id" label="name" :multiple="true" placeholder="* Select your specialties" :close-on-select="false">
                                        <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length && !isOpen">Selected specialties: <span class="label label-primary">{{ values.length }}</span></span></template>
                                    </multiselect>
                                    <span v-if="errors['specialties']" class="error">{{ errors['specialties'][0] }}</span>
                                    <input type="text" placeholder="License number" v-model="doctor.license_number">
                                    <span v-if="errors['record.license_number']" class="error">{{ errors['record.license_number'][0] }}</span>
                                    <input type="text" placeholder="Work days" v-model="doctor.workdays">
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <textarea placeholder="Description" style="height: 140px;" v-model="doctor.summary"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 m_bottom_40">
                            <hr class="m_bottom_40">
                            <p v-if="roleName === 'patient'" class="f_size_20 bold text-center">Address</p>
                            <p v-if="roleName === 'doctor'" class="f_size_20 bold text-center">Doctor's office address</p>
                            <div class="row cols_10">
                                <div class="col-xs-12 col-sm-6">
                                    <div class="select">
                                        <select type="text" v-model="address.country_id">
                                            <option value="">* Country</option>
                                            <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}</option>
                                        </select>
                                    </div>
                                    <span v-if="errors['address.country_id']" class="error">{{ errors['address.country_id'][0] }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <input type="text" placeholder="Address" v-model="address.address">
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <input type="text" placeholder="City" v-model="address.city">
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <input type="text" placeholder="Neighborhood" v-model="address.neighborhood">
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <input type="text" placeholder="Complement" v-model="address.complement">
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <input type="text" placeholder="Zip code" v-model="address.zipcode">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-default btn-rounded m_top_20" type="submit">
                            <span>Save</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
    import { getProfile as getDoctor, updateProfile as updateDoctor } from '@/services/doctor'
    import { getProfile as getPatient, updateProfile as updatePatient } from '@/services/patient'
    import ImageReader from '@/utils/mixins/imageReader'
    import EasyURL from '@/utils/mixins/easyURL'
    import { mapGetters, mapState, mapActions } from 'vuex'
    import Banner from '@/components/Banner'
    import Notify from '@/utils/sweetalert'
    import moment from 'moment-timezone'

    export default {
        name: 'EditProfile',
        middleware: 'auth',
        components: { Banner },
        mixins: [ EasyURL, ImageReader ],
        data () {
            return {
                defaultProp: 'avatar',
                loading: false,
                errors: [],
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
                address: {
                    country_id: null,
                    city: null,
                    complement: null,
                    address: null,
                    neighborhood: null,
                    zipcode: null
                },
                doctor: {
                    prn: null,
                    license_number: null,
                    workdays: null,
                    summary: null
                },
                specialties: [],
                allSpecialties: []
            }
        },
        computed: {
            ...mapGetters({ roleName: 'getUserRoleName', callingCode: 'getCountryCallCodeById' }),
            ...mapState(['user', 'countries', 'genders'])
        },
        watch: {
            'record.mobile' (val) {
                if (val && this.address.country_id && typeof val === 'string' && !val.includes(this.callingCode(this.address.country_id)) && !val.includes('+')) {
                    this.record.mobile = `${this.callingCode(this.address.country_id)}${val}`
                }
            },
            'record.phone' (val) {
                if (val && this.address.country_id && typeof val === 'string' && !val.includes(this.callingCode(this.address.country_id)) && !val.includes('+')) {
                    this.record.phone = `${this.callingCode(this.address.country_id)}${val}`
                }
            }
        },
        created () {
            this.getProfile()
        },
        methods: {
            ...mapActions(['setUser']),
            getProfile () {
                if (this.roleName === 'doctor')
                    this.getDoctor()
                else if (this.roleName === 'patient')
                    this.getPatient()
            },
            getDoctor () {
                this.loading = true

                getDoctor(this.$axios)
                    .then(({data}) => {
                        this.fillRecord(data)
                    })
                    .catch(error => {
                        Notify.error('Unable to load patient. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            getPatient () {
                this.loading = true

                getPatient(this.$axios)
                    .then(({data}) => {
                        this.fillRecord(data)
                    })
                    .catch(error => {
                        Notify.error('Unable to load patient. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            fillRecord (data) {
                let props = Object.getOwnPropertyNames(this.record)
                for (let prop of props)
                    if (data.userable[prop])
                        this.record[prop] = data.userable[prop]

                if (this.roleName === 'doctor') {
                    props = Object.getOwnPropertyNames(this.doctor)
                    for (let prop of props)
                        if (data.userable[prop])
                            this.doctor[prop] = data.userable[prop]

                    this.specialties = data.specialties
                    this.allSpecialties = data.allSpecialties
                }

                props = Object.getOwnPropertyNames(this.address)
                for (let prop of props)
                    if (data.address[prop])
                        this.address[prop] = data.address[prop]

                this.record.email = data.user.email
            },
            updateProfile () {
                if (this.roleName === 'doctor')
                    this.updateDoctor()
                else if (this.roleName === 'patient')
                    this.updatePatient()

                this.errors = []
            },
            updateDoctor () {
                this.loading = true

                let payload = {
                    record: {...this.record, ...this.doctor},
                    address: this.address,
                    specialties: this.specialties
                }
                payload.record.dob = payload.record.dob ? moment(payload.record.dob).format('DD/MM/YYYY') : null
                updateDoctor(this.$axios, payload)
                    .then(({data}) => {
                        this.errors = []
                        this.record.dob = data.userable.dob ? moment(data.userable.dob).format('YYYY-MM-DD') : null
                        Notify.success('Profile updated.')
                        this.setUser(data.user)
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors || []
                        this.record.dob = this.record.dob ? moment(this.record.dob).format('YYYY-MM-DD') : null
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            updatePatient () {
                this.loading = true

                let payload = {
                    record: this.record,
                    address: this.address
                }
                payload.record.dob = payload.record.dob ? moment(payload.record.dob).format('DD/MM/YYYY') : null
                updatePatient(this.$axios, payload)
                    .then(({data}) => {
                        this.errors = []
                        this.record.dob = data.userable.dob ? moment(data.userable.dob).format('YYYY-MM-DD') : null
                        Notify.success('Profile updated.')
                        this.setUser(data.user)
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors || []
                        this.record.dob = this.record.dob ? moment(this.record.dob).format('YYYY-MM-DD') : null
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
        },
        head () {
            return {
                title: 'Edit profile'
            }
        }
    }
</script>
