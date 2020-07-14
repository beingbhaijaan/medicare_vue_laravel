import { mapGetters } from 'vuex'
import { getContents } from '@/services'

export default {
    data () {
        return {
            contents: [],
            loadingContents: false
        }
    },
    computed: {
        ...mapGetters(['getPage']),
        page () {
            let page = this.getPage(this.$route.name)

            if (page) {
                this.getPageContents(page.id)
                return page
            }

            return this.dummyPage()
        },
    },
    methods: {
        getPageContents (pageId) {
            this.loadingContents = true
            getContents(this.$axios, pageId)
                .then(({ data }) => {
                    this.contents = data
                })
                .catch(error => { console.log(error) })
                .then(() => { this.loadingContents = false })
        },
        dummyPage () {
            let treatedContent = this.treatContent(this.$route.name)
            return {
                title: treatedContent,
                name: treatedContent,
                description: `The ${this.$route.name} page is for related subjects from Medicare`
            }
        },
        treatContent (str) {
            str = this.sanitize(str)
            let translated = this.translate(str)

            if (str !== translated)
                return translated

            return this.capitalize(str)
        },
        capitalize (str) {
            str = str.split('')
            str[0] = str[0].toUpperCase()
            return str.join('')
        },
        sanitize (str) {
            return str.split('').map(l => l === '-' || l === '_' || l === '.' ? ' ' : l).join('')
        },
        translate (key) {
            let dict = {
                index: 'Home'
            }
            return dict[key] || key
        }
    },
    head () {
        return {
            title: this.page.title,
            meta: [
                { hid: 'description', name: 'description', content: this.page.description },
                // Open graph meta tags
                { hid: 'og:title', name: 'og:title', content: this.page.title },
                { hid: 'og:description', name: 'og:description', content: this.page.description },
                { hid: 'og:image', name: 'og:image', content: `${process.env.stagingURL}/images/medicare-share.jpg` },
                { hid: 'og:url', name: 'og:url', content: `${process.env.stagingURL}/${this.page.reference}` },
                { hid: 'og:type', name: 'og:type', content: 'article' },
                { hid: 'og:locale', name: 'og:locale', content: 'en_US' },
                // Twitter meta tags
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
                // awaiting medicare twitter account
                // { hid: 'twitter:site', name: 'twitter:site', content: '@medicare' },
                // { hid: 'twitter:creator', name: 'twitter:creator', content: '@medicare' },
            ]
        }
    }
}
