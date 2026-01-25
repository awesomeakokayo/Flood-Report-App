import React from 'react';

export type BottomNavItemKey = 'dashboard' | 'reports' | 'map' | 'more';

interface BottomNavProps {
  activeKey: BottomNavItemKey;
  onChange: (key: BottomNavItemKey) => void;
}

const items: { key: BottomNavItemKey; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'reports', label: 'Reports' },
  { key: 'map', label: 'Map' },
  { key: 'more', label: 'More' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeKey, onChange }) => {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={
            'bottom-nav__item' + (item.key === activeKey ? ' bottom-nav__item--active' : '')
          }
          onClick={() => onChange(item.key)}
        >
          <span className="bottom-nav__label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

