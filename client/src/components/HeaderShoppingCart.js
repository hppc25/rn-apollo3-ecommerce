import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Svg, Path, Circle} from 'react-native-svg';

export function HeaderShoppingCart({favorite, onPress, style}) {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
       <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"

    >
      <Circle cx={9} cy={21} r={1} />
      <Circle cx={20} cy={21} r={1} />
      <Path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </Svg>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight:8
    // backgroundColor: 'orange',
    // backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});