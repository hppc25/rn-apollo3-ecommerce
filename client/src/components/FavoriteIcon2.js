import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Svg, Path} from 'react-native-svg';

export function FavoriteIcon2({favorite, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill={favorite ? 'black' : 'none'}
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 8,
    top: 8,
    height: 24,
    width: 24,
    borderRadius: 24 / 2,
    // backgroundColor: 'orange',
    // backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});