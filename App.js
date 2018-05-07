
import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const offset = new Animated.Value(0);

class Inning extends Component {

  componentWillReceiveProps(nextProps) {

  }

  renderAtBats() {
    const atBats = [];
    for (let i = 0; i < 9; i++) {
      atBats.push(
        <AtBat key={i} batter={i + 1} {...this.props} />
      )
    }
    return atBats;
  }
  render() {
    return (
      <ScrollView
        onScroll={event => console.log('VERTICAL EVENT', event.nativeEvent)}
        scrollEventThrottle={16}
        horizontal={false}
        pagingEnabled
        style={styles.scrollView}
      >
        {
          this.renderAtBats()
        }
      </ScrollView>
    )
  }
}


const AtBat = props => {
  return (
    <View style={styles.scrollPage}>
      <View style={[styles.screen]}>
        <View style={styles.atBat}>
          <Text style={styles.text}>{`INNING ${props.inning}`}</Text>
          <Text style={styles.text}>{`BATTER ${props.batter}`}</Text>
        </View>
      </View>
    </View>
  );
};

// const transitionAnimation = index => {
//   return {
//     transform: [
//       { perspective: 800 },
// {
//   scale: offset.interpolate({
//     inputRange: [
//       (index - 1) * SCREEN_WIDTH,
//       index * SCREEN_WIDTH,
//       (index + 1) * SCREEN_WIDTH
//     ],
//     outputRange: [0.25, 1, 0.25]
//   })
// },
// {
//   rotateX: offset.interpolate({
//     inputRange: [
//       (index - 1) * SCREEN_WIDTH,
//       index * SCREEN_WIDTH,
//       (index + 1) * SCREEN_WIDTH
//     ],
//     outputRange: ["45deg", "0deg", "45deg"]
//   })
// },
// {
//   rotateY: offset.interpolate({
//     inputRange: [
//       (index - 1) * SCREEN_WIDTH,
//       index * SCREEN_WIDTH,
//       (index + 1) * SCREEN_WIDTH
//     ],
//     outputRange: ["-45deg", "0deg", "45deg"]
//   })
// }
//     ]
//   };
// };

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inningCount: 9,
      xOffset: 0
    }

    this.scrollToX = this.scrollToX.bind(this);
  }

  scrollToX(e) {
    console.log('X EVENT', e.nativeEvent);
    this.setState({ xOffset: e.nativeEvent.contentOffset.x })
  }



  renderInnings() {
    const innings = [];
    for (let i = 0; i < this.state.inningCount; i++) {
      innings.push(
        <Inning
          key={i}
          inning={i + 1}
          xOffset={this.state.xOffset}
        />
      )
    }
    return innings;
  }

  render() {
    return (
      <ScrollView
        onScroll={event => this.scrollToX(event)}
        scrollEventThrottle={16}
        horizontal
        // vertical

        pagingEnabled
        style={styles.scrollView}
      >
        {
          this.renderInnings()
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    // flexDirection: "row",
    backgroundColor: "#00d4ff"
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    // padding: 50
  },
  screen: {
    // height: '80%',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  atBat: {
    backgroundColor: "white",
    height: (SCREEN_WIDTH * 0.8) * (3 / 2),
    width: SCREEN_WIDTH * 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontSize: 45,
    fontWeight: "bold"
  }
});