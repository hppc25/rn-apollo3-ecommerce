/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { ProductsList } from './screens/ProductsList'
import { ProductDetails } from './screens/ProductDetails'
import { GRAPHQL_URL } from './config';

const Stack = createStackNavigator();

const client2 = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
})
export default function () {
  return (

    <ApolloProvider client={client2}>
      <NavigationContainer >
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        >

          <Stack.Screen
            name={'ProductList'}
            component={ProductsList}
          ></Stack.Screen>

          <Stack.Screen
            name={'ProductDetails'}
            component={ProductDetails}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
};
