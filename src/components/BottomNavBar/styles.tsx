import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    // justifyContent: 'space-around',
    // alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  bottomNavbar: {
    // flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 90,
    // backgroundColor: '#f8f8f8',
    backgroundColor : 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
