<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Manage schedule"/>

        <!-- Main section
        ============================================= -->
        <div class="container">

            <div class="space_x5">

                <div class="table_hours table_slots hide">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-center set" width="50">
                                    <label class="checkbox"><input type="checkbox" value="one"><span></span></label>
                                </th>
                                <th class="text-center">Dia</th>
                                <th>Hora</th>
                                <th>Patient</th>
                                <th>MRN</th>
                                <th>Contacts</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center set"><label><input type="checkbox" value="one"><span></span></label></td>
                                <td class="text-center bold">10/10/2010</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Appointment slots table
                ============================================= -->
                <SlotsTable />

                <div class="space_x1">
                    <hr>
                </div>

                <!-- Generate schedule appointment slots
                ============================================= -->
                <transition name="fade">
                    <section v-if="showSchedule">
                        <section class="schedule-banner">
                            <h4 class="schedule-call">Appointment slots generator</h4>
                            <button class="btn btn-light" @click="showSchedule = false">Close</button>
                        </section>
                        <ScheduleGenerator />
                    </section>
                </transition>
                <transition name="fade">
                    <section v-if="!showSchedule" class="schedule-banner">
                        <h4 class="schedule-call">Create appointment slots to attend your patients</h4>
                        <button class="btn btn-default" @click="showSchedule = true">Create schedule</button>
                    </section>
                </transition>

                <div class="space_x1">
                    <hr>
                </div>

                <!-- Appointments feed
                ============================================= -->
                <AppointmentsFeed />

            </div>
        </div>
    </div>
</template>

<script>
    import AppointmentsFeed from '@/components/appointments/DoctorsFeed'
    import ScheduleGenerator from '@/components/appointments/ScheduleGenerator'
    import SlotsTable from '@/components/appointments/SlotsTable'
    import Banner from '@/components/Banner'

    export default {
        name: 'Schedule',
        middleware: 'doctor',
        components: { Banner, ScheduleGenerator, SlotsTable, AppointmentsFeed },
        data () {
            return {
                showSchedule: false
            }
        },
        head () {
            return {
                title: 'Doctor | Calendar'
            }
        }
    }
</script>
<style lang="scss">
    .fade {
        &-enter-active,
        &-leave-active {
            transition: opacity .8s;
        }
        &-enter,
        &-leave-to {
            opacity: 0;
        }
    }

    .schedule-banner {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        padding: 30px;

        .schedule-call {
            color: #48bba5;
            text-align: center;
            margin-bottom: 20px;
        }
    }
</style>
