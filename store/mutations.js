import * as types from '@/store/mutation-types'

export default {
    [types.SET_AUTH] (state, auth) {
        state.auth = {...auth}
    },
    [types.SET_USER] (state, user) {
        state.user = user
    },
    [types.SET_ERROR] (state, error) {
        state.errors[error[0]] = error[1]
    },
    [types.SET_COUNTRIES] (state, countries) {
        state.countries = countries
    },
    [types.SET_SETTINGS] (state, settings) {
        state.settings = settings
    },
    [types.SET_SERVICES] (state, services) {
        state.services = services
    },
    [types.SET_PAGES] (state, pages) {
        state.pages = pages
    },
    [types.SET_BANNERS] (state, banners) {
        state.banners = banners
    },
    [types.SET_PROCEDURES] (state, procedures) {
        state.procedures = procedures
    },
    [types.SET_POSTS] (state, posts) {
        state.posts = posts
    },
    [types.SET_DOCTORS] (state, doctors) {
        state.doctors = doctors
    },
    [types.SET_STAFF] (state, staff) {
        state.staff = staff
    },
    [types.SET_NUMBERS] (state, numbers) {
        state.numbers = numbers
    },
    [types.END_LOADING] (state, loading = false) {
        state.loading = loading
    },
    [types.END_USER_LOADING] (state, userLoading = false) {
        state.userLoading = userLoading
    }
}
