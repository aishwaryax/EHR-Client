import React, { Component } from 'react'
import { Container, Typography, Grid, Button, Box, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { FormFields, Validator } from "../Utils/Misc"
import { searchUser } from '../../Store/Action/searchAction'

class Dashboard extends Component {
    state = {
        loading: false,
        redirect: false,
        formError: false,
        formErrorMsg: '',
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    label: 'Email'
                },
                validation: {
                    email: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }, name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    label: 'Name'
                },
                validation: {
                    required: false,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }, type: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_type',
                    type: 'select',
                    label: 'Type',
                    options: [
                        { key: 'Patient', value: 'Patient' },
                        { key: 'Medical Practitioner', value: 'MedicalPractitioner' },
                    ]
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.searchUserDetails !== this.props.searchUserDetails && this.state.loading === true) {
            this.setRedirect()
        }
    }
    setRedirect = () => {
        this.setState({
            ...this.state,
            redirect: true
        })
    }
    updateForm = (element) => {
        const newFormData = {
            ...this.state.formData
        }
        const newElement = {
            ...newFormData[element.id]
        }
        newElement.value = element.event.target.value

        let validData = Validator(newElement)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]

        newFormData[element.id] = newElement
        this.setState(
            {
                ...this.state,
                formError: false,
                formData: newFormData
            }
        )
    }
    submitForm = (event) => {
        // Loops thorugh all fromdata element and then goes to them server as key value pair not all data
        event.preventDefault()
        let dataToSubmit = {}
        let formValidCheck = true
        for (let key in this.state.formData) {
            if (this.state.formData[key].element === "fetch") {
                dataToSubmit[key] = this.state.formData[key].valueSelect
            } else {
                if (this.state.formData[key].validation.required === true) {
                    dataToSubmit[key] = this.state.formData[key].value
                    formValidCheck = this.state.formData[key].valid && formValidCheck
                } else {
                    dataToSubmit[key] = this.state.formData[key].value === '' ? null : this.state.formData[key].value
                }
            }
        }
        if ((dataToSubmit.email === '' && dataToSubmit.name === '') || (dataToSubmit.email === null && dataToSubmit.name === null)) {
            formValidCheck = false
        }
        if (formValidCheck) {
            if (dataToSubmit.email !== null && dataToSubmit.email.length > 0) {
                let data = {
                    token: this.props.authDetails.login.token,
                    email: dataToSubmit.email
                }
                if (dataToSubmit.type !== null) {
                    data["type"] = dataToSubmit.type
                }
                this.props.searchUser(data)
                this.setState({
                    ...this.state,
                    loading: true
                })
            } else {
                let data = {
                    token: this.props.authDetails.login.token,
                    name: dataToSubmit.name
                }
                if (dataToSubmit.type !== null) {
                    data["type"] = dataToSubmit.type
                }
                this.props.searchUser(data)
                this.setState({
                    ...this.state,
                    loading: true
                })
            }
        }
        else {
            this.setState({
                ...this.state,
                formError: true
            })
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/search', state: "Some data" }} />
        }
        else {
            return (
                <Container fixed={false} maxWidth="xl" style={{ height: "100vh", position: "relative" }}>
                    <Typography component="h1" variant="h3" style={{
                        textAlign: "center",
                        margin: "0",
                        position: "absolute",
                        top: "10%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}>
                        Welcome to EHR-Blockchain
                </Typography>
                    {this.props.authDetails !== null && this.props.authDetails.login.user.role !== "Patient" ?
                        <Container component="main" maxWidth="xl" style={{
                            textAlign: "center",
                            margin: "0",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        }}>
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <Typography component="h2">Search User</Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <FormFields
                                            id={'name'}
                                            formdata={this.state.formData.name}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormFields
                                            id={'email'}
                                            formdata={this.state.formData.email}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormFields
                                            id={'type'}
                                            formdata={this.state.formData.type}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    {
                                        this.state.formError ?
                                            <Box component="div" style={{
                                                textAlign: "center",
                                                fontSize: "16px",
                                                color: "#fc0505",
                                            }}>
                                                Something is wrong
                            </Box> : null
                                    }
                                    <Box component="div" style={{
                                        width: "100%",
                                        textAlign: "center"
                                    }}>
                                        {!this.state.loading ? <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={(event) => {
                                                this.submitForm(event)
                                            }}
                                            style={{
                                                width: "auto"
                                            }}
                                        >
                                            Search
                                     </Button> : <CircularProgress />}
                                        {this.props.searchUserError ? this.props.searchUserError : null}
                                    </Box>
                                </Grid>
                            </form> </Container> : ''}
                </Container>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        authDetails: state.auth.authDetails,
        authError: state.auth.authError,
        searchUserDetails: state.search.searchUserDetails,
        searchUserError: state.search.searchUserError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        searchUser: (data) => {
            dispatch(searchUser(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)