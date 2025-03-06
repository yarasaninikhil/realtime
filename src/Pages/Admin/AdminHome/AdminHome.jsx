import { React, useState, useEffect } from 'react';
import { supabase } from '../../../Client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './AdminHome.css';
import AdminNav from '../AdminNavbar/AdminNav';
import Footer from '../../../Component/Footer/Footer';

const AdminHome = () => {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    const fetchTourData = async () => {
      const { data, error } = await supabase.from('Bookings').select('*');

      if (error) {
        setBookings(null);
        setError('Could not fetch the Bookings data');
        console.log(error);
      }

      if (data) {
        setBookings(data);
        setError(null);
        processChartData(data);
        processPlaceData(data);
      }
    };
    fetchTourData();
  }, []);

  const processChartData = (bookings) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const chartData = months.map((month, index) => ({
      month,
      '2024': 0,
      '2025': 0,
    }));

    bookings.forEach(booking => {
      const date = new Date(booking.date);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (year === 2024 || year === 2025) {
        chartData[month][year] += 1;
      }
    });

    setChartData(chartData);
  };

  const processPlaceData = (bookings) => {
    const placeCounts = {};

    bookings.forEach(booking => {
      const place = booking.place;
      if (place) {
        placeCounts[place] = (placeCounts[place] || 0) + 1;
      }
    });

    const placeData = Object.keys(placeCounts).map(place => ({
      name: place,
      value: placeCounts[place],
    }));

    setPlaceData(placeData);
  };

  const COLORS = ['#DE3163', '#FF7F50', '#FFBF00', '#DFFF00', '#40E0D0', '#9FE2BF', '#6495ED', '#CCCCFF', '#f8c471'];

  return (
    <div className='adminbo'>
      <AdminNav/>

      <div style={{  height: '400px', marginBottom: '40px' }}>
        <h2 className='chart-head'>Bookings by Month (2024 vs 2025)</h2>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="2024" fill="#8884d8" name="2024 Bookings" />
            <Bar dataKey="2025" fill="#82ca9d" name="2025 Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
        <div style={{ flex: 1, minWidth: '300px', height: '400px' }}>
          <h2 className='chart-head'>Bookings by Place (Pie Chart)</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={placeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={false}
              >
                {placeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, minWidth: '300px', height: '400px' }}>
          <h2 className='chart-head'>Bookings by Place (Doughnut Chart)</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={placeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={150}
                fill="#8884d8"
                label={false}
              >
                {placeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3 className='chart-head'>Places</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {placeData.map((place, index) => (
            <div key={place.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: COLORS[index % COLORS.length],
                  borderRadius: '50%',
                }}
              />
              <span>{place.name}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminHome;
