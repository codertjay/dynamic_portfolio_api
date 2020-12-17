import React from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from "@material-ui/lab/Skeleton";
import { Redirect } from "react-router-dom";

function Copyright () {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date ().getFullYear ()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles ((theme) => ({
    root: {
        height: '100vh' ,
    } ,
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)' ,
        backgroundRepeat: 'no-repeat' ,
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900] ,
        backgroundSize: 'cover' ,
        backgroundPosition: 'center' ,
    } ,
    paper: {
        margin: theme.spacing (8 , 4) ,
        display: 'flex' ,
        flexDirection: 'column' ,
        alignItems: 'center' ,
    } ,
    avatar: {
        margin: theme.spacing (1) ,
        backgroundColor: theme.palette.secondary.main ,
    } ,
    form: {
        width: '100%' , // Fix IE 11 issue.
        marginTop: theme.spacing (1) ,
    } ,
    submit: {
        margin: theme.spacing (3 , 0 , 2) ,
    } ,
}));


const NormalLoginForm = (props) => {
    const [Username , setUsername] = React.useState ("");
    const [Password , setPassword] = React.useState ("");
    const [loading , setLoading] = React.useState (false);

    const onFinish = event => {
        event.preventDefault ();
        console.log (Username , Password)
        console.log ('finished ')
        props.onAuth (Username , Password);
    };

    const classes = useStyles ();

    if (props.username !== null || props.username !== undefined) {
        return (
            <Grid container component="main" className={classes.root}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Skeleton variant="rect" width={210} height={118}/>
                    <Skeleton variant="rect" width={210} height={118}/>
                    <Skeleton variant="rect" width={210} height={118}/>
                    <Skeleton variant="rect" width={210} height={118}/>
                    <Skeleton variant="rect" width={210} height={118}/>
                    <Skeleton variant="rect" width={210} height={118}/>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} method='Post' noValidate onSubmit={onFinish}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={Username}
                                onChange={e => setUsername (e.target.value)}
                                id="username"
                                label="username"
                                name="email"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={Password}
                                onChange={e => setPassword (e.target.value)}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading ,
        username: state.auth.username ,
        isAuthenticated: state.auth.isAuthenticated ,
        error: state.auth.error ,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (Username , Password) => dispatch (actions.authLogin (Username , Password))
    }
}

export default connect (mapStateToProps , mapDispatchToProps) (NormalLoginForm);


