import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import GradientBackground from './GradientBackground';
import { useFonts } from 'expo-font';

import axios from 'axios';

const UserScreen = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [flightData, setFlightData] = useState({});
    const [loading, setLoading] = useState(false);
    const [promptSubmitted, setPromptSubmitted] = useState(false);

    const makePromptRequest = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://172.17.68.108:3000/prompt/get', { "userPrompt": prompt });
            setLoading(false);
            return response.data;

            //console.log('API Response:', response.data.datetimes);
            // Handle response data as needed
        } catch (error) {
            setLoading(false);
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
            setLoading(true);
            setPromptSubmitted(true);

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
                    const flightRes = await axios.post('http://172.17.68.108:3000/prices/flight-offers', { "start": startLoc, "end": endLoc, "date": reqDate });
                    //console.log('flight API response:', flightRes.data);
                    setFlightData(flightRes.data);
                    setResponse('Thank You for Using ChatAIr!');
                    setLoading(false);
                } catch (error) {
                    console.error('API request failed:', error);
                    console.log(error.response.data);
                    setResponse('Error');
                    setLoading(false);
                }
            }

        } catch (error) {
            console.error('Error sending prompt:', error);
            setResponse(''); // Reset response state
        } finally {
            setLoading(false); // Set loading to false after request is complete
        }
    };

    const [loaded] = useFonts({
        'MyFontName': require('./assets/fonts/Sen-Regular.ttf'),
    })

    return (
        <GradientBackground>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                    <View style={styles.innerContainer}>
                        {(loading || (!response && promptSubmitted)) && (
                            <ActivityIndicator size="large" color="#FFFFFF" />
                        )}

                        {!loading && flightData.flight_data_success && (
                            <View>
                                <Text style={styles.title}>chatAIr</Text>
                                <View style={styles.detailContainer}>
                                    {/* <Text style={styles.detailValue}>
                                        {`The cheapest flight for that route is $${flightData.price}, your trip will begin on
                                         ${flightData.departureTime} and end on ${flightData.arrivalTime}`}
                                    </Text> */}
                                </View>
                                <View style={styles.detailContainer}>
                                    <Text style={styles.detailValue} numberOfLines={2}>Order of Airports: </Text>
                                    <View style={styles.detailValueContainer}>
                                        {flightData.airportsInOrder.map((airport, index) => (
                                            <Text key={index} style={styles.detailValue}>{airport}</Text>
                                        ))}
                                    </View>
                                </View>
                                <View style={styles.detailContainer}>
                                    <Text style={styles.detailValue}>The cheapest flight found is ${flightData.price}</Text>
                                </View>
                                <View style={styles.detailContainer}>
                                    <Text style={styles.detailValue}>Departure time would be at: {flightData.departureTime}</Text>
                                </View>
                                <View style={styles.detailContainer}>
                                    <Text style={styles.detailValue}>Arrival time would be at: {flightData.arrivalTime}</Text>
                                </View>
                            </View>
                        )}
                        {!loading && response ? <Text style={styles.response}>{response}</Text> : null}
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
        fontFamily: 'MyFontName',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
        bottom: 250,
        textAlign: 'center'
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailLabel: {
        fontWeight: 'bold',
        marginRight: 5,
        color: '#FFFFFF', // Change text color here
    },
    detailValueContainer: {
        //fontFamily: 'MyFontName',
        marginLeft: 10,
    },
    detailValue: {
        fontFamily: 'MyFontName',
        color: '#FFFFFF', // Change text color here
        textAlign: 'left',
        bottom: 200
    },
    response: {
        marginBottom: 20,
        fontSize: 16,
        //TODO: UPLOAD GOOGLE FONT, IMPLEMENT
        textAlign: 'center',
    }
});

export default UserScreen;