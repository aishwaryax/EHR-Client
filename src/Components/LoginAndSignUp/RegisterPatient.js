import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux'
import { fetchRegion, fetchCountry } from '../../Store/Action/fetchAction';

import { FormFields, Validator } from "../Utils/Misc"
import { registerPatient } from '../../Store/Action/registerAction';
import { CircularProgress } from '@material-ui/core';

function getSteps() {
    return ['Patient Info', 'Medical Details'];
}

class RegisterPatient extends React.Component {
    state = {
        activeStep: 0,
        formError: false,
        formErrorMsg: '',
        loading: false,
        formSuccess: '',
        formData: {
            firstName: {
                element: 'input',
                value: '',
                config: {
                    name: 'firstname_input',
                    type: 'text',
                    label: 'First Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            middleName: {
                element: 'input',
                value: '',
                config: {
                    name: 'middlename_input',
                    type: 'text',
                    label: 'Middle Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastName: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    label: 'Last Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            dob: {
                element: 'input',
                value: '',
                config: {
                    name: 'dob_input',
                    type: 'date',
                    label: 'Date of Birth'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: "true"
            },
            sex: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_gender',
                    type: 'select',
                    label: 'Gender',
                    options: [
                        { key: 'Male', value: 'Male' },
                        { key: 'Female', value: 'Female' },
                        { key: 'Transgender', value: 'Transgender' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            bloodGroup: {
                element: 'input',
                value: '',
                config: {
                    name: 'bloodgroup_input',
                    type: 'text',
                    label: 'Blood Group'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            religion: {
                element: 'input',
                value: '',
                config: {
                    name: 'religion_input',
                    type: 'text',
                    label: 'Religion'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            maritalStatus: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_maritalstatus',
                    type: 'select',
                    label: 'Marital Status',
                    options: [
                        { key: 'Single', value: 'Single' },
                        { key: 'Married', value: 'Married' },
                        { key: 'Divorced', value: 'Divorced' },
                        { key: 'Widowed', value: 'Widowed' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    label: 'Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    label: 'Password'
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            repassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'repassword_input',
                    type: 'password',
                    label: 'Password Check'
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            primaryLanguage: {
                element: 'input',
                value: '',
                config: {
                    name: 'primaryLanguage_input',
                    type: 'text',
                    label: 'Primary Language'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            birthPlace: {
                element: 'input',
                value: '',
                config: {
                    name: 'birthPlace_input',
                    type: 'text',
                    label: 'Birth Place'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            address: {
                element: 'input',
                value: '',
                config: {
                    name: 'address_input',
                    type: 'text',
                    label: 'Address'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            contact1: {
                element: 'input',
                value: '',
                config: {
                    name: 'contact1_input',
                    type: 'text',
                    label: 'Contact 1'
                },
                validation: {
                    required: true,
                    phone: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            contact2: {
                element: 'input',
                value: '',
                config: {
                    name: 'contact2_input',
                    type: 'text',
                    label: 'Contact 2'
                },
                validation: {
                    required: true,
                    phone: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            occupation: {
                element: 'input',
                value: '',
                config: {
                    name: 'occupation_input',
                    type: 'text',
                    label: 'Occupation'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            socioEcoStatus: {
                element: 'input',
                value: '',
                config: {
                    name: 'socioEcoStatus_input',
                    type: 'text',
                    label: 'Social Economic Status'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            country: {
                element: 'fetch',
                value: '',
                valueSelect: '',
                config: {
                    name: 'country_input',
                    type: 'text',
                    label: 'Country',
                    options: [],
                    optionsError: null
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            region: {
                element: 'fetch',
                value: '',
                valueSelect: '',
                config: {
                    name: 'region_input',
                    type: 'text',
                    label: 'Region',
                    options: [],
                    optionsError: null
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            immunizationHistory: {
                element: 'input',
                value: '',
                config: {
                    name: 'immunizationHistory_input',
                    type: 'text',
                    label: 'Immunization History'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            PMH: {
                element: 'input',
                value: '',
                config: {
                    name: 'PMH_input',
                    type: 'text',
                    label: 'PMH'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            DHx: {
                element: 'input',
                value: '',
                config: {
                    name: 'DHx_input',
                    type: 'text',
                    label: 'DHx'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            allergyStatus: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_allergyStatus',
                    type: 'select',
                    label: 'Allergy Status',
                    options: [
                        { key: 'Yes', value: true },
                        { key: 'No', value: false },
                    ]
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            organDonorStatus: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_organDonorStatus',
                    type: 'select',
                    label: 'Organ Donor Status',
                    options: [
                        { key: 'Yes', value: true },
                        { key: 'No', value: false },
                    ]
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            Ca: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_Ca',
                    type: 'select',
                    label: 'Ca',
                    options: [
                        { key: 'Yes', value: true },
                        { key: 'No', value: false },
                    ]
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            IDDM: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_IDDM',
                    type: 'select',
                    label: 'IDDM',
                    options: [
                        { key: 'Yes', value: true },
                        { key: 'No', value: false },
                    ]
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            NIDDM: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_NIDDM',
                    type: 'select',
                    label: 'NIDDM',
                    options: [
                        { key: 'Yes', value: true },
                        { key: 'No', value: false },
                    ]
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            COPD: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_COPD',
                    type: 'select',
                    label: 'COPD',
                    options: [
                        { key: 'Yes', value: true },
                        { key: 'No', value: false },
                    ]
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            MI: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_MI',
                    type: 'select',
                    label: 'MI',
                    options: [
                        { key: 'Yes', value: true },
                        { key: 'No', value: false },
                    ]
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            AF: {
                element: 'select',
                value: '',
                config: {
                    name: 'select_AF',
                    type: 'select',
                    label: 'AF',
                    options: [
                        { key: 'Yes', value: true },
                        { key: 'No', value: false },
                    ]
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
        }
    }
    componentDidUpdate(prevProps) {

        if (this.props.fetchCountryDetails !== prevProps.fetchCountryDetails) {
            const newFormData = {
                ...this.state.formData
            }
            newFormData.country.config.options = this.props.fetchCountryDetails !== null ? this.props.fetchCountryDetails.getCountry : null
            this.setState(
                {
                    ...this.state,
                    formData: newFormData
                }
            )
        }
        if (this.props.fetchCountryError !== prevProps.fetchCountryError) {
            const newFormData = {
                ...this.state.formData
            }
            newFormData.country.config.optionsError = this.props.fetchCountryError !== null ? this.props.fetchCountryError : null
            this.setState(
                {
                    ...this.state,
                    formData: newFormData
                }
            )
        }
        if (this.props.fetchRegionDetails !== prevProps.fetchRegionDetails) {
            const newFormData = {
                ...this.state.formData
            }
            newFormData.region.config.options = this.props.fetchRegionDetails !== null ? this.props.fetchRegionDetails.getRegion : null
            this.setState(
                {
                    ...this.state,
                    formData: newFormData
                }
            )
        }
        if (this.props.fetchRegionError !== prevProps.fetchRegionError) {
            const newFormData = {
                ...this.state.formData
            }
            newFormData.region.config.optionsError = this.props.fetchRegionError !== null ? this.props.fetchRegionError : null
            this.setState(
                {
                    ...this.state,
                    formData: newFormData
                }
            )
        }
        if (this.props.registerPatientDetails !== prevProps.registerPatientDetails) {
            const updateState = {
                ...this.state
            }
            updateState.formSuccess = this.props.registerPatientDetails !== null ? this.props.registerPatientDetails.registerPatient : null
            updateState.loading = this.props.registerPatientDetails !== null ? false : true
            this.setState(
                {
                    ...updateState
                }
            )
        }
        if (this.props.registerPatientError !== prevProps.registerPatientError) {
            const updateState = {
                ...this.state
            }
            updateState.formError = this.props.registerPatientError !== null ? true : false
            updateState.formErrorMsg = this.props.registerPatientError !== null ? this.props.registerPatientError : ''
            updateState.loading = this.props.registerPatientError !== null ? false : true
            this.setState(
                {
                    ...updateState
                }
            )
        }
    }
    fetchForm = (element, fetchFn) => {
        const newFormData = {
            ...this.state.formData
        }
        const newElement = {
            ...newFormData[element.id]
        }
        newElement.value = element.event.target.value
        fetchFn(newElement.value)
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
        if (formValidCheck) {
            if (dataToSubmit["password"] === dataToSubmit["repassword"]) {
                delete dataToSubmit['repassword'];
                this.props.registerPatient(dataToSubmit)
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

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                const UserInfo = (
                    <Container component="main" maxWidth="xl">
                        <CssBaseline />
                        <div style={{ width: "100%" }}>
                            <Typography component="h1" variant="h5" >
                                User Info
                            </Typography>
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <FormFields
                                            id={'firstName'}
                                            formdata={this.state.formData.firstName}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormFields
                                            id={'middleName'}
                                            formdata={this.state.formData.middleName}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormFields
                                            id={'lastName'}
                                            formdata={this.state.formData.lastName}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'dob'}
                                            formdata={this.state.formData.dob}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'sex'}
                                            formdata={this.state.formData.sex}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'maritalStatus'}
                                            formdata={this.state.formData.maritalStatus}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'bloodGroup'}
                                            formdata={this.state.formData.bloodGroup}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormFields
                                            id={'religion'}
                                            formdata={this.state.formData.religion}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormFields
                                            id={'email'}
                                            formdata={this.state.formData.email}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormFields
                                            id={'password'}
                                            formdata={this.state.formData.password}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormFields
                                            id={'repassword'}
                                            formdata={this.state.formData.repassword}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} style={{
                                        height: "300px"
                                    }}>
                                        <FormFields
                                            id={'country'}
                                            formdata={this.state.formData.country}
                                            onChangeForm={(element) => this.fetchForm(element, this.props.fetchCountry)}
                                            onSelectValue={(value, valueSelect) => {
                                                const newFormData = {
                                                    ...this.state.formData
                                                }
                                                newFormData.country.value = value
                                                newFormData.country.valueSelect = valueSelect
                                                this.setState({
                                                    ...this.state,
                                                    newFormData
                                                })
                                            }}
                                            keyWords={["countryCode", "countryName"]}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} style={{
                                        height: "300px"
                                    }}>
                                        <FormFields
                                            id={'region'}
                                            formdata={this.state.formData.region}
                                            onChangeForm={(element) => this.fetchForm(element, this.props.fetchRegion)}
                                            onSelectValue={(value, valueSelect) => {
                                                const newFormData = {
                                                    ...this.state.formData
                                                }
                                                newFormData.region.value = value
                                                newFormData.region.valueSelect = valueSelect
                                                this.setState({
                                                    ...this.state,
                                                    newFormData
                                                })
                                            }}
                                            keyWords={["pincode", "region"]}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormFields
                                            id={'address'}
                                            formdata={this.state.formData.address}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'primaryLanguage'}
                                            formdata={this.state.formData.primaryLanguage}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'birthPlace'}
                                            formdata={this.state.formData.birthPlace}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'contact1'}
                                            formdata={this.state.formData.contact1}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'contact2'}
                                            formdata={this.state.formData.contact2}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'occupation'}
                                            formdata={this.state.formData.occupation}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'socioEcoStatus'}
                                            formdata={this.state.formData.socioEcoStatus}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>)
                return UserInfo;
            case 1:
                const PatientInfo = (
                    <Container component="main" maxWidth="xl">
                        <CssBaseline />
                        <div style={{ width: "100%" }}>
                            <Typography component="h1" variant="h5" >
                                Medical Details
                            </Typography>
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <FormFields
                                            id={'immunizationHistory'}
                                            formdata={this.state.formData.immunizationHistory}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormFields
                                            id={'PMH'}
                                            formdata={this.state.formData.PMH}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormFields
                                            id={'DHx'}
                                            formdata={this.state.formData.DHx}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'allergyStatus'}
                                            formdata={this.state.formData.allergyStatus}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'organDonorStatus'}
                                            formdata={this.state.formData.organDonorStatus}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'Ca'}
                                            formdata={this.state.formData.Ca}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormFields
                                            id={'COPD'}
                                            formdata={this.state.formData.COPD}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormFields
                                            id={'IDDM'}
                                            formdata={this.state.formData.IDDM}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormFields
                                            id={'NIDDM'}
                                            formdata={this.state.formData.NIDDM}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormFields
                                            id={'MI'}
                                            formdata={this.state.formData.MI}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormFields
                                            id={'AF'}
                                            formdata={this.state.formData.AF}
                                            onChangeForm={(element) => this.updateForm(element)}
                                        ></FormFields>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>)
                return PatientInfo;
            default:
                return 'Unknown step';
        }
    }


    handleNext = () => {
        let prevActiveStep = this.state.activeStep
        let newActiveStep = prevActiveStep + 1
        this.setState({
            ...this.state,
            activeStep: newActiveStep
        })

    };

    handleBack = () => {
        let prevActiveStep = this.state.activeStep
        let newActiveStep = prevActiveStep - 1
        this.setState({
            ...this.state,
            activeStep: newActiveStep
        })
    };

    handleReset = () => {
        let newActiveStep = 0
        this.setState({
            ...this.state,
            activeStep: newActiveStep
        })
    };
    render() {
        const steps = getSteps()
        return (
            <div style={{
                marginBottom: "20px"
            }}>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div style={{
                    width: "100%",
                    margin: "20px auto"
                }}>
                    {this.state.activeStep === steps.length ? (
                        <div>
                            {this.state.loading ? <CircularProgress></CircularProgress> : ''}
                            <Typography >{this.state.formSuccess}</Typography>
                        </div>
                    ) : (
                            <div>
                                <div>{this.getStepContent(this.state.activeStep)}</div>
                                {
                                    this.state.formError ?
                                        <Box component="div" style={{
                                            textAlign: "center",
                                            fontSize: "16px",
                                            color: "#fc0505",
                                            margin: "10px 0",
                                            width: "100%"
                                        }}>
                                            {this.state.formErrorMsg !== '' ? this.state.formErrorMsg : "Something is wrong"}
                                        </Box> : null
                                }
                                <div style={{
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: "40px"
                                }}>
                                    {
                                        this.state.formSuccess ? '' :
                                            <Button
                                                disabled={this.state.activeStep === 0 || this.state.activeStep === steps.length - 1}
                                                onClick={this.handleBack}
                                                style={{
                                                    margin: "0 10px"
                                                }}
                                            >
                                                Back
                                        </Button>
                                    }
                                    {
                                        this.state.loading ? <CircularProgress></CircularProgress> : <Button
                                            type={this.state.activeStep === steps.length - 1 ? 'submit' : 'button'}
                                            variant="contained"
                                            color="primary"
                                            disabled={this.state.formSuccess ? true : false}
                                            onClick={(event) => {
                                                this.state.activeStep === steps.length - 1 ? this.submitForm(event) : this.handleNext()
                                            }}
                                            style={{
                                                margin: "0 10px"
                                            }}>
                                            {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    }
                                </div>
                                {
                                    this.state.formSuccess ?
                                        <Box component="div" style={{
                                            textAlign: "center",
                                            fontSize: "16px",
                                            color: "#24e53e",
                                            margin: "10px 0",
                                            width: "100%"
                                        }}>
                                            {this.state.formSuccess}
                                        </Box> : null
                                }
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fetchCountryDetails: state.fetch.fetchCountryDetails,
        fetchCountryError: state.fetch.fetchCountryError,
        fetchRegionDetails: state.fetch.fetchRegionDetails,
        fetchRegionError: state.fetch.fetchRegionError,
        registerPatientDetails: state.register.registerPatientDetails,
        registerPatientError: state.register.registerPatientError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRegion: data => {
            dispatch(fetchRegion(data))
        },
        fetchCountry: (data) => {
            dispatch(fetchCountry(data))
        },
        registerPatient: (data) => {
            dispatch(registerPatient(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPatient)