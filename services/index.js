export function createNewsletter (axios, payload) {
    return axios.post('/newsletters', payload)
}

export function createDoctor (axios, payload) {
    return axios.post('/doctors', payload)
}

export function createPartner (axios, payload) {
    return axios.post('/partners', payload)
}

export function createPatient (axios, payload) {
    return axios.post('/patients', payload)
}

export function createContact (axios, payload) {
    return axios.post('/contacts', payload)
}

export function getCountries (axios) {
    return axios.get('/countries')
}

export function getSettings (axios) {
    return axios.get('/settings')
}

export function getPages (axios) {
    return axios.get('/pages')
}

export function getContents (axios, id) {
    return axios.get(`/pages/${id}/contents`)
}

export function getBanners (axios) {
    return axios.get('/banners')
}

export function getTestimonials (axios) {
    return axios.get('/testimonials')
}

export function getPagedPosts (axios, page = 1, extraParams = {}) {
    return axios.get('/posts', { params: { page, ...extraParams } })
}

export function getRecentPosts (axios, params = {}) {
    return axios.get('/posts/recent', { params })
}

export function getPostByReference (axios, reference) {
    return axios.get(`/posts/${reference}`)
}

export function getServices (axios) {
    return axios.get('/services')
}

export function getServiceByReference (axios, reference) {
    return axios.get(`/services/${reference}`)
}

export function getProcedures (axios, params = {}) {
    return axios.get('/procedures', { params })
}

export function getPagedProcedures (axios, page = 1, params = {}) {
    return axios.get('/procedures', { params: { page, ...params } })
}

export function getRelatedProcedures (axios, reference) {
    return axios.get(`/procedures/related/${reference}`)
}

export function getProcedureByReference (axios, reference) {
    return axios.get(`/procedures/${reference}`)
}

export function getStaff (axios) {
    return axios.get('/staff')
}

export function getDoctors (axios) {
    return axios.get('/doctors')
}

export function initSite (axios) {
    return axios.get('/site')
}


