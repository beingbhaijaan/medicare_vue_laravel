export default function ({ $axios, app, redirect }) {
    $axios.onRequest(config => {
        let token = app.store.getters.getAuth.accessToken
        let type = app.store.getters.getAuth.type

        if (typeof token === 'string' && typeof type === 'string') {
            config.headers['Authorization'] = `${ type } ${ token }`;
        }
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)

        if (code === 401) {
            let auth = {
                accessToken: null,
                type: null,
                expiresAt: null
            }
            app.store.dispatch('setAuth', auth)
            app.store.dispatch('setUser', null)
            redirect({ name: 'login' })
        }
        if (code === 403)
            redirect({ name: 'error-403' })
        if (code === 404)
            redirect({ name: 'error-404' })
        if (code === 500)
            redirect({ name: 'error-500' })
    })
}
