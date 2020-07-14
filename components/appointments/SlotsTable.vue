<template>
    <section>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <p class="bold f_size_18 m_bottom_10"><i class="fas fa-calendar-alt m_right_10"></i>Appointment slots</p>
            </div>
            <div class="col-xs-12 col-sm-6 text-right">
                <button v-if="available.length" @click.prevent.stop="blockSlots()" class="btn btn-dark btn-sm">Block</button>
                <button v-if="blocked.length" @click.prevent.stop="unblockSlots()" class="btn btn-light btn-sm">Unblock</button>
            </div>
        </div>
        <div class="table_hours table_slots noselect">
            <table>
                <thead>
                <tr>
                    <th class="set" width="30" @click="subMonth()"><i class="fas fa-chevron-left"></i></th>
                    <th :colspan="7">{{ reference | formatDate('MMMM / YYYY') }}</th>
                    <th class="set" width="30" @click="addMonth()"><i class="fas fa-chevron-right"></i></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td rowspan="2" class="set" @click="subDays()"><i class="fas fa-chevron-left"></i></td>
                    <td v-for="day in days" :key="day">
                        {{ day | formatDate('dddd') }}
                        <small class="show">({{ day | formatDate('DD') }})</small>
                    </td>
                    <td v-for="i in extraColumns" :key="i">
                    </td>
                    <td rowspan="2" class="set" @click="addDays()"><i class="fas fa-chevron-right"></i></td>
                </tr>
                <tr>
                    <td v-for="day in days" :key="day">
                        <div :class="`slots ${handleStatus(slot)} ${selectedSlot(slot.id) ? 'selected' : ''}`" v-for="slot in slots[day]" :key="slot.id" @click="manageSlot(slot)">
                            {{ slot.date + ' ' + slot.time | formatDate('HH:mm') }} <span class="badge badge-primary" v-if="slot.appointments.length > 1">{{ slot.appointments.length }}</span>
                        </div>
                        <span v-if="!slots[day]">No scheduled time</span>
                    </td>
                    <td v-for="i in extraColumns" :key="i">
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- Appointment slots table caption
        ============================================= -->
        <ul class="d_inline_block list-unstyled m_left_40 m_top_20 m_bottom_30">
            <li class="pull-left bold m_right_25 m_bottom_10">Legend:</li>
            <li class="pull-left m_right_25 m_bottom_10"><i class="fas fa-square m_left_2 m_right_5 color_grey"></i> Available</li>
            <li class="pull-left m_right_25 m_bottom_10"><i class="fas fa-square m_left_2 m_right_5 color_grey_dark"></i> Blocked</li>
            <li class="pull-left m_right_25 m_bottom_10"><i class="fas fa-square m_left_2 m_right_5 color_yellow"></i> Pending</li>
            <li class="pull-left m_right_25 m_bottom_10"><i class="fas fa-square m_left_2 m_right_5 color_blue"></i> Scheduled</li>
            <li class="pull-left m_right_25 m_bottom_10"><i class="fas fa-square m_left_2 m_right_5 color_red_dark"></i> Missed</li>
            <li class="pull-left m_right_25 m_bottom_10"><i class="fas fa-square m_left_2 m_right_5 color_red"></i> Canceled</li>
            <li class="pull-left m_right_25 m_bottom_10"><i class="fas fa-square m_left_2 m_right_5 color_green"></i> Done</li>
        </ul>

        <!-- Manage Slot modal
        ============================================= -->
        <ManageSlot :showModal="showModal" :modalSlot="modalSlot"/>
        
    </section>
</template>

<script>
    import ManageSlot from '@/components/appointments/ManageSlot'
    import { getSlots, blockSlots, unblockSlots } from '@/services/doctor'
    import Notify from '@/utils/sweetalert'
    import moment from 'moment-timezone'
    import bus from '@/utils/bus'

    export default {
        name: 'SlotsTable',
        components: { ManageSlot },
        data () {
            return {
                loading: false,
                errors: {},
                reference: null,
                days: [],
                slots: [],
                currentYear: 2018,
                currentMonth: 1,
                showModal: false,
                modalSlot: {},
                available: [],
                blocked: []
            }
        },
        created () {
            bus.$on('close', param => this.updateRefresh(param))
            bus.$on('refresh', param => this.checkRefresh(param))

            this.currentYear = moment().year()
            this.currentMonth = moment().month() + 1
            this.reference = moment()

            this.getSlots()
        },
        computed: {
            extraColumns () {
                let extra = 7 - this.days.length

                if (extra < 0)
                    return 0

                return extra
            }
        },
        methods: {
            updateRefresh (refresh) {
                this.showModal = false
                if (refresh)
                    this.getSlots()
            },
            checkRefresh (reference) {
                if (reference.year === this.reference.year() && reference.months.filter(m => m === (this.reference.month() + 1)))
                    this.getSlots()
            },
            getSlots () {
                this.loading = true

                let month = this.reference.month() + 1
                let year = this.reference.year()
                getSlots(this.$axios, month, year)
                    .then(({data}) => {
                        this.slots = data
                        this.available = []
                        this.blocked = []

                        if (year === this.currentYear && month === this.currentMonth)
                            this.renderDays(this.reference.date())
                        else
                            this.renderDays(1)
                    })
                    .catch(error => {
                        Notify.error('Unable to load slots. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            blockSlots () {
                this.loading = true

                blockSlots(this.$axios, { slots: this.available })
                    .then(({data}) => {
                        this.available = []
                        this.getSlots()
                    })
                    .catch(error => {
                        Notify.error('Unable to block slots. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            unblockSlots () {
                this.loading = true

                unblockSlots(this.$axios, { slots: this.blocked })
                    .then(({data}) => {
                        this.blocked = []
                        this.getSlots()
                    })
                    .catch(error => {
                        Notify.error('Unable to unblock slots. Try again later.')
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            handleStatus(slot) {
                if (slot.appointment)
                    return slot.appointment.status

                if (slot.status === 'blocked')
                    return slot.status

                return slot.appointments.length > 0 ? 'pending' : ''
            },
            addMonth () {
                this.reference = this.reference.add(1, 'M')
                this.getSlots()
            },
            subMonth () {
                this.reference = this.reference.subtract(1, 'M')
                this.getSlots()
            },
            addDays () {
                let start = moment(this.days[0]).date() + 7

                if (start <= this.reference.daysInMonth())
                    this.renderDays(start)
            },
            subDays () {
                let start = moment(this.days[0]).date() - 7

                if (start < 1)
                    start = 1

                this.renderDays(start)
            },
            renderDays(start, length = 7) {
                this.available = []
                this.blocked = []
                let month = this.reference.month()
                let year = this.reference.year()
                let days = []

                let end = start + length
                if (end > this.reference.daysInMonth() + 1)
                    end = this.reference.daysInMonth() + 1

                for (let day = start; day < end; day++)
                    days.push(moment([year, month, day]).format('YYYY-MM-DD'))

                this.days = days
            },
            manageSlot (slot) {
                if (this.handleStatus(slot) === 'blocked') {
                    this.available = []
                    if (this.selectedSlot(slot.id))
                        this.blocked = this.blocked.filter(item => item !== slot.id)
                    else
                        this.blocked.push(slot.id)
                } else if (this.handleStatus(slot) === '') {
                    this.blocked = []
                    if (this.selectedSlot(slot.id))
                        this.available = this.available.filter(item => item !== slot.id)
                    else
                        this.available.push(slot.id)
                } else {
                    this.modalSlot = slot
                    this.showModal = true
                }
            },
            selectedSlot (id) {
                return typeof this.blocked.find(item => item === id) !== 'undefined' || typeof this.available.find(item => item === id) !== 'undefined'
            }
        }
    }
</script>
