import React from 'react';
import { AlertsScreen } from './AlertsScreen';
import { ReportIncidentScreen } from './ReportIncidentScreen';

type ReportsTab = 'alerts' | 'report';

export const ReportsScreen: React.FC = () => {
  const [active, setActive] = React.useState<ReportsTab>('alerts');

  return (
    <div className="screen screen--reports">
      <header className="screen-header">
        <h1 className="screen-header__title">Reports</h1>
      </header>
      <div className="tabs tabs--reports" role="tablist" aria-label="Reports">
        <button
          type="button"
          role="tab"
          aria-selected={active === 'alerts'}
          className={'tab' + (active === 'alerts' ? ' tab--active' : '')}
          onClick={() => setActive('alerts')}
        >
          Flood Alerts
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={active === 'report'}
          className={'tab' + (active === 'report' ? ' tab--active' : '')}
          onClick={() => setActive('report')}
        >
          Report Incident
        </button>
      </div>
      {active === 'alerts' ? <AlertsScreen /> : <ReportIncidentScreen />}
    </div>
  );
};

