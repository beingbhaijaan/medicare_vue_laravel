<template>
    <div class="swiper-wrapper caption">
        <div class="swiper-slide" v-for="(slide, i) in slides" :key="i">
            <div v-if="slide.image" :style="`background-image: url(${renderURL(slide.image)})`" class="banner_img"></div>
            <div class="container">
                <div class="row w_full">
                    <div class="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8">
                        <h1 v-if="slide.title" class="color_white">{{ slide.title }}</h1>
                        <h2 v-if="slide.subtitle" class="color_white">{{ slide.subtitle }}</h2>
                        <div v-if="slide.content" class="color_white f_size_18" v-html="slide.content"></div>
                        <a v-if="slide.url" :href="slide.url" :target="slide.url_target" class="btn btn-rounded btn-bordered">
                            {{ slide.url_text }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EasyURL from '@/utils/mixins/easyURL'

    export default {
        name: 'BannerSwiper',
        mixins: [EasyURL],
        props: {
            slides: {
                type: Array,
                required: true
            }
        }
    }
</script>
