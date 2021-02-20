import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import { FadeIn } from '../animation/FadeIn';
import { SearchButton } from '../components/SearchButton';

export function Search({navigation}) {
  return (
    <SafeAreaView >
     
        <View style={styles.container}>

          <FadeIn>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Search</Text>
              <Text style={styles.subtitle}>Find Your Shoes</Text>
            </View> 
          </FadeIn>
          <FadeIn delay={150}>
            <SearchButton ></SearchButton>
          </FadeIn>
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop:50,
    // paddingHorizontal: 16,
  },
  titleWrapper:{
    paddingHorizontal: 12,
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