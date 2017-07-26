import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

import Start from "./components/start";
import Timer from "./components/timer";
import Settings from "./components/settings";


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

class App extends React.Component {
  render() {
    return (
      <Router navBarStyle={styles.navBar}>
        <Scene key="root">
          <Scene key="timer" component={Timer} hideNavBar />
          <Scene key="start" component={Start} initial hideNavBar />
          <Scene key="settings" component={Settings} title="Seattings" />
        </Scene>
      </Router>
    );
  }
}

export default App;
