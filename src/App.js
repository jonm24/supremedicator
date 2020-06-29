import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, createMuiTheme, ThemeProvider} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import './App.css';
import Form from './Form';
import Board from './Board';
import {testChartData} from './testChartData';

export default function App() {
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
  const linkstyle = {
    textDecoration: 'none'
  }

  const [ListData, setListData] = React.useState(baseGraphData);

  function getBoard() {
    // fetch board data from server
    if (ListData !== baseGraphData){
      setListData(baseGraphData);
    }
    return (
      <Board list={ListData}></Board>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
          <div className="header">
          <h1>Indicator Tester</h1>
            <div>
              <Link to="/" style={linkstyle}>
                <Button style={btn} variant="contained" size="large" color="primary">
                  leaderboard
                </Button>
              </Link>
              <Link to="/post-test" style={linkstyle}>
                <Button style={btn} variant="contained" size="large" color="primary">
                  post a test
                </Button>
              </Link>
            </div> 
          </div>         
          <Switch>
            <Route exact path="/" component={() => getBoard()}></Route>
            <Route path="/post-test" component={Form}></Route>
          </Switch>
          
          <div className="spacer"></div>
      </Router>
    </ThemeProvider>
  );
}

export const baseGraphData = [
  { 
    "ticker": "GOOGL",
    "indicator": "RSI",
    "winrate": 71,
    "maxY": 1465, 
    "data": testChartData,
  }, 
  { 
    "ticker": "GOOGL",
    "indicator": "MACD",
    "winrate": 71,
    "maxY": 1465, 
    "data": testChartData
  },
  { 
    "ticker": "GOOGL",
    "indicator": "BBANDS",
    "winrate": 71,
    "maxY": 1465, 
    "data": testChartData
  }];