<template>
    <div class="newsletter clearfix">
        <i class="fa fa-envelope"></i>
        <p class="newsletter-text m_bottom_0">Sign up with your email to get fresh updates.</p>
        <form name="newsletter_form" @submit.prevent="submit()">
            <input type="email" v-model="record.email" placeholder="Email Address">
            <span v-if="errors['email']" class="error">{{ errors['email'][0] }}</span>
            <button class="btn btn-default btn-rounded m_bottom_30" type="submit">
                <span v-if="!loading">Subscribe</span>
                <span v-else><i class="fa fa-refresh fa-spin" style="margin-top: 6px;"></i></span>
            </button>
        </form>
    </div>
</template>

<script>
    import { createNewsletter } from '@/services'
    import Notify from '@/utils/sweetalert'

    export default {
        data () {
            return {
                loading: false,
                record: {
                    email: null
                },
                errors: {}
            }
        },
        methods: {
            submit () {
                this.loading = true;

                createNewsletter(this.$axios, this.record)
                    .then(({ data }) => {
                        this.clear ()
                        Notify.success('Thank you! You have successfully subscribed.')
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
                    email: null
                }
                this.errors = {}
            }
        }
    }
</script>
