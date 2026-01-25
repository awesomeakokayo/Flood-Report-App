import type { Alert } from '../types';

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    title: 'Severe Flooding in Ibadan',
    severity: 'Severe',
    location: { city: 'Ibadan', lat: 7.3775, lng: 3.947 },
    summary: 'Heavy flooding in several areas',
    timestamp: '2026-01-12T09:00:00Z',
    status: 'active',
  },
  {
    id: 'a2',
    title: 'Moderate Flooding in Lagos',
    severity: 'Moderate',
    location: { city: 'Lagos', lat: 6.5244, lng: 3.3792 },
    summary: 'Localized flooding in low-lying zones',
    timestamp: '2026-01-12T08:30:00Z',
    status: 'active',
  },
  {
    id: 'a3',
    title: 'Severe Flooding in Akure (Clearing)',
    severity: 'Severe',
    location: { city: 'Akure', lat: 7.2526, lng: 5.1931 },
    summary: 'Water levels receding after overnight rains',
    timestamp: '2026-01-10T18:00:00Z',
    status: 'past',
  },
];

