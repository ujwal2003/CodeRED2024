// import React from 'react';
// import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import GradientBackground from './GradientBackground';

// const WelcomeScreen = ({ navigation }) => {
//     const handlePress = () => {
//         navigation.navigate('User');
//     };

//     return (
//         <View style={styles.container}>
//         <ImageBackground source={require("./assets/Start_Page.png")} 
//         style={styles.imageBackground}>
//             <TouchableOpacity style={styles.touchable} onPress={handlePress}>
//                 <Text style={styles.text}>Welcome Screen</Text>
//             </TouchableOpacity>
//         </ImageBackground>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     touchable: {
//         padding: 20,
//         backgroundColor: '#eee',
//         borderRadius: 10,
//     },
//     imageBackground: {
//         flex: 1,
//     },
//     text: {
//         fontSize: 20,
//     },
// });

// export default WelcomeScreen;


// ----------------------------------------


// Import necessary components
// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import GradientBackground from './GradientBackground';

// // Define WelcomeScreen component
// const WelcomeScreen = ({ navigation }) => {
//   // Define function to handle button press
//   const handlePress = () => {
//     navigation.navigate('User');
//   };

//   // Render components
//   return (
//     <GradientBackground>
//       <View style={styles.container}>
//         {/* Use ImageBackground to display background image */}
//         <ImageBackground 
//           source={require("./assets/Background.png")} // Provide image source
//           style={styles.imageBackground} // Apply styles to control size and position
//           resizeMode="cover" // Ensure proper scaling
//         >
//           {/* Content inside ImageBackground */}
//           <TouchableOpacity style={styles.touchable} onPress={handlePress}>
//             <Text style={styles.text}>Welcome Screen</Text>
//           </TouchableOpacity>
//         </ImageBackground>
//       </View>
//     </GradientBackground>
//   );
// };

// // Define styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageBackground: {
//     flex: 1, // Ensure image takes up entire container
//     width: '100%', // Make image cover entire width of the container
//     height: '100%', // Make image cover entire height of the container
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   touchable: {
//     padding: 20,
//     backgroundColor: '#eee',
//     borderRadius: 10,
//   },
//   text: {
//     fontSize: 18,
//   },
// });

// // Export WelcomeScreen component
// export default WelcomeScreen;