import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";


import TitlebarGridList from 'Portfolio/Sections/ProjectUrl.js'
import PortfolioStarter from 'Portfolio/Sections/PortfolioStarter.js'

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import { useDispatch, useSelector } from 'react-redux'
import { usersDetail } from 'store/actions/userDetail.js'


import Progress from 'components/Progress.js'
import Error404 from 'Error404/index'



const useStyles = makeStyles(styles);

const ProfilePage = (props) => {
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    // const token = useSelector(state => state.auth.token)
    const user_detail_loading = useSelector(state => state.user_detail.loading)
    const user_detail = useSelector(state => state.user_detail)

    const dispatch = useDispatch({})
    const _username = props.match.params.id



    useEffect(() => {
        if (_username) {
            dispatch(usersDetail(_username))
        }
    }, [_username])

    const { first_name, last_name,
        email,
        username,
        user_type,
        profile_pics,
        background_image,
        skills,
        phone_number,
        linkedin,
        twitter,
        instagram,
        about,
        logo } = user_detail


    console.log('this is the user detail', user_detail)
    console.log('this is the user profile pic', profile_pics)


    if (user_detail_loading) {
        return <Progress />
    } else if (user_detail) {
        return (
            <div>
                { background_image && <Parallax small filter image={background_image}
                    PortfolioStarter={user_detail && <PortfolioStarter user_detail={user_detail} />} >
                        
                </Parallax>}
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={6}>
                                    <div className={classes.profile}>
                                        <div>
                                            <img src={profile_pics}
                                                alt={username}
                                                className={imageClasses} />
                                        </div>
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>{last_name} {" "} {first_name}</h3>
                                            <h6> {skills} ?  {skills} : <>MY skill </>  </h6>
                                            <Button justIcon link className={classes.margin5}>
                                                <i className={"fab fa-twitter"} />
                                            </Button>
                                            <Button justIcon link className={classes.margin5}>
                                                <i className={"fab fa-instagram"} />
                                            </Button>
                                            <Button justIcon link className={classes.margin5}>
                                                <i className={"fab fa-facebook"} />
                                            </Button>
                                        </div>
                                    </div>
                                </GridItem>
                            </GridContainer>
                            <div className={classes.description}>
                                <p>
                                    {about}
                                </p>
                            </div>


                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>

                                    {/* This is the whole projects for the user */}
                                    <TitlebarGridList user_detail={user_detail} />

                                    {/* end of the project  */}
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </div>
        );

    } else {
        return <Error404 />
    }
}
export default ProfilePage;

