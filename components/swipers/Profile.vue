<template>
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(slide, i) in slides" :key="i">
            <div class="img_slide" :style="`${slide.image ? `background-image: url( ${renderURL(slide.image)});` : ''}`"></div>
            <h4 v-if="slide.name">{{ slide.name }}<br /><span>{{ slide.reference || slide.position }}</span></h4>
            <p v-if="slide.content">{{ slide.content }}</p>
            <a v-if="slide.buttons && button.to && isString(button.to)" :key="`${i}${j}`" v-for="(button, j) in slide.buttons" :href="button.to" class="btn btn-default" :target="target(button.to)">
                <i v-if="button.icon" :class="button.icon"></i> {{ button.text }}
            </a>
            <nuxt-link v-else-if="slide.buttons && button.to" :key="`${i}${j}`" v-for="(button, j) in slide.buttons" :to="button.to" class="btn btn-default">
                <i v-if="button.icon" :class="button.icon"></i> {{ button.text }}
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    import EasyURL from '@/utils/mixins/easyURL'

    export default {
        name: 'ProfileSwiper',
        mixins: [EasyURL],
        props: {
            slides: {
                type: Array,
                required: true
            }
        },
        methods: {
            isString (to) {
                return typeof to === 'string'
            },
            target (to) {
                if (typeof to === 'string' && (to.includes('http') || to.includes('www')))
                    return '_blank'

                return '_self'
            }
        }
    }
</script>
