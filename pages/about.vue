<template>
    <div>

        <!-- Sub Page Banner
        ============================================= -->
        <Banner :content="page.name"/>

        <div class="space_x5 bg_lines_white">

            <div class="container big-font" v-if="!loadingContents && contents[0]">

                <!-- Who we are
                ============================================= -->
                <h2 class="light bordered" v-html="contents[0].name"></h2>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <article v-if="contents[0].type === 'html'" v-html="contents[0].text"></article>
                        <!-- <img v-else-if="contents[0].type === 'image'" :src="renderURL(contents[0].text)" /> -->
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <video style="width: 100%;" controls>
                          <source src="movies/medical-promo-1.mp4" type="video/mp4">
                          Your browser does not support HTML5 video.
                        </video>
                    </div>
                </div>

                <!-- Mission & Vision
                ============================================= -->
                <section class="space_x4 text-center p_bottom_0">
                    <h4 class="color_green m_bottom_20">Vision & Mission</h4>
                    <Swiper instanceName="vision" :slides="vision" :hideNavigation="true"/>
                </section>

            </div>

        </div>

        <!-- Why Medicare
        ============================================= -->
        <section class="after-booking-sec text-center">
            <div class="container" v-if="!loadingContents && contents[1]">
                <h1 class="m_bottom_30" v-html="contents[1].name"></h1>
                <div v-if="contents[1].type === 'html'" v-html="contents[1].text"></div>
                <img v-else-if="contents[1].type === 'image'" :src="renderURL(contents[1].text)" />
            </div>
        </section>

        <!-- CEO Message
        ============================================= -->
        <div class="space_x4" v-if="!loadingContents && contents[2]">
            <div class="container big-font">
                <h2 class="light bordered" v-html="contents[2].name"></h2>
                <div v-if="contents[2].type === 'html'" v-html="contents[2].text"></div>
                <img v-else-if="contents[2].type === 'image'" :src="renderURL(contents[2].text)" />
            </div>
        </div>

        <!-- Team
        ============================================= -->
        <section class="space_x5 bg_light" v-if="staff.length">
            <div class="container slide_team">
                <h1 class="light text-center m_bottom_40">Meet the <span>perfect Medicare</span> team</h1>
                <Swiper instanceName="staff" :options="{ slidesPerView: 4, loop: false, centeredSlides: false, spaceBetween: 30 }" :slides="staff" :circleImage="false" :hideNavigation="true" type="profile"/>
            </div>
        </section>

    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import Swiper from '@/components/swipers/Main'
    import RegisterBar from '@/components/root/RegisterBar'
    import LoadPage from '@/utils/mixins/loadPage'
    import EasyURL from '@/utils/mixins/easyURL'
    import { mapState } from 'vuex'

    export default {
        name: 'About',
        components: { Banner, Swiper },
        mixins: [LoadPage, EasyURL],
        data () {
            return {
                contents: [],
                loadingContents: false,
                vision: [
                    { message: 'Medicare Health Tourism raise awareness of the high level and cost effective of quality healthcare available in various countries.' },
                    { message: 'Provide an unbiased source of information for patients, insurance companies and employers about top hospitals, their quality of care and outsscomes.' },
                    { message: 'Serve as one voice for purposes of dealing with government organizations and the media to protect the reputation of the company members.' },
                    { message: 'Promote and provide a forum for communication and to increase connectivity between patients, healthcare providers, doctors and insurance companies.' },
                    { message: 'Medicare health tourism seek out future affiliated industries and technologies that will allow international healthcare providers to operate more efficiently in the global healthcarsse industry.' },
                    { message: 'Educate patients, insurance companies, agents, brokers, consultants and physicians from around the world about the growth of medical tourism and the globalization of healthcare.' }
                ]
            }
        },
        computed: {
            ...mapState(['staff'])
        }
    }
</script>
