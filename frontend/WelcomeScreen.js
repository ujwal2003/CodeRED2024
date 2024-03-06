// WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native';
import GradientBackground from './GradientBackground';
import { useFonts } from 'expo-font';

const WelcomeScreen = ({ navigation }) => {
    const handlePress = () => {
        navigation.navigate('User');
    };

    const [loaded] = useFonts({
        'MyFontName': require('./assets/fonts/Sen-Regular.ttf'),
        'MyBold': require('./assets/fonts/Sen-Bold.ttf')
    })

    return (
        <ImageBackground source={require('./assets/Background.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.infoBox}>
                    <Image source = {require('./assets/blueLogo.png')}
                    style = {styles.imageInfo}/>

                    <Text style = {styles.appText}>chatAIr</Text>

                    <Text style={styles.infoText}>
                        Uncover <Text style={styles.boldText}>budget-friendly</Text> flights with a
                        <Text style={styles.boldText}> simple</Text> chat.
                    </Text>
                </View>
                <TouchableOpacity style={styles.touchable} onPress={handlePress}>
                    <Text style={styles.text}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    touchable: {
        padding: 18,
        bottom: -120,
        backgroundColor: '#90BE6D',
        borderRadius: 10,
        width: '45%',

        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
    },
    infoBox: {
        position: 'absolute',
        bottom: 220,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F5E6',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 180,
        paddingBottom: 105,
    },
    infoText: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: 'center',
        //fontFamily: 'MyFontName',
        bottom: 20
    },
    boldText: {
        //fontFamily: 'MyBold'
      },
    imageInfo: {
        bottom: 130
    },
    appText: {
        fontSize: 40,
        bottom: 70,
        //fontFamily: 'MyFontName'
    }
});

export default WelcomeScreen;