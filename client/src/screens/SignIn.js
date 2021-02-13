import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import { runTiming } from "../config/utils";

const { width, height } = Dimensions.get('window');
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  interpolate,
  Extrapolate,
  concat
} = Animated;

export function SignIn({ navigation }) {

  const buttonOpacity = React.useRef(new Value(1)).current;

  const onStateChange = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 1, 0))
          )
        ])
    }
  ]);

  const onCloseState = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 0, 1))
          )
        ])
    }
  ]);

  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - 50, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const textInputZIndex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP
  });

  const textInputY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP
  });

  const textInputOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP
  });


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
      }}
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{ translateY: bgY }]
        }}
      >
        <Svg width={width} height={height}>
          <ClipPath id="clip">
            <Circle r={height} cx={width / 2}>

            </Circle>

          </ClipPath>
          <Image
            href={require('../assets/imgs/bg2.jpg')}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"

          />
        </Svg>
      </Animated.View>

      <View style={{ height: height / 3, justifyContent: 'center' }}>
        <TapGestureHandler onHandlerStateChange={onStateChange}>
          <Animated.View
            style={{
              ...styles.button,
              opacity: buttonOpacity,
              transform: [{ translateY: buttonY }]
            }}>
            <Text style={styles.buttonSignInText}>SIGN IN</Text>
          </Animated.View>
        </TapGestureHandler>

        <Animated.View
          style={{
            ...styles.button,
            backgroundColor: '#2E71DC',
            opacity: buttonOpacity,
            transform: [{ translateY: buttonY }]
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            SIGN IN WITH FACEBOOK
        </Text>
        </Animated.View>
        <Animated.View style={{
          zIndex: textInputZIndex,
          opacity: textInputOpacity,
          transform: [{ translateY: textInputY }],
          height: height / 3,
          ...StyleSheet.absoluteFill,
          top: null,
          justifyContent: 'center',
        }}>

          <TapGestureHandler onHandlerStateChange={onCloseState}>
            <Animated.View style={styles.closeButton}>
              <Animated.Text style={
                {
                  fontSize: 15, transform: [{ rotate: concat(rotateCross, 'deg') }]
                }}>X</Animated.Text>

            </Animated.View>

          </TapGestureHandler>

          <TextInput
            placeholder="Email"
            style={styles.textInput}
            placeholderTextColor="black"
          ></TextInput>

          <TextInput
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor="black"
          ></TextInput>

          <Animated.View style={[styles.button, { marginTop: 10 }]}>
            <Text style={styles.buttonSignInText}>Sign In</Text>
          </Animated.View>

        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  buttonSignInText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',

    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },

  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,

  }
});