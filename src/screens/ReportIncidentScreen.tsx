import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { reports } from '../services/api';

const COLORS = {
    primary: '#003366',
    background: '#F5F5F5',
};

export default function ReportIncidentScreen() {
    const navigation = useNavigation();
    const [location, setLocation] = useState('Ibadan');
    const [severity, setSeverity] = useState('Severe');
    const [description, setDescription] = useState('');
    const [waterLevel, setWaterLevel] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!location || !severity || !waterLevel) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            // Geocode the location string
            const geocodedLocation = await Location.geocodeAsync(location);

            if (!geocodedLocation || geocodedLocation.length === 0) {
                Alert.alert("Location Not Found", "Could not find coordinates for this location. Please be more specific (e.g., 'Bodija, Ibadan').");
                setLoading(false);
                return;
            }

            const { latitude, longitude } = geocodedLocation[0];

            await reports.create({
                location,
                severity,
                water_level: waterLevel,
                description,
                latitude,
                longitude,
            });
            Alert.alert("Report Submitted", "Thank you for reporting. Stay safe!");
            navigation.goBack();
        } catch (error: any) {
            console.error(error);
            Alert.alert("Submission Failed", "Could not submit report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.formContainer}>
                {/* Location */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        value={location}
                        onChangeText={setLocation}
                        placeholder="Enter area (e.g. Ring Road, Ibadan)"
                    />
                    <Text style={{ fontSize: 12, color: 'gray', marginTop: 4 }}>
                        We will automatically detect the map coordinates for this location.
                    </Text>
                </View>

                {/* Flood Severity */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Flood Severity</Text>
                    <TextInput
                        style={styles.input}
                        value={severity}
                        onChangeText={setSeverity}
                        placeholder="e.g. Severe, Moderate"
                    />
                </View>

                {/* Media Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.mediaButton}>
                        <Ionicons name="camera" size={20} color="white" />
                        <Text style={styles.mediaButtonText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mediaButton}>
                        <Ionicons name="images" size={20} color="white" />
                        <Text style={styles.mediaButtonText}>Upload Photo</Text>
                    </TouchableOpacity>
                </View>

                {/* Description */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.textArea}
                        multiline
                        placeholder="Major flooding on main road."
                        value={description}
                        onChangeText={setDescription}
                        textAlignVertical="top"
                    />
                </View>

                {/* Water Level */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Water Level</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="2.5 ft"
                        value={waterLevel}
                        onChangeText={setWaterLevel}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit Report</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    formContainer: {
        gap: 16,
    },
    fieldContainer: {
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 4,
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#1f2937',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 16,
        marginVertical: 8,
    },
    mediaButton: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    mediaButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    textArea: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        height: 96,
        textAlignVertical: 'top',
        fontSize: 16,
        color: '#1f2937',
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 32,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
