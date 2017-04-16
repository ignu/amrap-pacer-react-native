import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF"
  },
  timerWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  timerBackground: {
    zIndex: 0,
    top: 0,
    backgroundColor: "black",
    height: deviceHeight
  },
  countWrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: "pink"
  },
  currentTimeWrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: "purple"
  },
  stats: {
    flex: 1,
    borderWidth: 2,
    borderColor: "white"
  },
  numberWrapper: {
    backgroundColor: "rgba(52,52,52,0)",
    flex: 1,
    flexDirection: "column",
    height: deviceHeight,
    left: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: deviceWidth,
    zIndex: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default styles;
