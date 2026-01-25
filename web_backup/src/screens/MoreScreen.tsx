import React from 'react';
import { SafetyTips } from '../ui/SafetyTips';

export const MoreScreen: React.FC = () => {
  return (
    <div className="screen screen--more">
      <header className="screen-header">
        <h1 className="screen-header__title">Safety Tips</h1>
      </header>
      <SafetyTips />
    </div>
  );
};

