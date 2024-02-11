import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import GradientBackground from './GradientBackground';

import axios from 'axios';

const UserScreen = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [flightData, setFlightData] = useState({});

    const makePromptRequest = async () => {
        try {
            const response = await axios.post('http://172.17.7.124:3000/prompt/get', { "userPrompt": prompt });
            return response.data;
            //console.log('API Response:', response.data.datetimes);
            // Handle response data as needed
        } catch (error) {
            console.error('API Request failed:', error);
            // Handle errors
        }
    };

    const handleSubmit = async () => {
        if (!prompt.trim()) {
            Alert.alert('Please enter a prompt.');
            return;
        }

        try {
            // Simulate backend response after some delay
            // setTimeout(() => {
            //     setPrompt();
            // }, 1000);
            // console.log(prompt);
            // sendPrompt();
            let promptResponse = await makePromptRequest();

            if (promptResponse.nlp_success) {
                let startLoc = promptResponse.locations.start;
                let endLoc = promptResponse.locations.dest;

                let dateStr = promptResponse.datetimes.dates[0].start;
                dateStr = new Date(dateStr);

                let reqMonth = `${dateStr.getMonth() + 1}`.length < 2 ? `0${dateStr.getMonth() + 1}` : `${dateStr.getMonth() + 1}`;
                let reqDay = `${dateStr.getDate()}`.length < 2 ? `0${dateStr.getDate()}` : `${dateStr.getDate()}`;

                let reqDate = `${dateStr.getFullYear()}-${reqMonth}-${reqDay}`;

                // console.log(typeof(startLoc))
                // console.log(typeof(endLoc))
                // console.log(typeof(reqDate))

                try {
                    const flightRes = await axios.post('http://172.17.7.124:3000/prices/flight-offers', { "start": startLoc, "end": endLoc, "date": reqDate });
                    //console.log('flight API response:', flightRes.data);
                    setFlightData(flightRes.data)
                } catch (error) {
                    console.error('API request failed:', error);
                    console.log(error.response.data)
                }
            }

        } catch (error) {
            console.error('Error sending prompt:', error);
        }
    };

    return (
        <GradientBackground>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                    <View style={styles.innerContainer}>
                        {flightData && flightData.flight_data_success ? (
                            <View>
                                <Text style={styles.title}>Flight Details:</Text>
                                <View style={styles.detailContainer}>
                                    <Text style={styles.detailLabel}>Airports In Order:</Text>
                                    <View style={styles.detailValueContainer}>
                                        {flightData.airportsInOrder.map((airport, index) => (
                                            <Text key={index} style={styles.detailValue}>{airport}</Text>
                                        ))}
                                    </View>
                                </View>
                                <View style={styles.detailContainer}>
                                    <Text style={styles.detailLabel}>Departure Time:</Text>
                                    <Text style={styles.detailValue}>{flightData.departureTime}</Text>
                                </View>
                                <View style={styles.detailContainer}>
                                    <Text style={styles.detailLabel}>Arrival Time:</Text>
                                    <Text style={styles.detailValue}>{flightData.arrivalTime}</Text>
                                </View>
                                <View style={styles.detailContainer}>
                                    <Text style={styles.detailLabel}>Price:</Text>
                                    <Text style={styles.detailValue}>{flightData.price}</Text>
                                </View>
                            </View>
                        ) : null}
                        {response ? <Text style={styles.response}>{response}</Text> : null}
                    </View>
                    <View style={styles.bottomContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Message..."
                            value={prompt}
                            onChangeText={setPrompt}
                            onSubmitEditing={handleSubmit}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 40,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        width: '100%',
    },
    textInput: {
        height: 50,
        width: '100%',

        backgroundColor: '#D2E5F0',
        borderRadius: 20,
        paddingHorizontal: 15,

        borderWidth: 2,
        borderColor: '#115E81',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333', // Change text color here
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailLabel: {
        fontWeight: 'bold',
        marginRight: 5,
        color: '#666', // Change text color here
    },
    detailValueContainer: {
        marginLeft: 10,
    },
    detailValue: {
        color: '#000', // Change text color here
    },
    response: {
        marginBottom: 20,
        fontSize: 16,
        //TODO: UPLOAD GOOGLE FONT, IMPLEMENT
        textAlign: 'center',
    }
});

export default UserScreen;