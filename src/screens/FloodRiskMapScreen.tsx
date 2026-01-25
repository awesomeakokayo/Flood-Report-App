import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import { CURRENT_RISK } from '../data/mockData';

const COLORS = {
    danger: '#D32F2F',
    warning: '#F57C00',
    safe: '#388E3C',
};

export default function FloodRiskMapScreen() {
    const { width, height } = Dimensions.get('window');

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 7.3,
                    longitude: 3.9,
                    latitudeDelta: 2.5,
                    longitudeDelta: 2.5,
                }}
            >
                {/* High Risk Zone (Red) - Lagos Area */}
                <Circle
                    center={{ latitude: 6.5244, longitude: 3.3792 }}
                    radius={30000}
                    fillColor="rgba(211, 47, 47, 0.4)"
                    strokeColor="rgba(211, 47, 47, 0.8)"
                />

                {/* Medium Risk Zone (Orange) - Ibadan Area */}
                <Circle
                    center={{ latitude: 7.3775, longitude: 3.9470 }}
                    radius={25000}
                    fillColor="rgba(245, 124, 0, 0.4)"
                    strokeColor="rgba(245, 124, 0, 0.8)"
                />

                {/* Low Risk Zone (Green) - Akure Area */}
                <Circle
                    center={{ latitude: 7.2571, longitude: 5.2058 }}
                    radius={25000}
                    fillColor="rgba(56, 142, 60, 0.4)"
                    strokeColor="rgba(56, 142, 60, 0.8)"
                />
            </MapView>

            {/* Legend Overlay */}
            <View style={styles.legend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLORS.danger }]} />
                    <Text style={styles.legendText}>High Risk</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLORS.warning }]} />
                    <Text style={styles.legendText}>Medium Risk</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLORS.safe }]} />
                    <Text style={styles.legendText}>Low Risk</Text>
                </View>
            </View>

            {/* Bottom Sheet Info */}
            <View style={styles.bottomSheet}>
                <Text style={styles.bottomSheetLabel}>Current Risk Level</Text>
                <Text style={styles.bottomSheetRisk}>{CURRENT_RISK.level} Risk</Text>
                <View style={styles.divider} />
                <Text style={styles.bottomSheetAdvice}>{CURRENT_RISK.advice}</Text>
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
    legend: {
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 8,
        borderRadius: 8,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    bottomSheetLabel: {
        color: '#6b7280',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    bottomSheetRisk: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.danger,
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        width: '100%',
        marginVertical: 8,
    },
    bottomSheetAdvice: {
        color: '#6b7280',
        lineHeight: 20,
    },
});
