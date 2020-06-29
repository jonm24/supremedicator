import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { getMonthly} from './helpers';
import Graph from './Graph';

export default function Form() {
  const classes = useStyles();

  const [ticker, setTicker] = React.useState(null);
  const [showForm, setShowForm] = React.useState(true);
  const [GraphData, setGraphData] = React.useState({
    "ticker": "",
    "indicator": "",
    "winrate": "",
    "maxY": 0, 
    "data": [],
  });

  const handleText = (e) =>  setTicker(e.target.value.toUpperCase());
  
  const onClick = async (event) => {
    event.preventDefault(); 
    setShowForm(false); // set form state
    let res = await getMonthly(ticker); // get monthly stock data
    setGraphData({ // update state
      "ticker": res[0],
      "indicator": res[1],
      "winrate": res[2],
      "maxY": res[3], 
      "data": res[4],
    });
  } 

  const clear = (e) => {
    setShowForm(true); // update all states to default 
    setTicker(null);
    setGraphData({
      "ticker": "",
      "indicator": "",
      "winrate": "",
      "maxY": 0, 
      "data": [],
    });
  }


  return (
    <React.Fragment>
      {showForm ? 
        <div className="formtainer">
          <form className="flex" onSubmit={onClick}>  
            <Typography className={classes.h2Text}>Enter a Stock Ticker:</Typography>
            <div>
              <TextField 
                onChange={handleText}
                label="Ticker" 
                variant="outlined">
              </TextField>
              <Button 
                type="submit" className={classes.btn} 
                variant="contained" size="large"
                color="primary">
              Test</Button>
            </div>
          </form>
        </div>
      : 
      <div className="formtainer posted">
        <form className="flex" onSubmit={clear}>
          <Graph {...GraphData}></Graph>
          <Button 
              type="submit" className={classes.btn}
              variant="contained" size="large"
              color="primary">
            try again</Button>
        </form>
      </div>
      }
      
    
    </React.Fragment>
  );
}

const useStyles = makeStyles(() => ({
  btn: {
    color: 'white',
    margin: '6px 10px 20px 10px',
  },
  h2Text: {
    fontSize: '2rem',
    margin: '25px 0px',
    fontFamily: 'Roboto',
    fontWeight: '600'
  }
}));