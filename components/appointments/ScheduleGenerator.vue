<template>
    <form @submit.prevent.stop="generate()">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-offset-1 col-md-4">
                <p class="bold f_size_18"><i class="fas fa-calendar-alt m_right_10"></i>Schedule Appointments</p>
                <div class="row cols_10">
                    <div class="col-xs-12 col-sm-5">
                        <label for="year">* Year</label>
                        <div class="select m_bottom_20">
                            <select id="year" v-model="record.year" required>
                                <option :value="currentYear">{{ currentYear }}</option>
                                <option :value="currentYear + 1">{{ currentYear + 1 }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-7">
                        <label for="appointment_time">* Appointment time</label>
                        <label class="input_group input_group_right_btn padding_0 m_bottom_20">
                            <input type="number" min="10" max="120" id="appointment_time" v-model="record.appointment_time" required>
                            <span class="detail"><i class="fas fa-clock m_right_5"></i> minutes</span>
                        </label>
                    </div>
                    <div class="col-12">
                        <div v-if="errors['year']" class="text-danger">{{ errors['year'][0] }}</div>
                        <div v-if="errors['appointment_time']" class="text-danger">{{ errors['appointment_time'][0] }}</div>
                    </div>
                </div>
                <label>* Available Months</label>
                <div v-if="errors['months']" class="text-danger">{{ errors['months'][0] }}</div>
                <nav class="list_blocks_horizontal cols_4 m_bottom_30">
                    <label v-for="(month, i) in months" :key="i" v-if="currentYear < record.year || currentMonth <= i + 1">
                        <input type="checkbox" name="month" v-model="month.value">
                        <span @click.prevent.stop="month.value = !month.value">{{ month.label }}</span>
                    </label>
                </nav>
                <label>* Days of the week</label>
                <div v-if="errors['days']" class="text-danger">{{ errors['days'][0] }}</div>
                <nav class="list_blocks_horizontal show m_bottom_30">
                    <label v-for="(day, i) in days" :key="i">
                        <input type="checkbox" name="weekday" v-model="day.value">
                        <span @click.prevent.stop="day.value = !day.value">{{ day.label }}</span>
                    </label>
                </nav>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-offset-1 col-md-5">
                <p class="bold f_size_18"><i class="fas fa-clock m_right_10"></i>Intervals Appointments</p>
                <div class="table_hours">
                    <table>
                        <thead>
                        <tr>
                            <th>Day of the week</th>
                            <th class="text-center" width="50">Period</th>
                            <th class="text-center" width="110">Start</th>
                            <th class="text-center" width="110">End</th>
                        </tr>
                        </thead>
                        <tbody v-for="day in days" :key="day.label" v-if="day.value">
                        <tr>
                            <td rowspan="2" class="bold">{{ day.label }}</td>
                            <td class="text-center bold">1°</td>
                            <td><input type="time" class="margin_0 input-sm" v-model="day['1'].start" required></td>
                            <td><input type="time" class="margin_0 input-sm" v-model="day['1'].end" required></td>
                        </tr>
                        <tr>
                            <td class="text-center bold">2°</td>
                            <td><input type="time" class="margin_0 input-sm" v-model="day['2'].start"></td>
                            <td><input type="time" class="margin_0 input-sm" v-model="day['2'].end"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-default">Generate</button>
            </div>
        </div>
    </form>
</template>

<script>
    import { generateSlots } from '@/services/doctor'
    import Notify from '@/utils/sweetalert'
    import moment from 'moment-timezone'
    import bus from '@/utils/bus'

    export default {
        name: 'ScheduleGenerator',
        data () {
            return {
                loading: false,
                errors: {},
                record: {
                    year: 2015,
                    months: [],
                    appointment_time: 30,
                    days: {}
                },
                currentYear: 2015,
                currentMonth: 0,
                months: [
                    {
                        label: 'Jan',
                        value: false
                    },
                    {
                        label: 'Feb',
                        value: false
                    },
                    {
                        label: 'Mar',
                        value: false
                    },
                    {
                        label: 'Apr',
                        value: false
                    },
                    {
                        label: 'May',
                        value: false
                    },
                    {
                        label: 'Jun',
                        value: false
                    },
                    {
                        label: 'Jul',
                        value: false
                    },
                    {
                        label: 'Aug',
                        value: false
                    },
                    {
                        label: 'Sep',
                        value: false
                    },
                    {
                        label: 'Oct',
                        value: false
                    },
                    {
                        label: 'Nov',
                        value: false
                    },
                    {
                        label: 'Dec',
                        value: false
                    }
                ],
                days: [
                    {
                        label: 'monday',
                        value: true,
                        1: {
                            start: '08:00',
                            end: '12:00'
                        },
                        2: {
                            start: '13:00',
                            end: '17:00'
                        }
                    },
                    {
                        label: 'tuesday',
                        value: true,
                        1: {
                            start: '08:00',
                            end: '12:00'
                        },
                        2: {
                            start: '13:00',
                            end: '17:00'
                        }
                    },
                    {
                        label: 'wednesday',
                        value: true,
                        1: {
                            start: '08:00',
                            end: '12:00'
                        },
                        2: {
                            start: '13:00',
                            end: '17:00'
                        }
                    },
                    {
                        label: 'thursday',
                        value: true,
                        1: {
                            start: '08:00',
                            end: '12:00'
                        },
                        2: {
                            start: '13:00',
                            end: '17:00'
                        }
                    },
                    {
                        label: 'friday',
                        value: true,
                        1: {
                            start: '08:00',
                            end: '12:00'
                        },
                        2: {
                            start: '13:00',
                            end: '17:00'
                        }
                    },
                    {
                        label: 'saturday',
                        value: false,
                        1: {
                            start: '08:00',
                            end: '12:00'
                        },
                        2: {
                            start: '13:00',
                            end: '17:00'
                        }
                    },
                    {
                        label: 'sunday',
                        value: false,
                        1: {
                            start: '08:00',
                            end: '12:00'
                        },
                        2: {
                            start: '13:00',
                            end: '17:00'
                        }
                    }
                ]
            }
        },
        created () {
            this.currentYear = moment().year()
            this.currentMonth = moment().month() + 1
            this.record.year = this.currentYear
        },
        watch: {
            'record.year' () {
                this.resetMonths()
            }
        },
        methods: {
            generate () {
                this.loading = true

                for (let i in this.months)
                    if (this.months[i].value)
                        this.record.months.push(parseInt(i) + 1)

                for (let day of this.days)
                    if (day.value) {
                        this.record.days[day.label] = {
                            1: day['1'],
                            2: day['2']
                        }
                    }

                generateSlots(this.$axios, this.record)
                    .then(() => {
                        this.errors = []
                        Notify.success('Slots created!')
                        bus.$emit('refresh', { year: this.record.year, months: this.record.months })
                        this.clear()
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors || []
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            clear () {
                this.record.year = this.currentYear
                this.record.months = []
                this.record.appointment_time = 30
                this.record.days = {}
                this.resetDays()
                this.resetMonths()
            },
            resetMonths () {
                this.months = this.months.map((item, i) => {
                    item.value = false

                    if ((i + 1) === this.currentMonth && this.record.year === this.currentYear)
                        item.value = true

                    return item
                })
            },
            resetDays () {
                for (let day of this.days) {
                    if (day.label === 'sunday' || day.label === 'saturday')
                        day.value = false
                    else
                        day.value = true

                    day['1'].start = '08:00'
                    day['1'].end = '12:00'
                    day['2'].start = '13:00'
                    day['2'].end = '17:00'
                }
            }
        }
    }
</script>
