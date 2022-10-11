import React, { Component } from 'react'
import { Container, Grid, Button, Box, CircularProgress, Card, CardContent, Typography, Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchPatient, fetchPatientCase } from '../../Store/Action/fetchAction'
import moment from "moment"
import { deepOrange } from '@material-ui/core/colors';

class PatientHandler extends Component {
    state = {
        loading: true,
        error: null,
        result: null,
        case: null,
        caseErr: null,
        caseLoad: true
    }
    componentDidMount() {
        const id = this.props.match.params.id
        if (id === '') {
            return <Redirect to="/"></Redirect>
        }
        if (this.props.authDetails !== null) {
            const token = this.props.authDetails.login.token
            const data = {
                id,
                token
            }
            this.props.fetchPatient(data)
            this.props.fetchPatientCase(data)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.fetchPatientDetails !== null || this.props.fetchPatientError !== null) {
            if (this.props.fetchPatientDetails !== prevProps.fetchPatientDetails && this.props.fetchPatientDetails !== null) {
                this.setState({
                    ...this.state,
                    loading: false,
                    result: this.props.fetchPatientDetails.viewPatient
                })
            }
            if (this.props.fetchPatientError !== prevProps.fetchPatientError && this.props.fetchPatientError !== null) {
                this.setState({
                    ...this.state,
                    loading: false,
                    error: this.props.fetchPatientError
                })
            }
        }
        if (this.props.fetchPatientCaseDetails !== null || this.props.fetchPatientCaseError !== null) {
            if (this.props.fetchPatientCaseDetails !== prevProps.fetchPatientCaseDetails && this.props.fetchPatientCaseDetails !== null) {
                this.setState({
                    ...this.state,
                    caseLoad: false,
                    case: this.props.fetchPatientCaseDetails.viewPatientCase
                })
            }
            if (this.props.fetchPatientCaseError !== prevProps.fetchPatientCaseError && this.props.fetchPatientCaseError !== null) {
                this.setState({
                    ...this.state,
                    caseLoad: false,
                    caseErr: this.props.fetchPatientCaseError
                })
            }
        }
    }
    profile = () => {
        const date = moment(this.state.result.user.dob).format("MMM Do YYYY")
        const registered = moment(this.state.result.registeredAt).format('MMMM Do YYYY, h:mm:ss a')
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card style={{
                        width: "100%"
                    }}>
                        <CardContent>
                            <Box component="div" style={{
                                width: "100%",
                                textAlign: "center",
                            }}>
                                <Typography color="textSecondary" gutterBottom>
                                    {`${this.state.result.patientId}-${this.state.result.user.verified ? "Verified" : "Not Verified"}`}
                                </Typography>
                            </Box>
                            <Box component="div" style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Avatar style={{
                                    margin: 10,
                                    color: '#fff',
                                    backgroundColor: deepOrange[500]
                                }}>{`${this.state.result.user.firstName[0]}${this.state.result.user.lastName[0]}`}</Avatar>
                            </Box>
                            <Box component="div" style={{
                                width: "100%",
                                textAlign: "center",
                            }}>
                                <Typography variant="h5" component="h2">
                                    {`${this.state.result.user.firstName} ${this.state.result.user.middleName} ${this.state.result.user.lastName}`}
                                </Typography>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={3} style={{
                                    textAlign: "center",
                                }}>
                                    <Typography color="textSecondary">
                                        {this.state.result.user.sex}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{
                                    textAlign: "center",
                                }}>
                                    <Typography color="textSecondary">
                                        {date}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{
                                    textAlign: "center",
                                }}>
                                    <Typography color="textSecondary">
                                        {this.state.result.user.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid >
                <Grid item xs={12} md={6}>
                    <Card style={{
                        width: "100%"
                    }}>
                        <CardContent>
                            <Box component="div" style={{
                                width: "100%",
                                textAlign: "center",
                            }}>
                                <Typography color="textSecondary" gutterBottom>
                                    Care Provider Details
                                </Typography>
                            </Box>
                            <Box component="div" style={{
                                width: "100%",
                                textAlign: "center",
                            }}>
                                <Typography variant="h5" component="h3">
                                    {this.state.result.cpId ? this.state.result.cpId.cpaddress : "Not Available"}
                                </Typography>
                            </Box>
                            <Box component="div" style={{
                                width: "100%",
                                textAlign: "center",
                            }}>
                                <Typography variant="h5" component="h3">
                                    {this.state.result.cpId ? this.state.result.cpId.contact : ""}
                                </Typography>
                            </Box>
                            <Box component="div" style={{
                                width: "100%",
                                textAlign: "center",
                            }}>
                                <Typography variant="h5" component="h3">
                                    {this.state.result.cpId ? this.state.result.cpId.email : ""}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid >
                <Grid item xs={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{
                                textDecoration: "underline"
                            }}>Basic Information</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={3}>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Blood Group: ${this.state.result.bloodGroup}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Religion: ${this.state.result.religion}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Marital Status: ${this.state.result.maritalStatus}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Primary Language: ${this.state.result.primaryLanguage}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Birth Place: ${this.state.result.birthPlace}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Address: ${this.state.result.address}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Region: ${this.state.result.pincode.region}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Country: ${this.state.result.country.countryName}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Contact 1: ${this.state.result.contact1}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Contact 2: ${this.state.result.contact2}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Occupation: ${this.state.result.occupation}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography color="textPrimary">
                                        {`Socio-Eco-Status: ${this.state.result.socioEcoStatus}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography color="textPrimary">
                                        {`Registered On: ${registered}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{
                                textDecoration: "underline"
                            }}>Medical Data</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={3}>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`Immunization History: ${this.state.result.immunizationHistory}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`PMH: ${this.state.result.PMH}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`DHx: ${this.state.result.DHx}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`Allergy Status: ${this.state.result.allergyStatus ? "Yes" : "No"}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`Organ Donor Status: ${this.state.result.organDonorStatus ? "Yes" : "No"}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`Ca: ${this.state.result.Ca ? "Yes" : "No"}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`IDDM: ${this.state.result.IDDM ? "Yes" : "No"}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`NIDDM: ${this.state.result.NIDDM ? "Yes" : "No"}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`COPD: ${this.state.result.COPD ? "Yes" : "No"}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`MI: ${this.state.result.MI ? "Yes" : "No"}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography color="textPrimary">
                                        {`AF: ${this.state.result.AF ? "Yes" : "No"}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{
                                textDecoration: "underline"
                            }}>Insurance Details</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography color="textPrimary">
                                        {this.state.result.insurance ? `Insurance Id: ${this.state.result.insurance.insuranceId}` : "Not Available"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography color="textPrimary">
                                        {this.state.result.insurance ? `Status: ${this.state.result.insurance.insuranceStatus}` : ""}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography color="textPrimary">
                                        {this.state.result.insurance ? `Insurance Company 1: ${this.state.result.insurance.insuranceCompany1}` : ""}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography color="textPrimary">
                                        {this.state.result.insurance ? `Insurance Company 2: ${this.state.result.insurance.insuranceCompany2}` : ""}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography color="textPrimary">
                                        {this.state.result.insurance ? `Sponsorer Details: ${this.state.result.insurance.sponsorerDetails}` : ""}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid>
        )
    }

    render() {
        console.log(this.state, this.props)
        if (!this.props.authDetails || this.props.authDetails === null) {
            return <Redirect to="/login"></Redirect>
        }
        return (
            <div>
                <Container fixed={false} maxWidth="xl" style={{
                    marginTop: "10px",
                }}>
                    {!this.state.loading && !this.state.error ? <Box component="div">{this.profile()}</Box> : <CircularProgress></CircularProgress>}
                    {this.state.error && !this.state.loading ? <Box component="div" style={{
                        textAlign: "center",
                        fontSize: "16px",
                        color: "#fc0505",
                    }}>
                        {this.state.error}
                    </Box> : ''}
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        authDetails: state.auth.authDetails,
        authError: state.auth.authError,
        fetchPatientDetails: state.fetch.fetchPatientDetails,
        fetchPatientError: state.fetch.fetchPatientError,
        fetchPatientCaseDetails: state.fetch.fetchPatientCaseDetails,
        fetchPatientCaseError: state.fetch.fetchPatientCaseError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPatient: (data) => {
            dispatch(fetchPatient(data))
        },
        fetchPatientCase: (data) => {
            dispatch(fetchPatientCase(data, true))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PatientHandler)