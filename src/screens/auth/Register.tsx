import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

import { api } from '../../api/apiClient';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Colors, TextSizes, Spacing, Fonts } from '../../constants';


const RegisterScreen = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.fullname.trim()) {
        newErrors.fullname = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await api.post('/register', {
                name: formData.fullname,
                email: formData.email,
                password: formData.password,
            });

            Alert.alert(
                'Registration Successful',
                'Your account has been created successfully',
                [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login'),
                },
                ]
            );

        } catch (error) {
            let errorMessage = 'Registration failed. Please try again.';
            if (error.response) {
                    if (error.response.status === 400) {
                    errorMessage = 'Email already exists';
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
                resizeMode="cover"
            />
            <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.welcome}>Welcome !</Text>
            <Text style={styles.subText}>Sign up and create your dream home.</Text>

            {/* FullName Fields */}
            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={32} color={Colors.primary} style={styles.icon} />
                <TextInput
                    placeholder="Enter your fullname"
                    placeholderTextColor={Colors.grey800}
                    style={styles.input}
                    value={formData.fullname}
                    onChangeText={(text) => handleChange('fullname', text)}
                />
            </View>
            {errors.fullname && <Text style={styles.errorText}>{errors.fullname}</Text>}

            {/* Email Field */}
            <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={24} color={Colors.primary} />
                <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor={Colors.grey800}
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
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
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <MaterialIcons
                    name={passwordVisible ? 'visibility-off' : 'visibility'}
                    size={24}
                    color={Colors.primary}
                    />
                </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
                style={styles.signInButton}
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color={Colors.primary} />
                ) : (
                    <Text style={styles.signInText}>Sign up</Text>
                )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.or}>or</Text>
                <View style={styles.line} />
            </View>

            {/* Gmail Button */}
            <TouchableOpacity style={styles.googleButton}>
                <FontAwesome name="google" size={20} color={Colors.white100} />
                <Text style={styles.googleText}>Sign in with Gmail</Text>
            </TouchableOpacity>

            {/* Sign in */}
            <View style={styles.signUpContainer}>
                <Text style={{ color: Colors.white100 }}>Already have an account? </Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Login');}}>
                    <Text style={styles.signUpLink}>Sign in here</Text>
                </TouchableOpacity>
            </View>
        </View>
        </LinearGradient>
    );
};

export default RegisterScreen;

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
    marginVertical: 16,
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
});
