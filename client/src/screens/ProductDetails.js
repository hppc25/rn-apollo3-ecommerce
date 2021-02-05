import React from 'react'
import {FlatList, StyleSheet, View,Text} from 'react-native';
import {useQuery} from '@apollo/client';

import { Error, Loading } from '../components';
import { Product } from '../components/Product';
import { GET_PRODUCT } from '../graphql/requests';

export function ProductDetails({route,navigation}) {

  const {productId} = route.params;
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-first',
  });



  if (productLoading) {
    return <Loading hasBackground />;
  }

  if (productError) {
    return <Error error={productError} />;
  }

    // const {product} = productData;
    let product = null;
    product = !productData? null: productData.product;

    
    return (

        <View style={styles.container}>
             {product &&product.thumb[0] && <Product product={product} />}
        </View> 
    )
}

const styles = StyleSheet.create({

    container:{
        // flex:1,
        // justifyContent:"center",
        // alignItems:"center",
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