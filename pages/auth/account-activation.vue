<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner content="Account Activation"/>

        <!-- Content Page
        ============================================= -->
        <div class="container">
            <div class="space_x4 text-center">
                <div class="row">
                    <div class="col-xs-12 col-sm-offset-2 col-sm-8">
                        <p class="f_size_20 bold">Fill in the fields to activate your account</p>
                        <div class="row">
                            <div class="col-xs-12 col-sm-offset-3 col-sm-6">
                                <form @submit.prevent="activate">
                                    <div>
                                        <input type="password" placeholder="Create a password" v-model="record.password">
                                        <span v-if="errors['password']" class="error">{{ errors['password'][0] }}</span>
                                    </div>
                                    <div>
                                        <input type="password" placeholder="Repeat password" v-model="record.password_confirmation">
                                    </div>
                                    <div>
                                        <button class="btn btn-default btn-rounded m_top_20" type="submit">
                                            <span>Activate account</span>
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
    import { activate } from '@/services/auth'
    import Banner from '@/components/Banner'
    import { mapActions } from 'vuex'
    import Notify from '@/utils/sweetalert'

    export default {
        name: 'AccountActivation',
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
            ...mapActions(['activateAndLogIn']),
            activate () {
                activate (this.$axios, this.$route.params.token, this.record)
                    .then(({data}) => {
                        Notify.success('Account activated!')
                        this.activateAndLogIn(data)
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors || []
                    })
            }
        },
        components: { Banner },
        head () {
            return {
                title: 'Account activation'
            }
        }
    }
</script>
