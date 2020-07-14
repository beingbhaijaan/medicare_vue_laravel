<template>
    <div class="card_profile">
        <div class="avatar_card">
            <div class="avatar_cover" :style="`${record.avatar ? `background-image: url( ${renderURL(record.avatar)});` : ''}`"></div>
            <div class="avatar avatar_doctor m_bottom_10" :style="`${record.avatar ? `background-image: url( ${renderURL(record.avatar)});` : ''}`"></div>
            <h1 class="f_size_16 m_bottom_0 color_white">{{ record.first_name | fullname(record.last_name) }}</h1>
        </div>
        <div class="text-center m_bottom_30">
            <span class="label label-primary label-md">PRN {{ record.prn }}</span>
            <div class="clearfix m_top_20"></div>
            <span v-for="specialty in specialties" :key="specialty.id" class="d_inline_block label label-default m_right_5 m_bottom_5">{{ specialty.name }}</span>
        </div>
        <ul class="list_infos">
            <li v-if="record.license_number"><i class="fas fa-stethoscope"></i>{{ record.license_number }}</li>
            <li v-if="record.workdays"><i class="fas fa-clock"></i>{{ record.workdays }}</li>
            <li v-if="record.summary"><i class="fas fa-comment"></i>{{ record.summary }}</li>
        </ul>
        <hr>
        <p class="bold">Contacts</p>
        <ul class="list_infos">
            <li v-if="record.email"><i class="fas fa-envelope"></i>{{ record.email }}</li>
            <li v-if="record.phone"><i class="fas fa-phone"></i> {{ record.phone }}</li>
            <li v-if="record.mobile"><i class="fas fa-mobile-alt"></i> {{ record.mobile }}</li>
        </ul>
        <hr>
        <p class="bold">Office address</p>
        <ul class="list_infos">
            <li v-if="address.country_id"><i class="fas fa-flag"></i> {{ getCountryNameById(address.country_id) }}</li>
            <li v-if="$options.filters.concatAddress(address)"><i class="fas fa-map-marker-alt"></i>{{ address | concatAddress }}</li>
        </ul>
        <hr>
        <div v-if="getUserRoleName === 'doctor'">
            <nuxt-link :to="{ name: 'edit-profile' }" class="btn btn-default btn-sm"><i class="fa fa-fw fa-user-edit"></i><span>Edit profile</span></nuxt-link>
            <nuxt-link :to="{ name: 'change-password' }" class="btn btn-light btn-sm"><i class="fa fa-fw fa-lock"></i><span>Change password</span></nuxt-link>
        </div>
        <div v-if="getUserRoleName === 'patient'">
            <div class="text-center" v-if="!hasAuthorization(record.id)">
                <button class="btn btn-default btn-sm" @click.prevent="allowAccess(record.id)"><i class="fas fa-thumbs-up m_right_5"></i> Authorize access</button>
            </div>
            <div class="text-center" v-if="hasAuthorization(record.id)">
                <button class="btn btn-default btn-sm" @click.prevent="acceptAccess(record.id)" v-if="!checkAuthorization(record.id).approved"><i class="fas fa-thumbs-up m_right_5"></i> Approve access</button>
                <button class="btn btn-danger btn-sm" @click.prevent="removeAccess(record.id)" v-if="checkAuthorization(record.id).approved"><i class="fas fa-thumbs-down m_right_5"></i> Revoke access</button>
                <div class="d_flex text-center m_top_15 justify_center f_size_11" v-if="hasAuthorization(record.id) && checkAuthorization(record.id).indicated_by">
                    <div class="avatar avatar_doctor w_30 margin_0" :style="`${checkAuthorization(record.id).indicated_by.avatar ? `background-image: url( ${renderURL(checkAuthorization(record.id).indicated_by.avatar)});` : ''}`"></div>
                    <div class="m_left_8 text-left">
                        <strong class="show">Indicated by:</strong>
                        {{ checkAuthorization(record.id).indicated_by.full_name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EasyURL from '@/utils/mixins/easyURL'
    import { authorizeAccess, revokeAccess, approveAccess } from '@/services/patient'
    import Notify from '@/utils/sweetalert'
    import { mapGetters } from 'vuex'
    import { find } from 'lodash'

    export default {
        name: 'PatientCard',
        mixins: [ EasyURL ],
        props: {
            record: {
                type: Object
            },
            address: {
                type: Object
            },
            specialties: {
                type: Array
            },
            authorizations: {
                type: Array
            }
        },
        data () {
            return {
                loading: false,
                errors: {},
            }
        },
        computed: {
            ...mapGetters(['getCountryNameById', 'getUserRoleName'])
        },
        methods: {
            allowAccess (doctorId) {
                authorizeAccess(this.$axios, doctorId)
                    .then(({data}) => {
                        this.getAuthorizations()
                    })
                    .catch(error => {
                        Notify.error('Unable to authorize.')
                    })
            },
            removeAccess (doctorId) {
                revokeAccess(this.$axios, doctorId)
                    .then(({data}) => {
                        this.getAuthorizations()
                    })
                    .catch(error => {
                        Notify.error('Unable to revoke.')
                    })
            },
            acceptAccess (doctorId) {
                approveAccess(this.$axios, doctorId)
                    .then(({data}) => {
                        this.getAuthorizations()
                    })
                    .catch(error => {
                        Notify.error('Unable to revoke.')
                    })
            },
            getAuthorizations () {
                this.$emit('updateAuthorization')
            },
            hasAuthorization (doctorId) {
                return find(this.authorizations, {id: doctorId}) || false
            },
            checkAuthorization (doctorId) {
                return find(this.authorizations, {id: doctorId}) ? find(this.authorizations, {id: doctorId}) : null
            },
        }
    }
</script>
