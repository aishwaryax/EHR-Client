const initState = {
    registerPatientDetails: null,
    registerPatientError: null,
    registerMedicalPractitionerDetails: null,
    registerMedicalPractitionerError: null,
    registerDatabaseAdminDetails: null,
    registerDatabaseAdminError: null
}

const registerReducer = (state = initState, action) => {
    switch (action.type) {
        case "REG_PAT_ERROR":
            return {
                ...state,
                registerPatientDetails: null,
                registerPatientError: action.err
            }
        case "REG_PAT_SUCCESS":
            return {
                ...state,
                registerPatientDetails: action.data,
                registerPatientError: null
            }
        case "REG_MP_ERROR":
            return {
                ...state,
                registerMedicalPractitionerDetails: null,
                registerMedicalPractitionerError: action.err
            }
        case "REG_MP_SUCCESS":
            return {
                ...state,
                registerMedicalPractitionerDetails: action.data,
                registerMedicalPractitionerError: null
            }
        case "REG_DA_ERROR":
            return {
                ...state,
                registerDatabaseAdminDetails: null,
                registerDatabaseAdminError: action.err
            }
        case "REG_DA_SUCCESS":
            return {
                ...state,
                registerDatabaseAdminDetails: action.data,
                registerDatabaseAdminError: null
            }
        default:
            return state
    }
}
export default registerReducer