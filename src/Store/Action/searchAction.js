import axios from 'axios'
import { axiosData } from '../../axiosData'
export const searchUser = (data) => {
    const token = data.token
    const query = `
    query{
        searchUser(
            data: {
                ${data.name ? `name:"${data.name}"` : ""}
                ${data.email ? `email:"${data.email}"` : ""}
                ${data.type ? `type:${data.type}` : ""}
            }
        ){
            id
            firstName
            middleName
            lastName
            email
            role
            verified
        }
    }`

    return (dispatch, getState) => {
        axios({
            url: `${axiosData.URL}:${axiosData.PORT}/`,
            method: 'post',
            headers: { 'Authorization': `Bearer ${token}` },
            data: {
                query: query
            }
        }).then((result) => {
            if (result.data.data) {
                dispatch({
                    type: "SEARCHUSER_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "SEARCHUSER_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "SEARCHUSER_ERROR",
                err: "Network Error"
            })
        });

    }
}