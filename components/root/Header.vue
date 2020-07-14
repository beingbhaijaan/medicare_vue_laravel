<template>
    <header id="header" :class="`medicom-header medical-nav ${!isGuest ? 'sidebar' : ''} ${menuOpen ? 'expand' : ''}`">
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
                        
                        <li v-if="roleName === 'patient'" :class="`${$route.name === 'plan-your-trip-patient' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'plan-your-trip-patient' }"><i class="fas fa-user"></i>Plan Your Trip</nuxt-link></li>
                        
                        <li v-if="roleName === 'patient'" :class="`${$route.name === 'donation-patient' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'donation-patient' }"><i class="fas fa-user"></i>Donation</nuxt-link></li>

                        <li v-if="roleName === 'patient'" :class="`${$route.name === 'schedule-appointment' ? 'active' : ''}`">
                        <nuxt-link :to="{ name: 'schedule-appointment' }"><i class="fas fa-calendar-o"></i>Schedule Appointment</nuxt-link></li>
                        
                        <li v-if="roleName === 'patient'" :class="`${$route.name === 'patient-doctors' ? 'active' : ''}`">
                        <nuxt-link :to="{ name: 'patient-doctors' }"><i class="fas fa-user-md"></i>Search Doctors</nuxt-link></li>
                        
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

                        <li class="divider"></li>

                        <!-- Menu Site -->
                        <li class="title_menu" :class="`${isGuest ? 'hidden' : ''}`">
                            <span class="show padding_10 text_uppercase bold p_left_15 text_truncate">Institutional</span>
                        </li>
                        <li :class="`${$route.name === 'index' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'index' }"><i class="fas fa-home"></i>Home</nuxt-link>
                        </li>
                        <li :class="`${$route.name === 'about' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'about' }"><i class="fas fa-building"></i>About Us</nuxt-link>
                        </li>
                        <li class="dropdown">
                            <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fas fa-stethoscope"></i>
                                Services
                                <i class="fas fa-chevron-down"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><nuxt-link :to="{ name: 'procedures' }">Procedures</nuxt-link></li>
                                <li v-for="service in services" :key="service.reference">
                                    <nuxt-link :to="{ name: 'services-reference', params: { reference: service.reference } }">{{ service.menu_title }}</nuxt-link>
                                </li>
                            </ul>
                        </li>
                        <li :class="`${$route.name === 'protection-plan' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'protection-plan' }"><i class="fas fa-h-square"></i>Protection Plan</nuxt-link>
                        </li>
                        <li :class="`${$route.name === 'blog' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'blog' }"><i class="fas fa-rss"></i>Blog</nuxt-link>
                        </li>
                        <li :class="`${$route.name === 'contact' ? 'active' : ''}`">
                            <nuxt-link :to="{ name: 'contact' }"><i class="fas fa-envelope"></i>Contact</nuxt-link>
                        </li>
                        <li class="dropdown last login registration" v-show="isGuest">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                Register
                                <i class="fas fa-chevron-down"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><nuxt-link :to="{ name: 'join-as-doctor' }">Doctor</nuxt-link></li>
                                <li><nuxt-link :to="{ name: 'join-as-patient' }">Patient</nuxt-link></li>
                                <li><nuxt-link :to="{ name: 'join-as-partner' }">Partner</nuxt-link></li>
                            </ul>
                        </li>
                        <li class="login" v-show="isGuest">
                            <nuxt-link :to="{ name: 'login' }">Login</nuxt-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
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
