import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // sender bubble = right
  rightBubble: {
    backgroundColor: '#050612',
    padding: 8,
    borderRadius: 12,
    marginVertical: 2,
    alignSelf: 'flex-end',
  },

  leftBubble: {
    backgroundColor: '#332f2f',
    padding: 8,
    borderRadius: 12,
    marginVertical: 2,
    alignSelf: 'flex-start',
  },

  rightText: {
    color: 'white',
  },

  leftText: {
    color: 'white',
  },
});
export default styles;
