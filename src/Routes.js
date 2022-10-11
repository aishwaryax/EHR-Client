import React from 'react'
import { Box } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom';

import Layout from './Components/HOC/Layout'
import Login from './Components/LoginAndSignUp/Login'
import Dashboard from './Components/Dashboard/Dashboard';
import RegisterPatient from './Components/LoginAndSignUp/RegisterPatient';
import RegisterMedicalPractitioner from './Components/LoginAndSignUp/RegisterMedicalPractitioner';
import RegisterDatabaseAdmin from './Components/LoginAndSignUp/RegisterDatabaseAdmin';
import ViewHandler from './Components/Dashboard/ViewHandler';
import UpdateHandler from './Components/Dashboard/UpdateHandler';
import SearchHandler from './Components/Dashboard/SearchHandler';
import MedicalPractitionerHandler from './Components/Dashboard/MedicalPractitionerHandler';
import PatientHandler from './Components/Dashboard/PatientHandler';

const Routes = (props) => {
    return (
        <Box component="div">
            <Layout>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/registerpatient" component={RegisterPatient} />
                    <Route exact path="/registermedicalpractitioner" component={RegisterMedicalPractitioner} />
                    <Route exact path="/registerdatabaseadmin" component={RegisterDatabaseAdmin} />
                    <Route exact path="/viewprofile" component={ViewHandler} />
                    <Route exact path="/updateprofile" component={UpdateHandler} />
                    <Route exact path="/medicalpractitioner/:id" component={MedicalPractitionerHandler} />
                    <Route exact path="/patient/:id" component={PatientHandler} />
                    <Route exact path="/search" component={SearchHandler} />
                    <Route exact path="/" component={Dashboard} />
                </Switch>
            </Layout>
        </Box>
    )
}

export default Routes
