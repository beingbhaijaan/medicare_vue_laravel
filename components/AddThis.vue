<template>
    <div class="share_post">
        <span>Share this article: </span>
        <div class="addthis_inline_share_toolbox"></div>
    </div>
</template>

<script>
    export default {
        name: 'AddThis',
        head () {
            return {
                script: [
                    { src: '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5b9c224cbb33f238' }
                ]
            }
        }
    }
</script>
