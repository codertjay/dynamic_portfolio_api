import { useSelector } from 'react-redux'
import React, { useState } from 'react';
import classNames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';



import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'


const useStyles = makeStyles(styles)



const AdvancedGridList = (props) => {
    const classes = useStyles();



    const [state, setState] = useState({
        open: false,
        currentImg: "",
        name: "",
        detail: "",
    })

    const project_url_items = props.projecturl_items
    const projectUrl_loading = useSelector(state => state.project_url.loading)

    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);


    const handleOpen = (img, name, detail) => {
        console.log('this is the image ant the other details', img, name, detail)
        setState({
            open: true, currentImage: img,
            name: name, detail: detail
        })

    }

    const handleClose = () => {
        setState({ open: false })
    }


    const actions = [
        <Button label="Close" primary={true}
            onClick={handleClose} />
    ]



    if (projectUrl_loading) {
        return (
            <div> loading</div>
        )
    } else if (project_url_items !== null &&
        project_url_items !== undefined
        && project_url_items.length > 0) {
        return (

            <div className={classes.root}>
                <Grid container spacing={1}>
                    {project_url_items.map((project, index) => (
                        <GridItem key={index} className={classes.MyGridList} xs={6} sm={8} md={4} >
                            <GridListTile cols={3}  >
                                <img src={`http://127.0.0.1:8000${project.image}`}
                                    className={navImageClasses}
                                    style={{ height: '300px' }} alt={project.name} />
                                <GridListTileBar
                                    title={project.name}
                                    subtitle={<span>by: {project.user}</span>}
                                    actionIcon={
                                        <IconButton
                                            onClick={() => handleOpen(project.image,
                                                project.name,
                                                project.detail)}
                                            aria-label={`info about ${project.name}`} className={classes.icon}>
                                            <InfoIcon color="white" />
                                        </IconButton>
                                    } />
                            </GridListTile>
                        </GridItem>
                    ))}

                </Grid>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={state.open}
                    onClose={handleClose}
                >
                    <DialogTitle id="">{state.name}</DialogTitle>
                    <DialogContent>
                        <img src={`http://127.0.0.1:8000${state.currentImage}`}
                            alt="" style={{ width: "100%" }} />
                        <DialogContentText>
                            {state.detail}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}
                            color="secondary">
                            Cancel
                                                </Button>
                    </DialogActions>
                </Dialog>

            </div>

        )

    } else {
        return <div>Hello the item did not show</div>
    }
}


export default AdvancedGridList