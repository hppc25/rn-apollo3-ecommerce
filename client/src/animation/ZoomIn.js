import React from 'react';
import {Animated, Easing} from 'react-native';


export function ZoomIn({style, children, scaleInitial}) {

  const fadeAnim = React.useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const animatedValue = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {

    Animated.parallel([

      Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 700,
              useNativeDriver: true
            }
          ),

          Animated.timing(animatedValue,{
            toValue:1,
            duration:700,
            Easing: Easing,
            useNativeDriver: true 
          }),

    ]).start();   

  })

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [scaleInitial?scaleInitial:0.7, 1]
  })

  const transform = [{scale}];


  return (
    <Animated.View  style={ [style, { opacity: fadeAnim, transform}]}>
       {children}
    </Animated.View>
  );
}

