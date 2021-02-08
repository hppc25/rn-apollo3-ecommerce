import React from 'react';
import {View, StyleSheet} from 'react-native';

export function SwipeDot({active}) {
  return (
    <View style={[styles.container,{backgroundColor:active?'black':'white'} ]}></View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:10,
    height:10,
    borderRadius:10,
    borderColor:'black',
    borderWidth:1,
    marginHorizontal:3
    
  },
});