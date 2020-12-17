import React , { useState , useEffect , Component } from 'react';
import { usersDetail } from "../store/actions/userDetail";
import { projectUrlAnonymous } from "../store/actions/projectUrl";
import { connect } from 'react-redux'
import Hoc from "../hoc/hoc";
import UserContactPage from "../components/UserContactPage";
import PortfolioStarter from '../components/PortfolioStarter'
import About from "../components/About";
import Skeleton from '@material-ui/lab/Skeleton';

const ProfileDetail = (props) => {

    console.log (props)
    console.log ('props id' , props.match.params.id)

    useEffect (() => {
        props.userDetail (props.match.params.id)

    } , [props.match.params.id])

    useEffect (() => {
        if ((props.user_detail_username !== null) || (props.user_detail_username !== undefined)) {
            props.projectUrlAnonymous (props.user_detail_username);
        }
    } , [props.user_detail_username])


    const {user_detail} = props
    const {user_detail_loading} = props
    console.log (' props.projectUrl' , props.projectUrl)
    if (props.user_detail === null || props.user_detail === undefined) {
        return <div>
            <Skeleton variant="rect" width={210} height={118}/>
            <Skeleton variant="rect" width={210} height={118}/>
            <Skeleton variant="rect" width={210} height={118}/>
            <Skeleton variant="rect" width={210} height={118}/>
            <Skeleton variant="rect" width={210} height={118}/>
            <Skeleton variant="rect" width={210} height={118}/>
            <Skeleton variant="rect" width={210} height={118}/>
        </div>
    } else {
        const {
            last_name ,
            first_name ,
            email ,
            linkedin ,
            twitter ,
            instagram ,
            phone_number ,
            username ,
            about
        } = props.user_detail
        const {profile_pics , skills , background_image} = props.user_detail.profile
        return (
            <Hoc>
                <PortfolioStarter background_image={background_image}
                                  about={about}
                                  username={username}
                                  skills={skills}
                                  last_name={last_name}
                                  first_name={first_name}
                                  profile_pics={profile_pics}/>

                <About profile_pics={profile_pics}
                       last_name={last_name}
                       first_name={first_name}
                       about={about}/>

                {/*<div className="container ml-2 mr-2 mx-auto">*/}
                {/*    <UserContactPage first_name={first_name}*/}
                {/*                     last_name={last_name}*/}
                {/*                     twitter={twitter}*/}
                {/*                     instagram={instagram}*/}
                {/*                     phone_number={phone_number}*/}
                {/*                     email={email}/>*/}
                {/*</div>*/}
            </Hoc>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        // user detail section
        user_detail: state.user_detail.user_detail ,
        user_detail_loading: state.user_detail.loading ,
        user_detail_username: state.user_detail.username ,
        token: state.auth.token ,
        projectUrl: state.project_url.projectUrl ,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        userDetail: (username) => dispatch (usersDetail (username)) ,
        projectUrlAnonymous: (username) => dispatch (projectUrlAnonymous (username))
    }
}


export default connect (mapStateToProps , mapDispatchToProps) (ProfileDetail);




