<template>
    <section>
        <p class="bold f_size_18 m_bottom_10"><i class="fas fa-calendar-alt m_right_10"></i>Appointments feed</p>

        <!-- Search Appointments
        ============================================= -->
        <FeedSearch type="doctor" @doFilter="getAppointments" />

        <!-- Appointments
        ============================================= -->
        <div class="feed">
            <div class="feed_item" v-for="appointment in appointments" :key="appointment.id">
                <div class="feed_item-ico bg-success">
                    <i :class="`fas fa-calendar${appointment.status === 'scheduled' ? '-check' : ''}`"></i>
                </div>
                <div class="feed_item-box">
                    <div class="feed_item-box-header">
                        <div class="d_flex">
                            <nuxt-link :to="{ name: 'patient-profile-mrn', params: { mrn: appointment.patient.mrn } }" class="show avatar avatar_doctor"
                                       :style="`${appointment.patient.avatar ? `background-image: url( ${renderURL(appointment.patient.avatar)});` : ''}`"></nuxt-link>
                            <div>
                                <nuxt-link :to="{ name: 'patient-profile-mrn', params: { mrn: appointment.patient.mrn } }">
                                    {{ appointment.patient.first_name | fullname(appointment.patient.last_name)}}
                                </nuxt-link>
                                <small>{{ appointment.appointment_slot.date | formatDate('DD[/]MM[/]YYYY') }} at {{ appointment.appointment_slot.time.replace(':00', '') }}</small>
                            </div>
                        </div>
                        <div class="min_w_100 text-right">
                            <span :class="`text_capitalize label label-${handleStatus(appointment.status)}`">{{ appointment.status }}</span>
                        </div>
                        <div class="min_w_120 actions text-right" v-if="appointment.status === 'done'">
                            <button class="btn btn-sm btn-dark" @click="historyPreset(appointment)"><i class="fa-fw far fa-clipboard"></i><span>Record</span></button>
                        </div>
                        <div class="min_w_120 actions text-right" v-if="appointment.status === 'pending'">
                            <button class="btn btn-sm btn-primary" @click="makeStatusRecord('scheduled', appointment)"><i class="fa-fw fas fa-check"></i><span>Schedule</span></button>
                            <button class="btn btn-sm btn-danger" @click="makeStatusRecord('canceled', appointment)"><i class="fa-fw fas fa-ban"></i><span>Cancel</span></button>
                        </div>
                        <div class="min_w_120 actions text-right" v-if="appointment.status === 'scheduled'">
                            <button class="btn btn-sm btn-default" @click="makeStatusRecord('done', appointment)"><i class="fa-fw fas fa-check"></i><span>Done</span></button>
                            <button class="btn btn-sm btn-danger" @click="makeStatusRecord('missed', appointment)"><i class="fa-fw fas fa-times"></i><span>Missed</span></button>
                        </div>
                    </div>
                    <div class="feed_item-box-content">
                        <p class="m_bottom_10 bold color_warning" v-if="appointment.status === 'pending'"><i class="fas m_right_5 fa-exclamation-triangle"></i> Awaiting confirmation</p>
                        <p class="m_bottom_10 bold color_blue" v-if="appointment.status === 'scheduled'"><i class="fas m_right_5 fa-calendar-check"></i> Appointment scheduled!</p>
                        <p class="m_bottom_10 bold color_red" v-if="appointment.status === 'canceled'"><i class="fas m_right_5 fa-ban"></i> Appointment canceled</p>
                        <p class="m_bottom_10 bold color_green" v-if="appointment.status === 'done'"><i class="fas m_right_5 fa-calendar-check"></i> Appointment done!</p>
                        <p class="m_bottom_10 bold color_red" v-if="appointment.status === 'missed'"><i class="fas m_right_5 fa-calendar-times"></i> Appointment missed!</p>
                        <div class="feedback" v-if="appointment.feedback">
                            <div class="avatar avatar_doctor m_top_3" :style="`${avatar ? `background-image: url( ${renderURL(avatar)});` : ''}`"></div>
                            <small>Doctor's feedback:</small>
                            <p>{{ appointment.feedback }}</p>
                        </div>
                        <div class="feedback" v-if="appointment.description">
                            <div class="avatar avatar_patient m_top_3" :style="`${appointment.patient.avatar ? `background-image: url( ${renderURL(appointment.patient.avatar)});` : ''}`"></div>
                            <small>Patient's comment:</small>
                            <p>{{ appointment.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alert no appointment
        ============================================= -->
        <div v-if="!appointments.length" class="alert alert_light text-center">
            <i class="fas fa-calendar f_size_18"></i>
            <p class="m_top_10 bold f_size_16">No appointment found</p>
        </div>

        <!-- Update Appointment Doctor
        ============================================= -->
        <UpdateAppointmentStatus :showModal="showStatusModal" :reference="modalRecord" :reason="modalReason"/>

        <!-- Create Medical Record
        ============================================= -->
        <CreateMedicalRecord :showModal="showHistoryModal" :patientId="historyPatientId" :appointmentId="historyId"/>
        
    </section>
</template>

<script>
    import UpdateAppointmentStatus from '@/components/doctor/UpdateAppointmentStatus'
    import CreateMedicalRecord from '@/components/doctor/CreateMedicalRecord'
    import FeedSearch from '@/components/appointments/FeedSearch'
    import { getAppointments } from '@/services/doctor'
    import Notify from '@/utils/sweetalert'
    import EasyURL from '@/utils/mixins/easyURL'
    import moment from 'moment-timezone'
    import { mapState } from 'vuex'
    import bus from '@/utils/bus'

    export default {
        name: 'Feed',
        components: { FeedSearch, UpdateAppointmentStatus, CreateMedicalRecord },
        mixins: [ EasyURL ],
        data () {
            return {
                loading: false,
                errors: {},
                appointments: [],
                showHistoryModal: false,
                showStatusModal: false,
                modalReason: null,
                modalRecord: {},
                historyPatientId: '',
                historyId: ''
            }
        },
        created () {
            bus.$on('close', () => this.close())
        },
        computed: {
            ...mapState(['user']),
            avatar () {
                return this.user ? this.user.userable.avatar : null
            }
        },
        methods: {
            getAppointments (filters) {
                this.loading = true

                getAppointments(this.$axios, filters)
                    .then(({data}) => {
                        // Sort appointments to show scheduled or older first
                        this.appointments = data.sort((a, b) => {
                            let first = a.appointment_slot.date + ' ' +  a.appointment_slot.time
                            let second = b.appointment_slot.date + ' ' +  b.appointment_slot.time

                            if (a.status !== b.status && a.status === 'scheduled')
                                return -1
                            else if (a.status !== b.status && b.status === 'scheduled')
                                return 1
                            else
                                return moment(first).isSameOrBefore(second) ? -1 : 1
                        })
                    })
                    .catch(error => {
                        Notify.error('Unable to load appointments. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            handleStatus (status) {
                let dict = {
                    'pending': 'warning',
                    'scheduled': 'primary',
                    'canceled': 'danger',
                    'done': 'success',
                    'missed': 'danger',
                }

                return dict[status]
            },
            makeStatusRecord (which, reference) {
                this.modalRecord.avatar = reference.patient.avatar
                this.modalRecord.full_name = reference.patient.full_name
                this.modalRecord.date = reference.appointment_slot.date
                this.modalRecord.time = reference.appointment_slot.time
                this.modalRecord.id = reference.id

                this.modalReason = which
                this.showStatusModal = true
            },
            historyPreset (reference) {
                this.historyPatientId = reference.patient_id
                this.historyId = reference.id

                this.showHistoryModal = true
            },
            close () {
                this.showStatusModal = false
                this.showHistoryModal = false
            }
        }
    }
</script>
