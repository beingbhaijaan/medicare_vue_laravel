<template>
    <section>
        <vue-event-calendar :events="slots" @month-changed="treatBeforeEmit($event)">
            <template slot-scope="props">
                <div v-for="(event, index) in props.showEvents" :class="`event-item ${isDisabled(event) ? 'disabled' : ''}`" :key="index" @click="checkRole(event)">
                    <!-- In here do whatever you want, make you owner event template -->
                    {{`${event.title} at ${event.desc}`}}
                </div>
            </template>
        </vue-event-calendar>

        <!-- Schedule appointment modal
        ============================================= -->
        <transition name="modal">
            <div v-if="showModal" class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-8">
                                <p class="bold f_size_18 m_bottom_20"><i class="fas fa-calendar-alt m_right_10"></i>Schedule Appointment</p>
                            </div>
                            <div class="col-xs-12 col-sm-4 text-right">
                                <p class="bold f_size_18 m_bottom_20" @click="showModal = false"><i class="fas fa-times"></i></p>
                            </div>
                        </div>
                        <form @submit.prevent.stop="schedule">
                            <div class="d_flex align_center m_bottom_15">
                                <div>
                                    <div class="avatar avatar_doctor margin_0 m_right_10 w_40" :style="`${doctor.avatar ? `background-image: url( ${renderURL(doctor.avatar)});` : ''}`"></div>
                                </div>
                                <div>
                                    <h5 class="f_size_15 show m_top_0 m_bottom_5">{{ doctor.first_name | fullname(doctor.last_name) }}</h5>
                                    Schedule appointment on <strong>{{ slot.date | formatDate('DD[/]MM[/]YYYY') }}</strong> at <strong>{{ slot.desc }}</strong>
                                </div>
                            </div>
                            <textarea placeholder="Appointment reason" rows="3" v-model="record.description"></textarea>
                            <span class="error" v-if="errors">{{ errors }}</span>
                            <div class="text-right">
                                <button type="submit" class="btn btn-default btn-sm">Schedule appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </transition>
    </section>
</template>

<script>
    import { schedule } from '@/services/patient'
    import EasyURL from '@/utils/mixins/easyURL'
    import Notify from '@/utils/sweetalert'
    import { mapGetters } from 'vuex'
    import moment from 'moment-timezone'

    export default {
        mixins: [ EasyURL ],
        props: {
            slots: {
                required: true,
                type: Array
            },
            doctor: {
                type: Object
            }
        },
        data () {
            return {
                loading: false,
                errors: null,
                showModal: false,
                slot: null,
                record: {
                    id: null,
                    description: null
                }
            }
        },
        mounted () {
            this.$EventCalendar.toDate(moment().format('YYYY[/]MM[/]DD'))
        },
        computed: {
            ...mapGetters(['getUserRoleName'])
        },
        methods: {
            treatBeforeEmit (date) {
                let month = date.split('/')[0]
                let year = date.split('/')[1]
                this.$emit('monthChanged', {year, month})
            },
            checkRole (slot) {
                if (this.getUserRoleName === 'patient' && !this.isDisabled(slot)) {
                    this.record.id = slot.id
                    this.slot = slot
                    this.showModal = true
                }
            },
            schedule () {
                this.loading = true

                schedule(this.$axios, this.record)
                    .then(() => {
                        this.$router.push({ name: 'patient-profile' })
                        Notify.success('Wait for doctor\'s confirmation.', 'Appointment requested')
                    })
                    .catch(error => {
                        this.errors = error.response.data
                    })
                    .then(() => {
                        this.loading = false
                    })

            },
            isDisabled (slot) {
                let date = slot.date.replace('/', '-').replace('/', '-')
                return moment().isAfter(date + ' ' + slot.time)
            }
        }
    }
</script>

<style src="vue-event-calendar/dist/style.css"></style>

<style lang="scss">
    @import "../../assets/sass/mixin";

    .__vev_calendar-wrapper {
        .cal-wrapper {
            width: calc(100% - 185px);

            .icon {
                border: none;
                width: auto;
                height: auto;
                background-color: transparent;
                box-shadow: none;
            }

            .cal-body {
                .weeks {
                    text-transform: uppercase;
                    font-weight: bold;
                    background-color: $c_grey_light;
                }

                .dates .item .date-num {
                    font-size: 1.3rem;
                }
            }
        }

        .events-wrapper {
            width: 185px;
            left: calc(100% - 185px);
            border-radius: 5px;
            background-color: $c_grey_light!important;

            .cal-events {
                height: calc(100% - 60px);

                .event-item {
                    cursor: pointer;
                    margin: 0 0 10px;
                    padding: 10px 15px;
                    background: $c_white;
                    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, .1);
                    @include transition(all, 0.2s, ease-out);

                    .title {
                        height: auto;
                        line-height: 20px;
                        font-size: 14px;
                        margin-bottom: 5px;
                    }

                    .time {
                        position: relative;
                        top: auto;
                        left: auto;
                        right: auto;
                        font-size: 12px;
                    }

                    .desc {
                        display: none;
                    }

                    &:hover {
                        background: $c_grey_light;
                        box-shadow: 0 3px 10px 2px rgba(0, 0, 0, .2);
                    }
                }
            }

            .date {
                color: #9b9b9b;
                font-size: 14px;
                letter-spacing: 1px;
                border-radius: 5px;
                padding: 10px;
                min-width: 100%;
                width: 100%;
                background-color: rgba(0,0,0,0.1);
            }
        }

        .event-item.disabled {
            cursor: not-allowed !important;
            background-color: #ddd !important;
        }
    }

    @media screen and (max-width: 768px) {
        .__vev_calendar-wrapper {
            .cal-wrapper,
            .events-wrapper {
                width: 100%;
                margin-bottom: 30px;
            }
        }
    }

    @media (min-width: 767px) {
        .__vev_calendar-wrapper {
            .cal-wrapper,
            .events-wrapper {
                padding: 15px;
                overflow: visible;
            }
        }
    }
</style>
