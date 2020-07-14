<template>
    <!-- Update appointment status
    ============================================= -->
    <transition name="modal">
        <div v-if="showModal" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8">
                            <p class="bold f_size_18 m_bottom_20"><i :class="`fas fa-gears m_right_10`"></i>Manage Slot from day <strong>{{ modalSlot.date | formatDate('DD[/]MM[/]YYYY') }}</strong> at <strong>{{ modalSlot.time.replace(':00', '') }}</strong></p>
                        </div>
                        <div class="col-xs-12 col-sm-4 text-right">
                            <p class="bold f_size_18 m_bottom_20" @click="close(false)"><i class="fas fa-times"></i></p>
                        </div>
                    </div>

                    <!-- Pending slots only
                    ============================================= -->
                    <div v-if="modalSlot.appointments.length">
                        <p class="m_bottom_10 bold color_yellow f_size_20"><i class="fa fa-exclamation-triangle"></i> Pending approval</p>
                        <div v-for="appointment in modalSlot.appointments" :key="appointment.id">
                            <transition name="chosen">
                                <div v-if="!update.appointment_id || update.appointment_id === appointment.id">
                                    <div class="d_flex align_center m_bottom_15">
                                        <nuxt-link :to="{ name: 'patient-profile-mrn', params: { mrn: appointment.patient.mrn } }">
                                            <div class="avatar avatar_patient margin_0 m_right_10 w_40" :style="`${appointment.patient.avatar ? `background-image: url( ${renderURL(appointment.patient.avatar)});` : ''}`"></div>
                                        </nuxt-link>
                                        <div class="m_right_20">
                                            <nuxt-link :to="{ name: 'patient-profile-mrn', params: { mrn: appointment.patient.mrn } }">
                                                <h5 class="f_size_15 show m_top_0 m_bottom_5">{{ appointment.patient.full_name }}</h5>
                                            </nuxt-link>
                                        </div>
                                        <div>
                                            <button v-if="update.appointment_id !== appointment.id" @click.prevent.stop="update.appointment_id = appointment.id" class="btn btn-warning btn-sm">Select</button>
                                            <button v-else @click.prevent.stop="clear()" class="btn btn-light btn-sm">Unselect</button>
                                        </div>
                                    </div>
                                    <div class="feed_item-box-content" style="padding: 0;">
                                        <div class="feedback" v-if="appointment.feedback">
                                            <small>Your feedback:</small>
                                            <p>{{ appointment.feedback }}</p>
                                        </div>
                                        <div class="feedback" v-if="appointment.description">
                                            <small>Patient's comment:</small>
                                            <p>{{ appointment.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>

                        <!-- Update selected pending slot
                        ============================================= -->
                        <transition name="chosen">
                            <div v-if="update.appointment_id">
                                <textarea placeholder="Add a feedback to your patient" rows="3" v-model="update.feedback"></textarea>
                                <span class="error" v-if="errors['text']">{{ errors.text[0] }}</span>
                                <div class="text-right">
                                    <button @click.prevent.stop="updateAppointmentStatus('scheduled')" class="btn btn-default btn-sm">Set as scheduled</button>
                                    <button @click.prevent.stop="updateAppointmentStatus('canceled')" class="btn btn-danger btn-sm">Set as canceled</button>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <!-- Scheduled, Done and Missed slots
                    ============================================= -->
                    <div v-else-if="modalSlot.appointment">
                        <p class="m_bottom_10 bold f_size_20 color_blue" v-if="modalSlot.appointment.status === 'scheduled'"><i class="fa fa-check"></i> Appointment scheduled!</p>
                        <p class="m_bottom_10 bold f_size_20 color_green" v-if="modalSlot.appointment.status === 'done'"><i class="fa fa-calendar-check"></i> Appointment done!</p>
                        <p class="m_bottom_10 bold f_size_20 color_red_dark" v-if="modalSlot.appointment.status === 'missed'"><i class="fa fa-calendar-times"></i> Appointment missed!</p>
                        <div class="d_flex align_center">
                            <nuxt-link :to="{ name: 'patient-profile-mrn', params: { mrn: modalSlot.appointment.patient.mrn } }">
                                <div class="avatar avatar_patient margin_0 m_right_10 w_40" :style="`${modalSlot.appointment.patient.avatar ? `background-image: url( ${renderURL(modalSlot.appointment.patient.avatar)});` : ''}`"></div>
                            </nuxt-link>
                            <div>
                                <nuxt-link :to="{ name: 'patient-profile-mrn', params: { mrn: modalSlot.appointment.patient.mrn } }">
                                    <h5 class="f_size_15 show m_top_0 m_bottom_5">{{ modalSlot.appointment.patient.full_name }}</h5>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="feed_item-box-content" style="padding: 0;">
                            <div class="feedback" v-if="modalSlot.appointment.feedback">
                                <small>Your feedback:</small>
                                <p>{{ modalSlot.appointment.feedback }}</p>
                            </div>
                            <div class="feedback" v-if="modalSlot.appointment.description">
                                <small>Patient's comment:</small>
                                <p>{{ modalSlot.appointment.description }}</p>
                            </div>
                        </div>

                        <!-- If scheduled then allow finish
                        ============================================= -->
                        <div v-if="modalSlot.appointment.status === 'scheduled'">
                            <textarea placeholder="Add to medical history a feedback" rows="3" v-model="finish.text"></textarea>
                            <span class="error" v-if="errors['text']">{{ errors.text[0] }}</span>
                            <div class="text-right">
                                <button @click.prevent.stop="finishAppointment('done')" class="btn btn-default btn-sm">Set as done</button>
                                <button @click.prevent.stop="finishAppointment('missed')" class="btn btn-danger btn-sm">Set as missed</button>
                            </div>
                        </div>
                    </div>
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
            modalSlot: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                errors: [],
                finish: {
                    appointment_id: null,
                    text: null,
                    status: null
                },
                update: {
                    appointment_id: null,
                    feedback: null,
                    status: null
                }
            }
        },
        methods: {
            updateAppointmentStatus (status) {
                this.loading = true

                this.update.status = status
                updateAppointmentStatus(this.$axios, this.update)
                    .then(() => {
                        Notify.success(`Appointment set as ${status}!`)
                        this.close(true)
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            finishAppointment (status) {
                this.loading = true

                this.finish.appointment_id = this.modalSlot.appointment.id
                this.finish.status = status
                finishAppointment(this.$axios, this.finish)
                    .then(() => {
                        Notify.success(`Appointment set as ${status}!`)
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
                this.update = {
                    appointment_id: null,
                    feedback: null,
                    status: null
                }
                this.finish = {
                    appointment_id: null,
                    text: null,
                    status: null
                }
                this.errors = []
            }
        }
    }
</script>

<style lang="scss">
    .chosen-enter-active {
        transition: opacity .5s;
    }
    .chosen-leave-active {
        transition: opacity .5s;
    }
    .chosen-enter, .chosen-leave-to {
        opacity: 0;
    }
</style>
