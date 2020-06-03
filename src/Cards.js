import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: "5px"
  },
  paper: {
    height: 280,
    width: 300,
    backgroundColor: "#4caf50",
    borderRadius: "5%",
    color: "white",
    paddingTop: "5px"
  },
  innerPaper: {
    height: 250,
    width: 300,
    backgroundColor: "white",
    marginTop: "3px",
    borderRadius: "5%",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600"
  }, 
  card: {
    fontSize:"25px",
    color: "black",
    paddingTop: "25px",
    fontWeight: "600"
  },
  winrate: {
    fontSize: "90px",
    fontWeight: "600",
    paddingTop: "0px"
  }
}));

export default function Cards(props) {
  const classes = useStyles();
  
  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={4}>
          {["Relative Strength Index (RSI)",
            "MACD",
            "Bollinger Bands (BBANDS)"].map((value) => (
            <Grid 
              key={value} 
              item>
              <Paper 
                elevation={5} 
                className={classes.paper}>
                <Typography 
                  className={classes.cardTitle}>
                {value}</Typography>
                <Paper 
                  elevation={10} 
                  className={classes.innerPaper}>
                  <Typography 
                    className={classes.card}>
                  Win Rate (%):</Typography>
                  <Typography 
                    className={classes.winrate}>
                  {props.winrate[value]}%</Typography>
                </Paper>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}