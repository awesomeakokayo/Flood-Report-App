import React from 'react';
import { DashboardHeader } from '../ui/DashboardHeader';
import { StatusCardsRow } from '../ui/StatusCardsRow';
import { MapPreview } from '../ui/MapPreview';
import { QuickActions } from '../ui/QuickActions';

export const DashboardScreen: React.FC = () => {
  return (
    <div className="screen screen--dashboard">
      <DashboardHeader />
      <StatusCardsRow />
      <MapPreview />
      <QuickActions />
    </div>
  );
};

