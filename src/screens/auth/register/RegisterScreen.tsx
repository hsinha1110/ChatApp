import React, { FC, useState } from 'react';
import { ImageBackground, View, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../../components/globals/CustomHeader';
import { IMAGES } from '../../../constants/Images';
import CustomText from '../../../components/globals/CustomText';
import { FONTS } from '../../../constants/Fonts';
import CustomAuthLink from '../../../components/globals/CustomAuthLink';
import { goBack } from '../../../utils/NavigationUtils';
import styles from './styles';
import CustomInput from '../../../components/globals/CustomInput';
import GradientButton from '../../../components/globals/GradientButton';
import { Colors } from '../../../constants/Colors';
import { moderateScale } from 'react-native-size-matters';

const RegisterScreen: FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleRegister = () => {
    let valid = true;

    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      valid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      valid = false;
    } else {
      setLastNameError('');
    }

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

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm password is required');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!valid) return;

    // TODO — API call
    console.log('Register Success');
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
            <CustomHeader
              imageSource={IMAGES.arrow}
              showBack={true}
              onPress={goBack}
            />

            <CustomText
              style={styles.headerTitle}
              variant="h2"
              fontFamily={FONTS.Bold}
            >
              Register
            </CustomText>

            <CustomText
              style={styles.headerTitle}
              variant="h8"
              fontFamily={FONTS.Regular}
            >
              Create an account to continue !
            </CustomText>
          </ImageBackground>
        </View>

        {/* FORM SECTION */}
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <CustomInput
              label="First Name"
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                if (text.trim() !== '') setFirstNameError('');
              }}
              error={!!firstNameError}
              errorMessage={firstNameError}
            />
            <CustomInput
              label="Last Name"
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                if (text.trim() !== '') setLastNameError('');
              }}
              error={!!lastNameError}
              errorMessage={lastNameError}
            />
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
              secureTextEntry
              onChangeText={text => {
                setPassword(text);
                if (text.trim() !== '') setPasswordError('');
              }}
              error={!!passwordError}
              errorMessage={passwordError}
            />

            <CustomInput
              label="Confirm Password"
              value={confirmPassword}
              secureTextEntry
              onChangeText={text => {
                setConfirmPassword(text);
                if (text.trim() !== '') setConfirmPasswordError('');
              }}
              error={!!confirmPasswordError}
              errorMessage={confirmPasswordError}
            />
          </View>
          <View style={{ marginTop: moderateScale(40) }}>
            <CustomAuthLink
              leftText="Already have an account?"
              rightText="Login"
              onPress={() => goBack()}
            />
          </View>
          <View style={styles.buttonContainer}>
            <GradientButton title="Register" onPress={handleRegister} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
