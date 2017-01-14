import React from 'react';
import Start from './components/start'
import Timer from './components/timer'
import Settings from './components/settings'

import { Scene, Router } from 'react-native-router-flux';

class App extends React.Component {
  render() {
    return(
      <Router>
        <Scene key="root">
          <Scene key="start" component={Start} initial hideNavbar={true}/>
          <Scene key="timer" component={Timer} hideNavBar/>
          <Scene key="settings" component={ Settings } title="Settings" />
        </Scene>
      </Router>
    )
  }
}

export default App
