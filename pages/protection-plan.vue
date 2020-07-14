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
                    <div class="row">
                        <div class="col-md-6">
                            <div class="big-font" v-if="contents[0].type === 'html'" v-html="contents[0].text"></div>
                            <img v-else-if="contents[0].type === 'image'" class="lead" :src="renderURL(contents[0].text)" />
                        </div>
                        <section class="col-md-5 col-md-offset-1" v-if="contents.length">
                            <ContactForm type="protection_plan" contentLabel="Tell us about your medical history..."/>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import ContactForm from '@/components/ContactForm'
    import Banner from '@/components/Banner'
    import { createContact } from '@/services'
    import LoadPage from '@/utils/mixins/loadPage'
    import EasyURL from '@/utils/mixins/easyURL'

    export default {
        name: 'ProtectionPlan',
        components: { ContactForm, Banner },
        mixins: [LoadPage, EasyURL],
        data () {
            return {
                contents: [],
                loadingContents: false
            }
        }
    }
</script>
