<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Change password"/>

        <!-- Content Page
        ============================================= -->
        <div class="container">
            <div class="space_x4">
                <div class="row">
                    <div class="col-xs-12 col-sm-offset-2 col-sm-8">
                        <p class="f_size_20 bold text-center">Ente your password to change password</p>
                        <div class="row">
                            <div class="col-xs-12 col-sm-offset-3 col-sm-6">
                                <form @submit.prevent="changePassword">
                                    <div>
                                        <input type="password" placeholder="New Password" v-model="record.password">
                                        <span v-if="errors['password']" class="error">{{ errors['password'][0] }}</span>
                                    </div>
                                    <div>
                                        <input type="password" placeholder="Confirm New Password" v-model="record.password_confirmation">
                                    </div>
                                    <div class="text-center">
                                        <button class="btn btn-default btn-rounded m_top_20" type="submit">
                                            <span>Change password</span>
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
    import { changePassword } from '@/services/auth'
    import Notify from '@/utils/sweetalert'

    export default {
        name: 'ChangePassword',
        middleware: 'auth',
        data () {
            return {
                record: {
                    password: '',
                    password_confirmation: ''
                },
                errors: []
            }
        },
        methods: {
            changePassword () {
                changePassword (this.$axios, this.record)
                    .then(({data}) => {
                        Notify.success('Password updated!')
                        let prefix = data.role.name.toLowerCase()
                        this.$router.push({ name: `${prefix}-profile` })
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors || []
                    })
            }
        },
        components: { Banner },
        head () {
            return {
                title: 'Change password'
            }
        }
    }
</script>
