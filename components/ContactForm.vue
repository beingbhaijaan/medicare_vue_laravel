<template>
    <div class="contact-form clearfix">
        <form @submit.prevent="submit()">
            <div class="row cols_10">
                <div class="col-xs-12">
                    <input type="text" v-model="record.name" placeholder="* Name">
                    <span v-if="errors['name']" class="error">{{ errors['name'][0] }}</span>
                </div>
                <div class="col-xs-12">
                    <input type="text" v-model="record.email" placeholder="* Email Address">
                    <span v-if="errors['email']" class="error">{{ errors['email'][0] }}</span>
                </div>
                <div class="col-xs-12">
                    <div class="select">
                        <select v-model="record.country_id">
                            <option value="">* Country of residence</option>
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
                        <input type="number" class="custom-field" v-model="record.phone" placeholder="* Phone Number">
                        <span v-if="errors['phone']" class="error">{{ errors['phone'][0] }}</span>
                    </div>
                </div>
                <div class="col-xs-12 d_flex">
                    <span class="form-control custom_badge">
                        {{ getCountryCallCodeById(record.country_id) || '-' }}
                    </span>
                    <div style="width: 100%">
                        <input type="number" class="custom-field" v-model="record.mobile" placeholder="Mobile Number">
                        <span v-if="errors['mobile']" class="error">{{ errors['mobile'][0] }}</span>
                    </div>
                </div>
                <div class="col-xs-12">
                    <textarea v-model="record.content" :placeholder="contentLabel" rows="6"></textarea>
                    <span v-if="errors['content']" class="error">{{ errors['content'][0] }}</span>
                </div>
            </div>
            <button class="btn btn-default" type="submit">
                <span v-if="!loading">Submit</span>
                <span v-else><i class="fa fa-refresh fa-spin"></i></span>
            </button>
        </form>
    </div>
</template>

<script>
    import { createContact } from '@/services'
    import Notify from '@/utils/sweetalert'
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: 'ContactForm',
        props: {
            type: {
                type: String,
                default: 'contact'
            },
            procedure: {
                type: String
            },
            contentLabel: {
                type: String,
                default: '* Message'
            }
        },
        data () {
            return {
                loading: false,
                record: {
                    name: null,
                    email: null,
                    phone: null,
                    mobile: null,
                    country_id: '',
                    content: null,
                },
                errors: {}
            }
        },
        computed: {
            ...mapState(['countries']),
            ...mapGetters(['getCountryCallCodeById'])
        },
        methods: {
            submit () {
                this.loading = true

                let payload = {
                    ...this.record,
                    type: this.type,
                    procedure: this.procedure
                }

                let callingCode = this.getCountryCallCodeById(this.record.country_id)

                if (callingCode) {
                    payload['phone'] = `${callingCode}${this.record.phone}`
                    payload['mobile'] = `${callingCode}${this.record.mobile}`
                }

                createContact(this.$axios, payload)
                    .then(() => {
                        this.clear()
                        Notify.success('Thank you! We\'ll get in touch soon!')
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors || []
                    })
                    .then(() => {
                        this.loading = false
                    })
            },
            clear () {
                this.record = {
                    name: null,
                    email: null,
                    phone: null,
                    mobile: null,
                    country_id: '',
                    content: null
                }
                this.errors = {}
            }
        }
    }
</script>
