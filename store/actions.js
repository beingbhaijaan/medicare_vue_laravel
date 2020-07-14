import * as types from '@/store/mutation-types'
import { getPages, getBanners, getProcedures, getRecentPosts, initSite} from '@/services'
import { attemptLogin, logout } from '@/services/auth'

export default {
    attemptLogin ({ commit, dispatch }, credentials) {
        attemptLogin(this.$axios, credentials)
            .then(({data}) => {
                let auth = {
                    accessToken: data.access_token,
                    type: data.token_type,
                    expiresAt: data.expires_at
                }
                commit(types.SET_AUTH, auth)
                commit(types.SET_USER, data.user)

                if (data.user && (data.user.role_id === 1 || data.user.role_id === 2)) {
                    commit(types.SET_ERROR, ['login', {email: ['Credentials does not match']}])
                    dispatch('logout')
                } else if (data.user) {
                    commit(types.SET_ERROR, ['login', {}])
                    let prefix = data.user.role.name.toLowerCase()
                    this.$router.push({ name: `${prefix}-profile` })
                }
            })
            .catch((e) => {
                commit(types.SET_ERROR, ['login', e.response.data.errors])
            })
    },
    activateAndLogIn({ commit, dispatch }, data) {
        let auth = {
            accessToken: data.access_token,
            type: data.token_type,
            expiresAt: data.expires_at
        }
        commit(types.SET_AUTH, auth)
        commit(types.SET_USER, data.user)
        
        if (data.user && (data.user.role_id === 1 || data.user.role_id === 2)) {
            commit(types.SET_ERROR, ['login', { email: ['Credentials does not match'] }])
            dispatch('logout')
        } else if (data.user) {
            commit(types.SET_ERROR, ['login', {}])
            let prefix = data.user.role.name.toLowerCase()
            this.$router.push({ name: `${prefix}-profile` })
        }
    },
    logout ({ commit }) {
        logout(this.$axios)
            .then(() => {
                let auth = {
                    accessToken: null,
                    type: null,
                    expiresAt: null
                }
                commit(types.SET_AUTH, auth)
                commit(types.SET_USER, null)
                this.$router.push({ name: 'login' })
            })
            .catch((e) => { commit(types.SET_ERROR, ['logout', e.response.data.errors]) })
    },
    initStore ({ commit }) {
        commit(types.END_LOADING, true)

        initSite(this.$axios)
            .then(({data}) => {
                commit(types.SET_SETTINGS, data.settings)

                commit(types.SET_BANNERS, data.banners)

                let doctors = data.doctors.map(item => ({
                    image: item.avatar,
                    name: `${item.first_name} ${item.last_name}`,
                    position: item.specialty,
                    content: item.summary
                }))
                commit(types.SET_DOCTORS, doctors)

                let staff = data.staff.map(item => ({
                    image: item.avatar,
                    position: item.position,
                    name: `${item.first_name} ${item.last_name}`,
                    buttons: [
                        {
                            to: item.facebook,
                            icon: 'fab fa-facebook-f'
                        },
                        {
                            to: item.twitter,
                            icon: 'fab fa-twitter'
                        },
                        {
                            to: item.linkedin,
                            icon: 'fab fa-linkedin-in'
                        },
                    ]
                }))
                commit(types.SET_STAFF, staff)

                commit(types.SET_SERVICES, data.services)

                commit(types.SET_PAGES, data.pages)

                commit(types.SET_NUMBERS, data.numbers)

                commit(types.SET_COUNTRIES, data.countries)

                commit(types.END_LOADING)
            })
            .catch((e) => { console.log(e) })
        getRecentPosts(this.$axios, { take: 2, orderBy: 'publish_date', orderByDirection: 'desc' })
            .then(({data}) => {
                commit(types.SET_POSTS, data)
            })
            .catch((e) => { console.log(e) })
        getProcedures(this.$axios, { highlight: true })
            .then(({data}) => {
                let mapped = data.map(item => ({
                    image: item.image,
                    name: item.name,
                    content: item.summary,
                    buttons: [{
                        to: { name: 'procedures-reference', params: { reference: item.reference } },
                        text: 'Read more'
                    }]
                }))
                commit(types.SET_PROCEDURES, mapped)
            })
            .catch((e) => { console.log(e) })
    },
    setPages ({ commit }) {
        getPages(this.$axios)
            .then(({data}) => {
                commit(types.SET_PAGES, data)
            })
            .catch((e) => { console.log(e) })
    },
    setBanners ({ commit }) {
        getBanners(this.$axios)
            .then(({data}) => {
                commit(types.SET_BANNERS, data)
            })
            .catch((e) => { console.log(e) })
    },
    setAuth ({ commit }, auth) {
        if (auth) {
            commit(types.SET_AUTH, auth)
        }
    },
    setUser ({ commit }, user) {
        if (user) {
            commit(types.SET_USER, user)
        }
    },
    endUserLoading ({ commit }, value = false) {
        commit(types.END_USER_LOADING, value)
    }
}
