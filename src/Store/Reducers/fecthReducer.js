const initState = {
    fetchCountryDetails: null,
    fetchCountryError: null,
    fetchRegionDetails: null,
    fetchRegionError: null,
    fetchHospitalDetails: null,
    fetchHospitalError: null,
    fetchPatientDetails: null,
    fetchPatientError: null,
    fetchMedicalPractitionerDetails: null,
    fetchMedicalPractitionerError: null,
    fetchPatientCaseDetails: null,
    fetchPatientCaseError: null,
    fetchPatientRecordDetails: null,
    fetchPatientRecordError: null
}

const fetchReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCHREGION_ERROR":
            return {
                ...state,
                fetchRegionDetails: null,
                fetchRegionError: action.err
            }
        case "FETCHREGION_SUCCESS":
            return {
                ...state,
                fetchRegionDetails: action.data,
                fetchRegionError: null
            }
        case "FETCHCOUNTRY_ERROR":
            return {
                ...state,
                fetchCountryDetails: null,
                fetchCountryError: action.err
            }
        case "FETCHCOUNTRY_SUCCESS":
            return {
                ...state,
                fetchCountryDetails: action.data,
                fetchCountryError: null
            }
        case "FETCHHOSPITAL_ERROR":
            return {
                ...state,
                fetchHospitalDetails: null,
                fetchHospitalError: action.err
            }
        case "FETCHHOSPITAL_SUCCESS":
            return {
                ...state,
                fetchHospitalDetails: action.data,
                fetchHospitalError: null
            }
        case "FETCHPATIENT_ERROR":
            return {
                ...state,
                fetchPatientDetails: null,
                fetchPatientError: action.err
            }
        case "FETCHPATIENT_SUCCESS":
            return {
                ...state,
                fetchPatientDetails: action.data,
                fetchPatientError: null
            }
        case "FETCHMEDICALPRACTITIONER_ERROR":
            return {
                ...state,
                fetchMedicalPractitionerDetails: null,
                fetchMedicalPractitionerError: action.err
            }
        case "FETCHMEDICALPRACTITIONER_SUCCESS":
            return {
                ...state,
                fetchMedicalPractitionerDetails: action.data,
                fetchMedicalPractitionerError: null
            }
        case "FETCHPATIENTCASE_ERROR":
            return {
                ...state,
                fetchPatientCaseDetails: null,
                fetchPatientCaseError: action.err
            }
        case "FETCHPATIENTCASE_SUCCESS":
            return {
                ...state,
                fetchPatientCaseDetails: action.data,
                fetchPatientCaseError: null
            }
        case "FETCHPATIENTRECORD_ERROR":
            return {
                ...state,
                fetchPatientRecordDetails: null,
                fetchPatientRecordError: action.err
            }
        case "FETCHPATIENTRECORD_SUCCESS":
            return {
                ...state,
                fetchPatientRecordDetails: action.data,
                fetchPatientRecordError: null
            }
        default:
            return state
    }
}
export default fetchReducer