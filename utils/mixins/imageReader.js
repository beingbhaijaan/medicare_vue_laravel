import Notify from '@/utils/sweetalert'

export default {
    data () {
        return {
            defaultProp: 'image',
            record: {
                image: null,
                avatar: null
            },
            dirtyImage: false
        }
    },
    methods: {
        updateImage (input) {
            let files = input.target.files || input.dataTransfer.files;
            if (files.length && files[0].size <= 2000000) {
                let reader = new FileReader()

                reader.onload = (e) => {
                    this.dirtyImage = true
                    this.record[this.defaultProp] = e.target.result
                }

                reader.readAsDataURL(files[0])
            } else if (files.length) {
                input.value = ''
                Notify.error('Image files can\'t be bigger than 2MB', 'Image too big')
            }
        }
    }
}
