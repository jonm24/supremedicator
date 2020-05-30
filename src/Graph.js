import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function Graph(props){

  return (
      <LineChart width={900} height={400} data={props.data}>
        <Line type="monotone" dataKey="Price" stroke="#8884d8" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis padding={{ left: 30, right: 30 }} label={{value: "Date", position: 'bottom'}} dataKey="Date"/>
        <YAxis domain={[0, props.maxY]} 
          label={{ value: 'Price', angle: -90, position: 'insideLeft' }}  />
        <Tooltip />
        <Legend verticalAlign="bottom" align="right" />
      </LineChart>
  );
}