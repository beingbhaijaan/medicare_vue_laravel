export default {
    auth: {
        accessToken: null,
        type: null,
        expiresAt: null
    },
    user: null,
    errors: {
        login: {}
    },
    countries: [],
    settings: [],
    services: [],
    pages: [],
    banners: [],
    procedures: [],
    posts: [],
    doctors: [],
    staff: [],
    numbers: {},
    loading: true,
    userLoading: true,
    roles: {
        3: 'patient',
        4: 'doctor'
    },
    appointmentStatus: ['pending', 'scheduled', 'done', 'canceled', 'missed']
}
