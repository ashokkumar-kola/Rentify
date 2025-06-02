import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { api } from '../../api/apiClient';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ToggleSwitch from '../../components/ToggleSwitch';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, TextSizes, Spacing, Fonts } from '../../constants';

const LoginScreen = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        console.log('handle login');
        if (!validateForm()) {return;}

        setLoading(true);
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            const token = response.data.token;

            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
            console.log(response.data.user);

            navigation.navigate('Home');

        } catch (error) {
            let errorMessage = 'Login failed. Please try again.';
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Invalid email or password';
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
        colors={[ Colors.white100, Colors.white200 ,Colors.primary, Colors.blue500 ]} // 4B73DC
        style={styles.container}
        >
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}
                onPress={ () => navigation.navigate('Home') }
            >
                <MaterialIcons name="arrow-back" size={36} color={Colors.primary} />
            </TouchableOpacity>
            <Image
                source={require('../../assets/images/RentifyLogoPrimary.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.welcome}>Welcome back!</Text>
            <Text style={styles.subText}>Log in and unlock your dream home.</Text>

            {/* Email Field */}
            <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={24} color={Colors.primary} />
                <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor={Colors.grey800}
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password Field */}
            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={32} color={Colors.primary} />
                <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor={Colors.grey800}
                    secureTextEntry={!passwordVisible}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <MaterialIcons
                        name={passwordVisible ? 'visibility-off' : 'visibility'}
                        size={24}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotContainer}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
                style={styles.signInButton}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color={Colors.primary} />
                ) : (
                    <Text style={styles.signInText}>Sign in</Text>
                )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
                <View style={styles.line} />
                {/* <Text style={styles.or}>or</Text> */}
                <View style={styles.line} />
            </View>

            {/* Gmail Button */}
            {/* <TouchableOpacity style={styles.googleButton}>
                <FontAwesome name="google" size={20} color={Colors.white100} />
                <Text style={styles.googleText}>Sign in with Gmail</Text>
            </TouchableOpacity> */}

            {/* Sign Up */}
            <View style={styles.signUpContainer}>
                <Text style={{ color: Colors.white100 }}>Don't have an account? </Text>
                <TouchableOpacity onPress={ () => navigation.navigate('Register') }>
                    <Text style={styles.signUpLink}>Sign up here</Text>
                </TouchableOpacity>
            </View>

            <ToggleSwitch />
        </View>
        </LinearGradient>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 16,
    alignItems: 'center',
  },
  backButton: {
    color: Colors.primary,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  logo: {
    width: 180,
    height: 52,
    marginTop: 16,
  },
  tagline: {
    fontSize: TextSizes.md,
    color: Colors.primary,
    marginTop: 4,
    letterSpacing: 4,
  },
  card: {
    backgroundColor: Colors.primary,
    marginTop: 32,
    padding: 24,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    flex: 1,
  },
  welcome: {
    fontSize: TextSizes['2xl'],
    color: Colors.white100,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: Colors.white100,
    fontSize: TextSizes.md,
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: Colors.white100,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#222',
    fontSize: TextSizes.base,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 16 ,
  },
  forgotText: {
    color: Colors.white100,
    fontSize: TextSizes.md,
  },
  signInButton: {
    width: 220,
    backgroundColor: Colors.white100,
    paddingVertical: 12,
    borderRadius: 26,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signInText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: TextSizes.base,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.grey200,
  },
  or: {
    marginHorizontal: 16,
    color: Colors.white100,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#34A853',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  googleText: {
    color: Colors.white100,
    fontSize: TextSizes.base,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpLink: {
    color: Colors.white100,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 40,
  },
});
