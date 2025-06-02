import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

import { api } from '../../api/apiClient';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useAuthForm from '../../hooks/useAuthForm';
import useAlert from '../../hooks/useAlert';

import { validateRegisterForm } from '../../utils/validators';
import { Colors, TextSizes, Spacing, Fonts } from '../../constants';

import FormInput from '../../components/Form/FormInput';
import FormButton from '../../components/Form/FormButton';
import ToggleSwitch from '../../components/ToggleSwitch';
import CustomAlert from '../../components/common/CustomAlert';


const RegisterScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [passwordVisible, setPasswordVisible] = useState(false);
    // const [cancelToken] = useState(api.CancelToken.source());
    const { alertState, showAlert, hideAlert } = useAlert();

    const {
        formData,
        errors,
        loading,
        setLoading,
        handleChange,
        validateForm,
    } = useAuthForm(
        {
        user_name: '',
        email: '',
        password: '',
        },
        validateRegisterForm
    );

    const handleRegister = async () => {
        if (!validateForm()) {return;}

        setLoading(true);
        try {
            const response = await api.post('/auth/register', {
                user_name: formData.user_name,
                email: formData.email,
                password: formData.password,
            });

            if (isFocused) {
                showAlert(
                    'Registration Successful',
                    'Your account has been created successfully',
                    {
                        confirmText: 'Continue to Login',
                        onConfirm: () => navigation.navigate('Login'),
                    }
                );
            }
        } catch (error) {
        if (isFocused) {
            let errorMessage = 'Registration failed. Please try again.';
            if (error.response) {
            if (error.response.status === 400) {
                errorMessage = 'Email already exists';
            } else if (error.response.data?.message) {
                errorMessage = error.response.data.message;
            }
            }
            showAlert('Registration Error', errorMessage);
        }
        } finally {
        if (isFocused) {
            setLoading(false);
        }
        }
    };

    return (
        <LinearGradient
            colors={[Colors.white100, Colors.white200, Colors.primary, Colors.blue500]}
            style={styles.container}
        >
        <View style={styles.header}>
            <MaterialIcons
                name="arrow-back"
                size={36}
                color={Colors.primary}
                style={styles.backButton}
                onPress={() => navigation.navigate('Home')}
            />
            <Image
                source={require('../../assets/images/RentifyLogoPrimary.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.welcome}>Welcome!</Text>
            <Text style={styles.subText}>Sign up and create your dream home.</Text>


            <FormInput
                    iconName="user"
                    iconSize={32}
                    placeholder="Enter your fullname"
                    value={formData.user_name}
                    onChangeText={(text) => handleChange('user_name', text)}
                    error={errors.user_name} secureTextEntry={undefined} keyboardType={undefined} autoCapitalize={undefined} />

            <FormInput
                    iconName="envelope"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    keyboardType="email-address"
                    error={errors.email} secureTextEntry={undefined} autoCapitalize={undefined} />

            <FormInput
                    iconName="lock"
                    iconSize={32}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secureTextEntry={!passwordVisible}
                    rightIcon={passwordVisible ? 'visibility-off' : 'visibility'}
                    onRightIconPress={() => setPasswordVisible(!passwordVisible)}
                    error={errors.password} keyboardType={undefined} autoCapitalize={undefined} />

            <FormButton
                    title="Sign up"
                    onPress={handleRegister}
                    loading={loading} style={{marginTop: 24}} textStyle={undefined} />

            <ToggleSwitch />

            <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Already have an account? </Text>
            <Text
                style={styles.signUpLink}
                onPress={() => navigation.navigate('Login')}
            >
                Sign in here
            </Text>
            </View>
        </View>
        <CustomAlert
                visible={alertState.visible}
                title={alertState.title}
                message={alertState.message}
                confirmText={alertState.confirmText}
                onConfirm={alertState.onConfirm}
                onClose={hideAlert} />
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
    errorContainer: {
        width: 200,
        flexDirection: 'row',
        // borderWidth: 1,
        // borderBlockColor: 'black',
        paddingHorizontal: 8,
        paddingTop: 4,
        paddingBottom: 8,
    },
    error: {
        flex: 0,
        borderWidth: 1,
        borderBlockColor: 'black',
    },
    errorText: {
        color: '#fff',
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 8,
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
