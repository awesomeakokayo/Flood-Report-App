import { FloodAlert, RiskLevel, SafetyTip } from '../types';

export const ALERTS: FloodAlert[] = [
    {
        id: '1',
        location: 'Ibadan',
        level: 'Severe',
        title: 'Severe Flooding in Ibadan',
        body: 'Heavy flooding in several areas.',
        time: '15 mins ago',
        coordinates: { latitude: 7.3775, longitude: 3.9470 }
    },
    {
        id: '2',
        location: 'Abeokuta',
        level: 'Warning',
        title: 'Warning: Flooding in Abeokuta',
        body: 'Rising water levels in the city.',
        time: '15 mins ago',
        coordinates: { latitude: 7.1475, longitude: 3.3619 }
    },
    {
        id: '3',
        location: 'Akure',
        level: 'Moderate',
        title: 'Moderate Flood Risk in Akure',
        body: 'Possible flooding expected.',
        time: '1 hour ago',
        coordinates: { latitude: 7.2571, longitude: 5.2058 }
    }
];

export const CURRENT_RISK: RiskLevel = {
    level: 'High',
    advice: 'Stay alert and avoid flood-prone areas.'
};

export const SAFETY_TIPS: SafetyTip[] = [
    {
        id: '1',
        title: 'During a Flood',
        content: 'Move to higher ground immediately. Do not walk or drive through moving water. If trapped, call for emergency assistance.'
    },
    {
        id: '2',
        title: 'Evacuation Tips',
        content: 'Pack essential items (medications, documents, water). Turn off gas, electricity, and water. Follow designated evacuation routes.'
    },
    {
        id: '3',
        title: 'Emergency Contacts',
        content: 'National Emergency: 112\nFire Service: 119\nRed Cross: +234...'
    }
];
