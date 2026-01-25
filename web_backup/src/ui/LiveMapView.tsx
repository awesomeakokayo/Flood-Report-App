import React from 'react';
import type { MapMarker } from '../types';

interface LiveMapViewProps {
  incidents: MapMarker[];
  showTraffic: boolean;
  onToggleTraffic: (value: boolean) => void;
}

export const LiveMapView: React.FC<LiveMapViewProps> = ({
  incidents,
  showTraffic,
  onToggleTraffic,
}) => {
  return (
    <section className="live-map-view" aria-label="Live flood map">
      <div className="live-map-view__controls">
        <label className="traffic-toggle">
          <input
            type="checkbox"
            checked={showTraffic}
            onChange={(e) => onToggleTraffic(e.target.checked)}
          />
          <span>Traffic</span>
        </label>
      </div>
      <div className="live-map-view__map">
        {/* Visual placeholder – integrate real interactive map here. */}
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`live-map-view__pin live-map-view__pin--${
              incident.severity?.toLowerCase() ?? 'moderate'
            }`}
          >
            {incident.location.city}
          </div>
        ))}
      </div>
      <div className="live-map-view__legend">
        <span className="legend-item legend-item--high">Red pins = Severe</span>
        <span className="legend-item legend-item--medium">Amber pins = Warning</span>
        <span className="legend-item legend-item--low">Yellow pins = Moderate</span>
      </div>
    </section>
  );
};

