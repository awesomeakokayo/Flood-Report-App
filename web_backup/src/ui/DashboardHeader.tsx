import React from 'react';

export const DashboardHeader: React.FC = () => {
  // TODO: Replace hard-coded name with real user data if available.
  return (
    <header className="dashboard-header">
      <p className="dashboard-header__greeting">Welcome, Ade!</p>
      <h1 className="dashboard-header__title">Flood Monitoring</h1>
    </header>
  );
};

