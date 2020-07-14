import Vue from 'vue'

const success = (text, title = 'Success') => {
    Vue.swal({
        type: 'success',
        text,
        title
    })
}

const error = (text, title = 'Error') => {
    Vue.swal({
        type: 'error',
        text,
        title
    })
}

const warning = (text, title = 'Attention') => {
    Vue.swal({
        type: 'warning',
        text,
        title
    })
}

const info = (text, title = 'Info') => {
    Vue.swal({
        type: 'info',
        text,
        title
    })
}

export default {
    success,
    error,
    warning,
    info
}
