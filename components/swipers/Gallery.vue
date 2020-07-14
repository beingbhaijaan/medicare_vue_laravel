<template>
    <div class="swiper-wrapper caption">
        <div class="swiper-slide" v-for="(slide, i) in slides" :key="i">
            <img v-if="slide.image" :src="slide.image" class="img-responsive" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GallerySwiper',
        props: {
            slides: {
                type: Array,
                required: true
            }
        }
    }
</script>
