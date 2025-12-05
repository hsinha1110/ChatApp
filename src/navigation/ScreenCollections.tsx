import ScreenName from '../constants/ScreenNames';
import Users from '../screens/app/UsersScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import SplashScreen from '../screens/auth/splash/SplashScreen';

export const authStack = [
  {
    name: ScreenName.LoginScreen,
    component: LoginScreen,
  },
  {
    name: ScreenName.RegisterScreen,
    component: RegisterScreen,
  },
  {
    name: ScreenName.SplashScreen,
    component: SplashScreen,
  },
];

export const dashboardStack = [
  {
    name: ScreenName.UsersScreen,
    component: Users,
  },
];

export const mergedStacks = [...dashboardStack, ...authStack];
