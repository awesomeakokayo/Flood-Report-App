import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { reports } from '../services/api';
// import { ALERTS } from '../data/mockData'; // Removed mock data import

const COLORS = {
    primary: '#003366',
    danger: '#D32F2F',
    warning: '#F57C00',
    safe: '#388E3C',
    info: '#1976D2',
    background: '#F5F5F5',
};

export default function FloodAlertsScreen() {
    const [activeTab, setActiveTab] = useState<'Active' | 'Past'>('Active');
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            const data = await reports.getAll();
            // Transform reports to alert format
            const mappedAlerts = data.map((report: any) => ({
                id: report.id.toString(),
                title: report.location,
                body: report.description || "No description provided",
                time: new Date(report.reported_at).toLocaleString(),
                level: report.severity.charAt(0).toUpperCase() + report.severity.slice(1), // Capitalize
                is_connected: true
            }));
            setAlerts(mappedAlerts.reverse()); // Show newest first
        } catch (error) {
            console.log("Error fetching alerts", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchReports();
        }, [])
    );

    const renderAlertItem = ({ item }: { item: any }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'warning';
        let iconColor = COLORS.danger;
        let borderColor = COLORS.danger;

        if (item.level === 'Warning') {
            iconColor = COLORS.warning;
            borderColor = COLORS.warning;
        } else if (item.level === 'Moderate') {
            iconColor = COLORS.safe;
            borderColor = COLORS.safe;
            iconName = 'leaf';
        } else if (item.level === 'Severe') {
            iconColor = COLORS.danger;
            borderColor = COLORS.danger;
        } else {
            iconColor = COLORS.info;
            borderColor = COLORS.info;
        }

        return (
            <View style={[styles.alertCard, { borderLeftColor: borderColor }]}>
                <View style={styles.alertContent}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name={iconName} size={24} color={iconColor} />
                    </View>
                    <View style={styles.alertTextContainer}>
                        <View style={styles.alertHeader}>
                            <Text style={styles.alertTitle}>{item.title}</Text>
                        </View>
                        <Text style={styles.alertBody}>{item.body}</Text>
                        <View style={styles.alertFooter}>
                            <Text style={styles.alertTime}>{item.time}</Text>
                            <View style={styles.alertActions}>
                                <Ionicons name="notifications-off-outline" size={18} color="gray" />
                                <Ionicons name="chatbubble-outline" size={18} color="gray" />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Tabs */}
            <View style={styles.tabContainer}>
                <View style={styles.tabRow}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Active' && styles.activeTab]}
                        onPress={() => setActiveTab('Active')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Active' && styles.activeTabText]}>Active Alerts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Past' && styles.pastActiveTab]}
                        onPress={() => setActiveTab('Past')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Past' && styles.pastActiveTabText]}>Past Alerts</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* List */}
            <FlatList
                data={alerts}
                renderItem={renderAlertItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />

            {/* Sticky Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.emergencyButton}>
                    <Ionicons name="call" size={20} color="white" />
                    <Text style={styles.emergencyButtonText}>Emergency Contacts</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    tabContainer: {
        backgroundColor: COLORS.primary,
        padding: 16,
        paddingBottom: 8,
    },
    tabRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 4,
        borderRadius: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: COLORS.danger,
    },
    pastActiveTab: {
        backgroundColor: 'white',
    },
    tabText: {
        fontWeight: 'bold',
        color: '#d1d5db',
    },
    activeTabText: {
        color: 'white',
    },
    pastActiveTabText: {
        color: COLORS.primary,
    },
    listContent: {
        padding: 16,
        paddingBottom: 100,
    },
    alertCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    alertContent: {
        flexDirection: 'row',
        gap: 12,
    },
    iconWrapper: {
        marginTop: 4,
    },
    alertTextContainer: {
        flex: 1,
    },
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    alertTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1f2937',
        flex: 1,
    },
    alertBody: {
        color: '#6b7280',
        marginTop: 4,
        lineHeight: 20,
    },
    alertFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    alertTime: {
        fontSize: 12,
        color: '#9ca3af',
    },
    alertActions: {
        flexDirection: 'row',
        gap: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
    emergencyButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    emergencyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
