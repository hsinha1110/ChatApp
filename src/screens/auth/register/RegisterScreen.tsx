import React, { FC, useState } from 'react';
import { ImageBackground, View, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../../components/globals/CustomHeader';
import { IMAGES } from '../../../constants/Images';
import CustomText from '../../../components/globals/CustomText';
import { FONTS } from '../../../constants/Fonts';
import CustomAuthLink from '../../../components/globals/CustomAuthLink';
import { goBack, navigate } from '../../../utils/NavigationUtils';
import styles from './styles';
import CustomInput from '../../../components/globals/CustomInput';
import GradientButton from '../../../components/globals/GradientButton';
import { Colors } from '../../../constants/Colors';
import { moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import ScreenName from '../../../constants/ScreenNames';
import CustomLoader from '../../../components/globals/CustomLoader';

const RegisterScreen: FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;

    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      valid = false;
    } else setFirstNameError('');

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      valid = false;
    } else setLastNameError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else setEmailError('');

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else setPasswordError('');

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm password is required');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      valid = false;
    } else setConfirmPasswordError('');

    if (!valid) return;

    handleRegister();
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const userId =
        Date.now().toString() + Math.random().toString(36).slice(2);

      await firestore()
        .collection('users')
        .doc(userId)
        .set({
          userId,
          name: `${firstName} ${lastName}`,
          email,
          password,
        });

      Alert.alert('Success', 'Account created successfully!');
      setLoading(false);
      navigate(ScreenName.LoginScreen);
    } catch (err) {
      setLoading(false);
      console.log('Firestore Error:', err);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: Colors.white }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'android' ? 30 : 0}
    >
      {loading && <CustomLoader visible={loading} />}

      <View style={styles.container}>
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
              Create an account to continue!
            </CustomText>
          </ImageBackground>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <CustomInput
              label="First Name"
              value={firstName}
              autoCapitalize="none"
              onChangeText={text => {
                setFirstName(text);
                if (text.trim()) setFirstNameError('');
              }}
              error={!!firstNameError}
              errorMessage={firstNameError}
            />

            <CustomInput
              label="Last Name"
              value={lastName}
              autoCapitalize="none"
              onChangeText={text => {
                setLastName(text);
                if (text.trim()) setLastNameError('');
              }}
              error={!!lastNameError}
              errorMessage={lastNameError}
            />

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
              secureTextEntry
              onChangeText={text => {
                setPassword(text);
                if (text.trim()) setPasswordError('');
              }}
              error={!!passwordError}
              errorMessage={passwordError}
            />

            <CustomInput
              label="Confirm Password"
              value={confirmPassword}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={text => {
                setConfirmPassword(text);
                if (text.trim()) setConfirmPasswordError('');
              }}
              error={!!confirmPasswordError}
              errorMessage={confirmPasswordError}
            />
          </View>

          <View style={{ marginTop: moderateScale(40) }}>
            <CustomAuthLink
              leftText="Already have an account?"
              rightText="Login"
              onPress={goBack}
            />
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton title="Register" onPress={validate} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
