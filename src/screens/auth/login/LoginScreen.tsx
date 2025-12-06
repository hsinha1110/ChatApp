import React, { FC, useState } from 'react';
import { ImageBackground, View, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../../components/globals/CustomHeader';
import { IMAGES } from '../../../constants/Images';
import CustomText from '../../../components/globals/CustomText';
import { FONTS } from '../../../constants/Fonts';
import CustomAuthLink from '../../../components/globals/CustomAuthLink';
import { navigate, resetAndNavigate } from '../../../utils/NavigationUtils';
import styles from './styles';
import CustomInput from '../../../components/globals/CustomInput';
import GradientButton from '../../../components/globals/GradientButton';
import { Colors } from '../../../constants/Colors';
import ScreenName from '../../../constants/ScreenNames';
import { moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import CustomLoader from '../../../components/globals/CustomLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList>;

const LoginScreen: FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else setEmailError('');

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else setPasswordError('');

    if (!valid) return;

    handleLogin();
  };
  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await firestore()
        .collection('users')
        .where('email', '==', email)
        .where('password', '==', password)
        .get();

      if (res.empty) {
        setLoading(false);
        Alert.alert('Login Error', 'Invalid email or password');
        return;
      }

      const user = res.docs[0].data();
      console.log('Logged user:', user);

      // Optional: Save data
      await goToChatScreen(user.name, user.email, user.userId);

      setLoading(false);
      resetAndNavigate(ScreenName.UsersScreen);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Login Error', error.message);
    }
  };

  const goToChatScreen = async (
    name: string,
    email: string,
    userId: string,
  ) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
  };

  return (
    <KeyboardAwareScrollView
      alwaysBounceVertical={false}
      style={{ flex: 1, backgroundColor: Colors.white }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'android' ? 30 : 0}
    >
      <View style={styles.container}>
        {loading && <CustomLoader visible={loading} />}

        <View style={styles.headerContainer}>
          <ImageBackground
            source={IMAGES.header}
            style={styles.headerImage}
            resizeMode="cover"
          >
            <CustomHeader imageSource={IMAGES.arrow} showBack={true} />

            <CustomText
              style={styles.headerTitle}
              variant="h2"
              fontFamily={FONTS.Bold}
            >
              Login
            </CustomText>

            <CustomText
              style={styles.headerTitle}
              variant="h8"
              fontFamily={FONTS.Regular}
            >
              Enter email and password to login
            </CustomText>
          </ImageBackground>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <CustomInput
              label="Email"
              value={email}
              autoCapitalize="none"
              onChangeText={text => {
                setEmail(text);
                if (text.trim()) setEmailError('');
              }}
              error={!!emailError}
              errorMessage={emailError}
            />

            <CustomInput
              label="Password"
              value={password}
              autoCapitalize="none"
              onChangeText={text => {
                setPassword(text);
                if (text.trim()) setPasswordError('');
              }}
              secureTextEntry
              error={!!passwordError}
              errorMessage={passwordError}
            />
          </View>

          <View style={{ marginTop: moderateScale(40) }}>
            <CustomAuthLink
              leftText="Don't have an account?"
              rightText="Register"
              onPress={() => navigate(ScreenName.RegisterScreen)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton onPress={validate} title="Login" />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
