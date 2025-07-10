import React, { useState } from 'react';
import Navbar from '../components/navigation/Navbar1';
import '../styles/components/goals.css';
import { FiTarget, FiZap, FiClock,} from 'react-icons/fi'; // Removed FiFlame, added FiActivity

const initialGoals = [
  { id: 1, type: 'active', name: 'Daily Steps', icon: <FiTarget />, progress: 8546, target: 10000, unit: 'steps', remaining: 15 },
  { id: 2, type: 'active', name: 'Calorie Burn', icon: <FiZap />, progress: 2100, target: 2500, unit: 'kcal', remaining: 16 }, // Changed FiFlame to FiZap
  { id: 3, type: 'active', name: 'Weekly Workouts', icon: <FiZap />, progress: 3, target: 5, unit: 'sessions', remaining: 40 },
  { id: 4, type: 'completed', name: 'Weight Target', icon: <FiTarget />, progress: 72, target: 70, unit: 'kg', points: 50 },
  { id: 5, type: 'active', name: 'Sleep Target', icon: <FiClock />, progress: 7, target: 8, unit: 'hours', remaining: 13 },
];

const Goals = ({ darkMode, toggleDarkMode }) => {
  const [goals, setGoals] = useState(initialGoals);
  const [activeTab, setActiveTab] = useState('active');
  const [newGoal, setNewGoal] = useState({ name: '', target: '', unit: '' });

  const displayedGoals = goals.filter((goal) => goal.type === activeTab);

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.unit) {
      const newId = goals.length + 1;
      setGoals([
        ...goals,
        {
          id: newId,
          type: 'active',
          name: newGoal.name,
          icon: <FiTarget />,
          progress: 0,
          target: parseInt(newGoal.target),
          unit: newGoal.unit,
          remaining: 100,
        },
      ]);
      setNewGoal({ name: '', target: '', unit: '' });
    }
  };

  return (
    <div className={`goals-page ${darkMode ? 'dark' : ''}`}>
      <Navbar showLinks={true} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="goals-container">
        <div className="goals-header">
          <h1 className="goals-title">Goals</h1>
          <p className="goals-subtitle">Set targets and track your progress</p>
        </div>

        <div className="goals-tabs">
          <button
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Goals
          </button>
          <button
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
         
        </div>

        <div className="goals-grid">
          {displayedGoals.map((goal) => (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                {goal.icon}
                <h3>{goal.name}</h3>
              </div>
              <div className="goal-content">
                <p className="goal-progress">Progress</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                  ></div>
                </div>
                <p className="goal-stats">
                  {goal.progress} / {goal.target} {goal.unit}
                </p>
                {goal.type === 'active' ? (
                  <p className="goal-remaining">{goal.remaining}% remaining</p>
                ) : (
                  <p className="goal-points">
                    Goal achieved! <span className="points">+{goal.points} points</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {activeTab === 'active' && (
          <div className="add-goal-form">
            <h2>Add New Goal</h2>
            <input
              type="text"
              placeholder="Goal Name"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Target"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            />
            <input
              type="text"
              placeholder="Unit (e.g., steps, kcal, hours)"
              value={newGoal.unit}
              onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
            />
            <button onClick={handleAddGoal}>Add Goal</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;