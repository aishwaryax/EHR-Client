import axios from 'axios'
import { axiosData } from '../../axiosData'
export const fetchRegion = (data) => {
    const name = data
    let query = `
    query{
        getRegion(name:"${name}",skip:0){
            pincode
            region
        }}`
    return (dispatch, getState) => {
        axios({
            url: `${axiosData.URL}:${axiosData.PORT}/`,
            method: 'post',
            data: {
                query: query
            }
        }).then((result) => {
            if (result.data.data) {
                dispatch({
                    type: "FETCHREGION_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "FETCHREGION_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "FETCHREGION_ERROR",
                err: "Network Error"
            })
        });
    }
}
export const fetchCountry = (data) => {
    const name = data
    let query = `
    query{
        getCountry(name:"${name}",skip:0){
            countryCode
            countryName
        }}`
    return (dispatch, getState) => {
        axios({
            url: `${axiosData.URL}:${axiosData.PORT}/`,
            method: 'post',
            data: {
                query: query
            }
        }).then((result) => {
            if (result.data.data) {
                dispatch({
                    type: "FETCHCOUNTRY_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "FETCHCOUNTRY_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "FETCHCOUNTRY_ERROR",
                err: "Network Error"
            })
        });
    }
}
export const fetchHospital = (data) => {
    const name = data
    let query = `
    query{
        getHospital(name:"${name}",skip:0){
            hospitalId
            name
        }}`
    return (dispatch, getState) => {
        axios({
            url: `${axiosData.URL}:${axiosData.PORT}/`,
            method: 'post',
            data: {
                query: query
            }
        }).then((result) => {
            if (result.data.data) {
                dispatch({
                    type: "FETCHHOSPITAL_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "FETCHHOSPITAL_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "FETCHHOSPITAL_ERROR",
                err: "Network Error"
            })
        });
    }
}
export const fetchPatient = (data) => {
    let query = `
    query{
        viewPatient(id:"${data.id}"){
            user{
            firstName
            middleName
            lastName
            dob
            sex
            email
            verified
            }
            patientId
            bloodGroup
            religion
            maritalStatus
            primaryLanguage
            birthPlace
            address
            pincode{
            region
            }
            country{
            countryName
            }
            contact1
            contact2
            occupation
            socioEcoStatus
            immunizationHistory
            allergyStatus
            organDonorStatus
            PMH
            DHx
            Ca
            IDDM
            NIDDM
            COPD
            MI
            AF
            registeredAt
            cpId{
            cpaddress
            contact
            email
            }
            insurance{
            insuranceId
            insuranceStatus
            insuranceCompany1
            insuranceCompany2
            sponsorerDetails
            }
        }}`
    return (dispatch, getState) => {
        axios({
            url: `${axiosData.URL}:${axiosData.PORT}/`,
            method: 'post',
            headers: { 'Authorization': `Bearer ${data.token}` },
            data: {
                query: query
            }
        }).then((result) => {
            if (result.data.data) {
                dispatch({
                    type: "FETCHPATIENT_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "FETCHPATIENT_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "FETCHPATIENT_ERROR",
                err: "Network Error"
            })
        });
    }
}
export const fetchMedicalPractitioner = (data) => {
    let query = `
    query{
        viewMedicalPractitioner(id:"${data.id}"){
            user{
            firstName
            middleName
            lastName
            dob
            sex
            email
            verified
            }
            mpId
            clinicAddress
            degree
            field
            registeredAt
            hospital{
            name
            address
            district
            pincode{
                region
            }
            country{
                countryName
            }
            }
        }}`
    return (dispatch, getState) => {
        axios({
            url: `${axiosData.URL}:${axiosData.PORT}/`,
            method: 'post',
            headers: { 'Authorization': `Bearer ${data.token}` },
            data: {
                query: query
            }
        }).then((result) => {
            if (result.data.data) {
                dispatch({
                    type: "FETCHMEDICALPRACTITIONER_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "FETCHMEDICALPRACTITIONER_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "FETCHMEDICALPRACTITIONER_ERROR",
                err: "Network Error"
            })
        });
    }
}
export const fetchPatientCase = (data, nav) => {
    let query = `
    query{
        viewPatientCase(
            patientId:"${data.id}",
            ${data.caseId === null ? '' : `caseId:${data.caseId},`}
            ${data.ToDate === null ? '' : `ToDate:${data.ToDate},`}
            ${data.FromDate === null ? '' : `FromDate:${data.FromDate},`}
        ){
            caseId
            medicalPractitioner{
                user{
                    firstName
                    lastName
                }
                clinicAddress
                hospital{
                    name
                    address
                    district
                    country{
                        countryName
                    }
                    pincode{
                        region
                    }
                }
            }
            icdCode{
                commonName
            }
            icdSubCode{
                scientificName
            }
            createdAt
            updatedAt
        }
    }`
    return (dispatch, getState) => {
        axios({
            url: `${axiosData.URL}:${axiosData.PORT}/`,
            method: 'post',
            headers: { 'Authorization': `Bearer ${data.token}` },
            data: {
                query: query
            }
        }).then((result) => {
            console.log(result)
            if (result.data.data) {
                dispatch({
                    type: "FETCHPATIENTCASE_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "FETCHPATIENTCASE_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "FETCHPATIENTCASE_ERROR",
                err: "Network Error"
            })
        });
    }
}
export const fetchPatientRecord = (data, nav) => {
    let query = `
    query{
        viewPatientRecord(
            caseId:"${data.caseId}",
            ${data.recordId === null ? '' : `recordId:${data.recordId},`}
            ${data.ToDate === null ? '' : `ToDate:${data.ToDate},`}
            ${data.FromDate === null ? '' : `FromDate:${data.FromDate},`}
        ){
            recordId
            medicalPractitioner{
                user{
                    firstName
                    lastName
                }
                clinicAddress
                hospital{
                    name
                    address
                    district
                    country{
                        countryName
                    }
                    pincode{
                        region
                    }
                }
            }
            visitNo
            case{
                caseId
                icdCode{
                    commonName
                }
                icdSubCode{
                    scientificName
                }
                medicalPractitioner{
                    user{
                        firstName
                        lastName
                    }
                }
                noOfVisits
            }
            createdAt
        }}`
    return (dispatch, getState) => {
        axios({
            url: `${axiosData.URL}:${axiosData.PORT}/`,
            method: 'post',
            headers: { 'Authorization': `Bearer ${data.token}` },
            data: {
                query: query
            }
        }).then((result) => {
            if (result.data.data) {
                dispatch({
                    type: "FETCHPATIENTRECORD_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "FETCHPATIENTRECORD_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "FETCHPATIENTRECORD_ERROR",
                err: "Network Error"
            })
        });
    }
}