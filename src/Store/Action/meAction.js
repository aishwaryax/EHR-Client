import axios from 'axios'
import { axiosData } from '../../axiosData'
export const meNav = (data) => {
  const role = data.user.role
  const token = data.token
  let query = null
  if (role === "Patient") {
    query = `
            query{
            mePatient{
              patientId
              user{
                firstName
                lastName
              }
            }
          }
          `
  } else if (role === "MedicalPractitioner") {
    query = `
            query{
            meMedicalPractitioner{
              mpId
              user{
                firstName
                lastName
              }
            }
          }
          `
  } else {
    query = `
            query{
            meDatabaseAdmin{
              user{
                firstName
                lastName
              }
            }
          }
          `
  }

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
          type: "MENAV_SUCCESS",
          data: result.data.data
        })
      }
      if (result.data.errors) {
        dispatch({
          type: "MENAV_ERROR",
          err: result.data.errors[0].message
        })
      }
    }).catch((err) => {
      dispatch({
        type: "MENAV_ERROR",
        err: "Network Error"
      })
    });

  }
}