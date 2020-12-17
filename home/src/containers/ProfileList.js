import React , { useEffect , Component } from 'react';
import ProfileItem from "../components/ProfileItem";
import * as actions from "../store/actions/userList";
import { connect } from 'react-redux'
import { Grid , withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hoc from '../hoc/hoc'


const useStyles = makeStyles ((theme) => ({
    root: {
        flexGrow: 1 ,
    } ,
    paper: {
        padding: theme.spacing (2) ,
        textAlign: 'center' ,
        color: theme.palette.text.secondary ,
    } ,
}));

const ProfileList = (props) => {


    useEffect (() => {
        if (props.users === undefined || props.users === null) {
            props.userList ()
        }
    })


    const classes = useStyles ()


    if (props.loading) {
        return (
            <div>spinner</div>
        )
    } else if (props.users !== null && props.users !== undefined) {
        console.log ('the user' , props.users)
        return (
            <div className={classes.root}>
                <Grid container spacing={6}>
                    <Hoc>
                        {Object.keys (props.users).length > 0 ? <Hoc>
                                {props.users.user.map ((user , index) => {
                                    console.log ('the user detail' , user)
                                    return (
                                        <Grid item xs={12} sm={6} md={4}>
                                            <ProfileItem first_name={user.first_name}
                                                         last_name={user.last_name}
                                                         username={user.username}
                                                         id={user.id}
                                                         profile_pics={user.profile.profile_pics}
                                                         background_image={user.profile.background_image}/>
                                        </Grid>
                                    )
                                })}
                            </Hoc> :
                            <Hoc> null</Hoc>
                        }

                    </Hoc>


                </Grid>

            </div>
        )
    } else {
        return (
            <div>spinner</div>
        )
    }


}


const mapStateToProps = (state) => {
    return {
        users: state.users.users ,
        loading: state.users.loading ,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userList: () => dispatch (actions.usersList ())
    }
}


export default connect (mapStateToProps , mapDispatchToProps) (ProfileList);



