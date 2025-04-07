import './BarGraph.css';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from 'recharts';

function BarGraph({data}) {

    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart 
                data={data} 
                layout="vertical" 
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
            <XAxis 
                type="number" 
                domain={[0, 'dataMax']}
                stroke="#FFD700"
                tick={{ fill: '#FFD700', fontSize: 20 }}
                tickLine={{ stroke: '#FFD700' }}
            />
            <YAxis 
                dataKey="Cause" 
                type="category" 
                width={150}
                stroke="#FFD700"
                tick={{ fill: '#FFD700', fontSize: 15, fontFamily: 'Arial' }}
            />
            <Legend 
                wrapperStyle={{
                paddingTop: '15px',
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#FFD700'
                }}
                iconSize={12}
                iconType="rect"
            />
            <Tooltip>
            </Tooltip>
            <Bar 
                dataKey="CauseCount"
                fill="#FFD70f"
                name="Count"
                barSize={25}
                radius={[4, 4, 10, 0]} 
            />
            </BarChart>
        </ResponsiveContainer>
    )
};

export default BarGraph;