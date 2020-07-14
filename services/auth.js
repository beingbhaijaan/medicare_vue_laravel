export function logout (axios) {
    return axios.get(`${process.env.baseURL}/api/auth/logout`)
}

export const attemptLogin = (axios, credentials) => {
    return axios.post(`${process.env.baseURL}/api/auth/login`, credentials)
}

export const forgotPassword = (axios, payload) => {
    return axios.post(`${process.env.baseURL}/api/password/create`, payload)
}

export const checkRecoveryToken = (axios, token) => {
    return axios.get(`${process.env.baseURL}/api/password/find/${token}`)
}

export const resetPassword = (axios, payload) => {
    return axios.post(`${process.env.baseURL}/api/password/reset`, payload)
}

export const activate = (axios, token, payload) => {
    return axios.post(`${process.env.baseURL}/api/auth/signup/activate/${token}`, payload);
}

export const changePassword = (axios, payload) => {
    return axios.put(`${process.env.baseURL}/api/auth/password/update`, payload);
}

