<template>
    <div class="card_profile">
        <div class="avatar_card">
            <div class="avatar_cover" :style="`${record.avatar ? `background-image: url( ${renderURL(record.avatar)});` : ''}`"></div>
            <div class="avatar avatar_patient m_bottom_10" :style="`${record.avatar ? `background-image: url( ${renderURL(record.avatar)});` : ''}`"></div>
            <h1 class="f_size_16 m_bottom_0 color_white">{{ record.first_name | fullname(record.last_name) }}</h1>
        </div>
        <div class="text-center m_bottom_30">
            <span class="label label-primary label-md">MRN {{ record.mrn }}</span>
        </div>
        <ul class="list_infos">
            <li v-if="record.email"><i class="fas fa-envelope"></i> {{ record.email }}</li>
            <li v-if="record.phone"><i class="fas fa-phone"></i> {{ record.phone }}</li>
            <li v-if="record.mobile"><i class="fas fa-mobile-alt"></i> {{ record.mobile }}</li>
            <li v-if="record.gender"><i class="fas fa-child"></i> {{ record.gender }}</li>
            <li v-if="address.country_id"><i class="fas fa-flag"></i> {{ getCountryNameById(address.country_id) }}</li>
            <li v-if="record.dob"><i class="fas fa-birthday-cake"></i> {{ record.dob | formatDate('DD[/]MM[/]YYYY') }} - {{ record.dob | humanDate }}</li>
        </ul>
        <hr class="m_bottom_0">
        <div v-if="getUserRoleName === 'patient'" class="m_top_20">
            <nuxt-link :to="{ name: 'edit-profile' }" class="btn btn-default btn-sm"><i class="fas fa-fw fa-user-edit"></i><span>Edit profile</span></nuxt-link>
            <nuxt-link :to="{ name: 'change-password' }" class="btn btn-light btn-sm"><i class="fas fa-fw fa-lock"></i><span>Change password</span></nuxt-link>
        </div>
        <div v-if="getUserRoleName === 'doctor'" class="row">
            <div class="col-xs-12 col-sm-6 col-md-12 m_top_20">
                <button class="btn btn-block btn-sm btn-default" @click="$emit('addRecord')"><i class="far m_right_5 fa-clipboard"></i> Medical record</button>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-12 m_top_20">
                <button class="btn btn-block btn-sm btn-light" @click="$emit('indicate')"><i class="fas m_right_5 fa-user-md"></i> Indicate Doctor</button>
            </div>
        </div>
    </div>
</template>

<script>
    import EasyURL from '@/utils/mixins/easyURL'
    import { createContact } from '@/services'
    import { mapGetters } from 'vuex'

    export default {
        name: 'PatientCard',
        mixins: [ EasyURL ],
        props: {
            record: {
                type: Object
            },
            address: {
                type: Object
            }
        },
        computed: {
            ...mapGetters(['getCountryNameById', 'getUserRoleName'])
        },
    }
</script>
