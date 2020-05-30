import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: 300,
    backgroundColor: "lightgrey"
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Cards() {
  const classes = useStyles();
  
  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={4}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper elevation={5} className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}