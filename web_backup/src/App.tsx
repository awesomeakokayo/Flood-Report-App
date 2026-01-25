import React from 'react';
import './style.css';

import { DashboardScreen } from './screens/DashboardScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { MapScreen } from './screens/MapScreen';
import { MoreScreen } from './screens/MoreScreen';
import { BottomNav } from './components/BottomNav';
import type { BottomNavItemKey } from './components/BottomNav';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<BottomNavItemKey>('dashboard');

  return (
    <div className="app-root">
      <main className="app-main">
        {activeTab === 'dashboard' && <DashboardScreen />}
        {activeTab === 'reports' && <ReportsScreen />}
        {activeTab === 'map' && <MapScreen />}
        {activeTab === 'more' && <MoreScreen />}
      </main>
      <BottomNav activeKey={activeTab} onChange={setActiveTab} />
    </div>
  );
};

