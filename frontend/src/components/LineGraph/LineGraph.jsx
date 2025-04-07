import './LineGraph.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineGraph({ data }) {

    return (
        <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data}>
          <CartesianGrid 
            strokeDasharray="3 3"
            stroke='#FFFFFF'
          />
          <XAxis 
            dataKey="Year"
            stroke='#FFFFFF'
          />
          <YAxis 
            stroke='#FFFFFF'
          />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="ObservationCount" 
            stroke="#FFD700"
            strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default LineGraph;
