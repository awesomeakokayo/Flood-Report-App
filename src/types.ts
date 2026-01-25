export interface FloodAlert {
    id: string;
    location: string;
    level: 'Severe' | 'Warning' | 'Moderate' | 'Low';
    title: string;
    body: string;
    time: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
}

export interface RiskLevel {
    level: 'Low' | 'Medium' | 'High';
    advice: string;
}

export interface SafetyTip {
    id: string;
    title: string;
    content: string;
}

export interface Report {
    id: string;
    location: string;
    severity: string;
    description: string;
    waterLevel: string;
    imageUri: string | null;
}
