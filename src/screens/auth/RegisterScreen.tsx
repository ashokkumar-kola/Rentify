import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { api } from '../../api/apiClient';
import styles from './styles';

import useAuthForm from '../../hooks/useAuthForm';
import useAlert from '../../hooks/useAlert';
import { validateRegisterForm } from '../../utils/validators';
import { Colors } from '../../constants';

import FormInput from '../../components/Form/FormInput';
import FormButton from '../../components/Form/FormButton';
import ToggleSwitch from '../../components/ToggleSwitch';
import CustomAlert from '../../components/common/CustomAlert';

type RegisterScreenProps = {
  navigation: any;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [passwordVisible, setPasswordVisible] = useState(false);
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
      full_name: '',
      email: '',
      password: '',
    },
    validateRegisterForm
  );

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
        console.log('Registering with data:', formData);
      const response = await api.post('/auth/register', {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });
      console.log('Register response:', response.data);
      if (response.status === 201 && isFocused) {
        showAlert('Registration Successful', 'Your account has been created successfully', {
          statusIcon: 'check-circle',
          statusIconColor: Colors.primary,
          confirmText: 'Continue to Login',
          onConfirm: () => navigation.navigate('Login'),
        });
      }
    } catch (error: any) {
      if (isFocused) {
        let errorMessage = 'Registration failed. Please try again.';
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = 'Email already exists';
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          }
        }
        showAlert('Registration Error', errorMessage, {
          statusIcon: 'cancel',
          statusIconColor: Colors.error,
          confirmText: 'Try Again',
          onConfirm: () => navigation.replace('Register'),
        });
      }
    } finally {
      if (isFocused) {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.wrapper}
        >
          <View style={styles.logoContainer}>
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

          <LinearGradient
            colors={[Colors.white100, Colors.white200, Colors.primary, Colors.blue500]}
            style={styles.container}
          >
            <View style={styles.card}>
              <Text style={styles.welcome}>Welcome!</Text>
              <Text style={styles.subText}>Sign up and create your dream home.</Text>

              <FormInput
                iconName="user"
                iconSize={32}
                placeholder="Enter your fullname"
                value={formData.full_name}
                onChangeText={(text) => handleChange('full_name', text)}
                error={errors.full_name}
              />

              <FormInput
                iconName="envelope"
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                error={errors.email}
              />

              <FormInput
                iconName="lock"
                iconSize={32}
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry={!passwordVisible}
                rightIcon={passwordVisible ? 'visibility-off' : 'visibility'}
                onRightIconPress={() => setPasswordVisible(!passwordVisible)}
                error={errors.password}
              />

              <FormButton
                title="Sign up"
                onPress={handleRegister}
                loading={loading}
                style={{ marginTop: 24 }}
              />

              <View style={styles.divider}>
                <View style={styles.line} />
              </View>

              <View style={styles.signContainer}>
                <View style={styles.signTextContainer}>
                  <Text style={styles.signText}>Already have an account? </Text>
                  <Text
                    style={styles.signLink}
                    onPress={() => navigation.navigate('Login')}
                  >
                    Sign in here
                  </Text>
                </View>
                <ToggleSwitch />
              </View>
            </View>
          </LinearGradient>

          <CustomAlert
            visible={alertState.visible}
            title={alertState.title}
            statusIcon={alertState.statusIcon}
            message={alertState.message}
            confirmText={alertState.confirmText}
            onConfirm={alertState.onConfirm}
            onClose={hideAlert}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;





// import React, { useEffect, useState } from 'react';
// import { useIsFocused } from '@react-navigation/native';

// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
// } from 'react-native';

// import { api } from '../../api/apiClient';

// import styles from './styles';

// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import useAuthForm from '../../hooks/useAuthForm';
// import useAlert from '../../hooks/useAlert';

// import { validateRegisterForm } from '../../utils/validators';
// import { Colors, TextSizes, Spacing, Fonts } from '../../constants';

// import FormInput from '../../components/Form/FormInput';
// import FormButton from '../../components/Form/FormButton';
// import ToggleSwitch from '../../components/ToggleSwitch';
// import CustomAlert from '../../components/common/CustomAlert';


// const RegisterScreen = ({ navigation }) => {
//     const isFocused = useIsFocused();
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     // const [cancelToken] = useState(api.CancelToken.source());
//     const { alertState, showAlert, hideAlert } = useAlert();

//     const {
//         formData,
//         errors,
//         loading,
//         setLoading,
//         handleChange,
//         validateForm,
//     } = useAuthForm(
//         {
//         full_name: '',
//         email: '',
//         password: '',
//         },
//         validateRegisterForm
//     );

//     const handleRegister = async () => {
//         if (!validateForm()) {return;}

//         setLoading(true);
//         try {
//             const response = await api.post('/auth/register', {
//                 full_name: formData.full_name,
//                 email: formData.email,
//                 password: formData.password,
//             });

//             if (isFocused) {
//                 showAlert(
//                     'Registration Successful',
//                     'Your account has been created successfully',
//                     {
//                         statusIcon: 'check-circle',
//                         confirmText: 'Continue to Login',
//                         onConfirm: () => navigation.navigate('Login'),
//                     }
//                 );
//             }
//         } catch (error) {
//         if (isFocused) {
//             let errorMessage = 'Registration failed. Please try again.';
//             if (error.response) {
//             if (error.response.status === 400) {
//                 errorMessage = 'Email already exists';
//             } else if (error.response.data?.message) {
//                 errorMessage = error.response.data.message;
//             }
//             }
//             showAlert('Registration Error', {
//                 statusIcon: 'cancel',
//                 title: 'Error',
//                 message: errorMessage,
//                 onConfirm: () => navigation.navigate('Register'),
//             });
//         }
//         } finally {
//         if (isFocused) {
//             setLoading(false);
//         }
//         }
//     };

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//                 <KeyboardAvoidingView
//                     behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//                     style={styles.wrapper}
//                 >
//                     <View style={styles.logoContainer}>
//                         <MaterialIcons
//                             name="arrow-back"
//                             size={36}
//                             color={Colors.primary}
//                             style={styles.backButton}
//                             onPress={() => navigation.navigate('Home')}
//                         />
//                         <Image
//                             source={require('../../assets/images/RentifyLogoPrimary.png')}
//                             style={styles.logo}
//                             resizeMode="contain"
//                         />
//                         <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
//                     </View>

//                     <LinearGradient
//                         colors={[Colors.white100, Colors.white200, Colors.primary, Colors.blue500]}
//                         style={styles.container}
//                     >

//                         <View style={styles.card}>
//                             <Text style={styles.welcome}>Welcome!</Text>
//                             <Text style={styles.subText}>Sign up and create your dream home.</Text>

//                             <FormInput
//                                     iconName="user"
//                                     iconSize={32}
//                                     placeholder="Enter your fullname"
//                                     value={formData.full_name}
//                                     onChangeText={(text) => handleChange('full_name', text)}
//                                     error={errors.full_name} secureTextEntry={undefined} keyboardType={undefined} autoCapitalize={undefined} />

//                             <FormInput
//                                     iconName="envelope"
//                                     placeholder="Enter your email"
//                                     value={formData.email}
//                                     onChangeText={(text) => handleChange('email', text)}
//                                     keyboardType="email-address"
//                                     error={errors.email} secureTextEntry={undefined} autoCapitalize={undefined} />

//                             <FormInput
//                                     iconName="lock"
//                                     iconSize={32}
//                                     placeholder="Enter your password"
//                                     value={formData.password}
//                                     onChangeText={(text) => handleChange('password', text)}
//                                     secureTextEntry={!passwordVisible}
//                                     rightIcon={passwordVisible ? 'visibility-off' : 'visibility'}
//                                     onRightIconPress={() => setPasswordVisible(!passwordVisible)}
//                                     error={errors.password} keyboardType={undefined} autoCapitalize={undefined} />

//                             <FormButton
//                                     title="Sign up"
//                                     onPress={handleRegister}
//                                     loading={loading} style={{marginTop: 24}} textStyle={undefined} />

//                             {/* Divider */}
//                             <View style={styles.divider}>
//                                 <View style={styles.line} />
//                                 {/* <Text style={styles.or}>or</Text> */}
//                                 {/* <View style={styles.line} /> */}
//                             </View>

//                             <View style={styles.signContainer}>
//                                 <View style={styles.signTextContainer}>
//                                     <Text style={styles.signText}>Already have an account? </Text>
//                                     <Text
//                                         style={styles.signLink}
//                                         // onPress={() => navigation.navigate('Login')}
//                                     >
//                                         Sign in here
//                                     </Text>
//                                 </View>
//                                 <ToggleSwitch />
//                             </View>

//                         </View>
//                     </LinearGradient>

//                     <CustomAlert
//                             visible={alertState.visible}
//                             title={alertState.title}
//                             statusIcon={alertState.statusIcon}
//                             message={alertState.message}
//                             confirmText={alertState.confirmText}
//                             onConfirm={alertState.onConfirm}
//                             onClose={hideAlert} />

//                 </KeyboardAvoidingView>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default RegisterScreen;
