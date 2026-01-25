import React from 'react';

interface Section {
  id: string;
  title: string;
  content: string;
}

const sections: Section[] = [
  {
    id: 'during-flood',
    title: 'During a Flood',
    content: 'Move to higher ground immediately and avoid walking or driving through flood water.',
  },
  {
    id: 'evacuation-tips',
    title: 'Evacuation Tips',
    content: 'Follow local authority guidance, carry essential documents, and inform family members.',
  },
  {
    id: 'emergency-contacts',
    title: 'Emergency Contacts',
    content: 'Call national emergency numbers or local agencies listed on the alerts screen.',
  },
];

export const SafetyTips: React.FC = () => {
  const [openId, setOpenId] = React.useState<string>('during-flood');

  return (
    <section className="safety-tips" aria-label="Safety tips">
      <div className="safety-tips__hero" aria-hidden="true" />
      <div className="accordion" role="presentation">
        {sections.map((section) => {
          const isOpen = section.id === openId;
          return (
            <div key={section.id} className="accordion__item">
              <button
                type="button"
                className="accordion__header"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? '' : section.id)}
              >
                {section.title}
              </button>
              {isOpen && <div className="accordion__panel">{section.content}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

