// Componente de inicio de sesión actualizado con nueva paleta de colores y nombre cambiado

import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';
import AppLogo from '../../assets/logodemitienda.jpg';

export default function CustomLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleLogInAccount = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('¡Inicio de sesión exitoso!');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', 'Correo electrónico o contraseña inválidos.');
      });
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={AppLogo}
          />
          <Text style={styles.title}>
            Bienvenido a <Text style={styles.titleHighlight}>Haus</Text>
          </Text>
          <Text style={styles.subtitle}>
          Explora nuestra exclusiva selección de productos
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
              placeholder="sanpiter@gmail.com"
              placeholderTextColor="#718096"
              style={styles.inputControl}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={text => setPassword(text)}
              placeholder="********"
              placeholderTextColor="#718096"
              style={styles.inputControl}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity onPress={handleLogInAccount}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Iniciar sesión</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={goToSignUp} style={styles.signupLink}>
          <Text style={styles.signupLinkText}>
            ¿No tienes una cuenta?{' '}
            <Text style={styles.signupLinkHighlight}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
    paddingHorizontal: 24,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerImg: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 6,
  },
  titleHighlight: {
    color: '#3182ce',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#edf2f7',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#2d3748',
  },
  btn: {
    backgroundColor: '#3182ce',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  forgotPassword: {
    marginTop: 16,
    textAlign: 'center',
    color: '#3182ce',
    fontWeight: '600',
  },
  signupLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  signupLinkText: {
    fontSize: 15,
    color: '#2d3748',
    fontWeight: '600',
  },
  signupLinkHighlight: {
    color: '#3182ce',
    textDecorationLine: 'underline',
  },
});
