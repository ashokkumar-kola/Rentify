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
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Colors } from '../../constants';

const RegisterScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
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
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('YOUR_REGISTER_API_ENDPOINT', {
        name: formData.fullname,
        email: formData.email,
        password: formData.password
      });

      Alert.alert(
        'Registration Successful',
        'Your account has been created successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
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
      colors={[Colors.white100, Colors.white200, Colors.primary, Colors.blue500]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
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
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.subText}>Sign up and create your dream home.</Text>

        {/* FullName Field */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color={Colors.primary} />
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

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={styles.signInButton} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white100} />
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
          <Text style={styles.googleText}>Sign up with Gmail</Text>
        </TouchableOpacity>

        {/* Sign in */}
        <View style={styles.signUpContainer}>
          <Text style={{ color: Colors.white100 }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signUpLink}>Sign in here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 10,
  },
  tagline: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: Colors.grey800,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey400,
    marginBottom: 5,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: Colors.black,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 35,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  forgotText: {
    color: Colors.primary,
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.grey400,
  },
  or: {
    marginHorizontal: 10,
    color: Colors.grey600,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#DB4437',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;