import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(15),
  },

  title: {
    fontSize: moderateScale(22),
    fontWeight: '700',
  },

  logoutButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButton: {
    width: moderateScale(100),
  },

  noUsersText: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: moderateScale(20),
  },

  userItem: {
    paddingVertical: moderateScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
    marginVertical: moderateScale(5),
  },

  userName: {
    fontSize: moderateScale(16),
  },

  userEmail: {
    fontSize: moderateScale(16),
    color: '#555',
  },
});
export default styles;
