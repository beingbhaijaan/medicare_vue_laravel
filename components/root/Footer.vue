<template>
   <footer id="footer" class="light p_bottom_0">
       <div class="container"><div class="row">
           <div class="col-xs-12 col-sm-12 col-md-5"><div class="footer-widget">
               <h4><span>Medicare Health Tourism</span></h4> <ul class="footer-nav list-unstyled clearfix"><li>
                   <a href="/" class="nuxt-link-exact-active nuxt-link-active"><i class="fas fa-long-arrow-alt-right"></i>Home</a
                   ></li> <li><a href="/about" class=""><i class="fas fa-long-arrow-alt-right"></i>About us</a></li> 
                   <li><a href="/procedures" class=""><i class="fas fa-long-arrow-alt-right"></i>Procedures</a></li> 
                   <li><a href="/protection-plan" class=""><i class="fas fa-long-arrow-alt-right"></i>Protection plan</a></li> 
                   <li><a href="/blog" class=""><i class="fas fa-long-arrow-alt-right"></i>Blog</a></li><li><a href="/blog" class="">
                   <i class="fas fa-long-arrow-alt-right"></i>Medicare Channel</a></li> <li><a href="/plan-your-trip" class="">
                   <i class="fas fa-long-arrow-alt-right"></i>Plan your trip</a></li> <li><a href="/donation" class="">
                   <i class="fas fa-long-arrow-alt-right"></i>Donation</a></li> <li><a href="/careers" class="">
                   <i class="fas fa-long-arrow-alt-right"></i>Careers</a></li> <li><a href="/contact" class="">
                   <i class="fas fa-long-arrow-alt-right"></i>Contact us</a></li></ul></div></div> <div class="col-xs-12 col-sm-6 col-md-4">
                       <div class="footer-widget"><h4><span>Newsletter</span></h4> <div class="newsletter clearfix"><i class="fa fa-envelope"></i>
                        <p class="newsletter-text m_bottom_0">Sign up with your email to get fresh updates.</p> <form name="newsletter_form">
                            <div class="clearfix"><input type="email" placeholder="Email Address"> <!----></div> 
                            <button type="submit" class="btn btn-default btn-rounded m_bottom_10"><span>Subscribe</span>
                            </button></form></div> <aside class="clearfix text-center d_flex align_center justify_center m_bottom_10">
                                <ul class="social3 clearfix"><li><a href="https://www.facebook.com/medicare" target="_blank">
                                <i class="fab fa-facebook-f"></i></a></li> <li><a href="https://www.twitter.com/medicare" target="_blank">
                                <i class="fab fa-twitter"></i></a></li> <li><a href="https://www.gplus.com/medicare" target="_blank">
                                <i class="fab fa-google-plus-g"></i></a></li> <li><a href="https://www.youtube.com/medicare" target="_blank">
                                <i class="fab fa-youtube"></i></a></li> <li><a href="https://www.linkedin.com/medicare" target="_blank">
                                <i class="fab fa-linkedin-in"></i></a></li></ul></aside></div></div> <div class="col-xs-12 col-sm-6 col-md-3 hide">
                                    <div class="footer-widget"><h4><span>Latest Tweets</span></h4> <div class="twitter-widget"><div class="tweet">
                                        <i class="fab fa-twitter"></i> <p><a href="#">@Rotography</a> Please kindly use our Support Forum:
                                         <a href="#.">pixelatic.co.uk.</a> <span>about a month ago</span></p></div> <div class="tweet">
                                             <i class="fab fa-twitter"></i> <p><a href="#">@Rotography</a> Please kindly use our Support Forum:
                                              <a href="#.">pixelatic.co.uk.</a> <span>about a month ago</span></p></div></div></div></div> 
                                              <div class="col-xs-12 col-sm-6 col-md-3"><div class="footer-widget"><h4><span>Get in touch</span></h4>
                                               <div class="contact-widget"><i class="fa-fw fas fa-mobile-alt"></i><p class="m_bottom_15 phone-number">+44 (0) 16 2878 1636</p> <i class="fa-fw fas fa-envelope"></i><p class="m_bottom_15"><a href="mailto:info@medihealthtourism.com">info@medihealthtourism.com</a></p> <i class="fa-fw fas fa-home"></i><p class="m_bottom_15">Medicare Health Tourism Ltd</p> <i class="fa-fw fas fa-map-marker-alt"></i><p class="m_bottom_15">Brigde House, 2 Bridge Avenue - SL6 1RR Maidenhead - United Kingdom</p></div></div></div></div></div> <div class="copyright m_bottom_0 hide"><div class="row"><div class="col-xs-12 col-sm-6"><span class="m_right_5">Terms &amp; Condition:</span> <a href="/terms-and-conditions/patient" class="">Patient</a><span class="m_left_5 m_right_5 color_green">•</span> <a href="/terms-and-conditions/doctor" class="">Doctor</a><span class="m_left_5 m_right_5 color_green">•</span> <a href="/terms-and-conditions/partner" class="">Partner</a></div> <div class="col-xs-12 col-sm-6 text-right">
                Copyright © 2018 Medicare
            </div></div></div></footer>
</template>

<script>
    import Newsletter from './Newsletter'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Footer',
        components: { Newsletter },
        computed: {
            ...mapGetters(['getSettingValue'])
        }
    }
</script>
