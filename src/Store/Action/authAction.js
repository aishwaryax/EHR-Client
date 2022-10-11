import axios from 'axios'
import { axiosData } from '../../axiosData'
export const logIn = (credentials) => {
    return (dispatch, getState) => {
        axios({
            url: `${axiosData.URL}:${axiosData.PORT}/`,
            method: 'post',
            data: {
                query: `
            mutation{
            login(data:{
              email:"${credentials.email}"
              password:"${credentials.password}"
            }){
              token
              user{
                id
                role
                isAdmin
                verified
              }
            }
          }
          `
            }
        }).then((result) => {
            if (result.data.data) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    data: result.data.data
                })
            }
            if (result.data.errors) {
                dispatch({
                    type: "LOGIN_ERROR",
                    err: result.data.errors[0].message
                })
            }
        }).catch((err) => {
            dispatch({
                type: "LOGIN_ERROR",
                err: "Network Error"
            })
        });

    }
}

export const logOut = () => {
    return (dispatch, getState) => {
        dispatch({
            type: "LOGOUT_SUCCESS"
        })
    }
}