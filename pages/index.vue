<template>
    <div>

        <!-- Main Banner
        ============================================= -->
        <Swiper instanceName="banners" :slides="banners" v-if="banners.length" :options="{ autoplay: { delay: 6000, disableOnInteraction: false }, loop: banners.length > 1 }" :hidePagination="true" type="banner" :hideNavigation="banners.length == 1" class="banner_home" />

        <!-- Home Boxes
        ============================================= -->
       <section class="container text-center animated fadeInUp"><div class="space_x4"><div class="row"><div class="col-xs-12 col-sm-4 p_bottom_20">
           <img src="/images/icons/man.png" alt="Patient"> <h3 class="m_top_15 f_size_18">Patient</h3> <p class="margin_0 min_h_95 f_size_16">
               If you are a looking for a doctor, join as patient and get in touch with the most qualified professionals in the world.</p> 
               <a href="/join-as-patient" class="btn btn-sm btn-default">I am a patient</a></div> <div class="col-xs-12 col-sm-4 p_bottom_20">
                   <img src="/images/icons/doctor.png" alt="Doctor"> <h3 class="m_top_15 f_size_18">Doctor</h3> <p class="margin_0 min_h_95 f_size_16">
                       Join as doctor and be part of the greatest professionals team. All your appointments will be totally flexible.</p> 
                       <a href="/join-as-doctor" class="btn btn-sm btn-default">I am a doctor</a></div> <div class="col-xs-12 col-sm-4 p_bottom_20">
                           <img src="/images/icons/hospital.png" alt="Partner"> <h3 class="m_top_15 f_size_18">Partner</h3>
                            <p class="margin_0 min_h_95 f_size_16">
                                Join as partner and become reference by having the greatest professionals and patients related to you.</p> 
       <a href="/join-as-partner" class="btn btn-sm btn-default">I am a partner</a></div></div></div></section>

        <!-- Procedures
        ============================================= -->
        <section class="space_x5 bg_light ct-services" v-if="procedures.length">
            <div class="padding_15 slide_procedures text-center">
                <h1 class="light m_bottom_40"> Services <span>& Procedures</span></h1>
                <Swiper instanceName="procedures" :slides="procedures" :options="proceduresOptions" :hideNavigation="true" type="profile"/>
            </div>
        </section>
        <!------ cta -->
        <a href="/donation" class=""><img src="/images/save-the-children.jpg" alt="Donate Medicare Foundation" class="img-responsive"></a>

        <!-- Reach us out
        ============================================= -->
        <section class="appointment-sec text-center" v-if="!loadingContents && contents[0]">
            <div class="container">
                <h1>{{ contents[0].name }}</h1>
                <p v-if="contents[0].type === 'html'" v-html="contents[0].text" class="lead"></p>
                <img v-else-if="contents[0].type === 'image'" class="lead" :src="renderURL(contents[0].text)" />
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-5 col-md-push-6">
                        <div class="appointment-form clearfix">
                            <ContactForm />
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-md-pull-5">
                        <figure><img src="images/theme/appointment-img.jpg" alt="image" title="Appointment image" class="img-responsive m_0_auto"></figure>
                    </div>
                </div>
            </div>
        </section>

        <!-- About
        ============================================= -->
        <section class="about-sec text-center" data-stellar-background-ratio="0.3" v-if="!loadingContents && contents[1] && numbers">
            <div class="container">
             <div class="row">
             <div class="col-xs-12 col-sm-6 col-md-7">
                 <h1>{{ contents[1].name }}</h1>
                <p v-if="contents[1].type === 'html'" v-html="contents[1].text" class="lead"></p>
                <img v-else-if="contents[1].type === 'image'" class="lead" :src="renderURL(contents[1].text)" />
                <div class="row text-center" id="counters">
                    <div class="col-xs-6 col-sm-3">
                        <div class="counter">
                            <span class="quantity-counter1 highlight">{{ numbers.doctors }}</span>
                            <h6 class="counter-details">DOCTORS</h6>
                        </div>
                    </div>
                    <div class="col-xs-6 col-sm-3">
                        <div class="counter">
                            <span class="quantity-counter2 highlight">{{ numbers.partners }}</span>
                            <h6 class="counter-details">PARTNERS</h6>
                        </div>
                    </div>
                    <div class="col-xs-6 col-sm-3">
                        <div class="counter">
                            <span class="quantity-counter3 highlight">{{ numbers.patients }}</span>
                            <h6 class="counter-details">PATIENTS</h6>
                        </div>
                    </div>
                    <div class="col-xs-6 col-sm-3">
                        <div class="counter">
                            <span class="quantity-counter4 highlight">{{ numbers.appointments }}</span>
                            <h6 class="counter-details">APPOITMENTS</h6>
                        </div>
                    </div>
                </div>
             </div>
              <div class="col-xs-12 col-sm-6 col-md-offset-1 col-md-4">
                    <h5 class="f_normal color_white as">
                    Channel <span class="bold">Medicare Health Tourism</span></h5> 
                    <div class="play">
                        <i class="fas fa-play-circle"></i>
                    </div> 
                    <p class="f_size_16 bold m_top_10">Video 01</p> 
                    <a href="/blog" class="btn btn-rounded btn-bordered margin_0 btn-sm"><i class="fa fa-play-circle m_right_5"></i>All videos</a>
              </div>
            </div>
            </div>
        </section>

        <!-- Latest News
        ============================================= -->
        <section class="space_x5 ct-blog">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-8" v-if="posts.length">
                        <h2 class="bordered light">
                            Latest <span>News</span>
                            <nuxt-link :to="{ name: 'blog' }" class="btn btn-default btn-sm pull-right ct-grey-btn"><i class="fa fa-rss m_right_5"></i>View all posts</nuxt-link>
                        </h2>
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-6" v-for="post in posts" :key="post.reference">
                                <article class="blog-item">
                                    <nuxt-link :to="{ name: 'blog-reference', params: { reference: post.reference } }" class="blog-thumbnail show">
                                        <img alt="" :src="renderURL(post.image)">
                                        <div class="blog-date">
                                            <p class="day f_size_30">{{ post.publish_date | formatDate('DD') }}</p>
                                            <p class="monthyear">{{ post.publish_date | formatDate('MMM YYYY') }}</p>
                                        </div>
                                    </nuxt-link>
                                    <div class="blog-content">
                                        <h4 class="blog-title"><nuxt-link :to="{ name: 'blog-reference', params: { reference: post.reference } }">{{ post.title }}</nuxt-link></h4>
                                        <p>{{ post.summary }}</p>
                                       
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar
                    ============================================= -->
                    <aside class="col-xs-12 col-sm-12 col-md-4" v-if="doctors.length">
                        <h2 class="bordered light">Meet some <span>doctors</span></h2>
                        <div class="what-doctor-say clearfix text-center slide_doctors">
                            <Swiper instanceName="doctors" :slides="doctors" :hideNavigation="true" :options="{ loop: doctors.length > 1 }" :hidePagination="doctors.length == 1" type="profile" />
                        </div>
                    </aside>

                </div>
            </div>
        </section>

        <!-- App Store
        ============================================= -->
        <section class="medicom-app space_x5 p_bottom_0" data-stellar-background-ratio="0.3">
            <div class="container">
                <div class="row d_flex align_center">
                    <div class="col-xs-12 col-sm-12 col-md-7 col-md-push-5">
                        <div class="text-center m_bottom_50">
                            <h1 class="color_white">Medicare App</h1>
                            <p class="color_white">As we don't have app, we can promote some service here</p>
                            <img src="/images/theme/app-store-btn.png" alt="" title="Apple Store" class="margin_5">
                            <img src="/images/theme/google-play-btn.png" alt="" title="Google Play" class="margin_5">
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-5 col-md-pull-7">
                        <img src="/images/theme/mobile-hand.png" class="img-responsive" alt="" title="">
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials
        ============================================= -->
        <section class="space_x4 bg_lines text-center p_bottom_0" v-if="testimonials.length">
            <div class="container">
                <h1 class="color_green light">What Our patients <span>Say About Us</span></h1>
                <div class="what-doctor-say clearfix slide_testimonials">
                    <Swiper instanceName="testimonials" :slides="testimonials" :hideNavigation="true" :options="{ loop: testimonials.length > 1 }" :hidePagination="testimonials.length <= 1" type="profile"/>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import ContactForm from '@/components/ContactForm'
    import Swiper from '@/components/swipers/Main'
    import EasyURL from '@/utils/mixins/easyURL'
    import LoadPage from '@/utils/mixins/loadPage'
    import { mapState } from 'vuex'
    import { getTestimonials } from '@/services'

    export default {
        name: 'Home',
        components: { ContactForm, Swiper },
        mixins: [LoadPage, EasyURL],
        async fetch ({ store }) {
            await store.dispatch('setBanners')
        },
        data () {
            return {
                proceduresOptions: {
                    loop: false,
                    centeredSlides: false,
                    spaceBetween: 30,
                    breakpoints: {
                        320: {
                            slidesPerView: 1
                        },
                        640: {
                            slidesPerView: 2
                        },
                        960: {
                            slidesPerView: 3
                        },
                        1270: {
                            slidesPerView: 4
                        },
                        1590: {
                            slidesPerView: 5
                        },
                        1910: {
                            slidesPerView: 6
                        },
                        2230: {
                            slidesPerView: 7
                        }
                    }
                },
                contents: [],
                loadingContents: false,
                testimonials: [],
                leadingTestimonials: false
            }
        },
        computed: {
            ...mapState(['banners', 'procedures', 'posts', 'doctors', 'numbers'])
        },
        created () {
            this.getTestimonials()
        },
        methods: {
            getTestimonials () {
                this.leadingTestimonials = true
                getTestimonials(this.$axios)
                    .then(({ data }) => {
                        this.leadingTestimonials = false
                        this.testimonials = data
                    })
                    .catch(e => { console.log(e) })
                    .then(() => this.loadingTestimonials = false)
            }
        }
    }
</script>
