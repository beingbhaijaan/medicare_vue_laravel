<template>
    <section class="sub-page-banner text-center" data-stellar-background-ratio="0.3">
        <div class="overlay"></div>
        <div class="container">
            <h1 class="entry-title"><i v-if="icon" :class="icon"></i> {{content}}</h1>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Banner',
        props: {
            content: {
                type: String,
                required: true
            },
            icon: String
        }
    }
</script>
