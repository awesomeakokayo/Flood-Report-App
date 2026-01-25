export type Severity = 'Moderate' | 'Warning' | 'Severe';
export type AlertStatus = 'active' | 'past';

export interface Location {
  city: string;
  lat: number;
  lng: number;
}

export interface FloodReportPayload {
  reporter_id: string | null;
  location: Location;
  severity: Severity;
  description: string;
  water_level_ft: number;
  media: string[];
  timestamp: string;
}

export interface Alert {
  id: string;
  title: string;
  severity: Severity;
  location: Location;
  summary: string;
  timestamp: string;
  status: AlertStatus;
}

export interface HeatmapPoint {
  risk: 'Low' | 'Medium' | 'High';
  lat: number;
  lng: number;
}

export interface MapMarker {
  id: string;
  location: Location;
  severity?: Severity;
}

