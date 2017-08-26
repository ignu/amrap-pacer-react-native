import React from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';

import Start from "./components/start";
import Timer from "./components/timer";
import Settings from "./components/settings";

import {Provider} from 'mobx-react'
import Coach from './lib/coach';

const styles = {
  navBar: {
    backgroundColor: "#aff",
    borderBottomWidth: 0,
    opacity: 0.85,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3
  }
};

const defaultSettings = {
  beepWhenDone:false,
  showTimer: true
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.coach = new Coach
  }

  render() {
    return (
      <Provider coach={this.coach} settings={defaultSettings}>
        <Router navBarStyle={styles.navBar}>
          <Scene key="root">
            <Scene key="timer" component={Timer} hideNavBar />
            <Scene key="start" component={Start} initial hideNavBar />
            <Scene key="settings" component={Settings} title="Settings" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default App;
