import React, { FC, useState } from 'react';
import { ImageBackground, View, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../../components/globals/CustomHeader';
import { IMAGES } from '../../../constants/Images';
import CustomText from '../../../components/globals/CustomText';
import { FONTS } from '../../../constants/Fonts';
import CustomAuthLink from '../../../components/globals/CustomAuthLink';
import { navigate } from '../../../utils/NavigationUtils';
import styles from './styles';
import CustomInput from '../../../components/globals/CustomInput';
import GradientButton from '../../../components/globals/GradientButton';
import { Colors } from '../../../constants/Colors';
import ScreenName from '../../../constants/ScreenNames';
import { moderateScale } from 'react-native-size-matters';

const LoginScreen: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    // TODO: API call or navigation
    console.log('Login Success!');
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
        {/* Header Section */}
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

        {/* FORM SECTION */}
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <CustomInput
              label="Email"
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (text.trim() !== '') setEmailError('');
              }}
              error={!!emailError}
              errorMessage={emailError}
            />
            <CustomInput
              label="Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (text.trim() !== '') setPasswordError('');
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
            <GradientButton onPress={handleLogin} title="Login" />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
