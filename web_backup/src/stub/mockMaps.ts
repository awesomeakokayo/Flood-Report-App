import type { HeatmapPoint, MapMarker } from '../types';

export const mockHeatmapPoints: HeatmapPoint[] = [
  { risk: 'High', lat: 7.3775, lng: 3.947 },
  { risk: 'Medium', lat: 6.5244, lng: 3.3792 },
  { risk: 'Low', lat: 7.2526, lng: 5.1931 },
];

export const mockIncidents: MapMarker[] = [
  {
    id: 'i1',
    location: { city: 'Ibadan', lat: 7.3775, lng: 3.947 },
    severity: 'Severe',
  },
  {
    id: 'i2',
    location: { city: 'Lagos', lat: 6.5244, lng: 3.3792 },
    severity: 'Moderate',
  },
  {
    id: 'i3',
    location: { city: 'Akure', lat: 7.2526, lng: 5.1931 },
    severity: 'Warning',
  },
];

