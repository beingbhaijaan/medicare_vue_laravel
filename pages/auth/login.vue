<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Login"/>

        <!-- Content Page
        ============================================= -->
        <div class="container">
            <div class="space_x4">
                <div class="row">
                    <div class="col-xs-12 col-sm-offset-2 col-sm-8">
                        <p class="f_size_20 bold text-center">Log in to schedule and track appointments</p>
                        <div class="row">
                            <div class="col-xs-12 col-sm-offset-3 col-sm-6">
                                <form @submit.prevent.stop="doLogin()">
                                    <div>
                                        <input type="email" v-model="record.email" placeholder="Your email" autocomplete="username email">
                                         <span v-if="errors && errors['email']" class="error">{{ errors['email'][0] }}</span>
                                    </div>
                                    <div>
                                        <input type="password" v-model="record.password" placeholder="Your password" autocomplete="current-password">
                                         <span v-if="errors && errors['password']" class="error">{{ errors['password'][0] }}</span>
                                    </div>
                                    <div class="text-center">
                                        <button class="btn btn-default btn-rounded m_top_20" type="submit">
                                            <span>Login</span>
                                        </button>
                                    </div>
                                </form>
                                <div class="text-center">
                                    <hr class="margin_30">
                                    <nuxt-link :to="{ name: 'forgot-password' }"><i class="fas fa-lock m_right_5"></i> Forgot password?</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        components: { Banner },
        data () {
            return {
                record: {
                    email: null,
                    password: null
                },
            }
        },
        computed: {
            ...mapGetters({
                errors: 'getLoginError'
            })
        },
        methods: {
            ...mapActions(['attemptLogin']),
            doLogin () {
                this.attemptLogin(this.record)
            }
        },
        head () {
            return {
                title: 'Medicare | Login'
            }
        }
    }
</script>
