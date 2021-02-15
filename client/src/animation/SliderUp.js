import React from 'react';
import {Animated, Easing} from 'react-native';


export function SliderUp({style, children, scaleInitial, delay}) {

  const fadeAnim = React.useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const animatedValue = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {

    Animated.parallel([

      Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 1000,
              delay:delay,
              useNativeDriver: true
            }
          ),

          Animated.timing(animatedValue,{
            toValue:1,
            duration:1000,
            Easing: Easing,
            useNativeDriver: true 
          }),

    ]).start();   

  })

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [translateY?translateY:10, 0]
  })

  const transform = [{translateY}];


  return (
    <Animated.View  style={ [style, { opacity: fadeAnim, transform}]}>
       {children}
    </Animated.View>
  );
}

