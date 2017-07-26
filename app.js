import React from "react";
import Start from "./components/start";
import Timer from "./components/timer";
import Settings from "./components/settings";
import { Router, Scene } from "react-native-mobx";

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
        <Scene key="timer" component={Timer} hideNavBar />
        <Scene key="start" component={Start} initial hideNavBar />
        <Scene key="settings" component={Settings} title="Seattings" />
      </Router>
    );
  }
}

export default App;
