import React, { Component } from 'react'
import { Container, Grid, Button, Box, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { FormFields, Validator } from "../Utils/Misc"
import { searchUser } from '../../Store/Action/searchAction'
import SearchResult from './SearchResult'

class SearchHandler extends Component {
    state = {
        result: [],
        loading: false,
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
    componentDidMount() {
        if (this.props.authDetails === null) {
            this.props.history.push('/')
        }
        if (this.props.searchUserDetails !== null) {
            this.setState({
                ...this.state,
                loading: false,
                result: this.props.searchUserDetails.searchUser
            })
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.searchUserDetails !== null && prevProps.searchUserDetails !== null) {
            if (this.props.searchUserDetails.searchUser !== prevProps.searchUserDetails.searchUser) {
                this.setState({
                    ...this.state,
                    loading: false,
                    result: this.props.searchUserDetails.searchUser
                })
            }
        } else if (this.props.searchUserDetails !== null && this.state.loading === true) {
            this.setState({
                ...this.state,
                loading: false,
                result: this.props.searchUserDetails.searchUser
            })
        }
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
        if (!this.props.authDetails) {
            this.props.history.push("login")
        }
        if (this.props.authDetails.login.user.role === "Patient") {
            this.props.history.push("")
        }
        return (
            <Container fixed={false} maxWidth="xl">
                {this.props.authDetails !== null && this.props.authDetails.login.user.role !== "Patient" ?
                    <Container component="main" maxWidth="xl" style={{
                        textAlign: "center",
                        margin: "0 0 20px 0"
                    }}>
                        <form onSubmit={(event) => this.submitForm(event)}>
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
                        </form>
                    </Container> : ''}
                {this.state.result === null ? "" : (this.state.result.length === 0 ? <Box component="div" style={{
                    textAlign: "center",
                    fontSize: "16px",
                    color: "#fc0505",
                }}>
                    No user found
                </Box> : this.state.result.map((eachResult, index) => {
                        return <SearchResult data={eachResult} key={index} />
                    }
                    ))}
            </Container>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchHandler)