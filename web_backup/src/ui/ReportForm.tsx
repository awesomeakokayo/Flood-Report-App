import React from 'react';
import type { FloodReportPayload, Severity, Location } from '../types';

const cities: Location[] = [
  { city: 'Lagos', lat: 6.5244, lng: 3.3792 },
  { city: 'Ibadan', lat: 7.3775, lng: 3.947 },
  { city: 'Akure', lat: 7.2526, lng: 5.1931 },
];

const severities: Severity[] = ['Moderate', 'Warning', 'Severe'];

export const ReportForm: React.FC = () => {
  const [locationCity, setLocationCity] = React.useState<string>('Ibadan');
  const [severity, setSeverity] = React.useState<Severity>('Severe');
  const [description, setDescription] = React.useState<string>('');
  const [waterLevel, setWaterLevel] = React.useState<string>('');
  const [mediaFile, setMediaFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleMediaChange = (file: File | null) => {
    setMediaFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!locationCity) nextErrors.location = 'Location is required';
    if (!severity) nextErrors.severity = 'Severity is required';
    if (!description.trim()) nextErrors.description = 'Description is required';
    if (!waterLevel.trim() || Number.isNaN(Number(waterLevel))) {
      nextErrors.waterLevel = 'Water level (ft) is required';
    }
    if (!mediaFile) nextErrors.media = 'At least one photo is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cityLocation = cities.find((c) => c.city === locationCity) ?? cities[0];
    const payload: FloodReportPayload = {
      reporter_id: null,
      location: cityLocation,
      severity,
      description,
      water_level_ft: parseFloat(waterLevel),
      media: ['s3://example/image1.jpg'],
      timestamp: new Date().toISOString(),
    };

    // For now, just log; wire up POST /reports in real implementation.
    // eslint-disable-next-line no-console
    console.log('Submitting report payload', payload);
  };

  return (
    <form className="report-form" onSubmit={handleSubmit} aria-label="Report flood incident">
      <label className="form-field">
        <span className="form-field__label">Location</span>
        <select
          className="form-field__control"
          value={locationCity}
          onChange={(e) => setLocationCity(e.target.value)}
          aria-invalid={!!errors.location}
        >
          {cities.map((c) => (
            <option key={c.city} value={c.city}>
              {c.city}
            </option>
          ))}
        </select>
        {errors.location && <span className="form-field__error">{errors.location}</span>}
      </label>

      <label className="form-field">
        <span className="form-field__label">Severity</span>
        <select
          className="form-field__control"
          value={severity}
          onChange={(e) => setSeverity(e.target.value as Severity)}
          aria-invalid={!!errors.severity}
        >
          {severities.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.severity && <span className="form-field__error">{errors.severity}</span>}
      </label>

      <div className="form-field">
        <span className="form-field__label">Media</span>
        <div className="media-actions">
          <label className="media-button">
            Take Photo
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => handleMediaChange(e.target.files?.[0] ?? null)}
              hidden
            />
          </label>
          <label className="media-button">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleMediaChange(e.target.files?.[0] ?? null)}
              hidden
            />
          </label>
        </div>
        {previewUrl && (
          <div className="media-preview">
            <img src={previewUrl} alt={description || 'Uploaded flood photo'} />
          </div>
        )}
        {errors.media && <span className="form-field__error">{errors.media}</span>}
      </div>

      <label className="form-field">
        <span className="form-field__label">Description</span>
        <textarea
          className="form-field__control form-field__control--textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-invalid={!!errors.description}
        />
        {errors.description && <span className="form-field__error">{errors.description}</span>}
      </label>

      <label className="form-field">
        <span className="form-field__label">Water Level (ft)</span>
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          className="form-field__control"
          value={waterLevel}
          onChange={(e) => setWaterLevel(e.target.value)}
          aria-invalid={!!errors.waterLevel}
        />
        {errors.waterLevel && <span className="form-field__error">{errors.waterLevel}</span>}
      </label>

      <button type="submit" className="primary-button">
        Submit Report
      </button>
    </form>
  );
};

