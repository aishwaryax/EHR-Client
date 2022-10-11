import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import ProfileJSON from './profile.json'

class ViewHandler extends Component {
    state = {}
    componentDidMount() {
        if (this.props.authDetails !== null) {
            const role = this.props.authDetails.login.user.role
            this.setState({
                role, data: ProfileJSON[role].view
            })
        }
        console.log(ProfileJSON[this.state.role].view)
    }
    render() {
        return (
            this.props.authDetails === null ? <Redirect to="/login"></Redirect> :
                <div>{this.state.data.links.map((link) => {
                    if (link.type === "single") {
                        return <p>{link.name}</p>
                    } else {
                        link.map((eachLink) => {
                            return <p>{eachLink}</p>
                        }
                        )
                    }
                }
                )}</div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        authDetails: state.auth.authDetails,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewHandler)