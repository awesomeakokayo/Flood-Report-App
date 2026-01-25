import React from 'react';
import { AlertsList } from '../ui/AlertsList';
import { mockAlerts } from '../stub/mockAlerts';

export const AlertsScreen: React.FC = () => {
  const [status, setStatus] = React.useState<'active' | 'past'>('active');

  const alerts = React.useMemo(
    () => mockAlerts.filter((a) => a.status === status).sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    [status],
  );

  return (
    <div className="alerts-screen">
      <div className="tabs tabs--alerts" role="tablist" aria-label="Flood alerts">
        <button
          type="button"
          role="tab"
          aria-selected={status === 'active'}
          className={'tab' + (status === 'active' ? ' tab--active' : '')}
          onClick={() => setStatus('active')}
        >
          Active Alerts
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={status === 'past'}
          className={'tab' + (status === 'past' ? ' tab--active' : '')}
          onClick={() => setStatus('past')}
        >
          Past Alerts
        </button>
      </div>
      <AlertsList alerts={alerts} />
      <button type="button" className="emergency-contacts-button">
        Emergency Contacts
      </button>
    </div>
  );
};

