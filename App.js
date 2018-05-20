
import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

console.ignoredYellowBox = ['Remote debugger is in a background'];

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

// const offset = new Animated.Value(0);

class Inning extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.yOffset !== nextProps.yOffset) {
      this.el.scrollTo({ y: nextProps.yOffset })
    }
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

  handleScroll(e) {
    this.props.setOffsetY(e.nativeEvent.contentOffset.y)
  }

  render() {
    return (
      <ScrollView
        ref={el => { this.el = el }}
        onMomentumScrollEnd={event => this.handleScroll(event)}
        onScrollEndDrag={event => this.handleScroll(event)}
        scrollEventThrottle={160}
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
      yOffset: 0,
    }
    this.setOffsetY = this.setOffsetY.bind(this);
  }

  setOffsetY(yOffset) {
    if (yOffset % SCREEN_HEIGHT === 0) {
      this.setState({ yOffset })
    }
  }

  renderInnings() {
    const innings = [];
    for (let i = 0; i < this.state.inningCount; i++) {
      innings.push(
        <Inning
          key={i}
          inning={i + 1}
          yOffset={this.state.yOffset}
          setOffsetY={this.setOffsetY}
        />
      )
    }
    return innings;
  }

  render() {
    return (
      <ScrollView
        horizontal
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
    backgroundColor: "#00d4ff"
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  screen: {
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