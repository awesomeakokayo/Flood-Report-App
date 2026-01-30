import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
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
    const [media, setMedia] = useState<ImagePicker.ImagePickerAsset | null>(null);

    const pickMedia = async (useCamera: boolean) => {
        const permissionResult = useCamera
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Denied", `You need to allow ${useCamera ? 'camera' : 'gallery'} access to upload media.`);
            return;
        }

        const result = useCamera
            ? await ImagePicker.launchCameraAsync({
                mediaTypes: ['images', 'videos'],
                quality: 0.8,
            })
            : await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images', 'videos'],
                quality: 0.8,
            });

        if (!result.canceled) {
            setMedia(result.assets[0]);
        }
    };

    const handleSubmit = async () => {
        if (!location || !severity || !waterLevel) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        if (!media) {
            Alert.alert("Media Required", "Please upload a photo or video of the flood for AI verification.");
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

            const formData = new FormData();
            formData.append('location', location);
            formData.append('severity', severity);
            formData.append('water_level', waterLevel);
            formData.append('description', description);
            formData.append('latitude', latitude.toString());
            formData.append('longitude', longitude.toString());

            if (media) {
                const uri = media.uri;
                const uriParts = uri.split('.');
                const fileType = uriParts[uriParts.length - 1];

                // Determine mime type
                let type = media.type === 'video' ? `video/${fileType}` : `image/${fileType}`;
                if (fileType === 'jpg') type = 'image/jpeg';

                // @ts-ignore
                formData.append('image', {
                    uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
                    name: `upload.${fileType}`,
                    type: type,
                });
            }

            await reports.create(formData);
            Alert.alert("Report Submitted", "Thank you for reporting. Stay safe!");
            navigation.goBack();
        } catch (error: any) {
            console.error(error);
            const errorDetail = error.response?.data?.detail || "Could not submit report. Please try again.";
            Alert.alert("Submission Failed", errorDetail);
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
                    <TouchableOpacity
                        style={styles.mediaButton}
                        onPress={() => pickMedia(true)}
                    >
                        <Ionicons name="camera" size={20} color="white" />
                        <Text style={styles.mediaButtonText}>Take Photo/Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.mediaButton}
                        onPress={() => pickMedia(false)}
                    >
                        <Ionicons name="images" size={20} color="white" />
                        <Text style={styles.mediaButtonText}>Upload Media</Text>
                    </TouchableOpacity>
                </View>

                {media && (
                    <View style={styles.previewContainer}>
                        <Ionicons
                            name={media.type === 'video' ? "videocam" : "image"}
                            size={24}
                            color={COLORS.primary}
                        />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.previewText} numberOfLines={1}>
                                {media.type === 'video' ? 'Video' : 'Image Selected'}
                            </Text>
                            <Text style={{ fontSize: 10, color: 'gray' }}>
                                Ready for AI verification
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => setMedia(null)}>
                            <Ionicons name="close-circle" size={24} color="#EF4444" />
                        </TouchableOpacity>
                    </View>
                )}

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
        marginVertical: 4,
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
    previewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
    },
    previewText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
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
