            // <View>
            //     <View style={styles.topCenter}>
            //         <Image
            //         source={require('../assets/images/Home_SVG.png')} // Your logo
            //         style={styles.logo}
            //         />
            //         <Text style={styles.title}>Rentify</Text>
            //     </View>
            //     <View>
            //         <Button title="Login" onPress={() => navigation.navigate("Login")} />
            //         <Button title="Register" onPress={() => navigation.navigate("Register")} /> 
            //     </View>
            // </View> 


            // <View style={styles.searchBoxContainer}>
            //     <TextInput
            //     placeholder="Search properties..."
            //     placeholderTextColor="#555"
            //     style={styles.searchInput}
            //     />
            // </View> 




import React, { useState } from 'react';
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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton}
        onPress={ () => navigation.navigate('Home') }
      >
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <FontAwesome name="home" size={40} color="#fff" />
        <Text style={styles.logoText}>Rentify</Text>
      </View>

      <Text style={styles.welcome}>Welcome back!</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#555" style={styles.icon} />
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#555"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Entypo name="lock" size={20} color="#555" style={styles.icon} />
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#555"
          style={styles.input}
          secureTextEntry={hidePassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Entypo name={hidePassword ? 'eye-with-line' : 'eye'} size={20} color="#555" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signinButton} onPress = { () => navigation.navigate('Home') } >
        <Text style={styles.signinText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      {/* Gmail Login */}
      <TouchableOpacity style={styles.gmailButton}>
        <FontAwesome name="google" size={20} color="#fff" />
        <Text style={styles.gmailText}>Sign in with Gmail</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity>
            <Text style={styles.footerLink} onPress = { () => navigation.navigate('Register') }>
                Sign up here
            </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#4d75ec',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  logoText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#e6e6e6',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f4ff',
    borderRadius: 30,
    padding: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  forgotText: {
    color: '#fff',
    fontSize: 12,
  },
  signinButton: {
    backgroundColor: '#fff',
    padding: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginVertical: 16,
  },
  signinText: {
    color: '#4d75ec',
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#ccc',
  },
  gmailButton: {
    flexDirection: 'row',
    backgroundColor: '#34a853',
    padding: 12,
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  gmailText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  footerText: {
    color: '#eee',
  },
  footerLink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
