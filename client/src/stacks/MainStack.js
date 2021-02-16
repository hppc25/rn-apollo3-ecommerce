import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { HeaderFavoriteProductsCount } from '../components/HeaderFavoriteProductsCount';
import { HeaderMenu } from '../components/HeaderMenu';
import { HeaderShoppingCart } from '../components/HeaderShoppingCart';
import { ProductsList } from '../screens/ProductsList'
import { ProductDetails } from '../screens/ProductDetails'
import MainTab from './MainTab';
import { View } from 'react-native';




const Stack = createStackNavigator();

export default () => {


    return (
       
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: 'black',
                headerShown: false,  
            }}
        >

            <Stack.Screen
                name={'MainTab'}
                component={MainTab}
            >
            </Stack.Screen>

            <Stack.Screen
                name={'ProductList'}
                component={ProductsList}
                options={{
                    title: 'Home',
                    headerLeft: () => <HeaderFavoriteProductsCount />,
                    headerRight: () => <HeaderMenu />,
                    // headerRight: () => <HeaderShoppingCart />,
                }}
            ></Stack.Screen>

            <Stack.Screen
                name={'ProductDetails'}
                component={ProductDetails}
                options={{
                    title: '',
                }}
            ></Stack.Screen>


        </Stack.Navigator>
    
    )
};