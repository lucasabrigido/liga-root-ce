'use client';

import React from 'react';

export const UserStatsTable = ({ data, stats }) => {
    console.log('data, stats', data, stats)
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#f2f2f2',
        color: '#000',
      }}>
        <thead>
          <tr style={{ backgroundColor: '#ed1a2f', color: 'white' }}>
            <th style={thStyle}>Jogador</th>
            <th style={thStyle}>Total de Jogos</th>
            <th style={thStyle}>Total de Pontos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((userId) => (
            <tr key={userId}>
              <td style={tdStyle}>{stats.users[userId]}</td>
              <td style={tdStyle}>{stats.totalGamesByUser[userId]}</td>
              <td style={tdStyle}>{stats.totalPointsByUser[userId]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '10px 12px',
  borderBottom: '1px solid #ccc',
  textAlign: 'center',
};
