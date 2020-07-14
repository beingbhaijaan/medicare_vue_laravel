<template>
    <section>
        <!-- Sub Page Banner
        ============================================= -->
        <Banner :content="page.name"/>

        <div class="space_x5">

            <!-- Main section
            ============================================= -->
            <div class="container">
                <div v-if="!loadingContents && contents[0]">
                    <h2 class="light bordered main-title" v-html="contents[0].name"></h2>
                    <div class="big-font" v-if="contents[0].type === 'html'" v-html="contents[0].text"></div>
                    <img v-else-if="contents[0].type === 'image'" class="lead" :src="renderURL(contents[0].text)" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Banner from '@/components/Banner'
    import LoadPage from '@/utils/mixins/loadPage'
    import EasyURL from '@/utils/mixins/easyURL'

    export default {
        name: 'DoctorTermsConditions',
        components: { Banner },
        mixins: [LoadPage, EasyURL],
        data () {
            return {
                contents: [],
                loadingContents: false
            }
        }
    }
</script>
