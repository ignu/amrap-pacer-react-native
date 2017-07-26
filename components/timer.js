/* @flow  */
import React, { Component } from "react";

import {
  Animated,
  TouchableOpacity,
  Dimensions,
  Text,
  View
} from "react-native";

import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

import Coach from "../lib/coach";

const t = seconds => {
  seconds = Math.round(seconds);

  let neg = "";

  if (seconds < 0) {
    neg = "-";
    seconds = Math.abs(seconds);
  }

  const minutes = Math.round(seconds / 60, 0);
  let remainder = seconds % 60;
  let remainderString = `${remainder}`;

  if (remainder < 10) remainderString = `0${remainder}`;

  return `${neg}${minutes}:${remainderString}`;
};

type TimerState = {
  height: number,
  time: string,
  count: number,
  average: string,
  backgroundColor: string,
  remaining: string
};

export default class Timer extends Component {
  coach: Coach;
  state: TimerState;
  height: any;

  constructor(props: Object) {
    super(props);

    this.coach = new Coach();
    this.coach.start();

    this.state = {
      height: 1,
      time: "0:00",
      count: 0,
      average: "",
      backgroundColor: "green",
      remaining: ""
    };

    const updateTime = () => {
      this.setState({
        time: t(this.coach.elapsedSeconds()),
        remaining: t(this.coach.remainingTime()),
        average: t(this.coach.average())
      });
    };

    this.interval = setInterval(updateTime.bind(this), 90);
  }

  componentWillMount() {
    this.height = new Animated.Value(1);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  overdue() {
    this.setState({
      backgroundColor: "red"
    });
  }

  startAnimation() {
    if (this.coach.roundCount() < 1) return;

    Animated.timing(this.height, {
      toValue: deviceHeight,
      duration: this.coach.roundGoal() * 1000
    }).start(this.overdue.bind(this));
  }

  componentDidMount() {
    this.startAnimation();
  }

  increment() {
    this.height.stopAnimation();
    this.height = new Animated.Value(1);
    this.coach.recordRound();
    this.startAnimation();
    this.setState({
      count: this.coach.roundCount(),
      backgroundColor: "green"
    });
  }

  renderRemaining() {
    if (this.state.count < 1) return null;

    return (
      <View>
        <Text style={styles.detailsText}>
          Remaining: {this.state.remaining}
        </Text>
      </View>
    );
  }

  renderAverage() {
    if (this.state.count < 1) return null;

    return (
      <View>
        <Text style={styles.detailsText}>
          Average: {this.state.average}
        </Text>
      </View>
    );
  }

  render() {
    const style = {
      zIndex: 1,
      height: this.height,
      top: 0,
      width: deviceWidth,
      backgroundColor: this.state.backgroundColor
    };

    return (
      <View style={styles.timerWrapper}>
        <View style={styles.timerBackground}>
          <Animated.View ref="progress" style={style} />
        </View>

        <View style={styles.numberWrapper}>
          <View style={styles.countWrapper}>
            <TouchableOpacity onPress={this.increment.bind(this)}>
              <Text style={styles.counterText}>
                {this.state.count}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.currentTimeWrapper}>
            <Text style={styles.currentTimeText}>
              {this.state.time}
            </Text>
          </View>

          <View style={styles.stats}>
            {this.renderAverage()}

            {this.renderRemaining()}
          </View>
        </View>
      </View>
    );
  }
}
