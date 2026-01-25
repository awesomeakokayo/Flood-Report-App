import React from 'react';
import { ReportForm } from '../ui/ReportForm';

export const ReportIncidentScreen: React.FC = () => {
  return (
    <div className="screen screen--report-incident">
      <header className="screen-header">
        <h1 className="screen-header__title">Report Flood Incident</h1>
      </header>
      <ReportForm />
    </div>
  );
};

