export default {
    methods: {
        renderURL(path) {
            if (!path)
                return ''

            if (path.includes('http://') || path.includes('https://'))
                return path

            return `${process.env.baseURL}/storage${path}`
        }
    }
}
