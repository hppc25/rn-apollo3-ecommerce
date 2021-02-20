import React from 'react';
import {Animated, Easing} from 'react-native';


export function FadeIn({style, children, slideValue, duration, delay}) {

  const fadeAnim = React.useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const animatedValue = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {

    Animated.parallel([

      Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: duration? duration: 700,
              useNativeDriver: true,
              delay:delay?delay:0
            }
          ),

          Animated.timing(animatedValue,{
            toValue:1,
            duration: duration? duration: 700,
            Easing: Easing,
            useNativeDriver: true ,
            delay:delay?delay:0
          }),

    ]).start();   

  })

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [slideValue!=undefined?slideValue:10,0]
  })

  const transform = [{translateY}];


  return (
    <Animated.View  style={ [style, { opacity: fadeAnim, transform}]}>
       {children}
    </Animated.View>
  );
}

