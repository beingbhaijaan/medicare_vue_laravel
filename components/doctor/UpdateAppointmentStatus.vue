<template>
        <!-- Update appointment status
        ============================================= -->
        <transition name="modal">
            <div v-if="showModal" class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="row">
                            <p class="bold f_size_18 col-md-11"><i :class="`fas fa-${icon} m_right_10`"></i>{{ actionWord }} Appointment</p>
                            <p class="bold f_size_18 text-right col-md-1" @click="close(false)"><i class="fas fa-times"></i></p>
                        </div>
                        <form @submit.prevent.stop="submit">
                            <div class="d_flex align_center m_bottom_15">
                                <div>
                                    <div class="avatar avatar_doctor margin_0 m_right_10 w_40" :style="`${reference.avatar ? `background-image: url( ${renderURL(reference.avatar)});` : ''}`"></div>
                                </div>
                                <div>
                                    <h5 class="f_size_15 show m_top_0 m_bottom_5">{{ reference.full_name }}</h5>
                                    Scheduled appointment on <strong>{{ reference.date | formatDate('DD[/]MM[/]YYYY') }}</strong> at <strong>{{ reference.time.replace(':00', '') }}</strong>
                                </div>
                            </div>
                            <textarea :placeholder="`${reason === 'done' || reason === 'missed' ? 'Add to medical history a' : actionWord  } feedback`" rows="3" v-model="record.feedback"></textarea>
                            <span class="error" v-if="errors['feedback']">{{ errors.feedback[0] }}</span>
                            <div class="text-right">
                                <button type="submit" class="btn btn-default btn-sm">{{ actionWord }} appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </transition>
</template>

<script>
    import { updateAppointmentStatus, finishAppointment } from '@/services/doctor'
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
            reference: {
                type: Object,
                required: true
            },
            reason: {
                required: true
            }
        },
        data () {
            return {
                errors: [],
                record: {
                    appointment_id: null,
                    feedback: null,
                    text: null,
                    status: null
                }
            }
        },
        computed: {
            actionWord () {
                if (this.reason === 'canceled')
                    return 'Cancel'
                if (this.reason === 'scheduled')
                    return 'Approve'
                if (this.reason === 'done')
                    return 'Finish'
                if (this.reason === 'missed')
                    return 'Missed'
            },
            icon () {
                if (this.reason === 'canceled')
                    return 'ban'
                if (this.reason === 'scheduled')
                    return 'check'
                if (this.reason === 'done')
                    return 'calendar-check'
                if (this.reason === 'missed')
                    return 'calendar-times'
            }
        },
        methods: {
            submit () {
                this.record.appointment_id = this.reference.id
                this.record.status = this.reason

                if (this.reason === 'canceled' || this.reason === 'scheduled') {
                    this.updateAppointmentStatus()
                } else if (this.reason === 'done' || this.reason === 'missed') {
                    this.finishAppointment()
                }
            },
            updateAppointmentStatus () {
                this.loading = true

                updateAppointmentStatus(this.$axios, this.record)
                    .then(() => {
                        Notify.success(`Appointment set as ${this.reason}!`)
                        this.close(true)
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            finishAppointment () {
                this.loading = true

                this.record.text = this.record.feedback
                finishAppointment(this.$axios, this.record)
                    .then(() => {
                        Notify.success(`Appointment set as ${this.reason}!`)
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
                this.record ={
                    appointment_id: null,
                    feedback: null,
                    text: null,
                    status: null
                }
                this.errors = []
            }
        }
    }
</script>
