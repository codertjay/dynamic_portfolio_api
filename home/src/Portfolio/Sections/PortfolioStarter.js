import React from 'react'
import { Container, ButtonGroup, Typography, IconButton } from '@material-ui/core'
// import Button from "components/CustomButtons/Button.js";
// import FaceBookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
// import  GitHubIcon from '@material-ui/icons/GitHub'
import InstagramIcon from '@material-ui/icons/Instagram'
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { makeStyles } from "@material-ui/core/styles";
import {
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    roseColor,
    grayColor,
} from 'assets/jss/material-kit-react.js'



const useStyles = makeStyles(styles);


const PortfolioStarter = ({ user_detail }) => {

    const classes = useStyles()

    const { first_name, last_name,
        linkedin,
        twitter,
        instagram,
        about } = user_detail


    return (
        <div>
            <Container maxWidth="xs" color={'inherit'} >


                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Hello my name is {last_name}{" - "}{first_name}.</h1>
                            <h4>
                                {about}
                            </h4>
                            <br />
                            <ButtonGroup variant="text" color="default" aria-label="">
                                <IconButton aria-label="" href={`${linkedin}`}
                                    target="_blank" >
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton aria-label="" href={`${instagram}`}
                                    target="_blank" >
                                    <InstagramIcon />
                                </IconButton>
                                <IconButton aria-label="" href={`${twitter}`}
                                    target="_blank" >
                                    <TwitterIcon />
                                </IconButton>


                            </ButtonGroup>

                        </GridItem>
                    </GridContainer>
                </div>

            </Container>
        </div>
    )
}



export default PortfolioStarter