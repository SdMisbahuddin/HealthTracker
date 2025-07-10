import React from 'react';
import Navbar1 from '../components/navigation/Navbar1';
import '../styles/components/workout.css';
import { 
  FiTrendingUp, 
  FiClock, 
  FiHeart, 
  FiCalendar,
  FiActivity
} from 'react-icons/fi';

const Workout = ({ darkMode, toggleDarkMode }) => {
  // Sample data for workout stats
  const workoutStats = [
    {
      title: 'Steps',
      value: 8432,
      icon: <FiActivity />,
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Distance',
      value: 5.7,
      unit: 'km',
      icon: <FiTrendingUp />,
      change: '+5%',
      isPositive: true
    },
    {
      title: 'Calories',
      value: 420,
      icon: <FiHeart />,
      change: '-3%',
      isPositive: false
    },
    {
      title: 'Active Time',
      value: 45,
      unit: 'min',
      icon: <FiClock />,
      change: '+8%',
      isPositive: true
    }
  ];

  // Workout history data
  const workoutHistory = [
    { id: 1, date: '2023-05-15', type: 'running', duration: 45, distance: 5.2, calories: 420, avgHeartRate: 148 },
    { id: 2, date: '2023-05-14', type: 'cycling', duration: 60, distance: 15.8, calories: 580, avgHeartRate: 132 },
    { id: 3, date: '2023-05-12', type: 'walking', duration: 30, distance: 2.5, calories: 210, avgHeartRate: 118 },
    { id: 4, date: '2023-05-10', type: 'running', duration: 50, distance: 6.1, calories: 490, avgHeartRate: 152 },
  ];

  // Progress data for charts
  const weeklyProgress = {
    calories: [420, 580, 210, 490, 320, 380, 410],
    distance: [5.2, 15.8, 2.5, 6.1, 3.8, 4.5, 5.2],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m`;
  };

  return (
    <div className={`workout-page ${darkMode ? 'dark' : ''}`}>
      <Navbar1 showLinks={true} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="workout-container">
        <div className="workout-header">
          <h1>Workout Stats</h1>
          <p>View your fitness activities and progress</p>
        </div>

        <div className="workout-grid">
          {/* Stats Overview Section - Matching Nutrition Page Style */}
          <div className="stats-grid">
            {workoutStats.map((stat, index) => (
              <div key={index} className="health-metric card">
                <div className="metric-header">
                  <div className="metric-icon">{stat.icon}</div>
                  <h3>{stat.title}</h3>
                </div>
                <div className="metric-content">
                  <p className="metric-value">
                    {stat.value}
                    {stat.unit && <span> {stat.unit}</span>}
                  </p>
                  <div className={`metric-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Workout History Section */}
          <div className="history-card card">
            <div className="history-header">
              <h2><FiCalendar /> Recent Workouts</h2>
              <button className="view-all">View All</button>
            </div>
            <div className="history-list">
              {workoutHistory.map(workout => (
                <div key={workout.id} className="workout-item">
                  <div className="workout-date">{workout.date}</div>
                  <div className="workout-type">{workout.type}</div>
                  <div className="workout-stats">
                    <span>{formatTime(workout.duration)}</span>
                    <span>{workout.distance} km</span>
                    <span>{workout.calories} cal</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Charts Section */}
          <div className="progress-card card">
            <h2><FiTrendingUp /> Weekly Progress</h2>
            <div className="progress-chart">
              <div className="chart-container">
                <h3>Calories Burned</h3>
                <div className="chart-bars">
                  {weeklyProgress.calories.map((value, index) => (
                    <div 
                      key={index} 
                      className="chart-bar" 
                      style={{ height: `${(value / 600) * 100}%` }}
                    >
                      <span className="bar-value">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="chart-labels">
                  {weeklyProgress.days.map(day => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;