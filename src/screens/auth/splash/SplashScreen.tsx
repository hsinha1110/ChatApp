import { View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { resetAndNavigate } from '../../../utils/NavigationUtils';
import ScreenName from '../../../constants/ScreenNames';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const SplashScreen: FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      resetAndNavigate(ScreenName.LoginScreen);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#181928', '#050612']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
    </View>
  );
};

export default SplashScreen;
