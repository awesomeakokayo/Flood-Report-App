import React from 'react';

export const MapPreview: React.FC = () => {
  // NOTE: This is a visual placeholder; integrate real map provider per design.
  return (
    <section className="map-preview" aria-label="Map preview for Lagos, Ibadan, and Akure">
      <div className="map-preview__map">
        <div className="map-preview__marker">Lagos</div>
        <div className="map-preview__marker">Ibadan</div>
        <div className="map-preview__marker">Akure</div>
      </div>
    </section>
  );
};

