import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { reports } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

const COLORS = {
    danger: '#D32F2F',
    warning: '#F57C00',
    safe: '#388E3C',
};

export default function LiveFloodMapScreen() {
    const { width, height } = Dimensions.get('window');
    const [showTraffic, setShowTraffic] = useState(false);
    const [incidents, setIncidents] = useState<any[]>([]);

    const fetchReports = async () => {
        try {
            const data = await reports.getAll();
            setIncidents(data);
        } catch (error) {
            console.log("Error fetching reports", error);
        }
    };

    // Refresh when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            fetchReports();
        }, [])
    );

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 7.3775,
                    longitude: 3.9470,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                showsTraffic={showTraffic}
                showsUserLocation={true}
                showsCompass={true}
            >
                {incidents.map((incident) => (
                    incident.latitude && incident.longitude && (
                        <Marker
                            key={incident.id}
                            coordinate={{
                                latitude: incident.latitude,
                                longitude: incident.longitude
                            }}
                            title={incident.location}
                            description={`${incident.severity} - ${incident.water_level}`}
                        >
                            <View style={styles.markerContainer}>
                                <Ionicons
                                    name="location"
                                    size={32}
                                    color={
                                        incident.severity?.toLowerCase() === 'severe' || incident.severity?.toLowerCase() === 'critical' ? COLORS.danger :
                                            incident.severity?.toLowerCase() === 'warning' || incident.severity?.toLowerCase() === 'moderate' ? COLORS.warning :
                                                COLORS.safe
                                    }
                                />
                            </View>
                        </Marker>
                    )
                ))}
            </MapView>

            {/* Legend Overlay */}
            <View style={styles.legend}>
                <Text style={styles.legendTitle}>Live Incidents</Text>
                <View style={styles.legendItems}>
                    <View style={styles.legendItem}>
                        <Ionicons name="location" size={14} color={COLORS.danger} />
                        <Text style={styles.legendText}>Severe</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <Ionicons name="location" size={14} color={COLORS.warning} />
                        <Text style={styles.legendText}>Warning</Text>
                    </View>
                </View>
            </View>

            {/* Floating Controls */}
            <View style={styles.controls}>
                <TouchableOpacity
                    style={[styles.controlButton, showTraffic && styles.controlButtonActive]}
                    onPress={() => setShowTraffic(!showTraffic)}
                >
                    <Ionicons name="car" size={24} color={showTraffic ? 'white' : '#555'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={fetchReports}>
                    <Ionicons name="refresh" size={24} color="#555" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    markerContainer: {
        alignItems: 'center',
    },
    legend: {
        position: 'absolute',
        top: 48,
        left: 16,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    legendTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    legendItems: {
        gap: 4,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    legendText: {
        fontSize: 12,
    },
    controls: {
        position: 'absolute',
        bottom: 96,
        right: 16,
        gap: 16,
    },
    controlButton: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    controlButtonActive: {
        backgroundColor: '#003366',
    },
});
