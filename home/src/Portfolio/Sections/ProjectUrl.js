import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Progress from 'components/Progress.js'
import { useDispatch, useSelector } from 'react-redux'
import projectUrlAnonymous from 'store/actions/projectUrl.js'
import AdvancedGridList from 'Portfolio/Sections/ProjectUrlItem.js'
import ProjectAppBar from 'Portfolio/Sections/ProjectAppBar.js'
import Camera from "@material-ui/icons/Camera";
import GridContainer from "components/Grid/GridContainer.js";
import NavPills from "components/NavPills/NavPills.js";
import GridItem from "components/Grid/GridItem.js";




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: '100%',
            height: '100%',
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);

const TitlebarGridList = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch({})
    const projectUrl = useSelector(state => state.project_url.projectUrl)
    const projectUrl_loading = useSelector(state => state.project_url.loading)

    const username = useSelector(state => state.user_detail.username)

    useEffect(() => {
        console.log('it is starting')
        if (username !== null || username !== undefined) {
            dispatch(projectUrlAnonymous(username))
        }
    }, [username])

    if (projectUrl_loading) {
        return (
            <Progress />
        )
    } else if (projectUrl) {
        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} className={classes.navWrapper}>

                    <NavPills
                        alignCenter
                        color="primary"
                        tabs={[
                            {
                                tabButton: "Projects",
                                tabIcon: Camera,
                                tabContent: (

                                    <div className={classes.root}>
                                        {Object.keys(projectUrl).length > 0 ?
                                            <>
                                                {projectUrl.map((project, index) => (
                                                    <GridList className={classes.gridList} key={index} >
                                                        <ProjectAppBar name={project?.name} appbar_color={project?.appbar_color}/>
                                                        {project.project_url_items.length > 0 &&
                                                            <AdvancedGridList
                                                                projecturl_items={project?.project_url_items}
                                                                name={project?.name} />}

                                                    </GridList>
                                                ))}
                                            </> : null
                                        }
                                    </div >
                                )
                            },
                        ]}
                    />

                </GridItem>

            </GridContainer>
        );
    } else {
        return (
            <div>There was an error </div>
        )
    }
}


export default TitlebarGridList