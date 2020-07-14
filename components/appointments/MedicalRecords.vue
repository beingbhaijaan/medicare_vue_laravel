<template>
    <section>
        <p class="bold f_size_18"><i class="far fa-clipboard m_right_10"></i>Medical Records</p>
       
        <!-- Filter type
        ============================================= -->
        <nav class="list_radio m_bottom_30">
            <label>
                <input type="radio" name="status" v-model="filter" value="" checked="checked">
                <span>All <span class="badge badge-primary">{{ records.length }}</span></span>
            </label>
            <label>
                <input type="radio" name="status" v-model="filter" value="medical_history">
                <span><i class="fas fa-stethoscope m_right_5"></i> History <span class="badge badge-primary">{{ historyCount }}</span></span>
            </label>
            <label>
                <input type="radio" name="status" v-model="filter" value="prescription">
                <span><i class="fas fa-clipboard-list m_right_5"></i> Prescription <span class="badge badge-primary">{{ prescriptionCount }}</span></span>
            </label>
        </nav>

        <!-- Feed
        ============================================= -->
        <div class="feed">
            <div class="feed_item" v-for="record in records" :key="record.id" v-if="filter === '' || record.type === filter">
                <div class="feed_item-ico">
                    <i class="fas fa-clipboard-list" v-if="record.type === 'medical_history'"></i>
                    <i class="fas fa-stethoscope" v-if="record.type === 'prescription'"></i>
                </div>
                <div class="feed_item-box">
                    <div class="feed_item-box-header">
                        <div class="d_flex">
                            <nuxt-link :to="{ name: 'doctor-profile-prn', params: { prn: record.doctor.prn } }" class="show avatar avatar_doctor" :style="`${record.doctor.avatar ? `background-image: url( ${renderURL(record.doctor.avatar)});` : ''}`"></nuxt-link>
                            <div>
                                <nuxt-link :to="{ name: 'doctor-profile-prn', params: { prn: record.doctor.prn } }">{{ record.doctor.full_name }}</nuxt-link>
                                <small>{{ record.created_at | formatDate('DD[/]MM[/]YYYY') }} at {{ record.created_at | formatDate('HH:mm') }}</small>
                            </div>
                        </div>
                        <!--<div class="actions" v-if="record.doctor.prn === user.userable.prn">-->
                        <div class="actions" v-if="false">
                            <a href="#" class="btn btn-sm btn-warning"><i class="fas fa-pen"></i><span>Edit</span></a>
                            <a href="#" class="btn btn-sm btn-danger"><i class="fas fa-times"></i><span>Delete</span></a>
                        </div>
                    </div>
                    <div class="feed_item-box-content">
                        <p  v-if="record.appointment" class="m_bottom_10 bold">Medical appointment realized on {{ record.appointment.appointment_slot.date | formatDate('DD[/]MM[/]YYYY') }} at {{ record.appointment.appointment_slot.time.replace(':00', '') }}</p>
                        <p>{{ record.text }}</p>
                        <div class="feedback" v-if="record.appointment && record.appointment.description">
                            <div class="avatar avatar_patient m_top_3" :style="`${patient.avatar ? `background-image: url( ${renderURL(patient.avatar)});` : ''}`"></div>
                            <small>Patient's comment:</small>
                            <p>{{ record.appointment.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alert no records
        ============================================= -->
        <div v-if="!hasRecords" class="alert alert_light text-center">
            <i class="fa fa-hospital f_size_18"></i>
            <p class="m_top_10 bold f_size_16">No {{ filter === '' ? 'record' : filter.replace('_', ' ') }} found</p>
        </div>
        
    </section>
</template>

<script>
    import EasyURL from '@/utils/mixins/easyURL'
    import { mapState } from 'vuex'

    export default {
        name: 'MedicalRecords',
        mixins: [ EasyURL ],
        props: {
            records: {
                type: Array,
                required: true
            },
            patient: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                filter: ''
            }
        },
        computed: {
            ...mapState(['user']),
            avatar () {
                return this.user ? this.user.userable.avatar : null
            },
            historyCount () {
                return this.records.filter(item => item.type === 'medical_history').length
            },
            prescriptionCount () {
                return this.records.length - this.historyCount
            },
            hasRecords () {
                if (this.filter === '')
                    return this.records.length
                if (this.filter === 'medical_history')
                    return this.historyCount
                if (this.filter === 'prescription')
                    return this.prescriptionCount
            }
        },
        methods: {
            handleStatus (status) {
                let dict = {
                    'pending': 'warning',
                    'scheduled': 'primary',
                    'canceled': 'danger',
                    'done': 'success',
                    'missed': 'danger',
                }

                return dict[status]
            }
        }
    }
</script>
