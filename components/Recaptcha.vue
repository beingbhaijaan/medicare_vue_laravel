<template>
    <vue-recaptcha v-if="siteKey" ref="recaptcha" :sitekey="siteKey" @verify="onCaptchaVerified" @expired="reset"></vue-recaptcha>
</template>

<script>
    import VueRecaptcha from 'vue-recaptcha';

    export default {
        components: { VueRecaptcha },
        computed: {
            siteKey () {
                return process.env.siteKey
            }
        },
        methods: {
            reset () {
                this.$refs.recaptcha.reset();
            },
            onCaptchaVerified (recaptchaToken) {
                this.$emit('captchaVerified', recaptchaToken)
            }
        }
    };
</script>
