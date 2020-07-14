<template>
    <!-- Search Appointments
    ============================================= -->
    <div class="bg_light padding_10 clearfix m_bottom_30 search_schedule">
        <form @submit.prevent.stop="$emit('doFilter', filters)" class="clearfix">
            <div class="row cols_10">
                <div class="col-xs-12 col-sm-12 col-md-7">
                    <input type="text" :placeholder="`Search by name, e-mail, ${type === 'patient' ? 'PRN' : 'MRN'} ...`" v-model="filters.search">
                </div>
                <div class="col-xs-12 col-sm-12 col-md-5">
                    <multiselect v-model="filters.status_s" :options="appointmentStatus" :multiple="true" placeholder="* Select status to filter" :close-on-select="false">
                        <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length && !isOpen">Selected status: <span class="label label-primary">{{ values.length }}</span></span></template>
                    </multiselect>
                </div>
            </div>
            <div class="row cols_10">
                <div class="col-xs-12 col-sm-7">
                    <div class="input_group input_group_center_btn m_bottom_5">
                        <input type="date" placeholder="Start date" class="margin_0" v-model="filters.date_from">
                        <span class="detail"><i class="fas fa-calendar"></i></span>
                        <input type="date" placeholder="End date" class="margin_0" v-model="filters.date_to">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-5 text-right">
                    <button type="submit" class="btn btn-default btn-md f_size_12 min_w_auto">
                        <i class="fa fa-search m_right_5"></i> Search
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { getAppointments } from '@/services/doctor'
    import EasyURL from '@/utils/mixins/easyURL'
    import { mapState, mapGetters } from 'vuex'
    import moment from 'moment-timezone'
    import bus from '@/utils/bus'

    export default {
        name: 'FeedSearch',
        mixins: [ EasyURL ],
        props: {
            type: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                filters: {
                    mrn: null,
                    prn: null,
                    search: null,
                    date_from: null,
                    date_to: null,
                    status_s: ['scheduled', 'pending']
                }
            }
        },
        created () {
            bus.$on('close', refresh => refresh ? this.$emit('doFilter', this.filters) : null)

            this.filters.date_from = moment().subtract(7, 'days').format('YYYY-MM-DD')
            this.filters.date_to = moment().add(7, 'days').format('YYYY-MM-DD')

            if (this.$route.params.mrn)
                this.filters.mrn = this.$route.params.mrn

            if (this.$route.params.prn)
                this.filters.prn = this.$route.params.prn

            if (this.type === this.getUserRoleName)
                this.$emit('doFilter', this.filters)
        },
        computed: {
            ...mapState(['appointmentStatus']),
            ...mapGetters(['getUserRoleName'])
        }
    }
</script>
