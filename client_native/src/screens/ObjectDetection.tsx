import React, { useState } from "react";
import { View, Linking, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import {
    Layout,
    Button,
    TopNav,
    Section,
    SectionContent,
    useTheme,
    themeColor,
  } from "react-native-rapi-ui";


const ObjectDetection = () => {
    const [imageUri, setImageUri] = useState(null);
    const [labels, setLabels] = useState([]);
    const { isDarkmode, setTheme } = useTheme();

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
            console.log(result);
        } catch (error) {
            console.error('Error picking Image: ', error);
        }
    };

    const analyzeImage = async () => {
        try {
            if (!imageUri) {
                alert('Select an image');
                return;
            }

            const apiKey = "AIzaSyCerq7huPOqxVT95gbSHEzNxyQLVs521x0";
            const apiURL = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCerq7huPOqxVT95gbSHEzNxyQLVs521x0';

            const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const requestData = {
                requests: [
                    {
                        image: {
                            content: base64ImageData,
                        },
                        features: [{ type: 'LABEL_DETECTION', maxResults: 1}],
                    },
                ],
            };

            const apiResponse = await axios.post(apiURL, requestData);
            setLabels(apiResponse.data.responses[0].labelAnnotations);
        } catch (error) {
            console.error('error', error);
            alert('error');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Push to detect
            </Text>
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 300, height: 300 }}
                />
            )}
            <TouchableOpacity
                onPress={pickImage}
                style={styles.button}                        
            >
                <Text style={styles.text}>
                    Choose...
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={analyzeImage}
                style={styles.button}                        
            >
                <Text style={styles.text}>
                    Analyze
                </Text>
            </TouchableOpacity>
            {
                labels.length > 0 && (
                    <View>
                        <Text style={styles.label}>
                            Labels:
                        </Text>
                        {
                            labels.map((label) => (
                                <Text
                                    key={label.mid}
                                    style={styles.outputtext}
                                >
                                    {label.description}
                                </Text>
                            ))
                        }
                    </View>
                )
            }
        </View>
    )
}

export default ObjectDetection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 100,
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10,
        marginTop: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    outputtext: {
        fontSize: 20,
        marginBottom: 10,
    },

});
