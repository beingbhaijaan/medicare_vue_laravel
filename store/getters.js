export default {
    getSettingValue: state => key => {
            let setting = state.settings.find(item => item.key === key)
            return setting ? setting.value : ''
        },
    getPage: state => reference => state.pages.find(item => {
            if (reference === 'index')
                reference = 'home'
            return item.reference === reference
        }),
    getAuth: state => state.auth,
    getLoginError: state => {
        return state.errors.login
    },
    getServiceWithProcedures: state => state.services.filter(item =>  item.procedures_count > 0),
    getUserRoleName: state => state.user ? state.roles[state.user.role_id] : '',
    getCountryNameById: state => key => {
        let country = state.countries.find(({ id }) => key === id)
        return country ? country.name : ''
    },
    getCountryCallCodeById: state => key => {
        let country = state.countries.find(({ id }) => key === id)
        return country ? country.calling_code : ''
    },
    getCountries: state => state.countries,
    getUser: state => state.user
}
