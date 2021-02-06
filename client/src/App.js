/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import {persistCache} from 'apollo-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {HeaderFavoriteProductsCount} from './components/HeaderFavoriteProductsCount';
import { ProductsList } from './screens/ProductsList'
import { ProductDetails } from './screens/ProductDetails'
import { GRAPHQL_URL } from './config';
import { resolvers } from './graphql/resolvers';
import { cache } from './graphql/cache';
import { Loading } from './components/Loading';

const Stack = createStackNavigator();

const client2 = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: cache,
  resolvers: resolvers,
})
export default function () {

  const [client, setClient] = React.useState(null);
  
  React.useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
      trigger: 'background',
    }).then(() => {
      setClient(
        new ApolloClient({
          uri: GRAPHQL_URL,
          cache: cache,
          resolvers: resolvers,
        }),
      );
    });
  }, []);

  if (!client) {
    return <Loading />;
  }

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
            options={{
              headerRight: () => <HeaderFavoriteProductsCount />,
            }}
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
