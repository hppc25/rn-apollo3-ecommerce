import React from 'react'
import {FlatList, StyleSheet, View,Text} from 'react-native';

export function ProductDetails({navigation}) {

    return (
        <View style={styles.container}>
            <Text>Welcome to react native with apollo Detail</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },

    productsList: {
      backgroundColor: '#fafafa',
    },
    productsListContainer: {
      backgroundColor: '#fafafa',
      paddingVertical: 8,
      marginHorizontal: 8,
    },
  });