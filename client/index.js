/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage';

import App from './src/App';
import {name as appName} from './app.json';



Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

AppRegistry.registerComponent(appName, () => App);
