import React from 'react';
import { HeatmapView } from '../ui/HeatmapView';
import { LiveMapView } from '../ui/LiveMapView';
import { mockHeatmapPoints, mockIncidents } from '../stub/mockMaps';

type MapTab = 'risk' | 'live';

export const MapScreen: React.FC = () => {
  const [tab, setTab] = React.useState<MapTab>('risk');
  const [showTraffic, setShowTraffic] = React.useState<boolean>(false);

  return (
    <div className="screen screen--map">
      <header className="screen-header">
        <h1 className="screen-header__title">Map</h1>
      </header>
      <div className="tabs tabs--map" role="tablist" aria-label="Maps">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'risk'}
          className={'tab' + (tab === 'risk' ? ' tab--active' : '')}
          onClick={() => setTab('risk')}
        >
          Flood Risk Map
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'live'}
          className={'tab' + (tab === 'live' ? ' tab--active' : '')}
          onClick={() => setTab('live')}
        >
          Live Flood Map
        </button>
      </div>
      {tab === 'risk' ? (
        <HeatmapView
          points={mockHeatmapPoints}
          legend={{ lowLabel: 'Low', mediumLabel: 'Medium', highLabel: 'High' }}
        />
      ) : (
        <LiveMapView
          incidents={mockIncidents}
          showTraffic={showTraffic}
          onToggleTraffic={setShowTraffic}
        />
      )}
    </div>
  );
};

