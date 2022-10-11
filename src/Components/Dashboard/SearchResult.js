import React from 'react';
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple, lightGreen } from '@material-ui/core/colors';

const useStyles = makeStyles({
    card: {
        minWidth: "100%",
        margin: "10px"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    fullList: {
        width: 'auto',
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    greenAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: lightGreen[500],
    },
});

function SearchResult(props) {
    const classes = useStyles();
    const profile = () => {
        if (props.data.role === "Patient") {
            return (
                <Avatar className={classes.orangeAvatar}>{`${props.data.firstName[0]}${props.data.lastName[0]}`}</Avatar>
            )
        } else if (props.data.role === "MedicalPractitioner") {
            return (
                <Avatar className={classes.purpleAvatar}>{`${props.data.firstName[0]}${props.data.lastName[0]}`}</Avatar>
            )
        } else if (props.data.role === "DatabaseAdmin") {
            return (
                <Avatar className={classes.greenAvatar}>{`${props.data.firstName[0]}${props.data.lastName[0]}`}</Avatar>
            )
        }
    }
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.data.role === "Patient" ? "Patient" : "Medical Practitioner"}
                </Typography>
                {profile()}
                <Typography variant="h5" component="h2">
                    {`${props.data.firstName} ${props.data.middleName} ${props.data.lastName}`}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.data.verified ? "Verified" : "Not Verified"}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.data.email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => {
                    const link = `${props.data.role.toLowerCase()}/${props.data.id}`
                    props.history.push(link)
                }}>View Profile</Button>
            </CardActions>
        </Card>
    );
}

export default withRouter(SearchResult)