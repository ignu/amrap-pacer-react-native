import React, { Component } from 'react';

import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  View,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import Coach from '../lib/coach'

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
    borderColor: 'purple',
    borderWidth: 2,
    justifyContent: 'center',
    borderStyle: 'dotted',
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

export default class Timer extends Component {
  constructor(props) {
    super(props)

    this.coach = new Coach()
    this.coach.start()

    this.state = {
      height: 1,
      time: "0:00",
      count: 0
    }

    const updateTime = () => {
      this.setState({time: this.coach.elapsedSeconds})
    }

    setInterval(updateTime.bind(this), 500)
  }

  componentWillMount() {
    this.height = new Animated.Value(1)
  }

  componentDidMount() {
    Animated.timing(this.height, {
      toValue: deviceHeight,
      duration: 20000
    }).start()
  }

  increment() {
    this.coach.recordRound()
    this.setState({
      count: this.coach.roundCount
    })
  }

  render() {
    const style = { zIndex: 1, height: this.height, top: 0, width: deviceWidth, backgroundColor: 'green'}

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{zIndex: 0, top: 0, backgroundColor: 'black', height: deviceHeight}}>
          <Animated.View View ref="progress" style={style}>
          </Animated.View>
        </View>

        <View style={styles.numberWrapper}>
          <TouchableOpacity onPress={this.increment.bind(this)}>
            <Text style={{fontSize: 180, color: '#FFF'}}>{this.state.count}</Text>
          </TouchableOpacity>

          <Text style={{fontSize: 90, color: '#FFF'}}>{this.state.time}</Text>
        </View>
      </View>
    );
  }
}
