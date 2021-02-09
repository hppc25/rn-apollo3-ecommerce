import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Svg, Path} from 'react-native-svg';

export function HeaderMenu({favorite, onPress, style}) {
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
      className="prefix__feather prefix__feather-menu"
      >
      <Path d="M3 12h18M3 6h18M3 18h18" />
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