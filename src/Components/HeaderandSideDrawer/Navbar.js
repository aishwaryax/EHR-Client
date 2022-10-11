import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SignedOutLinks from './SignedOutLinks';
import SideDrawer from './SideDrawer';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import { connect } from 'react-redux'

const navTheme = createMuiTheme({
    palette: {
        primary: {
            main: green[700],
        }
    },
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        drawerOpen: false
    });

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        const drawerOpen = open
        setState({ ...state, drawerOpen });
    };

    return (
        <div className={classes.root}>
            <ThemeProvider theme={navTheme}>
                <AppBar position="static">
                    <Toolbar>
                        {props.authDetails !== null ? <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton> : ''}
                        <SideDrawer toggleDrawer={toggleDrawer} drawerOpen={state.drawerOpen}></SideDrawer>
                        <Typography variant="h6" className={classes.title}>
                            EHR
                    </Typography>
                        {props.authDetails === null ? <SignedOutLinks /> : ''}
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        authDetails: state.auth.authDetails,
        authError: state.auth.authError
    }
}

export default connect(mapStateToProps)(Navbar)
