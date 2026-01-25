import React from 'react';
import type { HeatmapPoint } from '../types';

interface HeatmapViewProps {
  points: HeatmapPoint[];
  legend: {
    lowLabel: string;
    mediumLabel: string;
    highLabel: string;
  };
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({ points, legend }) => {
  return (
    <section className="heatmap-view" aria-label="Flood risk heatmap">
      <div className="heatmap-view__map">
        {/* Visual placeholder – integrate real heatmap layer here. */}
        {points.map((p, idx) => (
          <div key={idx} className={`heatmap-point heatmap-point--${p.risk.toLowerCase()}`} />
        ))}
      </div>
      <div className="heatmap-view__legend">
        <span className="legend-item legend-item--low">{legend.lowLabel}</span>
        <span className="legend-item legend-item--medium">{legend.mediumLabel}</span>
        <span className="legend-item legend-item--high">{legend.highLabel}</span>
      </div>
      <div className="heatmap-view__summary">
        <h2 className="heatmap-view__summary-title">Overall Risk</h2>
        <p className="heatmap-view__summary-text">High flood risk in Ibadan. Avoid low-lying areas.</p>
      </div>
    </section>
  );
};

