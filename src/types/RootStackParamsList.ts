import ScreenName from '../constants/ScreenNames';

type UsersScreenParams = {
  title?: string;
};

type SplashScreenParams = {
  title?: string;
};

type RegisterScreenParams = {
  title?: undefined;
};

type LoginScreenParams = {
  title?: undefined;
};

type ChatScreenParams = {
  data: {
    userId: string;
    name: string;
    email: string;
  };
  currentUserId: string;
};

export type RootStackParamList = {
  [ScreenName.SplashScreen]: SplashScreenParams;
  [ScreenName.UsersScreen]: UsersScreenParams;
  [ScreenName.LoginScreen]: LoginScreenParams;
  [ScreenName.RegisterScreen]: RegisterScreenParams;
  [ScreenName.ChatScreen]: ChatScreenParams;
};
