import React from 'react';
import { TextField, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Graph from './Graph';
import Cards from './Cards';
import './App.css';
import { getMonthly} from './helpers';

export default function Form() {
  // styles
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: green[500]
      },
    },
  });
  const btn = {
    color: 'white',
    margin: '6px 10px 20px 10px'
  }
  const baseGraphData = {
    "max": 0, 
    "data": [],
    "winrate": {
      "Relative Strength Index (RSI)": 0,
      "MACD": 0,
      "Bollinger Bands (BBANDS)": 0
    }
  };

  // state declarations
  const [ticker, setTicker] = React.useState(null);
  const [showForm, setShowForm] = React.useState(true);
  const [GraphData, setGraphData] = React.useState(baseGraphData);
  

  // textbox state handler
  const handleText = (e) =>  setTicker(e.target.value.toUpperCase());

  // beforeForm button click
  const onClick = async (event) => {
    event.preventDefault(); // stop refresh from form submission
    setShowForm(false); // set form state
    let res = await getMonthly(ticker); // get monthly stock data
    setGraphData({ // update state
      "max": res[0], 
      "data": res[1], 
      "winrate": {
        "Relative Strength Index (RSI)": res[2],
        "MACD": 0,
        "Bollinger Bands (BBANDS)": 0
      } 
    }); 
  } 

  // afterForm button click
  const clear = () => {
    setShowForm(true); // update all states to default 
    setTicker(null);
    setGraphData(baseGraphData);
  }
  return (
    <ThemeProvider theme={theme}>
      {showForm ? 
        <form onSubmit={onClick}>  
          <h2>Enter a Stock Ticker:</h2>
          <TextField 
            onChange={handleText}
            label="Ticker" 
            variant="outlined">
          </TextField>
          <Button 
            type="submit" style={btn} 
            variant="contained" size="large"
            color="primary">
          Test</Button>
        </form>
      : 
        <form onSubmit={clear}>
          <h2>{ticker}'s Monthly Chart</h2> 
          <Button 
            type="submit" style={btn} 
            variant="contained" size="large"
            color="primary">
          Reset</Button>
        </form>
      }

      <Graph maxY={GraphData.max} data={GraphData.data}/>
      <Cards winrate={GraphData.winrate}/>
    </ThemeProvider>
  );
}