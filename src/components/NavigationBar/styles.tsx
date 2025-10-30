import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: 'absolute',
    top : 0 ,
    left : 0,
    width: '100%', 
    height: 130,
    backgroundColor: '#f8f8f8',
    // backgroundColor : linear-gradient(180deg, #AD033B 0%, #000000 100%);
    // backgroundColor : 'linear-gradient(180deg, #AD033B 0% #000000 100%)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color : 'white',
    paddingLeft : 20,
    paddingRight : 20

  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  span :{
    fontSize:12,
    fontWeight:'300',
    color : 'white',

  }
});
