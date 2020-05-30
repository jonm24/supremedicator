import React from 'react';
import ReactDOM from 'react-dom';
import { TextField, createMuiTheme, ThemeProvider, Container } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Graph from './Graph';
import Cards from './Cards';
import './App.css';

const BASE_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=";
const END_URL = "&apikey=K59WEQJ3XCLUDX75&outputsize=full";

const RSI_URL = "https://www.alphavantage.co/query?function=RSI&symbol=";
const END_RSI = "&interval=monthly&time_period=2&series_type=close&apikey=K59WEQJ3XCLUDX75&outputsize=full";

export default function Form() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: green[500]
      },
    },
  });
  const tf = {
    margin: '0px 20px'
  };
  const btn = {
    color: 'white'
  };
  const spacer = {
    width: "100%",
    height: "50px",
  };

  // text field state
  const [textVal, setTextVal] = React.useState(null);
  const handleText = (e) =>  setTextVal(e.target.value.toUpperCase());

  // hide/show state
  const [hideForm, setHideForm] = React.useState(false);

  // graph params
  var arrData = [];
  var maxY = 0; 

  // button click
  const onClick = async () => {
    (setHideForm(true)); // set view state
    
    const data = await fetch(BASE_URL + textVal + END_URL) // fetch data
      .then(res => res.json()); // json
    //console.log(data);

    const rsi = await fetch(RSI_URL + textVal + END_RSI)
      .then(res => res.json());
    
    console.log(rsi);

    // make array, get mins/maxes for graph
    for (const date in data["Monthly Adjusted Time Series"]) {
        // get close price
        let price = data["Monthly Adjusted Time Series"][date]["4. close"];
        // push to array
        arrData.push({ "Date": date, "Price": price });

        // get max for chart 
        if (parseFloat(price) > maxY) {
          maxY = price;
        }
    }
    arrData.reverse(); // chronological order
    maxY = Math.ceil(parseFloat(maxY) + 25); // add buffer for chart
    //console.log(arrData);

    // get RSI

    
    // render graph
    ReactDOM.render(  
      <div className="Container">
        <h2>{textVal}'s Monthly Chart</h2>
        <Graph maxY={maxY} data={arrData}/>
        <div style={spacer}></div>
        <Cards />
      </div>
    , document.getElementById('root2'));
  }   

  const clear = () => {
    setHideForm(false);
    setTextVal(null);
    ReactDOM.unmountComponentAtNode(document.getElementById('root2'));
  }
  return (
    <ThemeProvider theme={theme}>
      <Container className="Container">

        { hideForm ? null : 
          <form onSubmit={onClick}>
            <h3>Enter a Stock Ticker:</h3>
            <TextField onChange={handleText} style={tf} label="Ticker" variant="outlined"></TextField>
            <Button type="submit" style={btn} variant="contained"size="large" color="primary">Test</Button>
          </form>}
        
        {hideForm ? 
          <form onSubmit={clear}>
            <Button type="submit" style={btn} variant="contained" size="large" color="primary">Reset</Button>
          </form>
        : null}

      </Container>
    </ThemeProvider>
  );
}