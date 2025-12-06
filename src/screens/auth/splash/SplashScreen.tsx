import React, { FC, useEffect } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resetAndNavigate } from '../../../utils/NavigationUtils';
import ScreenName from '../../../constants/ScreenNames';
import { RootStackParamList } from '../../../types/RootStackParamsList';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList>;

const SplashScreen: FC<Props> = () => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('USERID');
        console.log('🔍 USERID fetched from AsyncStorage:', userId);

        if (userId !== null) {
          resetAndNavigate(ScreenName.UsersScreen);
        } else {
          resetAndNavigate(ScreenName.LoginScreen);
        }
      } catch (error) {
        console.log('❌ AsyncStorage Error:', error);
        resetAndNavigate(ScreenName.LoginScreen);
      }
    };

    const timer = setTimeout(checkUser, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#181928', '#050612']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.titleText}>Chat App</Text>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;
