import React from 'react'
import { withRouter } from 'react-router-dom';
import { Box, Button } from '@material-ui/core'

const SignedOutLinks = (props) => {
    return (
        <Box component="div">
            <Button color="inherit" onClick={() => {
                props.history.push('login');
            }}>Login</Button>
            <span style={{ margin: "5px" }}>|</span>
            <Button color="inherit" onClick={() => {
                props.history.push('registerpatient');
            }}>Register as Patient</Button>
            <span style={{ margin: "5px" }}>|</span>
            <Button color="inherit" onClick={() => {
                props.history.push('registermedicalpractitioner');
            }}>Register as Medical Practitioner</Button>
            <span style={{ margin: "5px" }}>|</span>
            <Button color="inherit" onClick={() => {
                props.history.push('registerdatabaseadmin');
            }}>Register as Database Admin</Button>
        </Box>
    )
}

export default withRouter(SignedOutLinks)
