import React from 'react';

const StatusCard: React.FC<{
  title: string;
  value: string;
  subtitle?: string;
  variant: 'alerts' | 'risk' | 'weather';
}> = ({ title, value, subtitle, variant }) => {
  return (
    <article className={`status-card status-card--${variant}`}>
      <h2 className="status-card__title">{title}</h2>
      <p className="status-card__value">{value}</p>
      {subtitle && <p className="status-card__subtitle">{subtitle}</p>}
    </article>
  );
};

export const StatusCardsRow: React.FC = () => {
  // Static mock values for now; replace with API data wiring.
  return (
    <section className="status-cards" aria-label="Status overview">
      <StatusCard title="Flood Alerts" value="2 Active" variant="alerts" />
      <StatusCard title="Flood Risk" value="High" subtitle="Ibadan region" variant="risk" />
      <StatusCard title="Weather" value="Rain & Storms" variant="weather" />
    </section>
  );
};

