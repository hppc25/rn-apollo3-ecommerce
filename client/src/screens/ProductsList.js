import React from 'react'
import {FlatList, StyleSheet, View,Text, Button} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import {Loading} from '../components/Loading';
import {Error} from '../components/Error';
import { GET_ALL_PRODUCTS } from '../graphql/requests';


export function ProductsList({navigation}) {

    const {data, loading, error} = useQuery(GET_ALL_PRODUCTS);


  if (loading) {
    return <Loading hasBackground />;
  }

  if (error) {
    return <Error error={error} />;
  }

  console.log("data")
  console.log(data)
//   console.log(loading)
//   console.log(error)

    return (
        <View style={styles.container}>
         
             {/* onPress={()=>{navigation.navigate('ProductDetails')}} */}

            {data && <FlatList
                // style={styles.productsList}
                // contentContainerStyle={styles.productsListContainer}
                data={data.products}
                // renderItem={renderProduct}
                renderItem={({item}) => <Text>{item.name}</Text>}
    />
    }
   
        
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