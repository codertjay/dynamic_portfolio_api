import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },

    },
  }),
);

export default function Progress() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <LinearProgress />
        <LinearProgress />
        <LinearProgress />
        <LinearProgress />
        <LinearProgress />

        <Box mt={5}>
          <LinearProgress color="secondary" />
          <LinearProgress />
        </Box>


        <Box mt={5}>
          <LinearProgress color="secondary" />
          <LinearProgress />
        </Box>


        <Box mt={5}>
          <LinearProgress color="secondary" />
          <LinearProgress />
        </Box>


      </Grid>

    </div>
  );
}
