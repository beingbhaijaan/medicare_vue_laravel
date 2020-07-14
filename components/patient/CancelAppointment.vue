<template>
        <!-- Cancel appointment
        ============================================= -->
        <transition name="modal">
            <div v-if="showModal" class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="row">
                            <p class="bold f_size_18 col-md-11"><i class="fas fa-ban m_right_10"></i>Cancel Appointment</p>
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
                            <textarea placeholder="Reason to cancel" rows="3" v-model="record.description"></textarea>
                            <span class="error" v-if="errors['description']">{{ errors.description[0] }}</span>
                            <div class="text-right">
                                <button type="submit" class="btn btn-default btn-sm">Cancel appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </transition>
</template>

<script>
    import { updateAppointmentStatus  } from '@/services/patient'
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
            }
        },
        data () {
            return {
                errors: [],
                record: {
                    appointment_id: null,
                    description: null,
                    status: 'canceled'
                }
            }
        },
        methods: {
            submit () {
                this.record.appointment_id = this.reference.id
                this.updateAppointmentStatus()
            },
            updateAppointmentStatus () {
                this.loading = true

                updateAppointmentStatus(this.$axios, this.record)
                    .then(() => {
                        Notify.success('Appointment set as canceled!')
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
                    description: null,
                    status: 'canceled'
                }
                this.errors = []
            }
        }
    }
</script>
