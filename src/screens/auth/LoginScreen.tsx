import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
//   useAlert,
//   Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import useAlert from '../../hooks/useAlert';

import { api } from '../../api/apiClient';
import { Colors } from '../../constants';
import styles from './styles';

import FormInput from '../../components/Form/FormInput';
import FormButton from '../../components/Form/FormButton';
import ToggleSwitch from '../../components/ToggleSwitch';
import CustomAlert from '../../components/common/CustomAlert';

interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
//   const { alertState, showAlert, hideAlert } = useAlert();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {newErrors.email = 'Email is required';}
    else if (!emailRegex.test(email)) {newErrors.email = 'Please enter a valid email';}
    if (!password) {newErrors.password = 'Password is required';}
    else if (password.length < 6) {newErrors.password = 'Password must be at least 6 characters';}
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            console.log('Attempting login with:', { email, password });
            const response = await api.post('/auth/login', { email, password });
            console.log('Login response:', response.data);
            const { token, user } = response.data.data;
            console.log('Login successful:', user, token);
            await AsyncStorage.setItem('authToken', token);

            navigation.navigate('Home');
        } catch (error: any) {
            let errorMessage = 'Login failed. Please try again.';
            if (error.response?.status === 401) {
                errorMessage = 'Invalid email or password';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            setAlertMessage(errorMessage);
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
            colors={[Colors.white100, Colors.white200, Colors.primary, Colors.blue500]}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.wrapper}
            >
                {/* Header */}
                <View style={styles.logoContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name="arrow-back" size={36} color={Colors.primary} />
                </TouchableOpacity>
                <Image
                    source={require('../../assets/images/RentifyLogoPrimary.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
                </View>

                {/* Card */}
                <View style={styles.card}>
                <Text style={styles.welcome}>Welcome back!</Text>
                <Text style={styles.subText}>Log in and unlock your dream home.</Text>

                <FormInput
                    iconName="envelope"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    error={errors.email}
                />

                <FormInput
                    iconName="lock"
                    iconSize={32}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                    rightIcon={passwordVisible ? 'visibility-off' : 'visibility'}
                    onRightIconPress={() => setPasswordVisible(!passwordVisible)}
                    error={errors.password}
                />

                <TouchableOpacity style={styles.forgotContainer}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <FormButton
                    title="Sign in"
                    onPress={handleLogin}
                    loading={loading}
                    style={{ marginTop: 24 }}
                />

                <View style={styles.divider}>
                    <View style={styles.line} />
                </View>

                <View style={styles.signContainer}>
                    <View style={styles.signTextContainer}>
                    <Text style={styles.signText}>Don't have an account? </Text>
                    <Text style={styles.signLink} onPress={() => navigation.navigate('Register')}>
                        Sign up here
                    </Text>
                    </View>
                    <ToggleSwitch />
                </View>
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
        </LinearGradient>

        <CustomAlert
            visible={alertVisible}
            title="Login Error"
            message={alertMessage}
            statusIcon="cancel"
            statusIconColor= {Colors.error}
            confirmText="Try Again"
            onConfirm={() => setAlertVisible(false)}
            onClose={() => setAlertVisible(false)}
        />
        </SafeAreaView>
    );
};

export default LoginScreen;




// import React, { useState } from 'react';

// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Pressable,
//   Alert,
//   ActivityIndicator,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
// } from 'react-native';

// import { api } from '../../api/apiClient';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import FormInput from '../../components/Form/FormInput';
// import FormButton from '../../components/Form/FormButton';
// import ToggleSwitch from '../../components/ToggleSwitch';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import LinearGradient from 'react-native-linear-gradient';

// import { Colors, TextSizes, Spacing, Fonts } from '../../constants';
// import styles from './styles';

// const LoginScreen = ({ navigation }) => {
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);

//     const validateForm = () => {
//         const newErrors = {};
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!emailRegex.test(email)) {
//             newErrors.email = 'Please enter a valid email';
//         }

//         if (!password) {
//             newErrors.password = 'Password is required';
//         } else if (password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleLogin = async () => {
//         console.log('handle login');
//         if (!validateForm()) {return;}

//         setLoading(true);
//         try {
//             const response = await api.post('/auth/login', {
//                 email,
//                 password,
//             });

//             const token = response.data.token;

//             await AsyncStorage.setItem('authToken', token);
//             await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
//             console.log(response.data.user);

//             navigation.navigate('Home');

//         } catch (error) {
//             let errorMessage = 'Login failed. Please try again.';
//             if (error.response) {
//                 if (error.response.status === 401) {
//                     errorMessage = 'Invalid email or password';
//                 } else if (error.response.data && error.response.data.message) {
//                     errorMessage = error.response.data.message;
//                 }
//             }
//             Alert.alert('Error', errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//         <LinearGradient
//         colors={[ Colors.white100, Colors.white200 ,Colors.primary, Colors.blue500 ]} // 4B73DC
//         style={styles.container}
//         >
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           style={styles.wrapper}
//         >
//         <View style={styles.logoContainer}>
//             <TouchableOpacity style={styles.backButton}
//                 onPress={ () => navigation.navigate('Home') }
//             >
//                 <MaterialIcons name="arrow-back" size={36} color={Colors.primary} />
//             </TouchableOpacity>
//             <Image
//                 source={require('../../assets/images/RentifyLogoPrimary.png')}
//                 style={styles.logo}
//                 resizeMode="contain"
//             />
//             <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
//         </View>

//         <View style={styles.card}>
//             <Text style={styles.welcome}>Welcome back!</Text>
//             <Text style={styles.subText}>Log in and unlock your dream home.</Text>

//             {/* Email Field */}
//             <View style={styles.inputContainer}>
//                 <FontAwesome name="envelope" size={24} color={Colors.primary} />
//                 <TextInput
//                     placeholder="Enter your email"
//                     placeholderTextColor={Colors.grey800}
//                     style={styles.input}
//                     value={email}
//                     onChangeText={setEmail}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                 />
//             </View>
//             {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

//             {/* Password Field */}
//             <View style={styles.inputContainer}>
//                 <FontAwesome name="lock" size={32} color={Colors.primary} />
//                 <TextInput
//                     placeholder="Enter your password"
//                     placeholderTextColor={Colors.grey800}
//                     secureTextEntry={!passwordVisible}
//                     style={styles.input}
//                     value={password}
//                     onChangeText={setPassword}
//                 />
//                 <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
//                     <MaterialIcons
//                         name={passwordVisible ? 'visibility-off' : 'visibility'}
//                         size={24}
//                         color={Colors.primary}
//                     />
//                 </TouchableOpacity>
//             </View>

//             <TouchableOpacity style={styles.forgotContainer}>
//                 <Text style={styles.forgotText}>Forgot Password?</Text>
//             </TouchableOpacity>

//             {/* Sign In Button */}
//             {/* <TouchableOpacity
//                 style={styles.signInButton}
//                 onPress={handleLogin}
//                 disabled={loading}
//             >
//                 {loading ? (
//                     <ActivityIndicator color={Colors.primary} />
//                 ) : (
//                     <Text style={styles.signInText}>Sign in</Text>
//                 )}
//             </TouchableOpacity> */}

//             <FormButton
//                     title="Sign in"
//                     onPress={handleLogin}
//                     loading={loading}
//                     // {loading ? (
//                     // <ActivityIndicator color={Colors.primary} />
//                     // ) : (
//                     // )}
//                     style={{marginTop: 24}} textStyle={undefined} />

//             {/* Divider */}
//             <View style={styles.divider}>
//                 <View style={styles.line} />
//                 {/* <Text style={styles.or}>or</Text> */}
//                 <View style={styles.line} />
//             </View>

//             {/* Gmail Button */}
//             {/* <TouchableOpacity style={styles.googleButton}>
//                 <FontAwesome name="google" size={20} color={Colors.white100} />
//                 <Text style={styles.googleText}>Sign in with Gmail</Text>
//             </TouchableOpacity> */}

//             {/* Sign Up */}

//             {/* <View style={styles.signContainer}>
//                 <View style={styles.signTextContainer}>
//                     <Text style={styles.signText}> </Text>
//                     <Text
//                         style={styles.signLink}
//                         onPress={() => navigation.navigate('Register')}
//                     >
//                         Sign in here
//                     </Text>
//                 </View>
//                 <ToggleSwitch />
//             </View> */}
//             <View style={styles.signContainer}>
//                 <View style={styles.signTextContainer}>
//                     <Text style={styles.signText}>Don't have an account? </Text>
//                     <Text
//                         style={styles.signLink}
//                         // onPress={() => navigation.navigate('Login')}
//                     >
//                         Sign up here
//                     </Text>
//                 </View>
//                 <ToggleSwitch />
//             </View>
//         </View>
//          </KeyboardAvoidingView>
//       </ScrollView>
//         </LinearGradient>
//         </SafeAreaView>
//     );
// };

// export default LoginScreen;
