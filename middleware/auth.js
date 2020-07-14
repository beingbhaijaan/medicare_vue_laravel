import { isGuest } from '@/utils/auth'

export default function ({ redirect, store }) {
    if (isGuest(store)) {
        setTimeout(() => { redirect({ name: 'login'}) }, 200)
    }
}
