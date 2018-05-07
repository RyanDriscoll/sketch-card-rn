import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, View, Text } from 'react-native';
import Carousel from "react-native-snap-carousel";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export const xOffset = new Animated.Value(0);

const transitionAnimation = index => {
  return {
    transform: [
      { perspective: 800 },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.25, 1, 0.25]
        })
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["45deg", "0deg", "45deg"]
        })
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["-45deg", "0deg", "45deg"]
        })
      }
    ]
  };
};

class Inning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        { title: 'Batter 1' },
        { title: 'Batter 2' },
        { title: 'Batter 3' },
        { title: 'Batter 4' },
        { title: 'Batter 5' },
        { title: 'Batter 6' },
        { title: 'Batter 7' },
        { title: 'Batter 8' },
        { title: 'Batter 9' },
      ]
    }
  }

  // _renderItem({ item, index }) {
  //   return (
  //     <View style={styles.scrollPage}>
  //       <View style={styles.screen}>

  //         <Text style={styles.title}>{item.title}</Text>
  //       </View>
  //     </View>
  //   );
  // }

  render() {
    return (
      <View style={styles.scrollPage}>
        <Animated.View style={[styles.screen, transitionAnimation(this.props.index)]}>
          <Text style={styles.text}>{this.props.text}</Text>
        </Animated.View>
      </View>
    );
    // return (
    //   // <View style={styles.scrollPage} >
    //   //   <Animated.View style={[styles.screen, transitionAnimation(this.props.index)]}>
    //   <Carousel
    //     ref={(c) => { this._carousel = c; }}
    //     // style={styles.scrollPage}
    //     data={this.state.entries}
    //     renderItem={this._renderItem}
    //     vertical
    //     // sliderWidth={sliderWidth}
    //     // itemWidth={SCREEN_WIDTH}
    //     itemHeight={SCREEN_HEIGHT}
    //     sliderHeight={SCREEN_HEIGHT * 9}
    //   />
    //   //   </Animated.View>
    //   // </View>
    // );
  }
}

export default Inning;

//Styles
const styles = StyleSheet.create({
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20
  },
  screen: {
    height: 600,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white"
  },
  text: {
    fontSize: 45,
    fontWeight: "bold"
  }
});


