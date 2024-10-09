// frontend/src/pages/Dashboard.tsx
import React from 'react';
import { useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  // Vous pouvez ajouter des sélecteurs pour obtenir plus d'informations utilisateur si nécessaire

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard.</p>

      <div className="dashboard-actions">
        <Link to="/create-event">Create event</Link>
        <Link to="/my-events">My events</Link>
        {/* Ajoutez d'autres actions selon les besoins */}
      </div>
    </div>
  );
};

export default Dashboard;