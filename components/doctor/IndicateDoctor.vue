<template>
    <!-- Indicate Doctor
    ============================================= -->
    <transition name="modal">
        <div v-if="showModal" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <p class="bold f_size_18">
                        <a href="javascript:;" class="pull-right color_grey_dark" @click="close(false)"><i class="fas fa-times"></i></a>
                        <i class="fa fa-user-md m_right_10"></i>Indicate doctor
                    </p>
                    <form @submit.prevent.stop="submit()">
                        <div class="row cols_10">
                            <div class="col-xs-12 col-sm-6">
                                <multiselect v-model="specialtySelected" :options="specialties || []" track-by="id" label="name" placeholder="* Select specialties">
                                </multiselect>
                            </div>
                            <div class="col-xs-12 col-sm-6">
                                <multiselect v-model="doctorSelected" :options="doctors || []" track-by="id" label="full_name" placeholder="* Select doctor" :searchable="true">
                                </multiselect>
                                <span class="error" v-if="errors['doctor_id']">{{ errors.doctor_id[0] }}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 col-sm-6">
                                <p class="text-danger"><i class="fa fa-info-circle"></i> Select a speciality to search the doctor</p>
                            </div>
                            <div class="col-xs-12 col-sm-6 text-right">
                                <button type="submit" class="btn btn-default btn-sm">Indicate</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { getSpecialties, getBySpecialties, indicateDoctor } from '@/services/doctor'
    import EasyURL from '@/utils/mixins/easyURL'
    import Notify from '@/utils/sweetalert'
    import bus from '@/utils/bus'

    export default {
        mixins: [ EasyURL ],
        props: {
            showModal: {
                type: Boolean,
                default: false,
                required: true
            },
            patientId: {
                type: [String, Number],
                required: true
            }
        },
        data () {
            return {
                errors: [],
                record: {
                    doctor_id: '',
                    specialty_id: '',
                    patient_id: '',
                },
                doctorSelected: {},
                specialtySelected: {},
                specialties: [],
                doctors: [],
            }
        },
        created () {
            this.initSpecialties()
        },
        methods: {
            submit () {
                this.record.patient_id = this.patientId

                indicateDoctor(this.$axios, this.record)
                    .then(() => {
                        Notify.success('Indication done!')
                        this.close(true)
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors
                    })

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
            close (refresh) {
                this.clear()
                bus.$emit('close', refresh)
            },
            clear () {
                this.record = {
                    doctor_id: '',
                    patient_id: '',
                    specialty_id: ''
                }
                this.errors = []
            }
        },
        watch: {
            'record.specialty_id' (value) {
                if (value !== '') {
                    getBySpecialties(this.$axios, this.record)
                        .then(({data}) => {
                                this.doctors = data
                            })
                            .catch(error => {
                                Notify.error('Unable to load specialties.')
                            })
                }
            },
            'specialtySelected' (specialty) {
                this.record.specialty_id = specialty.id
                this.record.doctor_id = ''
                this.doctorSelected = ''
            },
            'doctorSelected' (doctor) {
                this.record.doctor_id = doctor.id
            }

        }
    }
</script>
