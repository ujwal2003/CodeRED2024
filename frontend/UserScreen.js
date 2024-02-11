import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import GradientBackground from './GradientBackground';

import axios from 'axios';

const UserScreen = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    async function sendPrompt(){
        const res = await axios.post("prompt/get/", {"userPromp": prompt})

        const data = await res.data;

        console.log(data);
        return data;
    }

    const handleSubmit = async () => {
        if (!prompt.trim()) {
            Alert.alert('Please enter a prompt.');
            return;
        }

        try {
            // Simulate backend response after some delay
            setTimeout(() => {
                setPrompt();
            }, 1000);
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
    response: {
        marginBottom: 20,
        fontSize: 16,
        //TODO: UPLOAD GOOGLE FONT, IMPLEMENT
        textAlign: 'center',
    }
});

export default UserScreen;
