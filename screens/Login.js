import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import colors from '../config/colors';

const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Asset': require('../assets/PermanentMarker-Regular.ttf'), 
    'PermanentMarker': require('../assets/PermanentMarker-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    navigation.navigate('Main');
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NeatStreak</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.subTitle}> Or </Text>
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 54,
    fontWeight: 'bold',
    fontFamily: 'Asset', 
    color: '#BB3E4D',
    marginBottom: 80,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;


