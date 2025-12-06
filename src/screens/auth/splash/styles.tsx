import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { FONTS } from '../../../constants/Fonts';
import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: {
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  titleText: {
    fontFamily: FONTS.Bold,
    fontSize: 30,
    color: Colors.white,
  },
});
export default styles;
