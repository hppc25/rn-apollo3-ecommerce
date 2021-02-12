import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function Search({navigation}) {
  return (
    <View style={[styles.container]} >
      <Text>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex:1,
   justifyContent:'center',
   alignItems:'center',
  },
});