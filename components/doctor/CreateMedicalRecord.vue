<template>
        <!-- Create Medical Record
        ============================================= -->
        <transition name="modal">
            <div v-if="showModal" class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <p class="bold f_size_18">
                            <a href="javascript:;" class="pull-right color_grey_dark" @click="close(false)"><i class="fas fa-times"></i></a>
                            <i class="far fa-clipboard m_right_10"></i>Medical Record
                        </p>
                        <form @submit.prevent.stop="submit()">
                            <div class="row cols_10">
                                <div class="col-xs-12">
                                    <div class="select">
                                        <select v-model="record.type">
                                            <option value="medical_history">History</option>
                                            <option value="prescription">Prescription</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <textarea :placeholder="`Details about ${record.type ? record.type.replace('_', ' ') : 'history or prescription'}`" v-model="record.text" rows="5"></textarea>
                            <span class="error" v-if="errors['text']">{{ errors.text[0] }}</span>
                            <div class="row">
                                <div class="col-xs-12 col-sm-6 hide">
                                    <p class="text-danger"><i class="fa fa-info-circle"></i> It is not necessary to select the appointment to the record</p>
                                </div>
                                <div class="col-xs-12 col-sm-12 text-right">
                                    <button type="submit" class="btn btn-default btn-sm">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </transition>
</template>

<script>
    import { createMedicalHistory } from '@/services/doctor'
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
            },
            appointmentId: {
                type: [String, Number],
                required: false,
                default: null
            }
        },
        data () {
            return {
                errors: [],
                record: {
                    appointment_id: null,
                    type: 'medical_history',
                    text: null,
                    patient_id: null
                }
            }
        },
        methods: {
            submit () {
                this.record.appointment_id = this.appointmentId
                this.record.patient_id = this.patientId
                this.loading = true

                createMedicalHistory(this.$axios, this.record)
                    .then(() => {
                        Notify.success('Medical record created!')
                        this.close(true)
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors
                    })
                    .then(() => {
                        this.loading = false
                    })

            },
            close (refresh) {
                this.clear()
                bus.$emit('close', refresh)
            },
            clear () {
                this.record = {
                    appointment_id: null,
                    type: 'medical_history',
                    text: null,
                    patient_id: null
                }
                this.errors = []
            }
        }
    }
</script>
