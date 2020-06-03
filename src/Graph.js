import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import "./App.css";

export default function Graph(props){

  return (
    <div className="flex graphtainer">
      <LineChart className="chart" width={800} height={400} data={props.data}>
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
    </div>
  );
}