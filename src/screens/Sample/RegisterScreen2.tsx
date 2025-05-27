import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';


export default function RegisterScreen() {
    const navigation = useNavigation();
    return (
        <ScrollView contentContainerStyle={styles.container}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backArrow}>
            <Entypo name="chevron-left" size={28} color="#fff" onPress = { () => navigation.navigate('Home') } />
        </TouchableOpacity>

        {/* Logo and Title */}
        <View style={styles.header}>
            <FontAwesome name="home" size={40} color="#fff" />
            <Text style={styles.logoText}>Rentify</Text>
        </View>

        <Text style={styles.welcome}>Welcome back!</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color="#333" style={styles.icon} />
            <TextInput 
            placeholder="Enter your username" style={styles.input} placeholderTextColor="#666" />
        </View>

        <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="#333" style={styles.icon} />
            <TextInput placeholder="Enter your email" style={styles.input} keyboardType="email-address" placeholderTextColor="#666" />
        </View>

        <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={24} color="#333" style={styles.icon} />
            <TextInput placeholder="Enter your password" style={styles.input} secureTextEntry placeholderTextColor="#666" />
            <Entypo name="eye-with-line" size={20} color="#333" style={styles.eyeIcon} />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>

        {/* OR divider */}
        <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
        </View>

        {/* Google Button */}
        <TouchableOpacity style={styles.googleButton}>
            <FontAwesome name="google" size={20} color="#fff" style={styles.googleIcon} />
            <Text style={styles.googleText}>Sign in with Gmail</Text>
        </TouchableOpacity>

        {/* Already Have Account */}
        <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity>
            <Text style={styles.signInText}> Sign in here</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#3a68f2',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  backArrow: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 30,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 55,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  signUpButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 12,
  },
  signUpText: {
    fontSize: 16,
    color: '#3a68f2',
    fontWeight: 'bold',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 12,
    color: '#fff',
  },
  googleButton: {
    backgroundColor: '#2ecc71',
    padding: 14,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    marginRight: 8,
  },
  googleText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#fff',
  },
  signInText: {
    color: '#0008ff',
    fontWeight: 'bold',
  },
});
