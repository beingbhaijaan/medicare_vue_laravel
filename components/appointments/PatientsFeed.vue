<template>
    <section>
        <p class="bold f_size_18 m_bottom_10"><i class="fas fa-calendar-alt m_right_10"></i>Appointments feed</p>

        <!-- Search Appointments
        ============================================= -->
        <FeedSearch type="patient" @doFilter="getAppointments" />

        <div class="feed">

            <!-- Appointments
            ============================================= -->
            <div class="feed_item" v-for="appointment in appointments" :key="appointment.id">
                <div class="feed_item-ico bg-success">
                    <i :class="`fas fa-calendar${appointment.status === 'scheduled' ? '-check' : ''}`"></i>
                </div>
                <div class="feed_item-box">
                    <div class="feed_item-box-header">
                        <div class="d_flex">
                            <nuxt-link :to="{ name: 'doctor-profile-prn', params: { prn: appointment.appointment_slot.doctor.prn } }" class="show avatar avatar_doctor" :style="`${appointment.appointment_slot.doctor.avatar ? `background-image: url( ${renderURL(appointment.appointment_slot.doctor.avatar)});` : ''}`"></nuxt-link>
                            <div>
                                <nuxt-link :to="{ name: 'doctor-profile-prn', params: { prn: appointment.appointment_slot.doctor.prn } }">
                                    {{ appointment.appointment_slot.doctor.first_name | fullname(appointment.appointment_slot.doctor.last_name)}}
                                </nuxt-link>
                                <small>{{ appointment.appointment_slot.date | formatDate('DD[/]MM[/]YYYY') }} at {{ appointment.appointment_slot.time.replace(':00', '') }}</small>
                            </div>
                        </div>
                        <div class="text-right min_w_100">
                            <span :class="`text_capitalize label label-${handleStatus(appointment.status)}`">{{ appointment.status }}</span>
                        </div>
                        <div class="actions text-right min_w_100" v-if="appointment.status === 'pending'">
                            <button class="btn btn-sm btn-danger" @click="makeModalRecord(appointment)"><i class="fas fa-ban"></i><span>Cancel</span></button>
                        </div>
                    </div>
                    <div class="feed_item-box-content">
                        <p class="m_bottom_10 bold color_warning" v-if="appointment.status === 'pending'"><i class="fas m_right_5 fa-exclamation-triangle"></i> Awaiting doctor's confirmation</p>
                        <p class="m_bottom_10 bold color_blue" v-if="appointment.status === 'scheduled'"><i class="fas m_right_5 fa-calendar-check"></i> Appointment scheduled!</p>
                        <p class="m_bottom_10 bold color_red" v-if="appointment.status === 'canceled'"><i class="fas m_right_5 fa-ban"></i> Appointment canceled</p>
                        <p class="m_bottom_10 bold color_green" v-if="appointment.status === 'done'"><i class="fas m_right_5 fa-calendar-check"></i> Appointment done!</p>
                        <p class="m_bottom_10 bold color_red" v-if="appointment.status === 'missed'"><i class="fas m_right_5 fa-calendar-times"></i> Appointment missed!</p>
                        <div class="feedback" v-if="appointment.feedback">
                            <div class="avatar avatar_doctor m_top_3" :style="`${appointment.appointment_slot.doctor.avatar ? `background-image: url( ${renderURL(appointment.appointment_slot.doctor.avatar)});` : ''}`"></div>
                            <small>Doctor's feedback:</small>
                            <p>{{ appointment.feedback }}</p>
                        </div>
                        <div class="feedback" v-if="appointment.description">
                            <div class="avatar avatar_patient m_top_3" :style="`${avatar ? `background-image: url( ${renderURL(avatar)});` : ''}`"></div>
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
            <i class="fa fa-calendar f_size_18"></i>
            <p class="m_top_10 bold f_size_16">No appointment found</p>
            <p v-if="$route.params.prn" class="m_top_5">You can schedule one in the calendar above.</p>
            <p v-else class="m_top_5"><nuxt-link :to="{ name: 'schedule-appointment' }">Click here</nuxt-link> to schedule</p>
        </div>

        <CancelAppointment :showModal="showModal" :reference="modalRecord"/>
        
    </section>
</template>

<script>
    import CancelAppointment from '@/components/patient/CancelAppointment'
    import FeedSearch from '@/components/appointments/FeedSearch'
    import { getAppointments } from '@/services/patient'
    import EasyURL from '@/utils/mixins/easyURL'
    import Notify from '@/utils/sweetalert'
    import moment from 'moment-timezone'
    import { mapState } from 'vuex'
    import bus from '@/utils/bus'

    export default {
        name: 'Feed',
        components: { FeedSearch, CancelAppointment },
        mixins: [ EasyURL ],
        data () {
            return {
                loading: false,
                errors: {},
                appointments: [],
                showModal: false,
                modalRecord: {}
            }
        },
        created () {
            bus.$on('close', () => this.showModal = false)
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
            makeModalRecord (reference) {
                this.modalRecord.avatar = reference.appointment_slot.doctor.avatar
                this.modalRecord.full_name = reference.appointment_slot.doctor.full_name
                this.modalRecord.date = reference.appointment_slot.date
                this.modalRecord.time = reference.appointment_slot.time
                this.modalRecord.id = reference.id

                this.showModal = true
            }
        }
    }
</script>
