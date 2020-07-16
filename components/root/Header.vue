<template>
    <header id="header" :class="`medicom-header medical-nav ${!isGuest ? 'sidebar' : ''} ${menuOpen ? 'expand' : ''}`">
      
      <span v-if="!isGuest">
      <div class="solid-row"></div>
        <div class="container padding_0">
            <nav class="navbar navbar-default" role="navigation">
                <div class="navbar-header" @click="$emit('toggleMenu')">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#primary-nav" @click="collapse = !collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <nuxt-link class="navbar-brand" :to="{ name: 'index' }"><img src="/images/logo-medicare.png" alt="Logo Medicare" title="Logo Medicare"></nuxt-link>
                </div>
                <div :class="`${collapse ? 'collapse' : ''} navbar-collapse navbar-right`" id="primary-nav">
                    <ul class="nav navbar-nav custom_menu">

                        <!-- Menu Doctor -->
                        <li class="greats" v-if="roleName === 'doctor' && user && user.userable">
                            <span class="text_truncate">Hello, {{ user.userable.first_name || 'Doctor' }}</span>
                        </li>
                        <li class="title_menu" v-if="roleName === 'doctor' && user">
                            <span class="show padding_10 text_uppercase bold p_left_15 text_truncate">My Account</span>
                        </li>
                        <li v-if="roleName === 'doctor' && user" :class="`${$route.name === 'doctor-profile' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'doctor-profile' }"><i class="fas fa-user-md"></i>Profile</nuxt-link>
                        </li>
                        <li v-if="roleName === 'doctor' && user && user.userable" :class="`${$route.name === 'doctor-calendar' ? 'active' : ''}`">
                            <nuxt-link v-if="user.userable.confirmed" :to="{ name: 'doctor-calendar' }"><i class="fas fa-calendar-o"></i>Manage Schedule</nuxt-link>
                            <a v-else href="javascript:;" class="disabled"><i class="fas fa-calendar-o"></i>Manage Schedule</a>
                        </li>
                        <li v-if="roleName === 'doctor' && user && user.userable" :class="`${$route.name === 'doctor-patients' ? 'active' : ''}`">
                            <nuxt-link v-if="user.userable.confirmed" :to="{ name: 'doctor-patients' }"><i class="fas fa-user"></i>Search Patients</nuxt-link>
                            <a v-else href="javascript:;" class="disabled"><i class="fas fa-user"></i>Search Patients</a>
                        </li>
                        <li class="dropdown last" v-if="roleName === 'doctor' && user">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-gear"></i>
                                Settings
                                <i class="fas fa-chevron-down"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li :class="`${$route.name === 'edit-profile' ? 'active' : ''}`"><nuxt-link :to="{ name: 'edit-profile' }"><i class="fas fa-user-edit"></i>Edit Profile</nuxt-link></li>
                                <li :class="`${$route.name === 'change-password' ? 'active' : ''}`"><nuxt-link :to="{ name: 'change-password' }"><i class="fas fa-lock"></i>Change Password</nuxt-link></li>
                                <li><a href="javascript:;" @click.stop.prevent="logout()"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
                            </ul>
                        </li>

                        <!-- Menu Patient -->
                        <li class="greats" v-if="roleName === 'patient' && user && user.userable">
                            <span class="text_truncate">Hello, {{ user.userable.first_name || 'Patient' }}</span>
                        </li>
                        <li class="title_menu" v-if="roleName === 'patient'">
                            <span class="show padding_10 text_uppercase bold p_left_15 text_truncate">My Account</span>
                        </li>
                        
                        <li v-if="roleName === 'patient'" :class="`${$route.name === 'patient-profile' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'patient-profile' }"><i class="fas fa-user"></i>Profile</nuxt-link></li>

                        <li v-if="roleName === 'patient'" :class="`${$route.name === 'patient-record' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'patient-record' }"><i class="fas fa-user"></i>Personal Health</nuxt-link></li>
                            
                        <li class="dropdown last" v-if="roleName === 'patient'">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-table"></i>
                                Health Record
                                <i class="fas fa-chevron-down"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li v-if="roleName === 'patient'" :class="`${$route.name === 'expenditure' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'expenditure' }"><i class="fas fa-user"></i>Expenditure</nuxt-link></li>

                            <li v-if="roleName === 'patient'" :class="`${$route.name === 'expenditure-1' ? 'active' : ''}`">
                                <nuxt-link :to="{ name: 'expenditure-1' }"><i class="fas fa-user"></i>Expenditure 1</nuxt-link></li>
                                
                            <li v-if="roleName === 'patient'" :class="`${$route.name === 'ipharmacy' ? 'active' : ''}`">
                                <nuxt-link :to="{ name: 'ipharmacy' }"><i class="fas fa-user"></i>iPharmacy</nuxt-link></li>
                            
                            <li v-if="roleName === 'patient'" :class="`${$route.name === 'pharmacy' ? 'active' : ''}`">
                                <nuxt-link :to="{ name: 'pharmacy' }"><i class="fas fa-user"></i>Pharmacy</nuxt-link></li>

                            <li v-if="roleName === 'patient'" :class="`${$route.name === 'medical-prediction' ? 'active' : ''}`">
                                <nuxt-link :to="{ name: 'medical-prediction' }"><i class="fas fa-user"></i>Medical Prediction</nuxt-link></li>
                                              
                            </ul>
                        </li>
                        <li v-if="roleName === 'patient'" :class="`${$route.name === 'plan-your-trip-patient' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'plan-your-trip-patient' }"><i class="fas fa-user"></i>Plan Your Trip</nuxt-link></li>
                        
                        <li v-if="roleName === 'patient'" :class="`${$route.name === 'donation-patient' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'donation-patient' }"><i class="fas fa-user"></i>Donation</nuxt-link></li>

                         <li v-if="roleName === 'patient'" :class="`${$route.name === 'schedule-appointment' ? 'active' : ''}`">
                        <nuxt-link :to="{ name: 'schedule-appointment' }"><i class="fas fa-calendar-o"></i>Schedule Appointment</nuxt-link></li>
                        
                        <li v-if="roleName === 'patient'" :class="`${$route.name === 'patient-doctors' ? 'active' : ''}`">
                        <nuxt-link :to="{ name: 'patient-doctors' }"><i class="fas fa-user-md"></i>Search Doctors</nuxt-link></li>

                        <li>
                        <a href="#"><i class="fas fa-user-md"></i>Video Confercing</a></li>

                        <li>
                        <a><i class="fas fa-user-md"></i>Tele Medicine</a></li>
                        
                        <li class="dropdown last" v-if="roleName === 'patient'">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-gear"></i>
                                Settings
                                <i class="fas fa-chevron-down"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li :class="`${$route.name === 'edit-profile' ? 'active' : ''}`"><nuxt-link :to="{ name: 'edit-profile' }"><i class="fas fa-user-edit"></i>Edit Profile</nuxt-link></li>
                                <li :class="`${$route.name === 'change-password' ? 'active' : ''}`"><nuxt-link :to="{ name: 'change-password' }"><i class="fas fa-lock"></i>Change Password</nuxt-link></li>
                                <li><a href="javascript:;" @click="logout()"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        </span>
        <span v-else>
           <div class="bg_light"><div class="container p_left_5 p_right_5"><div class="row"><div class="col-xs-12 col-sm-3 sm-text-center"><aside class="aside_header"><a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a> <a href="#" target="_blank"><i class="fab fa-twitter"></i></a> <a href="#" target="_blank"><i class="fab fa-google-plus-g"></i></a> <a href="#" target="_blank"><i class="fab fa-youtube"></i></a> <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a></aside></div> <div class="col-xs-12 col-sm-7 text-center sm-text-center"><span class="sm-block m_top_7 m_right_10 d_inline_block">Register:</span> <a href="/join-as-patient" class="btn_register m_top_5 d_inline_block"><i class="fas fa-user m_right_5"></i>
                        Patient
                    </a> <span class="line_horizontal"></span> <a href="/join-as-doctor" class="btn_register m_top_5 d_inline_block"><i class="fas fa-user-md m_right_5"></i>
                        Doctor
                    </a> <span class="line_horizontal"></span> <a href="/join-as-partner" class="btn_register m_top_5 d_inline_block"><i class="fas fa-hospital m_right_5"></i>
                        Partner
                    </a></div> <div class="col-xs-12 col-sm-2 text-right sm-text-center"><a href="/login" class="btn_login"><i class="fas fa-sign-in-alt m_right_4"></i> Login</a></div></div></div></div> <div class="container"><div class="row d_flex align_center flex_wrap"><div class="col-xs-12 col-sm-12 col-md-4 brand"><a href="/" class="logo_medicare nuxt-link-exact-active nuxt-link-active"><img src="/images/logo-medicare.png" alt="Logo Medicare" title="Logo Medicare"></a> <button type="button" class="hamburguer"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="sr-only">Toggle navigation</span></button></div> <div class="col-xs-12 col-sm-12 col-md-8"><div class="row d_flex align_center flex_wrap"><div class="col-xs-12 col-sm-5"><div class="m_top_10 m_bottom_10"><i class="fa-fw far fa-envelope color_blue_dark f_size_22 m_top_7 m_right_10 pull-left"></i> <span class="show f_size_11 color_blue">Send us a Message</span> <a href="mailto:help@medihealthtourism.com"><h5 class="d_inline_block f_size_13 m_top_5 m_bottom_0 text_normal text_truncate">
                                help@medihealthtourism.com</h5></a></div></div> <div class="col-xs-12 col-sm-4"><div class="m_top_10 m_bottom_10"><i class="fa-fw fas fa-mobile-alt color_blue_dark f_size_22 m_top_7 m_right_10 pull-left"></i> <span class="show f_size_11 color_blue">Give us a Call</span> <a href="tel:12345678"><h5 class="d_inline_block f_size_13 m_top_5 m_bottom_0 text_truncate">+44 (0) 16 2878 1636</h5></a></div></div> <div class="col-xs-12 col-sm-3 text-right sm-text-center"><a href="/affiliate" class="btn btn-default btn-sm m_top_10 m_bottom_10">Affiliate program</a></div></div></div></div></div> <div class="bg_light"><div class="container padding_0"><nav class="custom_menu"><ul><!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <li class="divider"></li> <li class="title_menu hidden"><span class="show padding_10 text_uppercase bold text_truncate">Institutional</span></li> <li class="active"><a href="/" class="nuxt-link-exact-active nuxt-link-active"><i class="fas fa-home"></i>
                            Home
                        </a></li> <li class=""><a href="/about" class=""><i class="fas fa-hospital"></i>
                            About us
                        </a></li> 
                        
                        <li class="submenu"><a href="javascript:void(0)"><i class="fas fa-stethoscope"></i>
                            Services
                            <i class="fas fa-chevron-down"></i></a> 
                            <ul class="ctm-submenu">
                            <li><a href="/procedures" class="">Procedures</a></li> <li><a href="/services/benefits" class="">Benefits</a></li><li><a href="/services/advantages" class="">Advantages</a></li><li><a href="/services/dental" class="">Dental</a></li></ul></li> <li class=""><a href="/protection-plan" class=""><i class="fas fa-h-square"></i>
                            Protection plan
                        </a></li> <li class=""><a href="/blog" class=""><i class="fas fa-rss"></i>
                            Blog
                        </a></li> <li class=""><a href="/channel" class=""><i class="fas fa-play-circle"></i>
                            Channel
                        </a></li> <li class=""><a href="/plan-your-trip" class=""><i class="fas fa-plane"></i>
                            Plan your trip
                        </a></li> <li class=""><a href="/donation" class=""><i class="fas fa-heart"></i>
                            Donation
                        </a></li> <li class=""><a href="/careers" class=""><i class="fas fa-user-tie"></i>
                            Careers
                        </a></li> <li class=""><a href="/contact" class=""><i class="fas fa-envelope"></i>
                            Contact
                        </a></li></ul></nav></div></div>
        </span>
    </header>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { isGuest } from '@/utils/auth'

    export default {
        name: 'Header',
        data () {
            return {
                collapse: true
            }
        },
        props: ['menuOpen'],
        computed: {
            ...mapState(['services', 'user']),
            ...mapGetters({ roleName: 'getUserRoleName'}),
            isGuest () {
                if (process.browser)
                    return isGuest(this.$store)

                return true
            }
        },
        methods: {
            ...mapActions(['logout'])
        }
    }
</script>
