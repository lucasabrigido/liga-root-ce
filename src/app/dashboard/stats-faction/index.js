'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#ed1a2f',
  '#333333',
  '#999999',
  '#a3a3a3',
  '#0066cc',
  '#009933',
  '#ff9900',
  '#6600cc',
  '#ff66cc',
  '#00cccc',
];

export const FactionPieChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="totalGames"
            nameKey="faction"
            cx="50%"
            cy="50%"
            outerRadius={130}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
