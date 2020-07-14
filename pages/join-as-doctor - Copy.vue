<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner :content="page.name"/>

        <!-- Content Page
        ============================================= -->
        <section class="appointment-sec">
            <div class="container" v-if="!loadingContents && contents[0]">
                <div class="space_x4 text-center">
                    <h1 v-html="contents[0].name"></h1>
                    <div class="lead" v-if="contents[0].type === 'html'" v-html="contents[0].text"></div>
                    <img v-else-if="contents[0].type === 'image'" class="lead" :src="renderURL(contents[0].text)" />
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-4 col-md-push-7">
                        <div class="appointment-form clearfix">
                            <form @submit.prevent="submit()" class="row cols_10">
                                <div class="col-xs-12">
                                    <input type="text" v-model="record.first_name" placeholder="First Name">
                                    <span v-if="errors['first_name']" class="error">{{ errors['first_name'][0] }}</span>
                                </div>
                                <div class="col-xs-12">
                                    <input type="text" v-model="record.last_name" placeholder="Last Name">
                                    <span v-if="errors['last_name']" class="error">{{ errors['last_name'][0] }}</span>
                                </div>
                                <div class="col-xs-12">
                                    <input type="email" v-model="record.email" placeholder="Email Address">
                                    <span v-if="errors['email']" class="error">{{ errors['email'][0] }}</span>
                                </div>
                                <div class="col-xs-12">
                                    <div class="select">
                                        <select v-model="record.country_id">
                                            <option value="">Select your country of residence</option>
                                            <option v-for="country in countries" :value="country.id" :key="country.id">{{ country.name }}</option>
                                        </select>
                                    </div>
                                    <span v-if="errors['country_id']" class="error">{{ errors['country_id'][0] }}</span>
                                </div>
                                <div class="col-xs-12 d_flex">
                                    <span class="form-control custom_badge">
                                        {{ getCountryCallCodeById(record.country_id) || '-' }}
                                    </span>
                                    <div style="width: 100%">
                                        <input type="number" v-model="record.phone" placeholder="Contact Number">
                                        <span v-if="errors['phone']" class="error">{{ errors['phone'][0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xs-12 d_flex">
                                    <span class="form-control custom_badge">
                                        {{ getCountryCallCodeById(record.country_id) || '-' }}
                                    </span>
                                    <div style="width: 100%">
                                        <input type="number" v-model="record.mobile" placeholder="Mobile Number">
                                        <span v-if="errors['mobile']" class="error">{{ errors['mobile'][0] }}</span>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <label class="pretty-check noselect f_size_14" for="accepted_terms">
                                        <input type="checkbox" class="pretty-check" id="accepted_terms" v-model="record.accepted_terms">
                                        <span class="pretty-check-target f_size_16"></span>
                                        I did read and accept <nuxt-link :to="{ name: 'terms-and-conditions-doctor' }">Terms and Conditions</nuxt-link>
                                    </label>
                                    <span v-if="errors['accepted_terms']" class="error">{{ errors['accepted_terms'][0] }}</span>
                                </div>
                                <div class="col-xs-12 margin-bottom-10">
                                    <mdcr-recaptcha ref="captcha" @captchaVerified="captchaVerified" />
                                    <span v-if="errors['recaptcha']" class="error" style="margin-top: 15px;">{{ errors['recaptcha'][0] }}</span>
                                </div>
                                <div class="col-xs-12">
                                    <small class="show clearfix text-left text-danger">(*) All fields are required</small>
                                    <button class="btn btn-default btn-rounded m_top_20" type="submit">
                                        <span v-if="!loading">Submit</span>
                                        <span v-else><i class="fa fa-refresh fa-spin"></i></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-md-pull-3">
                        <figure class="text-center">
                            <img src="/images/theme/appointment-img.jpg" alt="image" title="Doctor register" class="img-responsive m_0_auto">
                        </figure>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import { createDoctor } from '@/services'
    import Notify from '@/utils/sweetalert'
    import LoadPage from '@/utils/mixins/loadPage'
    import EasyURL from '@/utils/mixins/easyURL'
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: 'JoinDoctor',
        components: { Banner },
        mixins: [LoadPage, EasyURL],
        data () {
            return {
                loading: false,
                record: {
                    first_name: null,
                    last_name: null,
                    email: null,
                    phone: null,
                    mobile: null,
                    country_id: '',
                    accepted_terms: false,
                    recaptcha: null
                },
                errors: {},
                contents: [],
                loadingContents: false,
                validateCaptcha: false
            }
        },
        computed: {
            ...mapState(['countries']),
            ...mapGetters(['getCountryCallCodeById'])
        },
        methods: {
            submit () {
                this.loading = true

                let payload = { ...this.record }

                let callingCode = this.getCountryCallCodeById(this.record.country_id)

                if (callingCode) {
                    payload['phone'] = `${callingCode}${this.record.phone}`
                    payload['mobile'] = `${callingCode}${this.record.mobile}`
                }

                createDoctor(this.$axios, payload)
                    .then(() => {
                        this.errors = {}
                        this.clear()
                        Notify.success('Thank you! We\'ll get in touch soon!')
                    })
                    .catch(error => {
                        this.$refs.captcha.reset()
                        this.record.recaptcha = null
                        this.errors = error.response.data.errors || {}
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            captchaVerified (recaptchaToken) {
                this.record.recaptcha = recaptchaToken
            },
            clear () {
                this.record = {
                    first_name: null,
                    last_name: null,
                    email: null,
                    phone: null,
                    mobile: null,
                    country_id: '',
                    accepted_terms: false,
                    recaptcha: null
                }
                this.errors = {}
                this.$refs.captcha.reset()
            }
        }
    }
</script>
