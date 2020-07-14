<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Password recovery"/>

        <!-- Content Page
        ============================================= -->
        <div class="container">
            <div class="space_x4 text-center">
                <div class="row">
                    <div class="col-xs-12 col-sm-offset-2 col-sm-8">
                        <p class="f_size_20 bold">Recover your password</p>
                        <div class="row">
                            <div class="col-xs-12 col-sm-offset-3 col-sm-6">
                                <form @submit.prevent.stop="resetPassword()">
                                    <div>
                                        <input type="email" class="form-control" autofocus="" v-model="record.email" placeholder="Email" autocomplete="username">
                                        <label class="error" v-if="errors && errors.email">
                                            {{ errors.email[0] }}
                                        </label>
                                    </div>
                                    <div>
                                        <input type="password" class="form-control" v-model="record.password" placeholder="Password" autocomplete="password">
                                        <label class="error" v-if="errors && errors.password && !record.password">
                                            {{ errors.password[0] }}
                                        </label>
                                    </div>
                                    <div>
                                        <input type="password" class="form-control" v-model="record.password_confirmation" placeholder="Password confirmation" autocomplete="password_confirmation">
                                        <label class="error" v-if="errors && errors.password && record.password">
                                            {{ errors.password[0] }}
                                        </label>
                                    </div>
                                    <div>
                                        <button class="btn btn-default btn-rounded m_top_20" type="submit">
                                            <span>Recover password</span>
                                        </button>
                                    </div>
                                </form>
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
    import { checkRecoveryToken, resetPassword } from '@/services/auth'
    import Notify from '@/utils/sweetalert'

    export default {
        name: 'ChangePassword',
        components: { Banner },
        data () {
            return {
                loading: false,
                errors: {},
                record: {
                    token: null,
                    password: null,
                    password_confirmation: null,
                    email: null
                }
            }
        },
        created () {
            checkRecoveryToken(this.$axios, this.$route.params.token)
                .then(() => {
                    this.record.token = this.$route.params.token
                })
                .catch(error => {
                    this.errors = error.response.data.errors || []
                    Notify.error('Invalid token!')
                    this.$router.push({ name: 'login' })
                })
        },
        methods: {
            resetPassword () {
                this.loading = true

                resetPassword(this.$axios, this.record)
                    .then(({ data }) => {
                        Notify.success('Password updated!')
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
                title: 'Password recovery'
            }
        }
    }
</script>
