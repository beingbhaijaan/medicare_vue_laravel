<template>
    <div :instanceName="instanceName" v-swiper="mergedOptions" :class="mainClass">
        <Banner v-if="this.type === 'banner'" :slides="slides" />
        <Gallery v-else-if="this.type === 'gallery'" :slides="slides" />
        <Profile v-else-if="this.type === 'profile'" :slides="slides"/>
        <div v-else :class="'swiper-wrapper'">
            <div class="swiper-slide" v-for="(slide, i) in slides" :key="i">
                <div v-if="slide.title"><strong>{{ slide.title }}</strong></div>
                <div v-if="slide.message">{{ slide.message }}</div>
            </div>
        </div>
        <div v-show="!hideNavigation && mergedOptions.navigation.prevEl" class="swiper-button-prev" slot="button-prev"></div>
        <div v-show="!hideNavigation && mergedOptions.navigation.nextEl" class="swiper-button-next" slot="button-next"></div>
        <div v-show="!hidePagination" class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
</template>

<script>
    import Banner from '@/components/swipers/Banner'
    import Gallery from '@/components/swipers/Gallery'
    import Profile from '@/components/swipers/Profile'

    export default {
        name: 'Swiper',
        components: { Banner, Gallery, Profile },
        data () {
            return {
                baseOptions: {
                    loop: true,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 0
                },
                basePagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet(index, className) {
                        return `<span class="${className} swiper-pagination-bullet-custom"></span>`
                    }
                },
                baseNavigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        },
        props: {
            instanceName: {
                type: String,
                required: true
            },
            slides: {
                type: Array,
                required: true
            },
            type: {
                type: String
            },
            mainClass: {
                type: String
            },
            options: {
                type: Object
            },
            navigation: {
                type: Object
            },
            pagination: {
                type: Object
            },
            hidePagination: {
                type: Boolean,
                default: false
            },
            hideNavigation: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            mergedOptions () {
                let merged = {
                    ...this.baseOptions,
                    ...this.options
                }
                merged['pagination'] = { ...this.basePagination, ...this.pagination }
                merged['navigation'] = { ...this.baseNavigation, ...this.navigation }

                return merged
            }
        }
    }
</script>
