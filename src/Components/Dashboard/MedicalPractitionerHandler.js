import React, { Component } from 'react'
import { Container, Grid, Button, Box, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchMedicalPractitioner } from '../../Store/Action/fetchAction'
class MedicalPractitionerHandler extends Component {
    state = {
        loading: true,
        error: null,
        result: null
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
            this.props.fetchMedicalPractitioner(data)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.fetchMedicalPractitionerDetails !== null || this.props.fetchMedicalPractitionerError !== null) {
            if (this.props.fetchMedicalPractitionerDetails !== prevProps.fetchMedicalPractitionerDetails) {
                this.setState({
                    ...this.state,
                    loading: false,
                    result: this.props.fetchMedicalPractitionerDetails.viewMedicalPractitioner
                })
            }
            if (this.props.fetchMedicalPractitionerError !== prevProps.fetchMedicalPractitionerError) {
                this.setState({
                    ...this.state,
                    loading: false,
                    error: this.props.fetchMedicalPractitionerError
                })
            }
        }
    }
    render() {
        console.log(this.state, this.props)
        if (!this.props.authDetails || this.props.authDetails === null) {
            return <Redirect to="/login"></Redirect>
        }
        return (
            <div>
                <Container fixed={false} maxWidth="xl">
                    {this.state.loading ? <CircularProgress></CircularProgress> : "Some data"}
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        authDetails: state.auth.authDetails,
        authError: state.auth.authError,
        fetchMedicalPractitionerDetails: state.fetch.fetchMedicalPractitionerDetails,
        fetchMedicalPractitionerError: state.fetch.fetchMedicalPractitionerError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchMedicalPractitioner: (data) => {
            dispatch(fetchMedicalPractitioner(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MedicalPractitionerHandler)