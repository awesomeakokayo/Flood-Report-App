import React from 'react';
import type { Alert } from '../types';

interface AlertsListProps {
  alerts: Alert[];
}

export const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  return (
    <section className="alerts-list" aria-label="Flood alerts list">
      {alerts.map((alert) => (
        <article key={alert.id} className="alert-item">
          <div className={`alert-item__severity alert-item__severity--${alert.severity.toLowerCase()}`}>
            {alert.severity}
          </div>
          <div className="alert-item__content">
            <h2 className="alert-item__title">{alert.title}</h2>
            <p className="alert-item__summary">{alert.summary}</p>
            <div className="alert-item__meta">
              <span className="alert-item__timestamp">{new Date(alert.timestamp).toLocaleString()}</span>
              <span className="alert-item__location">{alert.location.city}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

