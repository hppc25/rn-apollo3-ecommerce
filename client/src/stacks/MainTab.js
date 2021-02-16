import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import { ProductsList } from '../screens/ProductsList';
import { Search } from '../screens/Search';
import { ShoppingCart } from '../screens/ShoppingCart';
import { FavoriteList } from '../screens/FavoriteList';
import { SignIn } from '../screens/SignIn';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator 
    options={{
        tabBarBadge:88,
        tabBarBadgeStyle:{backgroundColor:'red'}
      }}
    
    tabBar={props=><CustomTabBar {...props} /> }>
        <Tab.Screen name="Home" component={ProductsList} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="ShoppingCart" component={ShoppingCart} />
        <Tab.Screen name="Favorites" component={FavoriteList} />
        <Tab.Screen name="Profile" component={SignIn} />
    </Tab.Navigator>
);