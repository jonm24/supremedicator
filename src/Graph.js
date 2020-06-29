import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "./App.css";

export default function Graph(props){
  const classes = useStyles();

  console.log(props)

  return (
    <Paper 
      elevation={5} 
      className={classes.paper}>
      <Typography 
        className={classes.cardTitle}>
        {props.indicator} w/ {props.ticker} 
      </Typography>
      <Typography
        className={classes.cardTitle}>
        Win Rate (%): {props.winrate}% 
      </Typography>
      <Paper 
        elevation={10} 
        className={classes.innerPaper}>
          <LineChart width={480} height={270} data={props.data}>
            <Line 
              type="monotone" 
              dataKey="Price"
              stroke="#4caf50"
              strokeWidth={3}
              dot={false} 
            />
            <Line 
              type="monotone" 
              dataKey="RSI Buy"
              stroke="blue"
              strokeWidth={0}
              dot={{r: 4, fill: "blue"}} 
            />
            <Line 
              type="monotone" 
              dataKey="RSI Sell"
              stroke="red"
              strokeWidth={0}
              dot={{r: 4, fill: "red"}}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              padding={{ left: 30, right: 30 }} 
              label={{value: "Year", position: 'top'}} 
              dataKey="Year"
            />
            <YAxis 
              domain={[0, props.maxY]} 
              label={{ value: 'Price', angle: -90, position: 'insideLeft' }}  
            />
            <Tooltip />
            <Legend verticalAlign="bottom" align="right" margin={{left: 50}}/>
          </LineChart>
      </Paper>
    </Paper>
  );
}

const useStyles = makeStyles(() => ({
  paper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: 380,
    width: 450,
    backgroundColor: "#4caf50",
    borderRadius: "5%",
    color: "white", 
    margin: '30px auto',
    '@media (max-width: 650px)': {

    }
  },
  innerPaper: {
    position: 'absolute',
    display: "flex",
    alignItems: 'center',
    bottom: '-15px',
    left: '-30px',
    height: 300,
    width: 500,
    margin: "3px auto",
    backgroundColor: "white",
    borderRadius: "5%/8%",
    '@media (max-width: 650px)': {
      
    }
  },
  cardTitle: {
    fontSize: "30px",
    fontWeight: "600"
  }, 
}));