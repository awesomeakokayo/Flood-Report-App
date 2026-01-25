import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SAFETY_TIPS } from '../data/mockData';

const COLORS = {
    primary: '#003366',
    background: '#F5F5F5',
};

export default function SafetyTipsScreen() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Hero Image */}
            <View style={styles.hero}>
                <View style={styles.heroContent}>
                    <Ionicons name="umbrella" size={64} color="white" style={styles.heroIcon} />
                    <Text style={styles.heroText}>Stay Safe</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.tipsContainer}>
                    {SAFETY_TIPS.map((tip) => (
                        <View key={tip.id} style={styles.tipCard}>
                            <TouchableOpacity
                                style={styles.tipHeader}
                                onPress={() => toggleExpand(tip.id)}
                            >
                                <Text style={styles.tipTitle}>{tip.title}</Text>
                                <Ionicons
                                    name={expandedId === tip.id ? "chevron-up" : "chevron-down"}
                                    size={20}
                                    color="gray"
                                />
                            </TouchableOpacity>
                            {expandedId === tip.id && (
                                <View style={styles.tipContent}>
                                    <Text style={styles.tipText}>{tip.content}</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    hero: {
        height: 192,
        backgroundColor: COLORS.primary,
        width: '100%',
        marginBottom: 24,
    },
    heroContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroIcon: {
        opacity: 0.5,
    },
    heroText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 32,
    },
    tipsContainer: {
        gap: 16,
    },
    tipCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        marginBottom: 16,
    },
    tipHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9fafb',
    },
    tipTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1f2937',
    },
    tipContent: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    tipText: {
        color: '#6b7280',
        lineHeight: 24,
    },
});
