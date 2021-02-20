/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import {persistCache} from 'apollo-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';

import { Loading } from './components/Loading';
import { GRAPHQL_URL } from './config';
import { resolvers } from './graphql/resolvers';
import { cache } from './graphql/cache';
import MainStack from './stacks/MainStack';

// hide warning message  Remote debugger is in a background ...
// hide warning message VirtualizedLists
import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["Remote debugger"]);
LogBox.ignoreLogs(["VirtualizedLists"]);
// YellowBox.ignoreWarnings(['Remote debugger']);

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

    <ApolloProvider client={client2} >
      <NavigationContainer  >
          <MainStack ></MainStack>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ApolloProvider>
  )
};
