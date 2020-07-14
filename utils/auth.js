import moment from 'moment-timezone'

export const isGuest = (store) => typeof store.state.auth.accessToken !== 'string' || moment.utc().isAfter(moment.utc(store.state.auth.expiresAt))
