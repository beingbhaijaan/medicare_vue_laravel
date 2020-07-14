<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Recover password"/>

        <!-- Content Page
        ============================================= -->
        <div class="container">
            <div class="space_x4">
                <div class="row">
                    <div class="col-xs-12 col-sm-offset-2 col-sm-8">
                        <p class="f_size_20 bold text-center">Enter your email to recover password</p>
                        <div class="row">
                            <div class="col-xs-12 col-sm-offset-3 col-sm-6">
                                <form @submit.prevent.stop="forgotPassword()">
                                    <div>
                                        <input type="email" v-model="record.email" autocomplete="username email" placeholder="Your email">
                                         <span v-if="errors['email']" class="error">{{ errors['email'][0] }}</span>
                                    </div>
                                    <div class="text-center">
                                        <button class="btn btn-default btn-rounded m_top_20" type="submit">
                                            <span>Recover password</span>
                                        </button>
                                    </div>
                                </form>
                                <div class="text-center">
                                    <hr class="margin_30">
                                    <nuxt-link :to="{ name: 'login' }"><i class="fas fa-sign-in-alt m_right_5"></i> Login</nuxt-link>
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
    import { forgotPassword } from '@/services/auth'
    import Notify from '@/utils/sweetalert'

    export default {
        name: 'ForgotPassword',
        components: { Banner },
        data () {
            return {
                loading: false,
                errors: {},
                record: {
                    email: null
                }
            }
        },
        methods: {
            forgotPassword () {
                this.loading = true
                forgotPassword(this.$axios, this.record)
                    .then(({ data }) => {
                        Notify.success('We sent to you a link for password recovery.', 'Check your email')
                        this.$router.push({ name: 'login' })
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors || []
                    })
                    .then(() => {
                        this.loading = false
                    })
            }
        },
        head () {
            return {
                title: 'Forgot password'
            }
        }
    }
</script>
