import axios from 'axios'
import { axiosData } from '../../axiosData'

export const registerDatabaseAdmin = (data) => {
    let query = `mutation{
        registerDatabaseAdmin(data:{
            firstName: "${data.firstName}",
            middleName: "${data.middleName}",
            lastName: "${data.lastName}",
            dob: "${data.dob}",
            sex: ${data.sex},
            email: "${data.email}",
            password: "${data.password}",
            address: "${data.address}",
            country: "${data.country}",
            contact: "${data.contact}",
            hospital:"${data.hospital}"
        })
    }`
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
                    type: "REG_DA_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "REG_DA_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "REG_DA_ERROR",
                err: "Network Error"
            })
        });
    }
}

export const registerMedicalPractitioner = (data) => {
    let query = `mutation{
        registerMedicalPractitioner(data:{
            firstName: "${data.firstName}",
            middleName: "${data.middleName}",
            lastName: "${data.lastName}",
            dob: "${data.dob}",
            sex: ${data.sex},
            email: "${data.email}",
            password: "${data.password}",
            address: "${data.address}",
            clinicAddress: "${data.clinicAddress}",
            degree: "${data.degree}",
            field: "${data.field}",
            hospital:"${data.hospital}",
        })
    }`
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
                    type: "REG_MP_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "REG_MP_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "REG_MP_ERROR",
                err: "Network Error"
            })
        });
    }
}

export const registerPatient = (data) => {
    let query = `mutation{
        registerPatient(data:{
            firstName: "${data.firstName}",
            middleName: "${data.middleName}",
            lastName: "${data.lastName}",
            dob: "${data.dob}",
            sex: ${data.sex},
            email: "${data.email}",
            password: "${data.password}",
            address: "${data.address}",
            bloodGroup: "${data.bloodGroup}",
            religion: "${data.religion}",
            maritalStatus: ${data.maritalStatus},
            primaryLanguage: "${data.primaryLanguage}",
            birthPlace: "${data.birthPlace}",
            pincode: "${data.region}",
            country: "${data.country}",
            occupation: "${data.occupation}",
            contact1: "${data.contact1}",
            contact2: "${data.contact2}",
            socioEcoStatus: "${data.socioEcoStatus}",
            immunizationHistory: "${data.immunizationHistory}",
            PMH: "${data.PMH}",
            DHx: "${data.DHx}",
            ${data.allergyStatus === null ? '' : `allergyStatus:${data.allergyStatus},`}
            ${data.organDonorStatus === null ? '' : `organDonorStatus:${data.organDonorStatus},`}
            ${data.Ca === null ? '' : `Ca:${data.Ca},`}
            ${data.IDDM === null ? '' : `IDDM:${data.IDDM},`}
            ${data.NIDDM === null ? '' : `NIDDM:${data.NIDDM},`}
            ${data.COPD === null ? '' : `COPD:${data.COPD},`}
            ${data.MI === null ? '' : `MI:${data.MI},`}
            ${data.AF === null ? '' : `AF:${data.AF},`}
        })
    }`
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
                    type: "REG_PAT_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "REG_PAT_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "REG_PAT_ERROR",
                err: "Network Error"
            })
        });
    }
}