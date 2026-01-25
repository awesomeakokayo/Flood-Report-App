import React from 'react';

export const QuickActions: React.FC = () => {
  return (
    <section className="quick-actions" aria-label="Quick actions">
      <button type="button" className="quick-actions__button quick-actions__button--primary">
        Report Incident
      </button>
      <button type="button" className="quick-actions__button quick-actions__button--secondary">
        Safety Tips
      </button>
    </section>
  );
};

