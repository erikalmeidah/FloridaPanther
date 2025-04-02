import './barGraph.css';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';

function BarGraph({data}) {

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart 
                data={data} 
                layout="vertical" 
                margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
            >
            <XAxis 
                type="number" 
                domain={[0, 'dataMax']}
                stroke="#FFFFFF"
                tick={{ fill: '#FFFFFF', fontSize: 20 }}
                tickLine={{ stroke: '#FFFFFF' }}
            />
            <YAxis 
                dataKey="Cause" 
                type="category" 
                width={150}
                stroke="#FFFFFF"
                tick={{ fill: '#FFFFFF', fontSize: 20, fontFamily: 'Arial' }}
            />
            <Legend 
                wrapperStyle={{
                paddingTop: '15px',
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#FFFFFF'
                }}
                iconSize={12}
                iconType="rect"
            />
            <Bar 
                dataKey="CauseCount"
                fill="#000000"
                name="Count"
                barSize={25}
                radius={[4, 4, 0, 0]} 
            />
            </BarChart>
        </ResponsiveContainer>
    )
};

export default BarGraph;