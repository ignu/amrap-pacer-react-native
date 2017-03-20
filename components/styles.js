import {StyleSheet, Dimensions} from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  numberWrapper: {
    zIndex: 10,
    top: 0,
    left: 0,
    position: 'absolute',
    height: deviceHeight,
    paddingLeft: (deviceWidth/2) - 50,
    justifyContent: 'center',
    backgroundColor: 'rgba(52,52,52,0)',
    width: deviceWidth
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default styles
