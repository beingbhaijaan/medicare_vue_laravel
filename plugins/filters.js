import Vue from 'vue'
import moment from 'moment-timezone'

Vue.filter('formatDate', (value, format = 'DD/MM/YYYY HH:mm') => {
    if (value) {
        value = typeof value === 'string' ? value.replace('/', '-').replace('/', '-') : value
        return moment.tz(String(value), moment.tz.guess()).format(format)
    }

    return value
})

Vue.filter('humanDate', (value) => {
    if (value) {
        value = typeof value === 'string' ? value.replace('/', '-').replace('/', '-') : value
        return moment.tz(String(value), moment.tz.guess()).fromNow()
    }

    return value
})

Vue.filter('fullname', (first, last) => {
    let str = first ? first + ' ' : ''
    str += last || ''
    return str
})

Vue.filter('concatAddress', (address, join = ' - ') => {
    let concat = []

    if (address.address)
        concat.push(address.address)
    if (address.city)
        concat.push(address.city)
    if (address.neighborhood)
        concat.push(address.neighborhood)
    if (address.complement)
        concat.push(address.complement)
    if (address.zipcode)
        concat.push(address.zipcode)

    return concat.join(join)
})
