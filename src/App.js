// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line 
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

// Dashboard Component
const Dashboard = () => {
  const [totalPageviews, setTotalPageviews] = useState(48874758);
  
  const [adUnits, setAdUnits] = useState([
    { id: 1, name: 'Banner', pct: 0.8, cpm: 1.5 },
    { id: 2, name: 'Skyscraper', pct: 0.6, cpm: 2.0 },
    { id: 3, name: 'MPU', pct: 0.4, cpm: 4.0 },
    { id: 4, name: 'Email', pct: 0.5, cpm: 3.0, fixedRevenue: 12552 },
  ]);

  const calculateRevenue = (unit) => {
    if (unit.fixedRevenue !== undefined) return unit.fixedRevenue;
    const impressions = totalPageviews * unit.pct;
    return (impressions / 1000) * unit.cpm;
  };

  const dataWithRevenue = adUnits.map((unit) => ({
    ...unit,
    revenue: calculateRevenue(unit),
  }));

  const totalRevenue = dataWithRevenue.reduce((acc, cur) => acc + cur.revenue, 0);

  const handleChange = (id, field, value) => {
    setAdUnits((prevUnits) =>
      prevUnits.map((unit) => {
        if (unit.id === id && unit.name !== 'Email') {
          return { ...unit, [field]: parseFloat(value) || 0 };
        }
        return unit;
      })
    );
  };

  // Line Chart State
  const [lineData, setLineData] = useState([
    { name: 'January', value: 4000 },
    { name: 'February', value: 3000 },
    { name: 'March', value: 5000 },
    { name: 'April', value: 4000 },
    { name: 'May', value: 6000 },
    { name: 'June', value: 7000 },
    { name: 'July', value: 75000 },      // August preset to July (assuming a typo)
    { name: 'August', value: 85000 },    // September preset to August
  ]);

  const [newLinePoint, setNewLinePoint] = useState({ name: '', value: '' });

  // Handle adding a new data point to the Line Chart
  const handleAddLinePoint = (e) => {
    e.preventDefault();
    if (newLinePoint.name && newLinePoint.value) {
      setLineData([...lineData, { name: newLinePoint.name, value: parseFloat(newLinePoint.value) }]);
      setNewLinePoint({ name: '', value: '' });
    }
  };

  // Handle editing an existing data point
  const handleEditLinePoint = (index, field, value) => {
    const updatedLineData = [...lineData];
    updatedLineData[index][field] = field === 'value' ? parseFloat(value) : value;
    setLineData(updatedLineData);
  };

  // Handle deleting a data point
  const handleDeleteLinePoint = (index) => {
    const updatedLineData = [...lineData];
    updatedLineData.splice(index, 1);
    setLineData(updatedLineData);
  };

  return (
    <div>
      {/* Total Pageviews Input */}
      <div style={{ 
        backgroundColor: '#2a2a2a',
        padding: '1rem',
        borderRadius: '8px',
        display: 'inline-flex',
        gap: '1rem',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <label style={{ marginRight: '0.5rem' }}>Total Pageviews:</label>
        <input
          type="number"
          value={totalPageviews}
          onChange={(e) => setTotalPageviews(parseFloat(e.target.value) || 0)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #444',
            backgroundColor: '#333',
            color: '#fff'
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Ad Units Performance Table */}
        <div style={{ 
          backgroundColor: '#2a2a2a',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#8884d8' }}>Ad Units Performance</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #444' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Ad Unit</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>% of Pageviews</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>CPM</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {dataWithRevenue.map((unit) => (
                <tr key={unit.id} style={{ borderBottom: '1px solid #444' }}>
                  <td style={{ padding: '12px' }}>{unit.name}</td>
                  <td style={{ padding: '12px' }}>
                    <input
                      type="number"
                      step="0.01"
                      value={unit.pct}
                      onChange={(e) => handleChange(unit.id, 'pct', e.target.value)}
                      style={{
                        width: '80px',
                        padding: '6px',
                        borderRadius: '4px',
                        border: '1px solid #444',
                        backgroundColor: '#333',
                        color: '#fff',
                        cursor: unit.name === 'Email' ? 'not-allowed' : 'auto'
                      }}
                      readOnly={unit.name === 'Email'}
                    />
                  </td>
                  <td style={{ padding: '12px' }}>
                    <input
                      type="number"
                      step="0.1"
                      value={unit.cpm}
                      onChange={(e) => handleChange(unit.id, 'cpm', e.target.value)}
                      style={{
                        width: '80px',
                        padding: '6px',
                        borderRadius: '4px',
                        border: '1px solid #444',
                        backgroundColor: '#333',
                        color: '#fff',
                        cursor: unit.name === 'Email' ? 'not-allowed' : 'auto'
                      }}
                      readOnly={unit.name === 'Email'}
                    />
                  </td>
                  <td style={{ padding: '12px' }}>${unit.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ 
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#333',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            Total Revenue: ${totalRevenue.toFixed(2)}
          </div>
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Revenue Distribution Pie Chart */}
          <div style={{ 
            backgroundColor: '#2a2a2a',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '1rem', color: '#82ca9d' }}>Revenue Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataWithRevenue}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {dataWithRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#333',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value, entry) => (
                    <span style={{ color: '#fff' }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Revenue Breakdown Bar Chart */}
          <div style={{ 
            backgroundColor: '#2a2a2a',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '1rem', color: '#ffc658' }}>Monthly Revenue Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataWithRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#333',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff'
                  }}
                />
                <Legend 
                  formatter={(value, entry) => (
                    <span style={{ color: '#fff' }}>{value}</span>
                  )}
                />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Editable Line Chart Section */}
        <div style={{
          marginTop: '4rem',
          backgroundColor: '#2a2a2a',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#ff7300' }}>Editable Line Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff'
                }}
              />
              <Legend 
                formatter={(value, entry) => (
                  <span style={{ color: '#fff' }}>{value}</span>
                )}
              />
              <Line type="monotone" dataKey="value" stroke="#ff7300" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>

          {/* Form to Add New Data Point */}
          <form onSubmit={handleAddLinePoint} style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Name (e.g., September)"
              value={newLinePoint.name}
              onChange={(e) => setNewLinePoint({ ...newLinePoint, name: e.target.value })}
              required
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#333',
                color: '#fff',
                flex: '1 1 200px'
              }}
            />
            <input
              type="number"
              placeholder="Value (e.g., 85000)"
              value={newLinePoint.value}
              onChange={(e) => setNewLinePoint({ ...newLinePoint, value: e.target.value })}
              required
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#333',
                color: '#fff',
                flex: '1 1 200px'
              }}
            />
            <button type="submit" style={{
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#ff7300',
              color: '#fff',
              cursor: 'pointer',
              flex: '0 0 auto'
            }}>
              Add Data Point
            </button>
          </form>

          {/* Editable Data Table for Line Chart */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #444' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Value</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lineData.map((point, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #444' }}>
                  <td style={{ padding: '12px' }}>
                    <input
                      type="text"
                      value={point.name}
                      onChange={(e) => handleEditLinePoint(index, 'name', e.target.value)}
                      style={{
                        padding: '6px',
                        borderRadius: '4px',
                        border: '1px solid #444',
                        backgroundColor: '#333',
                        color: '#fff'
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px' }}>
                    <input
                      type="number"
                      value={point.value}
                      onChange={(e) => handleEditLinePoint(index, 'value', e.target.value)}
                      style={{
                        padding: '6px',
                        borderRadius: '4px',
                        border: '1px solid #444',
                        backgroundColor: '#333',
                        color: '#fff'
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => handleDeleteLinePoint(index)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#ff4d4d',
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// PresentationPage Component
const PresentationPage = () => {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ marginBottom: '2rem', color: '#ffffff' }}></h1>
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '960px', 
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0 
      }}>
        <iframe 
          src="https://docs.google.com/presentation/d/e/2PACX-1vSwYUQfFeJExve0V7NNgc6EOxV0XVEmf0M5861aiRqHk66VVP30JJaCf9wCSwTD83mO0G6rzlpAD_Ro/embed?start=false&loop=false&delayms=3000" 
          frameBorder="0" 
          allowFullScreen="true" 
          mozallowfullscreen="true" 
          webkitallowfullscreen="true"
          title="Google Presentation"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            border: 'none' 
          }}
        ></iframe>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div style={{ 
        backgroundColor: '#1a1a1a',
        minHeight: '100vh',
        padding: '2rem',
        color: '#ffffff'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {/* Navigation Bar */}
          <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Digital Revenue Dashboard</h1>
            <nav style={{ marginBottom: '1.5rem' }}>
              <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
              <Link to="/presentation" style={navLinkStyle}>Presentation</Link>
            </nav>
          </header>

          {/* Routing */}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/presentation" element={<PresentationPage />} />
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Styles for Navigation Links
const navLinkStyle = {
  margin: '0 1rem',
  color: '#82ca9d',
  textDecoration: 'none',
  fontSize: '1.1rem'
};

export default App;
