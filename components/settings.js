import React from "react";
import { View, Text, TextInput } from "react-native";

const styles = {
  settingsScreen: {
    flex: 1
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
    padding: 9
  },
  titleText: {
    fontSize: 39
  },
  formWrapper: {
    flex: 5,
    backgroundColor: "#EEE"
  },
  formSection: {
    borderWidth: 1,
    height: 100,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 1
  },
  input: {
    marginTop: 10,
    padding: 5,
    height: 50,
    width: 80,
    color: "#000"
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
        <View style={styles.formSection}>
          <Text>Goal</Text>

          <TextInput
            style={styles.input}
            editable={true}
            maxLength={3}
            ref="goal"
            keyboardType="numeric"
            placeholder="0"
            clearTextOnFocus={true}
          />
        </View>

        <View style={styles.formSection}>
          <Text>Minutes</Text>

          <TextInput
            style={styles.input}
            maxLength={3}
            editable={true}
            ref="minutes"
            placeholder="Minutes"
            clearTextOnFocus={true}
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;
