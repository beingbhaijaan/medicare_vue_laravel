const patientsURL = `${process.env.apiURL}/patients`

export function getAllPaged (axios, page = 1, params = { }) {
    return axios.get(`${patientsURL}`, { params: { page, ...params } })
}

export function getProfile (axios) {
    return axios.get(`${patientsURL}/profile`)
}

export function updateProfile (axios, payload) {
    return axios.put(`${patientsURL}/profile`, payload)
}

export function get (axios, id) {
    return axios.get(`/patients/${id}`)
}

export const update = (axios, payload) => {
    return axios.put(`/patients/${payload.id}`, payload)
}

export function getDoctorProfile (axios, prn) {
    return axios.get(`${patientsURL}/doctors/${prn}`)
}

export function getFreeSlots (axios, month, year, prn) {
    return axios.get(`${patientsURL}/appointment-slots`, { params: { month, year, prn } })
}

export function schedule (axios, payload) {
    return axios.post(`${patientsURL}/appointments/${payload.id}`, payload)
}

export function getMedicalRecords (axios) {
    return axios.get(`${patientsURL}/profile/medical-history`)
}

export function getAppointments (axios, params = {}) {
    return axios.get(`${patientsURL}/appointments`, { params })
}

export function updateAppointmentStatus (axios, payload) {
    return axios.put(`${patientsURL}/appointments`, payload)
}

export function filterDoctors (axios, page = 1, filter = {}) {
    return axios.get(`${patientsURL}/doctors`, { params: { page, ...filter } })
}

export function authorizeAccess (axios, doctorId) {
    return axios.post(`${patientsURL}/doctors/${doctorId}/authorize`)
}

export function revokeAccess(axios, doctorId) {
    return axios.delete(`${patientsURL}/doctors/${doctorId}/revoke`)
}

export function approveAccess(axios, doctorId) {
    return axios.put(`${patientsURL}/doctors/${doctorId}/approve`);
}

// Helpers Routes
export function getSpecialties (axios) {
    return axios.get(`${patientsURL}/specialties`)
}

export function getAuthorizations (axios) {
    return axios.get(`${patientsURL}/profile/authorizations`)
}
