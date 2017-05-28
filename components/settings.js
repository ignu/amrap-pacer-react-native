import React from "react";
import { View, Text, TextInput } from "react-native";

const styles = {
  settingsScreen: {
    flex: 1
  },
  titleWrapper: {
    flex: 1
  },
  titleText: {
    fontSize: 40
  },
  formWrapper: {
    flex: 5,
    backgroundColor: "#EEE"
  }
};

const Settings = props => {
  console.log("props", props);

  return (
    <View style={styles.settingsScreen}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>Settings</Text>
      </View>

      <View style={styles.formWrapper}>
        <TextInput
          ref="goal"
          placeholder="Goal"
          clearButtonMode="while-editing"
        />

        <TextInput
          ref="time"
          placeholder="Time"
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
};

export default Settings;
