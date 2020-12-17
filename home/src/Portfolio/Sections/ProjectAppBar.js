import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor
} from 'assets/jss/material-kit-react.js'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

const ProjectAppBar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <AppBar position="static" color={props.appbar_color}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            {props.name}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ProjectAppBar