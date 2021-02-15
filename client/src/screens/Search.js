import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import { SearchButton } from '../components/SearchButton';

export function Search({navigation}) {
  return (
    <SafeAreaView >
     
        <View style={styles.container}>
  
            <Text style={styles.title}>Search</Text>
            <Text style={styles.subtitle}>Find Your Shoes</Text>
            <SearchButton  ></SearchButton>
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop:50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    paddingTop: 24,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.5,
    paddingTop: 8,
    marginBottom: 24,
    color:'black'
  },
});