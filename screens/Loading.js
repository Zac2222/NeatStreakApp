import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import colors from '../config/colors';

const Loading = () => {
  const [fontsLoaded] = useFonts({
    'Asset': require('../assets/PermanentMarker-Regular.ttf'), 
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../assets/Animation - 1701572603265.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <Text style={[styles.logoText, { fontFamily: 'Asset' }]}>NeatStreak</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 54,
    fontWeight: 'bold',
    marginTop: 20, 
    color: '#BB3E4D'
  },
  animationContainer: {
    position: 'relative', 
  },
  animation: {
    width: 200,
    height: 300,
  }
});

export default Loading;






