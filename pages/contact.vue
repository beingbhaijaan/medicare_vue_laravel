<template>
    <div>
        <!-- Sub Page Banner
        ============================================= -->
        <Banner :content="page.name"/>

        <!-- Sub Page Content
        ============================================= -->
        <section id="sub-page-content" class="clearfix">
            <div class="container">
                <div class="row">

                    <!-- Contact Form
                    ============================================= -->
                    <div class="col-md-7 m_bottom_50">
                        <h2 class="light bordered">Give us a <span>Message</span></h2>
                        <ContactForm />
                    </div>

                    <!-- Get in Touch Widget
                    ============================================= -->
                    <div class="col-md-offset-1 col-md-4 m_bottom_50 clearfix">
                        <h2 class="light bordered">get in <span>touch</span></h2>
                        <div class="get-in-touch-widget">
                            <ul class="list-unstyled">
                                <li class="m_bottom_15"><i class="fas fa-phone"></i>{{ getSettingValue('phone') }}</li>
                                <li class="m_bottom_15"><i class="fas fa-envelope"></i><a href="#.">{{ getSettingValue('email') }}</a></li>
                                <li class="m_bottom_15"><i class="fas fa-globe"></i><a href="#.">{{ getSettingValue('website') }}</a></li>
                                <li class="m_bottom_15"><i class="fas fa-clock-o"></i>{{ getSettingValue('office_hours') }}</li>
                            </ul>
                        </div>
                        <!-- Social
                        ============================================= -->
                        <aside>
                            <ul class="social-rounded">
                                <li><a :href="getSettingValue('facebook')" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a :href="getSettingValue('twitter')" target="_blank"><i class="fab fa-twitter"></i></a></li>
                                <li><a :href="getSettingValue('gplus')" target="_blank"><i class="fab fa-google-plus-g"></i></a></li>
                                <li><a :href="getSettingValue('youtube')" target="_blank"><i class="fab fa-youtube"></i></a></li>
                                <li><a :href="getSettingValue('linkedin')" target="_blank"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </aside>
                    </div>
                    
                </div>
                <hr>
            </div>
        </section>
    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import ContactForm from '@/components/ContactForm'
    import { mapGetters } from 'vuex'
    import LoadPage from '@/utils/mixins/loadPage'

    export default {
        name: 'Contact',
        components: { Banner, ContactForm },
        mixins: [LoadPage],
        computed: {
            ...mapGetters(['getSettingValue'])
        }
    }
</script>
