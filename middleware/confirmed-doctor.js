import { isGuest } from '@/utils/auth'

export default function ({ redirect, store }) {
    if (isGuest(store)) {
        setTimeout(() => { redirect({ name: 'login'}) }, 200)
    } else if (store.getters.getUserRoleName !== 'doctor') {
        setTimeout(() => { redirect({ name: 'error-404'}) }, 200)
    } else if (store.getters.getUser.userable.confirmed === 0) {
        setTimeout(() => { redirect({ name: 'error-403' }) }, 200)
    }
}
