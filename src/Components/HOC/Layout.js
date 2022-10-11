import React from 'react'
import { Box } from '@material-ui/core'
import Navbar from '../HeaderandSideDrawer/Navbar'

const Layout = (props) => {
    return (
        <Box component="div">
            <Navbar></Navbar>
            {props.children}
        </Box>
    )
}

export default Layout
