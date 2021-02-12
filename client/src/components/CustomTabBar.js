import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import HomeIcon from '../assets/icons/home.svg';
import SearchIcon from '../assets/icons/search.svg';
import ShoppingCart from '../assets/icons/shopping-cart.svg';
import FavoriteIcon from '../assets/icons/favorite.svg';
import AccountIcon from '../assets/icons/account.svg';

export default ({ state, navigation }) => {



    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <View style={styles.tabArea} >


            <View style={styles.tabItem}>
                <TouchableOpacity onPress={() => goTo('Home')}>
                    <HomeIcon style={{ opacity: state.index === 0 ? 1 : 0.6 }} width="24" height="24" fill="black"></HomeIcon>
                </TouchableOpacity>
            </View>


            <View style={styles.tabItem}>
                <TouchableOpacity onPress={() => goTo('Search')}>
                    <SearchIcon style={{ opacity: state.index === 1 ? 1 : 0.6 }} width="24" height="24" fill="black"></SearchIcon>
                </TouchableOpacity>
            </View>

            <View style={styles.tabCenter}>
                <TouchableOpacity onPress={() => goTo('ShoppingCart')}>
                    <ShoppingCart width="24" height="24" fill="white"></ShoppingCart>
                </TouchableOpacity>
            </View>

            <View style={styles.tabItem} >
                <TouchableOpacity onPress={() => goTo('Favorites')}>
                    <FavoriteIcon style={{ opacity: state.index === 3 ? 1 : 0.6 }} width="24" height="24" fill="black"></FavoriteIcon>
                </TouchableOpacity>
            </View>

            <View style={styles.tabItem} >
                <TouchableOpacity onPress={() => goTo('Profile')}>
                    <AccountIcon style={{ opacity: state.index === 4 ? 1 : 0.6 }} width="24" height="24" fill="black"></AccountIcon>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    tabArea: {
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            height: 0,
        },
        elevation: 1,
        borderRadius:60

    },

    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%'
    },

    tabCenter: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 35,
        backgroundColor: 'black',
        marginTop: -20,
    }
});