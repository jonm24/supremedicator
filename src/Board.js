import React from 'react';
import { Grid } from '@material-ui/core';
import Graph from './Graph';
import './App.css';

export default function Board(props) {
  
  console.log(props.list)

  return (
    <div className="boardtainer">
      <div className="cardtainer">
      <Grid container justify="center" spacing={4}>
        {props.list.map((value, index) => (    
            <Graph key={index} {...value}></Graph>
        ))}
      </Grid>
      </div>
    </div>
  );
}

