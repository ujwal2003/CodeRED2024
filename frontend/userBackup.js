// UserScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import GradientBackground from './GradientBackground';

const UserScreen = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        if (!prompt.trim()) {
            Alert.alert('Please enter a prompt.');
            return;
        }

        try {
            // Simulate backend response after some delay
            setTimeout(() => {
                setResponse(`Response to "${prompt}" from backend.`);
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
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.container}>
                        {response ? <Text style={styles.response}>{response}</Text> : null}

                        <View style={styles.bottomContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Message..."
                                value={prompt}
                                onChangeText={setPrompt}
                                onSubmitEditing={handleSubmit}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    bottomContainer: {
        paddingHorizontal: 0,
        paddingBottom: 20,
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: '95%',

        //TODO: Text box design
        backgroundColor: '#D2E5F0',
        borderRadius: 20,
        paddingHorizontal: 15,

        // //TODO: Add Border
        borderWidth: 2,
        borderColor: '#115E81',

        //TODO: Margin Bottom
        marginTop: '160%'
    },
    response: {
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    }
});

export default UserScreen;