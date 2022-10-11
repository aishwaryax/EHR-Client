import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box'

import { FormFields, Validator } from "../Utils/Misc"

import { connect } from 'react-redux'
import { logIn } from "../../Store/Action/authAction"

import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        padding: '45px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid #383838',
        borderRadius: '20px',
        backgroundColor: 'rgba(230,230,230,0.2)'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '30%',
        padding: '10px',
        backgroundColor: '#388e3c',
        '&:hover': {
            backgroundColor: '#5e8e37'
        },
    },
    login: {
        fontSize: '36px',

    }
}));

function Login(props) {
    const [state, setState] = React.useState({
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    label: 'Enter your email'
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
                    label: 'Enter your Password'
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }
        }
    })
    const updateForm = (element) => {
        const newFormData = {
            ...state.formData
        }
        const newElement = {
            ...newFormData[element.id]
        }
        newElement.value = element.event.target.value

        let validData = Validator(newElement)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]

        newFormData[element.id] = newElement
        setState(
            {
                ...state,
                formError: false,
                formData: newFormData
            }
        )
    }
    const submitForm = (event) => {
        // Loops thorugh all fromdata element and then goes to them server as key value pair not all data
        event.preventDefault()
        let dataToSubmit = {}
        let formValidCheck = true
        for (let key in state.formData) {
            dataToSubmit[key] = state.formData[key].value
            formValidCheck = state.formData[key].valid && formValidCheck
        }
        if (formValidCheck) {
            props.logIn(dataToSubmit)
        }
        else {
            setState({
                ...state,
                formError: true
            })
        }
    }
    const classes = useStyles();
    const auth = props.authDetails
    if (auth !== null) {
        return <Redirect to='/' />
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" >
                    Login
                </Typography>
                <form className={classes.form} onSubmit={(event) => submitForm(event)}>
                    <FormFields
                        id={'email'}
                        formdata={state.formData.email}
                        onChangeForm={(element) => updateForm(element)}
                    ></FormFields>
                    <FormFields
                        id={'password'}
                        formdata={state.formData.password}
                        onChangeForm={(element) => updateForm(element)}
                    ></FormFields>
                    {
                        state.formError ?
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(event) => {
                                submitForm(event)
                            }}
                            style={{
                                width: "auto"
                            }}
                        >
                            Sign In
                    </Button>
                    </Box>
                    {
                        props.authError ?
                            <Box component="div" style={{
                                textAlign: "center",
                                fontSize: "16px",
                                color: "#fc0505",
                            }}>
                                {props.authError}
                            </Box> : null
                    }
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        authDetails: state.auth.authDetails,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: credentials => {
            dispatch(logIn(credentials))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)