import React, { useState, useEffect } from 'react';
import Navbar from '../components/navigation/Navbar1';
import '../styles/components/dashboard.css';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { FaHeartbeat, FaWalking, FaRunning, FaBiking, FaFire } from 'react-icons/fa';
import { GiFootsteps } from 'react-icons/gi';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// Sample data
const heartRateData = [72, 75, 78, 72, 70, 68, 72, 75, 80, 85, 82, 78, 75, 72, 70, 68, 72, 75, 78, 80, 78, 75, 72, 70];
const nutritionData = {
  protein: 25,
  carbs: 58,
  fat: 17,
};

// Generate random data for charts
const generateRandomData = (length, min, max) => Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Dashboard = ({ darkMode, toggleDarkMode }) => {
  // Random data for charts
  const [weeklyActivityData, setWeeklyActivityData] = useState(generateRandomData(7, 100, 500)); // kcal range: 100-500
  const [sleepData, setSleepData] = useState(generateRandomData(7, 6, 10)); // hours range: 6-10

  // Refresh random data every 10 seconds (optional, for demo)
  useEffect(() => {
    const interval = setInterval(() => {
      setWeeklyActivityData(generateRandomData(7, 100, 500));
      setSleepData(generateRandomData(7, 6, 10));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Chart data for Activity Progress
  const activityChartData = {
    labels: days,
    datasets: [
      {
        label: 'Calories Burned (kcal)',
        data: weeklyActivityData,
        backgroundColor: darkMode ? '#7b6bff' : '#4299e1',
        borderColor: darkMode ? '#7b6bff' : '#4299e1',
        borderWidth: 1,
      },
    ],
  };

  // Chart data for Sleep Analysis
  const sleepChartData = {
    labels: days,
    datasets: [
      {
        label: 'Sleep Hours',
        data: sleepData,
        fill: true,
        backgroundColor: darkMode ? 'rgba(123, 107, 255, 0.2)' : 'rgba(159, 122, 234, 0.2)',
        borderColor: darkMode ? '#b19cd9' : '#9f7aea',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: darkMode ? '#b0b0b0' : '#718096' } },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: darkMode ? '#b0b0b0' : '#718096' },
      },
      x: { ticks: { color: darkMode ? '#b0b0b0' : '#718096' } },
    },
  };

  return (
    <div className={`dashboard-page ${darkMode ? 'dark' : ''}`}>
      <Navbar showLinks={true} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="dashboard-container">
        {/* Health Metrics (Heart Rate, Steps, Calories) */}
        <div className="dashboard-grid">
          <div className="health-metric card">
            <div className="metric-header">
              <FaHeartbeat className="metric-icon" />
              <h3>Heart Rate</h3>
            </div>
            <div className="metric-content">
              <p className="metric-value">
                72 <span>bpm</span>
              </p>
              <div className="metric-change negative">
                <FiTrendingDown />
                <span>5% lower</span>
              </div>
            </div>
          </div>

          <div className="health-metric card">
            <div className="metric-header">
              <GiFootsteps className="metric-icon" />
              <h3>Steps</h3>
            </div>
            <div className="metric-content">
              <p className="metric-value">7,456</p>
              <div className="metric-change positive">
                <FiTrendingUp />
                <span>12% higher</span>
              </div>
            </div>
          </div>

          <div className="health-metric card">
            <div className="metric-header">
              <FaFire className="metric-icon" />
              <h3>Calories</h3>
            </div>
            <div className="metric-content">
              <p className="metric-value">
                1,850 <span>kcal</span>
              </p>
              <div className="metric-change negative">
                <FiTrendingDown />
                <span>3% lower</span>
              </div>
            </div>
          </div>
        </div>

        {/* Workout Tracking and Heart Rate Graph */}
        <div className="dashboard-grid">
          {/* Workout Tracking */}
          <div className="workout-tracking card">
            <h2>Workout Tracking</h2>
            <div className="workout-item">
              <div className="workout-icon-container">
                <FaWalking className="workout-icon" />
              </div>
              <div className="workout-details">
                <p className="workout-type">Walking</p>
                <p className="workout-stats">4.8 km • 230 kcal</p>
              </div>
              <span className="workout-distance">7,456 steps</span>
            </div>
            <div className="workout-item">
              <div className="workout-icon-container">
                <FaRunning className="workout-icon" />
              </div>
              <div className="workout-details">
                <p className="workout-type">Running</p>
                <p className="workout-stats">25 mins • 321 kcal</p>
              </div>
              <span className="workout-distance">3.2 km</span>
            </div>
            <div className="workout-item">
              <div className="workout-icon-container">
                <FaBiking className="workout-icon" />
              </div>
              <div className="workout-details">
                <p className="workout-type">Cycling</p>
                <p className="workout-stats">45 mins • 450 kcal</p>
              </div>
              <span className="workout-distance">12.5 km</span>
            </div>
          </div>

          {/* Heart Rate Graph */}
          <div className="heart-rate-graph card">
            <h2>Heart Rate</h2>
            <div className="heart-rate-stats">
              <div className="heart-rate-value">
                <FaHeartbeat className="heart-icon" />
                <p>
                  72 <span>BPM</span>
                </p>
              </div>
              <div className="heart-rate-range">
                <p>Min: 60</p>
                <p>Max: 92</p>
              </div>
            </div>
            <div className="graph-container">
              <div className="line-chart">
                {heartRateData.map((value, index) => (
                  <div
                    key={index}
                    className="line-point"
                    style={{
                      bottom: `${(value - 50) * 2}px`,
                      left: `${index * (100 / (heartRateData.length - 1))}%`,
                    }}
                  ></div>
                ))}
                <div className="line-chart-line"></div>
                <div className="chart-labels">
                  <span>12AM</span>
                  <span>6AM</span>
                  <span>12PM</span>
                  <span>6PM</span>
                  <span>12AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sleep Analysis and Nutrition Breakdown */}
        <div className="dashboard-grid">
          {/* Sleep Analysis */}
          <div className="sleep-analysis card">
            <h2>Sleep Analysis</h2>
            <p className="sleep-avg">{sleepData.reduce((a, b) => a + b, 0) / 7}h avg</p>
            <div className="graph-container" style={{ height: '200px' }}>
              <Line data={sleepChartData} options={chartOptions} />
            </div>
          </div>

          {/* Nutrition Breakdown */}
          <div className="nutrition-breakdown card">
            <h2>Nutrition</h2>
            <div className="nutrition-stats">
              <div className="nutrition-item">
                <p>Calories</p>
                <p>1850 / 2500</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '74%' }}></div>
                </div>
              </div>
              <div className="nutrition-item">
                <p>Protein</p>
                <p>95g / 120g</p>
                <div className="progress-bar">
                  <div className="progress protein" style={{ width: '79%' }}></div>
                </div>
              </div>
              <div className="nutrition-item">
                <p>Carbs</p>
                <p>220g / 275g</p>
                <div className="progress-bar">
                  <div className="progress carbs" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="nutrition-item">
                <p>Fat</p>
                <p>65g / 85g</p>
                <div className="progress-bar">
                  <div className="progress fat" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>
            <div className="nutrition-pie">
              <div className="pie-chart">
                <div
                  className="pie-segment protein"
                  style={{ '--value': nutritionData.protein }}
                ></div>
                <div
                  className="pie-segment carbs"
                  style={{ '--value': nutritionData.carbs }}
                ></div>
                <div
                  className="pie-segment fat"
                  style={{ '--value': nutritionData.fat }}
                ></div>
                <div className="pie-center">
                  <span>{nutritionData.protein}%</span>
                  <span>Protein</span>
                </div>
              </div>
              <div className="pie-legend">
                <div className="legend-item">
                  <span className="legend-color protein"></span>
                  <span>Protein</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color carbs"></span>
                  <span>Carbs</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color fat"></span>
                  <span>Fat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Progress with Tabs */}
        <div className="activity-progress card">
          <div className="progress-header">
            <h2>Activity Progress</h2>
            <div className="tabs">
              <button className="tab active">Weekly</button>
              <button className="tab">Monthly</button>
            </div>
          </div>
          <div className="graph-container" style={{ height: '200px' }}>
            <Bar data={activityChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;