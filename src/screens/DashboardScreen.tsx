import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
    primary: '#003366',
    danger: '#D32F2F',
    warning: '#F57C00',
    safe: '#388E3C',
    info: '#1976D2',
    background: '#F5F5F5',
};

export default function DashboardScreen() {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="menu" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Dashboard</Text>
                <TouchableOpacity>
                    <Ionicons name="notifications" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle}>Welcome, Edeh!</Text>
                    <Text style={styles.welcomeSubtitle}>Southwest Nigeria Flood Monitoring</Text>
                </View>

                {/* Status Cards */}
                <View style={styles.cardsContainer}>
                    {/* Active Alerts (Red) */}
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: COLORS.danger }]}
                        onPress={() => navigation.navigate('Reports')}
                    >
                        <View style={styles.cardLeft}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="warning" size={24} color="white" />
                            </View>
                            <Text style={styles.cardTitle}>Flood Alerts</Text>
                        </View>
                        <View style={styles.cardRight}>
                            <Text style={styles.cardNumber}>5</Text>
                            <Text style={styles.cardLabel}>Active Alerts</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Risk Level (Orange) */}
                    <View style={[styles.card, { backgroundColor: COLORS.warning }]}>
                        <View style={styles.cardLeft}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="alert-circle" size={24} color="white" />
                            </View>
                            <Text style={styles.cardTitle}>Flood Risk</Text>
                        </View>
                        <View style={styles.cardRight}>
                            <Text style={styles.cardNumberSmall}>High</Text>
                            <Text style={styles.cardLabel}>Risk</Text>
                        </View>
                    </View>

                    {/* Weather (Blue) */}
                    <View style={[styles.card, { backgroundColor: COLORS.info }]}>
                        <View style={styles.cardLeft}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="rainy" size={24} color="white" />
                            </View>
                            <Text style={styles.cardTitle}>Weather</Text>
                        </View>
                        <View style={styles.cardRight}>
                            <Text style={styles.cardLabelLarge}>Rain & Storms</Text>
                        </View>
                    </View>
                </View>

                {/* Map Preview */}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 7.3775,
                            longitude: 3.9470,
                            latitudeDelta: 1.5,
                            longitudeDelta: 1.5,
                        }}
                        liteMode={true}
                        pointerEvents="none"
                    >
                        <Marker coordinate={{ latitude: 6.5244, longitude: 3.3792 }} title="Lagos">
                            <Ionicons name="location" size={24} color={COLORS.danger} />
                        </Marker>
                        <Marker coordinate={{ latitude: 7.3775, longitude: 3.9470 }} title="Ibadan">
                            <Ionicons name="location" size={24} color={COLORS.danger} />
                        </Marker>
                        <Marker coordinate={{ latitude: 7.2571, longitude: 5.2058 }} title="Akure">
                            <Ionicons name="location" size={24} color={COLORS.danger} />
                        </Marker>
                    </MapView>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: COLORS.danger }]}
                        onPress={() => navigation.navigate('ReportIncident')}
                    >
                        <Ionicons name="add-circle" size={20} color="white" />
                        <Text style={styles.buttonText}>Report Incident</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
                        onPress={() => navigation.navigate('SafetyTips')}
                    >
                        <Ionicons name="shield-checkmark" size={20} color="white" />
                        <Text style={styles.buttonText}>Safety Tips</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 48,
        backgroundColor: COLORS.primary,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    welcomeSection: {
        marginBottom: 24,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: '#6b7280',
    },
    cardsContainer: {
        gap: 16,
        marginBottom: 24,
    },
    card: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 8,
        borderRadius: 20,
    },
    cardTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardRight: {
        alignItems: 'flex-end',
    },
    cardNumber: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardNumberSmall: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardLabel: {
        color: 'white',
        fontSize: 12,
    },
    cardLabelLarge: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    mapContainer: {
        height: 192,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 16,
        paddingBottom: 32,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
