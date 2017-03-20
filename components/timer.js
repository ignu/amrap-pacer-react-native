/* @flow  */
import React, { Component } from 'react'

import {
  Animated,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
} from 'react-native'

import styles from './styles'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

import Coach from '../lib/coach'

const t = (seconds) => {
  const minutes = Math.round(seconds/60, 0)
  let remains = `${seconds % 60}`
  if(remains.length < 2) remains = `0${remains}`

  return `${minutes}:${remains}`
}

type TimerState = {
  height: number,
  time: string,
  count: number,
  average: string,
  backgroundColor: string,
  remaining: string
}

export default class Timer extends Component {
  coach: Coach
  state: TimerState
  height: any

  constructor(props: Object) {
    super(props)

    this.coach = new Coach()
    this.coach.start()

    this.state = {
      height: 1,
      time: "0:00",
      count: 0,
      average: '',
      backgroundColor: 'green',
      remaining: ''
    }

    const updateTime = () => {
      console.log('this.coach.remainingTime()', this.coach.remainingTime())
      this.setState({
        time: t(this.coach.elapsedSeconds()),
        remaining: t(this.coach.remainingTime()),
        average: t(this.coach.average())
      })
    }

    setInterval(updateTime.bind(this), 90)
  }

  componentWillMount() {
    this.height = new Animated.Value(1)
  }

  overdue() {
    this.setState({
      backgroundColor: 'red'
    })
  }

  startAnimation() {
    Animated.timing(this.height, {
      toValue: deviceHeight,
      duration: 1500
    }).start(this.overdue.bind(this))
  }

  componentDidMount() {
    this.startAnimation()
  }

  increment() {
    this.height.stopAnimation()
    this.height = new Animated.Value(1)
    this.startAnimation()
    this.coach.recordRound()
    this.setState({
      count: this.coach.roundCount(),
      backgroundColor: 'green'
    })
  }

  render() {
    const style = { zIndex: 1, height: this.height, top: 0, width: deviceWidth, backgroundColor: this.state.backgroundColor}

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{zIndex: 0, top: 0, backgroundColor: 'black', height: deviceHeight}}>
          <Animated.View ref="progress" style={style}>
          </Animated.View>
        </View>

        <View style={styles.numberWrapper}>
          <TouchableOpacity onPress={this.increment.bind(this)}>
            <Text style={{fontSize: 160, color: '#FFF'}}>{this.state.count}</Text>
          </TouchableOpacity>

          <Text style={{fontSize: 40, color: '#FFF'}}>{this.state.time}</Text>
        <Text style={{fontSize: 40, color: '#FFF'}}>{this.state.average}</Text>
          <Text style={{fontSize: 40, color: '#FFF'}}>{this.state.remaining}</Text>
        </View>
      </View>
    );
  }
}
