const doctorsURL = `${process.env.apiURL}/doctors`

export function getAllPaged (axios, page = 1, params = { }) {
    return axios.get(`${doctorsURL}`, { params: { page, ...params } })
}

export function get (axios, id) {
    return axios.get(`/doctors/${id}`)
}

export const update = (axios, payload) => {
    return axios.put(`/doctors/${payload.id}`, payload)
}

export function getProfile (axios) {
    return axios.get(`${doctorsURL}/profile`)
}

export function updateProfile (axios, payload) {
    return axios.put(`${doctorsURL}/profile`, payload)
}

export function generateSlots (axios,payload) {
    return axios.post(`${doctorsURL}/appointment-slots/generate`, payload)
}

export function getSlots (axios, month, year) {
    return axios.get(`${doctorsURL}/appointment-slots/${month}/${year}`)
}

export function getFreeSlots (axios, month, year) {
    return axios.get(`${doctorsURL}/appointment-slots/free/${month}/${year}`)
}

export function getAppointments (axios, params = {}) {
    return axios.get(`${doctorsURL}/appointments`, { params })
}

export function updateAppointmentStatus (axios, payload) {
    return axios.put(`${doctorsURL}/appointments`, payload)
}

export function finishAppointment (axios, payload) {
    return axios.post(`${doctorsURL}/appointments/finish`, payload)
}

export function createMedicalHistory (axios, payload) {
    return axios.post(`${doctorsURL}/patients/medical-history`, payload)
}

export function getPatientProfile (axios, mrn) {
    return axios.get(`${doctorsURL}/patients/${mrn}`)
}

export function filterPatients (axios, page = 1, filter = {}) {
    return axios.get(`${doctorsURL}/patients`, { params: { page, ...filter } })
}

export function getMedicalRecords (axios, mrn) {
    return axios.get(`${doctorsURL}/patients/${mrn}/medical-history`)
}

export function requestAccess (axios, patientId) {
    return axios.post(`${doctorsURL}/patients/${patientId}/request`)
}

export function getSpecialties (axios) {
    return axios.get(`${doctorsURL}/specialties`)
}

export function blockSlots (axios, payload) {
    return axios.post(`${doctorsURL}/appointment-slots/block`, payload)
}

export function unblockSlots (axios, payload) {
    return axios.post(`${doctorsURL}/appointment-slots/unblock`, payload)
}

export function getBySpecialties (axios, params) {
    return axios.get(`${doctorsURL}/get-by/specialties`, { params: {...params } });
}

export function indicateDoctor (axios, payload) {
    return axios.post(`${doctorsURL}/patients/indication`, payload);
}
